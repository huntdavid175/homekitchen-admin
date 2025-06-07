"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MoreHorizontal,
  Plus,
  Search,
  Tag,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { CategoryForm } from "./CategoryForm";
import { CategoryDetailsDialog } from "./CategoryDetailsDialog";
import { DeleteCategoryDialog } from "./DeleteCategoryDialog";
import { EmptyTableState } from "./EmptyStates";

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  mealCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const initialCategories: Category[] = [
  {
    id: "1",
    name: "Breakfast",
    description: "Morning meals to start your day right",
    color: "#FF6B6B",
    mealCount: 12,
    isActive: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
  },
  {
    id: "2",
    name: "Lunch",
    description: "Nutritious midday meals",
    color: "#4ECDC4",
    mealCount: 18,
    isActive: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-18",
  },
  {
    id: "3",
    name: "Dinner",
    description: "Satisfying evening meals",
    color: "#45B7D1",
    mealCount: 24,
    isActive: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-22",
  },
  {
    id: "4",
    name: "Vegetarian",
    description: "Plant-based meal options",
    color: "#96CEB4",
    mealCount: 15,
    isActive: true,
    createdAt: "2024-01-16",
    updatedAt: "2024-01-21",
  },
  {
    id: "5",
    name: "Keto",
    description: "Low-carb, high-fat meals",
    color: "#FFEAA7",
    mealCount: 8,
    isActive: true,
    createdAt: "2024-01-17",
    updatedAt: "2024-01-19",
  },
  {
    id: "6",
    name: "Gluten-Free",
    description: "Meals without gluten ingredients",
    color: "#DDA0DD",
    mealCount: 6,
    isActive: false,
    createdAt: "2024-01-18",
    updatedAt: "2024-01-20",
  },
];

export function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = (
    categoryData: Omit<Category, "id" | "createdAt" | "updatedAt">
  ) => {
    const newCategory: Category = {
      ...categoryData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };
    setCategories([...categories, newCategory]);
    setIsFormOpen(false);
  };

  const handleEditCategory = (
    categoryData: Omit<Category, "id" | "createdAt" | "updatedAt">
  ) => {
    if (!selectedCategory) return;

    const updatedCategory: Category = {
      ...selectedCategory,
      ...categoryData,
      updatedAt: new Date().toISOString().split("T")[0],
    };

    setCategories(
      categories.map((cat) =>
        cat.id === selectedCategory.id ? updatedCategory : cat
      )
    );
    setSelectedCategory(null);
    setIsFormOpen(false);
  };

  const handleDeleteCategory = (category: Category) => {
    setCategoryToDelete(category);
    setIsDeleteOpen(true);
  };

  const confirmDeleteCategory = () => {
    if (categoryToDelete) {
      setCategories(categories.filter((cat) => cat.id !== categoryToDelete.id));
      setCategoryToDelete(null);
      setIsDeleteOpen(false);
    }
  };

  const handleToggleStatus = (category: Category) => {
    const updatedCategory = {
      ...category,
      isActive: !category.isActive,
      updatedAt: new Date().toISOString().split("T")[0],
    };
    setCategories(
      categories.map((cat) => (cat.id === category.id ? updatedCategory : cat))
    );
  };

  const handleViewDetails = (category: Category) => {
    setSelectedCategory(category);
    setIsDetailsOpen(true);
  };

  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  const totalCategories = categories.length;
  const activeCategories = categories.filter((cat) => cat.isActive).length;
  const totalMeals = categories.reduce((sum, cat) => sum + cat.mealCount, 0);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-xl border-0 shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Categories
            </CardTitle>
            <Tag className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {totalCategories}
            </div>
            <p className="text-xs text-muted-foreground">
              {activeCategories} active categories
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-0 shadow-sm bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Categories
            </CardTitle>
            <Tag className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {activeCategories}
            </div>
            <p className="text-xs text-muted-foreground">
              {((activeCategories / totalCategories) * 100).toFixed(1)}% of
              total
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-0 shadow-sm bg-gradient-to-br from-purple-50 to-violet-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Meals</CardTitle>
            <Tag className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {totalMeals}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all categories
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-[300px] rounded-xl"
            />
          </div>
        </div>
        <Button
          onClick={() => {
            setSelectedCategory(null);
            setIsFormOpen(true);
          }}
          className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      {/* Categories Table */}
      <Card className="rounded-xl border-0 shadow-sm">
        <CardContent className="p-0">
          {filteredCategories.length === 0 ? (
            <EmptyTableState
              icon={<Tag className="h-6 w-6 text-muted-foreground" />}
              title="No categories found"
              description={
                searchTerm
                  ? "No categories match your search criteria."
                  : "Get started by creating your first meal category."
              }
              actionLabel={!searchTerm ? "Add Category" : undefined}
              onClick={
                !searchTerm
                  ? () => {
                      setSelectedCategory(null);
                      setIsFormOpen(true);
                    }
                  : undefined
              }
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-b">
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Meals</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((category) => (
                  <TableRow key={category.id} className="border-b">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <div>
                          <div className="font-medium">{category.name}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[300px] truncate text-muted-foreground">
                        {category.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="rounded-full">
                        {category.mealCount} meals
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={category.isActive ? "default" : "secondary"}
                        className="rounded-full"
                      >
                        {category.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(category.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 rounded-lg"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl">
                          <DropdownMenuItem
                            onClick={() => handleViewDetails(category)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEditClick(category)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Category
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleToggleStatus(category)}
                          >
                            <Tag className="mr-2 h-4 w-4" />
                            {category.isActive ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteCategory(category)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Category
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      <CategoryForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        category={selectedCategory}
        onSubmit={selectedCategory ? handleEditCategory : handleAddCategory}
      />

      <CategoryDetailsDialog
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        category={selectedCategory}
      />

      <DeleteCategoryDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        category={categoryToDelete}
        onConfirm={confirmDeleteCategory}
      />
    </div>
  );
}
