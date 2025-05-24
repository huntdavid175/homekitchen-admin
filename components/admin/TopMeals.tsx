"use client";

import type React from "react";

import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { EmptyCardState } from "@/components/admin/EmptyStates";
import { ShoppingBag } from "lucide-react";

interface TopMealsProps {
  showEmptyState?: boolean;
  topMeals?: any;
}

export function TopMeals({ showEmptyState = false, topMeals }: TopMealsProps) {
  console.log(topMeals);
  //   const topMeals = [
  //     {
  //       name: "Garlic Butter Salmon",
  //       orders: 1245,
  //       percentage: 100,
  //       image:
  //         "https://www.howsweeteats.com/wp-content/uploads/2023/01/sticky-garlic-butter-salmon-9.jpg",
  //     },
  //     {
  //       name: "Chicken Fajita Bowl",
  //       orders: 1120,
  //       percentage: 90,
  //       image:
  //         "https://www.eatingwell.com/thmb/K_2r885RYGvLazrKiRLQh-AP9Yk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/5633964-2bdb06b6d92a480b88e25aacd8fb85e4.jpg",
  //     },
  //     {
  //       name: "Vegetable Stir Fry",
  //       orders: 980,
  //       percentage: 79,
  //       image:
  //         "https://cdn.loveandlemons.com/wp-content/uploads/2025/02/stir-fry.jpg",
  //     },
  //     {
  //       name: "Beef Tacos",
  //       orders: 865,
  //       percentage: 69,
  //       image:
  //         "https://loveandgoodstuff.com/wp-content/uploads/2020/08/classic-ground-beef-tacos-1200x1200.jpg",
  //     },
  //     {
  //       name: "Mushroom Risotto",
  //       orders: 740,
  //       percentage: 59,
  //       image:
  //         "https://veganhuggs.com/wp-content/uploads/2018/04/instant-pot-mushroom-risotto-in-bowl-1-500x500.jpeg",
  //     },
  //   ];

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
      {topMeals.map((meal: any, index: number) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-md">
              <Image
                src={
                  meal.image ||
                  "https://images.immediate.co.uk/production/volatile/sites/30/2024/01/Cheese-omelette-45155e3.jpg?resize=1366,1503"
                }
                alt={meal.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium truncate">
                {meal.name} with {meal.subname}
              </h4>
              <p className="text-sm text-muted-foreground">
                {meal.order_count} orders
              </p>
            </div>
          </div>
          <Progress
            value={meal.percentage}
            className="h-2"
            color="bg-red-500"
            // style={
            //   {
            //     "--progress-background":
            //       "linear-gradient(to right, #8b5cf6, #6366f1)",
            //   } as React.CSSProperties
            // }
          />
        </div>
      ))}
    </div>
  );
}
