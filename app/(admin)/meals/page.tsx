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

export default async function MealsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = searchParams.page || "1";
  const meals = await getMeals(page);
  //   console.dir(meals, { depth: null });
  console.log(meals);

  return (
    <MealManagement
      meals={meals.data}
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
