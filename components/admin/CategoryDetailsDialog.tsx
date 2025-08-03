"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Tag, Utensils } from "lucide-react";

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

interface CategoryDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category | null;
}

export function CategoryDetailsDialog({
  open,
  onOpenChange,
  category,
}: CategoryDetailsDialogProps) {
  if (!category) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] rounded-xl">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <div>
              <DialogTitle className="text-xl">{category.name}</DialogTitle>
              <DialogDescription>
                Category details and information
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card className="rounded-xl border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Tag className="mr-2 h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Name
                </label>
                <p className="text-base">{category.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Description
                </label>
                <p className="text-base">
                  {category.description || "No description provided"}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Status
                  </label>
                  <div className="mt-1">
                    <Badge
                      variant={category.is_active ? "default" : "secondary"}
                      className="rounded-full"
                    >
                      {category.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Color
                  </label>
                  <div className="mt-1 flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm font-mono">{category.color}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card className="rounded-xl border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Utensils className="mr-2 h-5 w-5" />
                Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">Total Meals</span>
                  <Badge variant="secondary" className="rounded-full">
                    {category.recipe_count} meals
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="rounded-xl border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Created
                </span>
                <span className="text-sm">
                  {new Date(category.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Last Updated
                </span>
                <span className="text-sm">
                  {new Date(category.updated_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
