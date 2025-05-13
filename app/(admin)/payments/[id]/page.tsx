import { PaymentDetails } from "@/components/admin/PaymentDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PaymentDetailsPageProps {
  params: {
    id: string;
  };
}

export default function PaymentDetailsPage({
  params,
}: PaymentDetailsPageProps) {
  const paymentId = params.id;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <Link href="/admin/payments">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            Payment Details
          </h1>
        </div>
        <p className="text-muted-foreground">
          View and manage payment transaction #{paymentId}
        </p>
      </div>

      <PaymentDetails paymentId={paymentId} />
    </div>
  );
}
