"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Edit,
  FileTerminal,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import { MealForm } from "@/components/admin/MealForm";
import { updateRecipe, createRecipe } from "@/app/actions/recipes";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function MealManagement({
  meals,
  pagination,
}: {
  meals: any[];
  pagination: PaginationProps;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddMealDialog, setShowAddMealDialog] = useState(false);
  const [showEditMealDialog, setShowEditMealDialog] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<any>(null);

  // Filter meals based on search term
  const filteredMeals = meals.filter(
    (meal) =>
      meal.recipe_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meal.category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meal.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/meals?${params.toString()}`);
  };

  // Add ripple effect to buttons
  const addRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className =
      "absolute rounded-full bg-white bg-opacity-30 pointer-events-none";
    ripple.style.animation = "ripple 0.6s linear";

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  const handleAddMeal = async (values: any) => {
    console.log("Adding meal:", values);
    try {
      // Transform the form data to match the API's expected format
      const createData = {
        name: values.recipe_name,
        subname: values.subname,
        description: values.description,
        difficulty: values.difficulty,
        cooking_time: parseInt(values.cooking_time),
        total_time: parseInt(values.total_time),
        image_url: values.image_url || null,
        category_id: values.category.id,
        ingredients: values.ingredients.map((ing: any) => ({
          ingredient_id: ing.id || "", // You might need to handle this differently
          quantity: parseFloat(ing.quantity),
          unit: ing.unit,
          is_shipped: ing.is_shipped,
        })),
        cooking_steps: values.cooking_steps.map((step: any) => ({
          step_number: step.step_number,
          instruction: step.instruction,
          image_url: step.image_url || null,
        })),
        tags:
          values.tags?.map((tag: any) => ({
            name: tag.name,
          })) || [],
        cooking_tools: values.cooking_tools.map((tool: any) => ({
          name: tool.name,
          description: tool.description,
        })),
        nutritions: values.nutritions.map((nutrition: any) => ({
          nutrition: nutrition.nutrition,
          value: nutrition.value,
        })),
      };

      // Validate category_id before sending
      if (!createData.category_id) {
        throw new Error("Category ID is required");
      }

      console.log("Sending create data:", createData);
      await createRecipe(createData);
      console.log("Create successful");

      // Show success message
      toast.success("Meal added successfully");

      // Close the dialog
      setShowAddMealDialog(false);

      // Reset to first page
      handlePageChange(1);
    } catch (error) {
      console.error("Error adding meal:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to add meal. Please try again."
      );
    }
  };

  const handleEditMeal = (meal: any) => {
    console.log("Editing meal:", meal);
    // First close the dialog if it's open
    setShowEditMealDialog(false);
    // Then set the new meal data
    setSelectedMeal({
      recipe_id: meal.recipe_id,
      recipe_name: meal.recipe_name,
      subname: meal.subname,
      description: meal.description,
      difficulty: meal.difficulty,
      cooking_time: meal.cooking_time,
      total_time: meal.total_time,
      price: meal.price,
      status: meal.status,
      image_url: meal.image_url,
      category: meal.category,
      ingredients: meal.ingredients,
      cooking_tools: meal.cooking_tools,
      cooking_steps: meal.cooking_steps,
      nutritions: meal.nutritions,
      tags: meal.tags,
    });
    // Use setTimeout to ensure the dialog is closed before opening with new data
    setTimeout(() => {
      setShowEditMealDialog(true);
    }, 100);
  };

  const handleUpdateMeal = async (values: any) => {
    console.log("handleUpdateMeal called with values:", values);
    console.log("Selected meal:", selectedMeal);

    if (!selectedMeal?.recipe_id) {
      console.error("No recipe_id found in selectedMeal");
      toast.error("Failed to update meal: Missing recipe ID");
      return;
    }

    try {
      // Transform the form data to match the API's expected format
      const updateData = {
        name: values.recipe_name,
        subname: values.subname,
        description: values.description,
        difficulty: values.difficulty,
        cooking_time: parseInt(values.cooking_time),
        total_time: parseInt(values.total_time),
        image_url: values.image_url || null,
        category_id: values.category?.id || selectedMeal.category.id,
        ingredients: values.ingredients.map((ing: any) => {
          // Find the matching ingredient from the original meal data
          const originalIngredient = selectedMeal.ingredients.find(
            (origIng: any) => origIng.name === ing.name
          );

          if (!originalIngredient?.id) {
            throw new Error(`Ingredient ID not found for: ${ing.name}`);
          }

          return {
            ingredient_id: originalIngredient.id,
            quantity: parseFloat(ing.quantity),
            unit: ing.unit,
            is_shipped: ing.is_shipped,
          };
        }),
        cooking_steps: values.cooking_steps.map((step: any) => ({
          step_number: step.step_number,
          instruction: step.instruction,
          image_url: step.image_url || null,
        })),
        tags:
          values.tags?.map((tag: any) => ({
            name: tag.name,
          })) || [],
        cooking_tools: values.cooking_tools.map((tool: any) => ({
          name: tool.name,
          description: tool.description,
        })),
        nutritions: values.nutritions.map((nutrition: any) => ({
          nutrition: nutrition.nutrition,
          value: nutrition.value,
        })),
      };

      // Validate category_id before sending
      if (!updateData.category_id) {
        throw new Error("Category ID is required");
      }

      console.log("Sending update data:", updateData);
      await updateRecipe(selectedMeal.recipe_id, updateData);
      console.log("Update successful");

      // Show success message
      toast.success("Meal updated successfully");

      // Close the dialog
      setShowEditMealDialog(false);
    } catch (error) {
      console.error("Error updating meal:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update meal. Please try again."
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-green-600">
          Meal Management
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            Manage meal offerings, categories, and availability.
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 rounded-xl hover:bg-emerald-50"
              onClick={() => setShowAddMealDialog(true)}
            >
              <Plus className="h-4 w-4 text-emerald-600" />
              Add Meal
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 rounded-xl hover:bg-emerald-50"
            >
              <Download className="h-4 w-4 text-emerald-600" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <Card className="rounded-xl border-none shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Meals</CardTitle>
              <CardDescription>
                Manage meal offerings and availability
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search meals..."
                  className="pl-9 rounded-xl border-none bg-white shadow-sm"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    handlePageChange(1); // Reset to first page on search
                  }}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-xl bg-white shadow-sm relative overflow-hidden transition-all hover:-translate-y-1"
                    onClick={addRipple}
                  >
                    <Filter className="h-4 w-4 text-emerald-600" />
                    <span className="sr-only">Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-xl">
                  <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>All Meals</DropdownMenuItem>
                  <DropdownMenuItem>Active Meals</DropdownMenuItem>
                  <DropdownMenuItem>Inactive Meals</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>High Protein</DropdownMenuItem>
                  <DropdownMenuItem>Vegetarian</DropdownMenuItem>
                  <DropdownMenuItem>Family Friendly</DropdownMenuItem>
                  <DropdownMenuItem>Low Calorie</DropdownMenuItem>
                  <DropdownMenuItem>Seafood</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                size="sm"
                className="rounded-xl md:hidden bg-emerald-600 hover:bg-emerald-700 relative overflow-hidden transition-all hover:-translate-y-1"
                onClick={() => setShowAddMealDialog(true)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="all">
            <TabsList className="p-4 justify-start gap-2 bg-transparent">
              <TabsTrigger
                value="all"
                className="rounded-xl data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 relative transition-all"
              >
                All Meals
              </TabsTrigger>
              <TabsTrigger
                value="active"
                className="rounded-xl data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 relative transition-all"
              >
                Active
              </TabsTrigger>
              <TabsTrigger
                value="inactive"
                className="rounded-xl data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 relative transition-all"
              >
                Inactive
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="overflow-x-auto">
                <Table className="border-collapse border-spacing-0">
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                        Meal
                      </TableHead>
                      <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                        ID
                      </TableHead>
                      <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                        Category
                      </TableHead>
                      <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                        Price
                      </TableHead>
                      <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                        Calories
                      </TableHead>
                      <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                        Prep Time
                      </TableHead>
                      <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                        Status
                      </TableHead>
                      <TableHead className="py-3 px-4 text-sm font-medium text-gray-600"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMeals.length > 0 ? (
                      filteredMeals.map((meal, index) => (
                        <TableRow
                          key={meal.id}
                          className="transition-all duration-300 hover:bg-gray-50 hover:scale-[1.01] opacity-0 animate-[fadeIn_0.5s_cubic-bezier(0.22,1,0.36,1)_forwards]"
                          style={{
                            animationDelay: `${
                              0.1 + (index % pagination.itemsPerPage) * 0.1
                            }s`,
                          }}
                        >
                          <TableCell className="py-3 px-4 border-t border-gray-100">
                            <div className="flex items-center gap-3">
                              <div className="relative h-12 w-12 overflow-hidden rounded-md">
                                <Image
                                  src={
                                    meal.image_url ||
                                    "https://www.metro.ca/userfiles/image/recipes/riz-jollof-ghan%C3%A9en-poulet-salade-chou-11840.jpg"
                                  }
                                  alt={meal.recipe_name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="font-medium">
                                {meal.recipe_name}{" "}
                                {meal.subname ? `with ${meal.subname}` : ""}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="py-3 px-4 border-t border-gray-100 font-medium">
                            {/* {meal.recipe_id} */}
                            ML-0{index}
                          </TableCell>
                          <TableCell className="py-3 px-4 border-t border-gray-100">
                            <Badge
                              variant="outline"
                              className="rounded-full px-3 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-700"
                            >
                              {meal.category.name}
                            </Badge>
                          </TableCell>
                          <TableCell className="py-3 px-4 border-t border-gray-100">
                            {/* {meal.price} */}
                            10.13
                          </TableCell>
                          <TableCell className="py-3 px-4 border-t border-gray-100">
                            {/* {meal.calories} cal */}
                            200 cal
                          </TableCell>
                          <TableCell className="py-3 px-4 border-t border-gray-100">
                            {meal.total_time} minutes
                          </TableCell>
                          <TableCell className="py-3 px-4 border-t border-gray-100">
                            <Badge
                              variant="outline"
                              className={`rounded-full px-3 py-1 text-xs font-medium ${
                                meal.status === "Active"
                                  ? "bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                                  : "bg-gray-50 text-gray-700 hover:bg-gray-50 hover:text-gray-700"
                              }`}
                            >
                              {/* {meal.status} */}
                              Active
                            </Badge>
                          </TableCell>
                          <TableCell className="py-3 px-4 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full relative overflow-hidden transition-all hover:-translate-y-1"
                                onClick={(e) => {
                                  addRipple(e);
                                  handleEditMeal(meal);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-full relative overflow-hidden transition-all hover:-translate-y-1"
                                    onClick={addRipple}
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  align="end"
                                  className="rounded-xl"
                                >
                                  <DropdownMenuItem>
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleEditMeal(meal)}
                                  >
                                    Edit Meal
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    Duplicate Meal
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  {meal.status === "Active" ? (
                                    <DropdownMenuItem className="text-amber-600">
                                      Deactivate Meal
                                    </DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem className="text-green-600">
                                      Activate Meal
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem className="text-red-600">
                                    Delete Meal
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          className="py-6 text-center text-muted-foreground"
                        >
                          No meals found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {filteredMeals.length > 0 && (
                <div className="flex items-center justify-between px-4 py-4 border-t border-gray-100">
                  <div className="text-sm text-muted-foreground">
                    Showing{" "}
                    <span className="font-medium">
                      {(pagination.currentPage - 1) * pagination.itemsPerPage +
                        1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(
                        pagination.currentPage * pagination.itemsPerPage,
                        pagination.totalItems
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">{pagination.totalItems}</span>{" "}
                    meals
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl relative overflow-hidden transition-all hover:-translate-y-1"
                      onClick={(e) => {
                        addRipple(e);
                        handlePageChange(pagination.currentPage - 1);
                      }}
                      disabled={!pagination.hasPreviousPage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Previous page</span>
                    </Button>
                    <div className="hidden sm:flex items-center space-x-1">
                      {Array.from(
                        { length: pagination.totalPages },
                        (_, i) => i + 1
                      ).map((pageNumber) => (
                        <Button
                          key={`page-${pageNumber}`}
                          variant={
                            pagination.currentPage === pageNumber
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          className={`rounded-xl relative overflow-hidden transition-all hover:-translate-y-1 ${
                            pagination.currentPage === pageNumber
                              ? "bg-emerald-600 hover:bg-emerald-700"
                              : ""
                          }`}
                          onClick={(e) => {
                            addRipple(e);
                            handlePageChange(pageNumber);
                          }}
                        >
                          {pageNumber}
                        </Button>
                      ))}
                    </div>
                    <div className="sm:hidden">
                      <span className="text-sm font-medium">
                        Page {pagination.currentPage} of {pagination.totalPages}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl relative overflow-hidden transition-all hover:-translate-y-1"
                      onClick={(e) => {
                        addRipple(e);
                        handlePageChange(pagination.currentPage + 1);
                      }}
                      disabled={!pagination.hasNextPage}
                    >
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">Next page</span>
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="active" className="mt-0">
              <div className="p-6 text-center text-muted-foreground">
                Active meals view is under development.
              </div>
            </TabsContent>

            <TabsContent value="inactive" className="mt-0">
              <div className="p-6 text-center text-muted-foreground">
                Inactive meals view is under development.
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Add Meal Dialog */}
      <MealForm
        open={showAddMealDialog}
        onOpenChange={setShowAddMealDialog}
        initialData={null}
        onSubmit={handleAddMeal}
      />

      {/* Edit Meal Dialog */}
      {selectedMeal && (
        <MealForm
          open={showEditMealDialog}
          onOpenChange={setShowEditMealDialog}
          initialData={selectedMeal}
          onSubmit={handleUpdateMeal}
        />
      )}
    </div>
  );
}
