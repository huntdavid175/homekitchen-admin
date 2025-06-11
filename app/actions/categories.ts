"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getCategories() {
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
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();

      throw new Error(error.message || "Failed to fetch categories");
    }
    // revalidatePath("/admin/categories");
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

export async function createCategory(category: any) {
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(category),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("API Error Response:", error);
      throw new Error(error.message || "Failed to create category");
    }

    const data = await response.json();
    // console.log("Category created successfully:", data);
    revalidatePath("/admin/categories");
    return data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error; // Re-throw the error to handle it in the component
  }
}

export async function updateCategory(category: any) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("No active session");
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URL}/api/categories/${category.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(category),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update category");
    }

    const data = await response.json();
    // console.log("Category updated successfully:", data);
    revalidatePath("/admin/categories");
    return data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error; // Re-throw the error to handle it in the component
  }
}

export async function deleteCategory(id: string) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("No active session");
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URL}/api/categories/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to delete category");
    }

    const data = await response.json();
    // console.log("Category deleted successfully:", data);
    revalidatePath("/admin/categories");
    return data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error; // Re-throw the error to handle it in the component
  }
}
