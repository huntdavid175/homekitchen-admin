import { UserOrdersList } from "@/components/admin/UserOrdersList";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

interface UserOrdersPageProps {
  params: {
    id: string;
  };
  searchParams: {
    page?: string;
    limit?: string;
  };
}

async function getUserOrders(
  userId: string,
  page: number = 1,
  limit: number = 10
) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("No active session");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URL}/api/users/${userId}/orders?page=${page}&limit=${limit}`,
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

export default async function UserOrdersPage({
  params,
  searchParams,
}: UserOrdersPageProps) {
  const userId = params.id;
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;

  const ordersData = await getUserOrders(userId, page, limit);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <Link href="/admin/users">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-green-600">
            Customer Orders
          </h1>
        </div>
        <p className="text-muted-foreground">
          View and manage all orders for this customer.
        </p>
      </div>

      <UserOrdersList
        userId={userId}
        initialOrders={ordersData.data}
        totalOrders={ordersData.pagination.total}
        currentPage={ordersData.pagination.currentPage}
        totalPages={ordersData.pagination.totalPages}
      />
    </div>
  );
}
