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
  status: "active" | "inactive";
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
  status: "active" | "inactive";
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

export async function createRecipe(formData: FormData) {
  const supabase = await createClient();
  const cookieStore = cookies();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("No active session");
  }

  try {
    // Log the FormData contents
    console.log("Server received FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URL}/api/recipes`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("Server error response:", error);
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

export async function updateRecipe(recipeId: string, formData: FormData) {
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
          Authorization: `Bearer ${session.access_token}`,
        },
        body: formData,
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
