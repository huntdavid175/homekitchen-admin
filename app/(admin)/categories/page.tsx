import { CategoryManagement } from "@/components/admin/CategoryManagement";

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
        <p className="text-muted-foreground">
          Manage meal categories and organize your menu items.
        </p>
      </div>
      <CategoryManagement />
    </div>
  );
}
