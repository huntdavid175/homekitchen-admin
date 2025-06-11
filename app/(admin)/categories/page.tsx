import { CategoryManagement } from "@/components/admin/CategoryManagement";
import { getCategories } from "@/app/actions/categories";

export default async function CategoriesPage() {
  const categories = await getCategories();

  console.log(categories);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
        <p className="text-muted-foreground">
          Manage meal categories and organize your menu items.
        </p>
      </div>
      <CategoryManagement
        categories={categories.data}
        totalCategories={categories.total_categories}
        totalMeals={categories.total_meals}
        activeCategories={categories.active_categories}
      />
    </div>
  );
}
