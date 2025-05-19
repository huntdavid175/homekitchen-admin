import { OrderDetails } from "@/components/admin/OrderDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

interface OrderDetailsPageProps {
  params: {
    id: string;
  };
}

async function getOrderDetails(orderId: string) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("No active session");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URL}/api/orders/${orderId}`,
    {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch order details: ${response.statusText}`);
  }

  return response.json();
}

export default async function OrderDetailsPage({
  params,
}: OrderDetailsPageProps) {
  const orderId = params.id;

  const orderDetails = await getOrderDetails(orderId);
  console.dir(orderDetails, { depth: null });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <Link href="/orders">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-green-600">
            Order Details
          </h1>
        </div>
        <p className="text-muted-foreground">
          View and manage order #{orderId}
        </p>
      </div>

      <OrderDetails orderId={orderId} orderDetails={orderDetails} />
    </div>
  );
}
