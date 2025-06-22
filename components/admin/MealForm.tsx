"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, Control } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Plus, Trash2, Upload, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Resolver, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const ingredientSchema = z.object({
  name: z.string().min(1, "Ingredient name is required"),
  description: z.string().nullable().optional(),
  quantity: z.string().min(1, "Quantity is required"),
  unit: z.string().optional(),
  is_shipped: z.boolean().default(false),
});

const toolSchema = z.object({
  name: z.string().min(1, "Tool name is required"),
  description: z.string().nullable().optional(),
});

const stepSchema = z.object({
  step_number: z.number(),
  instruction: z.string().min(1, "Step instruction is required"),
  image_url: z.string().nullable().optional(),
});

const nutritionSchema = z.object({
  nutrition: z.string(),
  value: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Value must be a non-negative number.",
  }),
});

const mealFormSchema = z.object({
  recipe_name: z.string().min(2, {
    message: "Meal name must be at least 2 characters.",
  }),
  subname: z.string().optional(),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  difficulty: z.enum(["easy", "medium", "hard"]),
  cooking_time: z.string().min(1, {
    message: "Cooking time is required.",
  }),
  total_time: z.string().min(1, {
    message: "Total time is required.",
  }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number.",
  }),
  status: z.enum(["active", "inactive"]).default("active"),
  image_url: z.string().nullable().optional(),
  category: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
  }),
  ingredients: z
    .array(ingredientSchema)
    .min(1, "At least one ingredient is required"),
  cooking_tools: z.array(toolSchema),
  cooking_steps: z.array(stepSchema).min(1, "At least one step is required"),
  nutritions: z.array(nutritionSchema),
  tags: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .optional(),
});

type MealFormValues = z.infer<typeof mealFormSchema>;

type FormControl = Control<MealFormValues>;

interface MealFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: {
    recipe_id: string;
    recipe_name: string;
    subname?: string;
    description: string;
    difficulty: "easy" | "medium" | "hard";
    cooking_time: string;
    total_time: string;
    price: string;
    status: "active" | "inactive";
    image_url?: string;
    category: {
      id: string;
      name: string;
      description?: string;
    };
    ingredients: {
      name: string;
      description?: string;
      quantity: string;
      unit?: string;
      is_shipped: boolean;
      ingredient_id?: string;
      id?: string;
    }[];
    cooking_tools: {
      name: string;
      description?: string;
    }[];
    cooking_steps: {
      step_number: number;
      instruction: string;
      image_url?: string;
    }[];
    nutritions: {
      nutrition: string;
      value: string;
    }[];
    tags?: {
      id: string;
      name: string;
    }[];
  } | null;
  onSubmit: (formData: FormData) => Promise<void>;
  categories: any[];
}

export function MealForm({
  open,
  onOpenChange,
  initialData,
  onSubmit,
  categories,
}: MealFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.image_url || null
  );
  const [activeTab, setActiveTab] = useState("basic");
  const [stepImagePreviews, setStepImagePreviews] = useState<
    Record<number, string>
  >({});
  const allowedImageTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
  ];
  const allowedImageExtensions = ".jpg,.jpeg,.png,.gif,.webp";

  const isEditing = !!initialData;

  const defaultValues: Partial<MealFormValues> = {
    recipe_name: initialData?.recipe_name || "",
    subname: initialData?.subname || "",
    description: initialData?.description || "",
    difficulty:
      (initialData?.difficulty as "easy" | "medium" | "hard") || "easy",
    cooking_time: initialData?.cooking_time || "",
    total_time: initialData?.total_time || "",
    price: initialData?.price || "",
    status: initialData?.status || "active",
    image_url: initialData?.image_url || null,
    category: initialData?.category || { id: "", name: "" },
    ingredients: initialData?.ingredients?.map((ingredient) => ({
      ...ingredient,
      is_shipped: ingredient.is_shipped ?? false,
    })) || [{ name: "", quantity: "", unit: "", is_shipped: false }],
    cooking_tools: initialData?.cooking_tools || [{ name: "" }],
    cooking_steps: initialData?.cooking_steps || [
      { step_number: 1, instruction: "" },
    ],
    nutritions: initialData?.nutritions || [
      { nutrition: "calories", value: "" },
      { nutrition: "protein", value: "" },
      { nutrition: "carbs", value: "" },
      { nutrition: "fat", value: "" },
      { nutrition: "fiber", value: "" },
      { nutrition: "sugar", value: "" },
      { nutrition: "sodium", value: "" },
    ],
    tags: initialData?.tags || [],
  };

  const form = useForm<MealFormValues>({
    resolver: zodResolver(mealFormSchema) as Resolver<MealFormValues>,
    defaultValues,
    mode: "onChange",
  });

  // Add form state logging
  useEffect(() => {
    const subscription = form.watch((value) => {
      console.log("Form values changed:", value);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Add form error logging
  useEffect(() => {
    console.log("Form errors:", form.formState.errors);
  }, [form.formState.errors]);

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      form.reset(defaultValues);
      setImagePreview(initialData.image_url || null);
      setStepImagePreviews({});
    }
  }, [initialData]);

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const {
    fields: toolFields,
    append: appendTool,
    remove: removeTool,
  } = useFieldArray({
    control: form.control,
    name: "cooking_tools",
  });

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    control: form.control,
    name: "cooking_steps",
  });

  // Custom remove step function that handles image previews
  const handleRemoveStep = (index: number) => {
    // Remove the step image preview
    setStepImagePreviews((prev) => {
      const newPreviews = { ...prev };
      delete newPreviews[index];
      // Shift all subsequent image previews down by one
      const shiftedPreviews: Record<number, string> = {};
      Object.keys(newPreviews).forEach((key) => {
        const keyNum = parseInt(key);
        if (keyNum > index) {
          shiftedPreviews[keyNum - 1] = newPreviews[keyNum];
        } else {
          shiftedPreviews[keyNum] = newPreviews[keyNum];
        }
      });
      return shiftedPreviews;
    });

    // Remove the step
    removeStep(index);
  };

  // Update step numbers when steps are added/removed
  useEffect(() => {
    const steps = form.getValues("cooking_steps");
    const updatedSteps = steps.map((step, index) => ({
      ...step,
      step_number: index + 1,
    }));
    form.setValue("cooking_steps", updatedSteps);
    console.log(
      "Updated step numbers:",
      updatedSteps.map((s) => ({
        step_number: s.step_number,
        instruction: s.instruction,
      }))
    );
  }, [stepFields.length, form]);

  const handleSubmit = async (values: MealFormValues) => {
    console.log("Form submitted with values:", values);
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // Add basic fields - ensure these are set first
      if (!values.recipe_name) {
        throw new Error("Recipe name is required");
      }
      if (!values.category?.id) {
        throw new Error("Category is required");
      }

      // Set the required fields
      formData.set("name", values.recipe_name);
      formData.set("category_id", values.category.id);

      // Add other fields
      if (values.subname) formData.set("subname", values.subname);
      formData.set("description", values.description);
      formData.set("difficulty", values.difficulty);
      formData.set("cooking_time", values.cooking_time);
      formData.set("total_time", values.total_time);
      formData.set("price", values.price);
      formData.set("status", values.status);

      // Handle main recipe image if it exists and is a data URL
      if (imagePreview && imagePreview.startsWith("data:image")) {
        // Convert base64 to blob
        const response = await fetch(imagePreview);
        const blob = await response.blob();
        formData.append("image", blob, "recipe-image.jpg");
      }

      // Add ingredients with their IDs
      const ingredientsData = values.ingredients.map((ing, index) => {
        // Get the original ingredient from initialData to preserve the ID
        const originalIngredient = initialData?.ingredients[index];
        console.log("Original ingredient:", originalIngredient);

        const ingredientData = {
          name: ing.name,
          quantity: parseFloat(ing.quantity),
          unit: ing.unit,
          is_shipped: ing.is_shipped,
        };

        // Only add ingredient_id if we're editing and have an original ingredient
        if (isEditing && originalIngredient) {
          Object.assign(ingredientData, {
            ingredient_id:
              originalIngredient.id || originalIngredient.ingredient_id,
          });
        }

        return ingredientData;
      });

      console.log("Ingredients data being sent:", ingredientsData);
      formData.append("ingredients", JSON.stringify(ingredientsData));

      // Add cooking tools
      const toolsData = values.cooking_tools.map((tool) => ({
        name: tool.name,
        description: tool.description,
      }));
      formData.append("cooking_tools", JSON.stringify(toolsData));

      // Add cooking steps with images
      const stepsWithImages = await Promise.all(
        values.cooking_steps.map(async (step, index) => {
          const stepData = {
            step_number: step.step_number,
            instruction: step.instruction,
            image_url: step.image_url,
          };

          // If there's an image for this step
          if (
            stepImagePreviews[index] &&
            stepImagePreviews[index].startsWith("data:image")
          ) {
            console.log(
              `Processing image for step ${index + 1} (step_number: ${
                step.step_number
              })`
            );
            // Convert base64 to blob
            const response = await fetch(stepImagePreviews[index]);
            const blob = await response.blob();
            formData.append("step_images", blob, `step_${index + 1}_image.jpg`);
            stepData.image_url = `step_${index + 1}_image.jpg`;
            console.log(
              `Added image for step ${index + 1}: step_${index + 1}_image.jpg`
            );
          }

          return stepData;
        })
      );

      console.log("Final steps with images:", stepsWithImages);
      formData.append("cooking_steps", JSON.stringify(stepsWithImages));

      // Add nutritions
      const nutritionsData = values.nutritions.map((nutrition) => ({
        nutrition: nutrition.nutrition,
        value: nutrition.value,
      }));
      formData.append("nutritions", JSON.stringify(nutritionsData));

      // Add tags if they exist
      if (values.tags && values.tags.length > 0) {
        const tagsData = values.tags.map((tag) => ({
          name: tag.name,
        }));
        formData.append("tags", JSON.stringify(tagsData));
      }

      // Log final FormData contents
      console.log("Final FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      // Call the onSubmit handler with the FormData
      await onSubmit(formData);

      // Close the dialog on success
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to submit form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!allowedImageTypes.includes(file.type)) {
        toast.error(
          `Invalid file type. Please upload one of: ${allowedImageExtensions}`
        );
        e.target.value = ""; // Clear the input
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStepImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!allowedImageTypes.includes(file.type)) {
        toast.error(
          `Invalid file type. Please upload one of: ${allowedImageExtensions}`
        );
        e.target.value = ""; // Clear the input
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        setStepImagePreviews((prev) => ({
          ...prev,
          [index]: imageUrl,
        }));
        // Update the form value
        const steps = form.getValues("cooking_steps");
        steps[index].image_url = imageUrl;
        form.setValue("cooking_steps", steps);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Meal" : "Add New Meal"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the meal information in your catalog."
              : "Add a new meal to your catalog. Fill in all the required information."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-5 mb-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
                <TabsTrigger value="steps">Steps</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              </TabsList>

              {/* Basic Info Tab */}
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-lg">
                      {imagePreview ? (
                        <div className="relative w-full h-48">
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Meal preview"
                            className="w-full h-full object-cover rounded-md"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="absolute bottom-2 right-2 bg-white"
                            onClick={() => setImagePreview(null)}
                          >
                            Change Image
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-4">
                          <Upload className="h-10 w-10 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500 mb-2">
                            Click or drag to upload meal image
                          </p>
                          <Input
                            type="file"
                            accept={allowedImageExtensions}
                            className="w-full max-w-xs"
                            onChange={handleImageChange}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <FormField
                    control={form.control as FormControl}
                    name="recipe_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meal Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Garlic Butter Salmon"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control as FormControl}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            const selectedCategory = categories.find(
                              (cat) => cat.id === value
                            );
                            field.onChange({
                              id: selectedCategory?.id || "",
                              name: selectedCategory?.name || "",
                              description: selectedCategory?.description || "",
                            });
                          }}
                          defaultValue={field.value?.id}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control as FormControl}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the meal, ingredients, and preparation..."
                            className="resize-none min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control as FormControl}
                    name="cooking_time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cooking Time</FormLabel>
                        <FormControl>
                          <Input placeholder="30 min" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control as FormControl}
                    name="total_time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Time</FormLabel>
                        <FormControl>
                          <Input placeholder="30 min" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control as FormControl}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="14.99"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control as FormControl}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm md:col-span-2">
                        <div className="space-y-0.5">
                          <FormLabel>Active Status</FormLabel>
                          <FormDescription>
                            Make this meal available for ordering
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value === "active"}
                            onCheckedChange={(checked) =>
                              field.onChange(checked ? "active" : "inactive")
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control as FormControl}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm md:col-span-2">
                        <div className="space-y-0.5">
                          <FormLabel>Difficulty</FormLabel>
                          <FormDescription>
                            How difficult is this meal to prepare?
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="easy">Easy</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="hard">Hard</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              {/* Ingredients Tab */}
              <TabsContent value="ingredients" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Ingredients</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        appendIngredient({
                          name: "",
                          quantity: "",
                          unit: "",
                          is_shipped: false,
                        })
                      }
                      className="flex items-center gap-1"
                    >
                      <Plus className="h-4 w-4" /> Add Ingredient
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {ingredientFields.map((field, index) => (
                      <Card key={field.id} className="relative">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2 h-6 w-6 text-gray-400 hover:text-red-500"
                          onClick={() => removeIngredient(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <CardContent className="pt-6">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <FormField
                              control={form.control as FormControl}
                              name={`ingredients.${index}.name`}
                              render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                  <FormLabel>Ingredient Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Salmon fillet"
                                      {...field}
                                      data-ingredient-id={
                                        initialData?.ingredients[index]
                                          ?.ingredient_id
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control as FormControl}
                              name={`ingredients.${index}.quantity`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Quantity</FormLabel>
                                  <FormControl>
                                    <Input placeholder="200" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control as FormControl}
                              name={`ingredients.${index}.unit`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Unit</FormLabel>
                                  <FormControl>
                                    <Input placeholder="g" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control as FormControl}
                              name={`ingredients.${index}.is_shipped`}
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm md:col-span-4">
                                  <div className="space-y-0.5">
                                    <FormLabel>Shipped with Order</FormLabel>
                                    <FormDescription>
                                      Is this ingredient included in the meal
                                      kit package?
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Tools Tab */}
              <TabsContent value="tools" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Required Tools</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => appendTool({ name: "" })}
                      className="flex items-center gap-1"
                    >
                      <Plus className="h-4 w-4" /> Add Tool
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {toolFields.map((field, index) => (
                      <div key={field.id} className="flex items-center gap-2">
                        <FormField
                          control={form.control as FormControl}
                          name={`cooking_tools.${index}.name`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input placeholder="Frying pan" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 text-gray-400 hover:text-red-500"
                          onClick={() => removeTool(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Steps Tab */}
              <TabsContent value="steps" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Preparation Steps</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        appendStep({ step_number: 0, instruction: "" })
                      }
                      className="flex items-center gap-1"
                    >
                      <Plus className="h-4 w-4" /> Add Step
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {stepFields.map((field, index) => (
                      <Card key={field.id} className="relative">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2 h-6 w-6 text-gray-400 hover:text-red-500"
                          onClick={() => handleRemoveStep(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            <Badge variant="outline" className="mb-2">
                              Step {index + 1}
                            </Badge>

                            <FormField
                              control={form.control as FormControl}
                              name={`cooking_steps.${index}.instruction`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Step Description</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Describe this step in detail..."
                                      className="resize-none min-h-[80px]"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="space-y-2">
                              <FormLabel>Step Image (Optional)</FormLabel>
                              <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-lg">
                                {stepImagePreviews[index] || field.image_url ? (
                                  <div className="relative w-full h-48">
                                    <img
                                      src={
                                        stepImagePreviews[index] ||
                                        field.image_url ||
                                        "/placeholder.svg"
                                      }
                                      alt={`Step ${index + 1}`}
                                      className="w-full h-full object-cover rounded-md"
                                    />
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      className="absolute bottom-2 right-2 bg-white"
                                      onClick={() => {
                                        setStepImagePreviews((prev) => {
                                          const newPreviews = { ...prev };
                                          delete newPreviews[index];
                                          return newPreviews;
                                        });
                                        // Clear the form value
                                        const steps =
                                          form.getValues("cooking_steps");
                                        steps[index].image_url = "";
                                        form.setValue("cooking_steps", steps);
                                      }}
                                    >
                                      Change Image
                                    </Button>
                                  </div>
                                ) : (
                                  <div className="flex flex-col items-center justify-center py-4">
                                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-500 mb-2">
                                      Upload an image for this step
                                    </p>
                                    <Input
                                      type="file"
                                      accept={allowedImageExtensions}
                                      className="w-full max-w-xs"
                                      onChange={(e) =>
                                        handleStepImageChange(e, index)
                                      }
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Nutrition Tab */}
              <TabsContent value="nutrition" className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Nutritional Information
                  </h3>
                  <p className="text-sm text-gray-500">
                    Enter the nutritional values per serving
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {form.getValues("nutritions").map((nutrition, index) => (
                      <FormField
                        key={index}
                        control={form.control as FormControl}
                        name={`nutritions.${index}.nutrition`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {field.value.charAt(0).toUpperCase() +
                                field.value.slice(1)}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                placeholder="0"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <Separator />

            <DialogFooter className="flex justify-between items-center">
              <div className="flex gap-2">
                {activeTab !== "basic" && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const tabs = [
                        "basic",
                        "ingredients",
                        "tools",
                        "steps",
                        "nutrition",
                      ];
                      const currentIndex = tabs.indexOf(activeTab);
                      if (currentIndex > 0) {
                        setActiveTab(tabs[currentIndex - 1]);
                      }
                    }}
                  >
                    Previous
                  </Button>
                )}
                {activeTab !== "nutrition" && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const tabs = [
                        "basic",
                        "ingredients",
                        "tools",
                        "steps",
                        "nutrition",
                      ];
                      const currentIndex = tabs.indexOf(activeTab);
                      if (currentIndex < tabs.length - 1) {
                        setActiveTab(tabs[currentIndex + 1]);
                      }
                    }}
                  >
                    Next
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {isEditing ? "Updating..." : "Adding..."}
                    </>
                  ) : isEditing ? (
                    "Update Meal"
                  ) : (
                    "Add Meal"
                  )}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
