import { OrderManagement } from "@/components/admin/OrderManagement";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

interface OrdersPageProps {
  searchParams:
    | {
        page?: string;
        limit?: string;
        status?: string;
        deliveryDate?: string;
      }
    | Promise<{
        page?: string;
        limit?: string;
        status?: string;
        deliveryDate?: string;
      }>;
}

async function getOrders(
  page: number = 1,
  limit: number = 10,
  status?: string,
  deliveryDate?: string
) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("No active session");
  }

  let url = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URL}/api/orders/all?page=${page}&limit=${limit}`;
  if (status && status !== "all") {
    url += `&status=${status}`;
  }
  if (deliveryDate) {
    url += `&deliveryDate=${deliveryDate}`;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch orders: ${response.statusText}`);
  }

  return response.json();
}

export default async function OrdersPage(props: OrdersPageProps) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const status = searchParams.status;
  const deliveryDate = searchParams.deliveryDate;

  const ordersData = await getOrders(page, limit, status, deliveryDate);

  return (
    <OrderManagement
      initialOrders={ordersData.data}
      totalOrders={ordersData.pagination.total}
      currentPage={ordersData.pagination.currentPage}
      totalPages={ordersData.pagination.totalPages}
    />
  );
}
