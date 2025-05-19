import { OrderManagement } from "@/components/admin/OrderManagement";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

interface OrdersPageProps {
  searchParams: {
    page?: string;
    limit?: string;
  };
}

async function getOrders(page: number = 1, limit: number = 10) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("No active session");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URL}/api/orders/all?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch orders: ${response.statusText}`);
  }

  return response.json();
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;

  const ordersData = await getOrders(page, limit);

  console.log(ordersData);

  return (
    <OrderManagement
      initialOrders={ordersData.data}
      totalOrders={ordersData.pagination.total}
      currentPage={ordersData.pagination.currentPage}
      totalPages={ordersData.pagination.totalPages}
    />
  );
}
