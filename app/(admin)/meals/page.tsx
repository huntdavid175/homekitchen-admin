import { MealManagement } from "@/components/admin/MealManagement";
import { createClient } from "@/utils/supabase/server";

async function getMeals(page: string) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("No active session");
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URL}/api/recipes?page=${page}&limit=10`,
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

async function getCategories() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("No active session");
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URL}/api/categories`,
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

export default async function MealsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = searchParams.page || "1";
  const [meals, categories] = await Promise.all([
    getMeals(page),
    getCategories(),
  ]);

  console.log(meals.data);

  const garlic_meal = meals.data.find(
    (meal: any) => meal.recipe_name === "Roasted plantain"
  );

  console.log(garlic_meal);

  return (
    <MealManagement
      meals={meals.data}
      categories={categories.data}
      pagination={{
        currentPage: meals.pagination.currentPage,
        totalPages: meals.pagination.totalPages,
        totalItems: meals.pagination.totalItems,
        itemsPerPage: meals.pagination.itemsPerPage,
        hasNextPage: meals.pagination.hasNextPage,
        hasPreviousPage: meals.pagination.hasPreviousPage,
      }}
    />
  );
}
