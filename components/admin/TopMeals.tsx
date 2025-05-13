"use client";

import type React from "react";

import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { EmptyCardState } from "@/components/admin/EmptyStates";
import { ShoppingBag } from "lucide-react";

interface TopMealsProps {
  showEmptyState?: boolean;
}

export function TopMeals({ showEmptyState = false }: TopMealsProps) {
  const topMeals = [
    {
      name: "Garlic Butter Salmon",
      orders: 1245,
      percentage: 100,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Chicken Fajita Bowl",
      orders: 1120,
      percentage: 90,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Vegetable Stir Fry",
      orders: 980,
      percentage: 79,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Beef Tacos",
      orders: 865,
      percentage: 69,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Mushroom Risotto",
      orders: 740,
      percentage: 59,
      image: "/placeholder.svg?height=40&width=40",
    },
  ];

  if (showEmptyState) {
    return (
      <EmptyCardState
        title="No meal data yet"
        description="Top selling meals will appear here once orders are placed."
        icon={<ShoppingBag className="h-6 w-6 text-gray-400" />}
        actionLabel="Add Meals"
      />
    );
  }

  return (
    <div className="space-y-6">
      {topMeals.map((meal, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-md">
              <Image
                src={meal.image || "/placeholder.svg"}
                alt={meal.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium truncate">{meal.name}</h4>
              <p className="text-sm text-muted-foreground">
                {meal.orders} orders
              </p>
            </div>
          </div>
          <Progress
            value={meal.percentage}
            className="h-2"
            style={
              {
                "--progress-background":
                  "linear-gradient(to right, #8b5cf6, #6366f1)",
              } as React.CSSProperties
            }
          />
        </div>
      ))}
    </div>
  );
}
