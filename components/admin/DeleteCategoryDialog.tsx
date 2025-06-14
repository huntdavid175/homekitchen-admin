"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Loader2, AlertTriangle } from "lucide-react";
import { deleteCategory } from "@/app/actions/categories";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  recipe_count: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface DeleteCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category | null;
  onConfirm: () => void;
}

export function DeleteCategoryDialog({
  open,
  onOpenChange,
  category,
  onConfirm,
}: DeleteCategoryDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (!category) return;

    setIsLoading(true);
    try {
      await deleteCategory(category.id);
      toast.success("Category deleted successfully");
      onConfirm();
      onOpenChange(false);
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to delete category"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!category) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-xl">
        <AlertDialogHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="space-y-3">
            <p>
              Are you sure you want to delete the category{" "}
              <span className="font-semibold">"{category.name}"</span>?
            </p>

            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center space-x-2 mb-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span className="font-medium">{category.name}</span>
                <Badge variant="secondary" className="rounded-full">
                  {category.recipe_count} meals
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {category.description}
              </p>
            </div>

            {parseInt(category.recipe_count) > 0 && (
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-800">
                  <strong>Warning:</strong> This category contains{" "}
                  {category.recipe_count} meal(s). Deleting this category will
                  remove it from all associated meals.
                </p>
              </div>
            )}

            <p className="text-sm text-muted-foreground">
              This action cannot be undone.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isLoading}
            className="rounded-xl bg-red-600 hover:bg-red-700"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete Category
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
