"use client";

import type React from "react";

import { useState } from "react";
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

const ingredientSchema = z.object({
  name: z.string().min(1, "Ingredient name is required"),
  quantity: z.string().min(1, "Quantity is required"),
  unit: z.string().optional(),
  isShipped: z.boolean().default(true),
});

const toolSchema = z.object({
  name: z.string().min(1, "Tool name is required"),
});

const stepSchema = z.object({
  description: z.string().min(1, "Step description is required"),
  imageUrl: z.string().optional(),
});

const nutritionSchema = z.object({
  calories: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Calories must be a non-negative number.",
    }),
  protein: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Protein must be a non-negative number.",
  }),
  carbs: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Carbs must be a non-negative number.",
  }),
  fat: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Fat must be a non-negative number.",
  }),
  fiber: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Fiber must be a non-negative number.",
  }),
  sugar: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Sugar must be a non-negative number.",
  }),
  sodium: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Sodium must be a non-negative number.",
  }),
});

const mealFormSchema = z.object({
  name: z.string().min(2, {
    message: "Meal name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number.",
  }),
  prepTime: z.string().min(1, {
    message: "Preparation time is required.",
  }),
  isActive: z.boolean().default(true),
  ingredients: z
    .array(ingredientSchema)
    .min(1, "At least one ingredient is required"),
  tools: z.array(toolSchema),
  steps: z.array(stepSchema).min(1, "At least one step is required"),
  nutrition: nutritionSchema,
});

type MealFormValues = z.infer<typeof mealFormSchema>;

type FormControl = Control<MealFormValues>;

interface MealFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: {
    id?: string;
    name: string;
    description?: string;
    category: string;
    price: string;
    prepTime: string;
    status: string;
    image?: string;
    ingredients?: {
      name: string;
      quantity: string;
      unit?: string;
      isShipped: boolean;
    }[];
    tools?: {
      name: string;
    }[];
    steps?: {
      description: string;
      imageUrl?: string;
    }[];
    nutrition?: {
      calories: string;
      protein: string;
      carbs: string;
      fat: string;
      fiber: string;
      sugar: string;
      sodium: string;
    };
  } | null;
  onSubmit: (values: MealFormValues) => void;
}

export function MealForm({
  open,
  onOpenChange,
  initialData,
  onSubmit,
}: MealFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.image || null
  );
  const [activeTab, setActiveTab] = useState("basic");
  const [stepImagePreviews, setStepImagePreviews] = useState<
    Record<number, string>
  >({});

  const isEditing = !!initialData;

  const defaultValues: Partial<MealFormValues> = {
    name: initialData?.name || "",
    description: initialData?.description || "",
    category: initialData?.category || "",
    price: initialData?.price?.replace("$", "") || "",
    prepTime: initialData?.prepTime || "",
    isActive: initialData?.status === "Active",
    ingredients: initialData?.ingredients || [
      { name: "", quantity: "", unit: "", isShipped: true },
    ],
    tools: initialData?.tools || [{ name: "" }],
    steps: initialData?.steps || [{ description: "", imageUrl: "" }],
    nutrition: initialData?.nutrition || {
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
      fiber: "",
      sugar: "",
      sodium: "",
    },
  };

  const form = useForm<MealFormValues>({
    resolver: zodResolver(mealFormSchema) as Resolver<MealFormValues>,
    defaultValues,
  });

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
    name: "tools",
  });

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    control: form.control,
    name: "steps",
  });

  const handleSubmit = async (values: MealFormValues) => {
    setIsSubmitting(true);
    try {
      // In a real app, you would upload the image here if it changed
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      onSubmit(values);
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
      const reader = new FileReader();
      reader.onload = () => {
        setStepImagePreviews((prev) => ({
          ...prev,
          [index]: reader.result as string,
        }));
        // Update the form value
        const steps = form.getValues("steps");
        steps[index].imageUrl = reader.result as string;
        form.setValue("steps", steps);
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
            onSubmit={form.handleSubmit(
              handleSubmit as SubmitHandler<MealFormValues>
            )}
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
                            accept="image/*"
                            className="w-full max-w-xs"
                            onChange={handleImageChange}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <FormField
                    control={form.control as FormControl}
                    name="name"
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
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="High Protein">
                              High Protein
                            </SelectItem>
                            <SelectItem value="Vegetarian">
                              Vegetarian
                            </SelectItem>
                            <SelectItem value="Low Calorie">
                              Low Calorie
                            </SelectItem>
                            <SelectItem value="Family Friendly">
                              Family Friendly
                            </SelectItem>
                            <SelectItem value="Seafood">Seafood</SelectItem>
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
                    name="prepTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preparation Time</FormLabel>
                        <FormControl>
                          <Input placeholder="30 min" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control as FormControl}
                    name="isActive"
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
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
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
                          isShipped: true,
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
                              name={`ingredients.${index}.isShipped`}
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm md:col-span-4">
                                  <div className="space-y-0.5">
                                    <FormLabel>Shipped with Meal</FormLabel>
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
                          name={`tools.${index}.name`}
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
                        appendStep({ description: "", imageUrl: "" })
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
                          onClick={() => removeStep(index)}
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
                              name={`steps.${index}.description`}
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
                                {stepImagePreviews[index] || field.imageUrl ? (
                                  <div className="relative w-full h-48">
                                    <img
                                      src={
                                        stepImagePreviews[index] ||
                                        field.imageUrl ||
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
                                        const steps = form.getValues("steps");
                                        steps[index].imageUrl = "";
                                        form.setValue("steps", steps);
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
                                      accept="image/*"
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
                    <FormField
                      control={form.control as FormControl}
                      name="nutrition.calories"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Calories (kcal)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              placeholder="450"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control as FormControl}
                      name="nutrition.protein"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Protein (g)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              placeholder="30"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control as FormControl}
                      name="nutrition.carbs"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Carbohydrates (g)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              placeholder="25"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control as FormControl}
                      name="nutrition.fat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fat (g)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              placeholder="15"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control as FormControl}
                      name="nutrition.fiber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fiber (g)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              placeholder="3"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control as FormControl}
                      name="nutrition.sugar"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sugar (g)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              placeholder="5"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control as FormControl}
                      name="nutrition.sodium"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sodium (mg)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              placeholder="500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isEditing ? "Update Meal" : "Add Meal"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
