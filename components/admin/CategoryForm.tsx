"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { createCategory, updateCategory } from "@/app/actions/categories";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  recipe_count?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface CategoryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Category | null;
  onSubmit: (data: Omit<Category, "id" | "created_at" | "updated_at">) => void;
}

const predefinedColors = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
  "#DDA0DD",
  "#F39C12",
  "#E74C3C",
  "#9B59B6",
  "#3498DB",
  "#2ECC71",
  "#F1C40F",
  "#E67E22",
  "#1ABC9C",
  "#34495E",
];

export function CategoryForm({
  open,
  onOpenChange,
  category,
  onSubmit,
}: CategoryFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "#FF6B6B",
    recipe_count: 0,
    is_active: true,
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description,
        color: category.color,
        recipe_count: parseInt(category.recipe_count || "0"),
        is_active: category.is_active,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        color: "#FF6B6B",
        recipe_count: 0,
        is_active: true,
      });
    }
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const categoryData = {
        name: formData.name,
        description: formData.description,
        color: formData.color,
        is_active: formData.is_active,
      };

      let response;
      if (category) {
        // Update existing category
        response = await updateCategory({
          ...categoryData,
          id: category.id,
        });
        toast.success("Category updated successfully");
      } else {
        // Create new category
        response = await createCategory(categoryData);
        toast.success("Category created successfully");
        // Reset form data only for new categories
        setFormData({
          name: "",
          description: "",
          color: "#FF6B6B",
          recipe_count: 0,
          is_active: true,
        });
      }

      if (response) {
        onSubmit(categoryData);
      }
    } catch (error) {
      console.error("Error in form submission:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : `Failed to ${category ? "update" : "create"} category`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] rounded-xl">
        <DialogHeader>
          <DialogTitle>
            {category ? "Edit Category" : "Add New Category"}
          </DialogTitle>
          <DialogDescription>
            {category
              ? "Update the category information below."
              : "Create a new meal category to organize your menu items."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Breakfast, Lunch, Vegetarian"
                required
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Brief description of this category..."
                rows={3}
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label>Category Color</Label>
              <div className="flex items-center space-x-3">
                <div
                  className="w-8 h-8 rounded-full border-2 border-gray-200"
                  style={{ backgroundColor: formData.color }}
                />
                <div className="flex flex-wrap gap-2">
                  {predefinedColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`w-6 h-6 rounded-full border-2 transition-all hover:scale-110 ${
                        formData.color === color
                          ? "border-gray-400 scale-110"
                          : "border-gray-200"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setFormData({ ...formData, color })}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) =>
                  setFormData({ ...formData, is_active: e.target.checked })
                }
                className="rounded"
              />
              <Label htmlFor="isActive">Active Category</Label>
              <Badge
                variant={formData.is_active ? "default" : "secondary"}
                className="ml-2 rounded-full"
              >
                {formData.is_active ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {category ? "Update Category" : "Create Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
