"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

interface CreateRecipeData {
  name: string;
  subname?: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  cooking_time: number;
  total_time: number;
  image_url?: string;
  category_id: string;
  ingredients: {
    name: string;
    quantity: number;
    unit?: string;
    is_shipped: boolean;
  }[];
  cooking_steps: {
    step_number: number;
    instruction: string;
    image_url?: string;
  }[];
  tags: {
    name: string;
  }[];
  cooking_tools: {
    name: string;
    description?: string;
  }[];
  nutritions: {
    nutrition: string;
    value: string;
  }[];
}

interface UpdateRecipeData {
  name: string;
  subname?: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  cooking_time: number;
  total_time: number;
  image_url?: string;
  category_id: string;
  ingredients: {
    ingredient_id: string;
    quantity: number;
    unit?: string;
    is_shipped: boolean;
  }[];
  cooking_steps: {
    step_number: number;
    instruction: string;
    image_url?: string;
  }[];
  tags: {
    name: string;
  }[];
  cooking_tools: {
    name: string;
    description?: string;
  }[];
  nutritions: {
    nutrition: string;
    value: string;
  }[];
}

export async function createRecipe(data: CreateRecipeData) {
  const supabase = await createClient();
  const cookieStore = cookies();

  console.log(data);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("No active session");
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URL}/api/recipes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create recipe");
    }

    // Revalidate the meals page after successful creation
    revalidatePath("/meals");

    return await response.json();
  } catch (error) {
    console.error("Error creating recipe:", error);
    throw error;
  }
}

export async function updateRecipe(recipeId: string, data: UpdateRecipeData) {
  const supabase = await createClient();
  const cookieStore = cookies();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("No active session");
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URL}/api/recipes/${recipeId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update recipe");
    }

    // Revalidate the meals page after successful update
    revalidatePath("/meals");

    return await response.json();
  } catch (error) {
    console.error("Error updating recipe:", error);
    throw error;
  }
}
