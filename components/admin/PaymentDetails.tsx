"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  ArrowDownToLine,
  Calendar,
  Check,
  CreditCard,
  Download,
  ExternalLink,
  FileText,
  Mail,
  Phone,
  Printer,
  RefreshCw,
  User,
} from "lucide-react";
import Link from "next/link";

interface PaymentDetailsProps {
  paymentId: string;
}

export function PaymentDetails({ paymentId }: PaymentDetailsProps) {
  const [showRefundDialog, setShowRefundDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // This would normally come from an API call using the paymentId
  const payment = {
    id: paymentId,
    date: "April 11, 2023",
    time: "2:30 PM",
    amount: "$59.91",
    status: "Completed",
    method: "Credit Card",
    cardType: "Visa",
    last4: "4242",
    expiryDate: "04/25",
    billingAddress: {
      name: "Alex Johnson",
      address: "123 Main St, Apt 4B",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    customer: {
      id: "USR-1001",
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      phone: "(555) 123-4567",
      since: "January 15, 2023",
      orders: 12,
      totalSpent: "$729.45",
    },
    order: {
      id: "ORD-7291",
      items: 4,
      subtotal: "$54.96",
      tax: "$4.95",
      delivery: "$0.00",
      total: "$59.91",
    },
    transaction: {
      id: "TXN-123456789",
      processor: "Stripe",
      authCode: "AUTH123456",
      reference: "REF987654321",
      fee: "$1.80",
    },
    timeline: [
      {
        status: "Payment Initiated",
        time: "2:29:45 PM",
        date: "April 11, 2023",
      },
      {
        status: "Authorization Requested",
        time: "2:29:50 PM",
        date: "April 11, 2023",
      },
      {
        status: "Authorization Approved",
        time: "2:29:55 PM",
        date: "April 11, 2023",
      },
      {
        status: "Payment Completed",
        time: "2:30:00 PM",
        date: "April 11, 2023",
      },
    ],
  };

  const handleRefund = async () => {
    setIsSubmitting(true);
    try {
      // In a real app, you would make an API call here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setShowRefundDialog(false);
      // Would update payment status to "Refunded" here
    } catch (error) {
      console.error("Error processing refund:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendReceipt = async () => {
    setIsSubmitting(true);
    try {
      // In a real app, you would make an API call here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      // Show success message or toast notification
    } catch (error) {
      console.error("Error sending receipt:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3 space-y-6">
          <Card className="rounded-xl border-none shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 flex flex-row justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  Transaction #{payment.id}
                  <Badge
                    variant="outline"
                    className={`ml-2 rounded-full px-3 py-1 text-xs font-medium ${
                      payment.status === "Completed"
                        ? "bg-green-50 text-green-700"
                        : payment.status === "Pending"
                        ? "bg-amber-50 text-amber-700"
                        : payment.status === "Refunded"
                        ? "bg-purple-50 text-purple-700"
                        : payment.status === "Failed"
                        ? "bg-red-50 text-red-700"
                        : ""
                    }`}
                  >
                    {payment.status}
                  </Badge>
                </CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <Calendar className="h-3 w-3" />
                  {payment.date} at {payment.time}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl relative overflow-hidden transition-all hover:-translate-y-1"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl relative overflow-hidden transition-all hover:-translate-y-1"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="details">
                <TabsList className="p-4 justify-start gap-2 bg-transparent">
                  <TabsTrigger
                    value="details"
                    className="rounded-xl data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 relative transition-all"
                  >
                    Payment Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="timeline"
                    className="rounded-xl data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 relative transition-all"
                  >
                    Timeline
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                          Transaction Information
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                Transaction ID
                              </span>
                              <span className="font-medium">
                                {payment.transaction.id}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                Payment Processor
                              </span>
                              <span>{payment.transaction.processor}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                Authorization Code
                              </span>
                              <span>{payment.transaction.authCode}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                Reference
                              </span>
                              <span>{payment.transaction.reference}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                Processing Fee
                              </span>
                              <span>{payment.transaction.fee}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                          Payment Method
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="h-10 w-10 rounded-md bg-white flex items-center justify-center">
                              <CreditCard className="h-6 w-6 text-indigo-500" />
                            </div>
                            <div>
                              <div className="font-medium">
                                {payment.method}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {payment.cardType} •••• {payment.last4}
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Card Type
                              </span>
                              <span>{payment.cardType}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Last 4 Digits
                              </span>
                              <span>{payment.last4}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Expiry Date
                              </span>
                              <span>{payment.expiryDate}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                          Billing Address
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="space-y-2 text-sm">
                            <div>{payment.billingAddress.name}</div>
                            <div>{payment.billingAddress.address}</div>
                            <div>
                              {payment.billingAddress.city},{" "}
                              {payment.billingAddress.state}{" "}
                              {payment.billingAddress.zip}
                            </div>
                            <div>{payment.billingAddress.country}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                          Customer Information
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center gap-3 mb-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src="/placeholder.svg?height=40&width=40"
                                alt={payment.customer.name}
                              />
                              <AvatarFallback>
                                {payment.customer.name
                                  .substring(0, 2)
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">
                                {payment.customer.name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {payment.customer.email}
                              </div>
                            </div>
                          </div>
                          <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-gray-400" />
                              Customer ID: {payment.customer.id}
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              {payment.customer.phone}
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              Customer since {payment.customer.since}
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Total Orders
                              </span>
                              <span>{payment.customer.orders}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Total Spent
                              </span>
                              <span className="font-medium">
                                {payment.customer.totalSpent}
                              </span>
                            </div>
                          </div>
                          <div className="mt-3">
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-xl w-full relative overflow-hidden transition-all hover:-translate-y-1"
                              asChild
                            >
                              <Link href={`/users/${payment.customer.id}`}>
                                <User className="h-3 w-3 mr-2" />
                                View Customer Profile
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                          Order Information
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Order ID
                              </span>
                              <Link
                                href={`/orders/${payment.order.id}`}
                                className="text-indigo-600 hover:underline"
                              >
                                {payment.order.id}
                              </Link>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Items
                              </span>
                              <span>{payment.order.items} items</span>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Subtotal
                              </span>
                              <span>{payment.order.subtotal}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Tax</span>
                              <span>{payment.order.tax}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Delivery
                              </span>
                              <span>{payment.order.delivery}</span>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between font-medium">
                              <span>Total</span>
                              <span>{payment.order.total}</span>
                            </div>
                          </div>
                          <div className="mt-3">
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-xl w-full relative overflow-hidden transition-all hover:-translate-y-1"
                              asChild
                            >
                              <Link href={`/orders/${payment.order.id}`}>
                                <FileText className="h-3 w-3 mr-2" />
                                View Order Details
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="timeline" className="p-6">
                  <div className="space-y-6">
                    <div className="relative">
                      {payment.timeline.map((event, index) => (
                        <div
                          key={index}
                          className="flex items-start mb-6 last:mb-0"
                        >
                          <div className="flex flex-col items-center mr-4">
                            <div className="h-8 w-8 rounded-full flex items-center justify-center bg-indigo-100 text-indigo-600">
                              {index === payment.timeline.length - 1 ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <div className="h-2 w-2 rounded-full bg-indigo-600"></div>
                              )}
                            </div>
                            {index < payment.timeline.length - 1 && (
                              <div
                                className="h-full w-0.5 bg-indigo-100"
                                style={{ height: "30px" }}
                              ></div>
                            )}
                          </div>
                          <div className="bg-gray-50 rounded-lg p-4 flex-1">
                            <div className="font-medium">{event.status}</div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {event.date} at {event.time}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-1/3 space-y-6">
          <Card className="rounded-xl border-none shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
              <CardTitle>Payment Actions</CardTitle>
              <CardDescription>Manage this payment transaction</CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {payment.status === "Completed" && (
                <Button
                  variant="destructive"
                  className="w-full rounded-xl relative overflow-hidden transition-all hover:-translate-y-1"
                  onClick={() => setShowRefundDialog(true)}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Process Refund
                </Button>
              )}
              <Button
                variant="outline"
                className="w-full rounded-xl relative overflow-hidden transition-all hover:-translate-y-1"
                onClick={handleSendReceipt}
                disabled={isSubmitting}
              >
                <Mail className="h-4 w-4 mr-2" />
                {isSubmitting ? "Sending..." : "Email Receipt"}
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-xl relative overflow-hidden transition-all hover:-translate-y-1"
              >
                <ArrowDownToLine className="h-4 w-4 mr-2" />
                Download Receipt
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-xl relative overflow-hidden transition-all hover:-translate-y-1"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View in Payment Processor
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-xl border-none shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
              <CardTitle>Payment Summary</CardTitle>
              <CardDescription>Transaction overview</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge
                    variant="outline"
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      payment.status === "Completed"
                        ? "bg-green-50 text-green-700"
                        : payment.status === "Pending"
                        ? "bg-amber-50 text-amber-700"
                        : payment.status === "Refunded"
                        ? "bg-purple-50 text-purple-700"
                        : payment.status === "Failed"
                        ? "bg-red-50 text-red-700"
                        : ""
                    }`}
                  >
                    {payment.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Amount</span>
                  <span className="text-xl font-bold">{payment.amount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Date</span>
                  <span>{payment.date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Time</span>
                  <span>{payment.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Method</span>
                  <span>
                    {payment.cardType} •••• {payment.last4}
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Order</span>
                  <Link
                    href={`/orders/${payment.order.id}`}
                    className="text-indigo-600 hover:underline"
                  >
                    {payment.order.id}
                  </Link>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Customer
                  </span>
                  <Link
                    href={`/users/${payment.customer.id}`}
                    className="text-indigo-600 hover:underline"
                  >
                    {payment.customer.id}
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Refund Dialog */}
      <AlertDialog open={showRefundDialog} onOpenChange={setShowRefundDialog}>
        <AlertDialogContent className="rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Process Refund</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to refund this payment? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Transaction ID</span>
                  <span className="font-medium">{payment.transaction.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-medium">{payment.amount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Customer</span>
                  <span>{payment.customer.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Order</span>
                  <span>{payment.order.id}</span>
                </div>
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-lg">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="rounded-lg bg-red-600 hover:bg-red-700"
              onClick={handleRefund}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Process Refund"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
