import { MealManagement } from "@/components/admin/MealManagement";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

async function getMeals() {
  const supabase = await createClient();

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
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch meals: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching meals:", error);
    throw error;
  }
}

export default async function MealsPage() {
  const meals = await getMeals();
  console.dir(meals, { depth: null });

  return <MealManagement meals={meals.data} />;
}
