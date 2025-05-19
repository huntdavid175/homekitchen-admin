"use client";

import type React from "react";

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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  Clock,
  Edit,
  MapPin,
  Phone,
  Printer,
  Send,
  Truck,
  User,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { formatDate } from "@/lib/helpers";

interface OrderDetailsProps {
  orderId: string;
  orderDetails: any;
}

export function OrderDetails({ orderId, orderDetails }: OrderDetailsProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [orderStatus, setOrderStatus] = useState("Confirmed");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // This would normally come from an API call using the orderId
  const order = {
    id: orderId,
    date: "April 11, 2023",
    time: "2:30 PM",
    status: orderStatus,
    customer: {
      id: "USR-1001",
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      phone: "(555) 123-4567",
      address: "123 Main St, Apt 4B, New York, NY 10001",
    },
    items: [
      {
        id: "MEAL-001",
        name: "Garlic Butter Salmon",
        price: "$14.99",
        quantity: 2,
        total: "$29.98",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "MEAL-003",
        name: "Chicken Fajita Bowl",
        price: "$13.99",
        quantity: 1,
        total: "$13.99",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "MEAL-008",
        name: "Mediterranean Salad",
        price: "$10.99",
        quantity: 1,
        total: "$10.99",
        image: "/placeholder.svg?height=60&width=60",
      },
    ],
    payment: {
      method: "Credit Card",
      cardType: "Visa",
      last4: "4242",
      subtotal: "$54.96",
      tax: "$4.95",
      delivery: "$0.00",
      total: "$59.91",
      transactionId: "PAY-7291",
    },
    delivery: {
      address: "123 Main St, Apt 4B, New York, NY 10001",
      instructions: "Please leave at the door. Code for building: 1234",
      estimatedTime: "30-45 minutes",
      driver: {
        name: "Michael Smith",
        phone: "(555) 987-6543",
        vehicle: "Honda Civic (White)",
        licensePlate: "ABC-1234",
      },
    },
    timeline: [
      { status: "Placed", time: "2:15 PM", date: "April 11, 2023" },
      { status: "Confirmed", time: "2:20 PM", date: "April 11, 2023" },
      { status: "Preparing", time: "", date: "" },
      { status: "Ready", time: "", date: "" },
      { status: "Out for Delivery", time: "", date: "" },
      { status: "Delivered", time: "", date: "" },
    ],
  };

  const handleStatusChange = async (newStatus: string) => {
    setIsSubmitting(true);
    try {
      // In a real app, you would make an API call here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setOrderStatus(newStatus);
      setShowEditDialog(false);
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelOrder = async () => {
    setIsSubmitting(true);
    try {
      // In a real app, you would make an API call here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setOrderStatus("Cancelled");
      setShowCancelDialog(false);
    } catch (error) {
      console.error("Error cancelling order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add a new method to handle sending notifications
  const handleSendNotification = async () => {
    setIsSubmitting(true);
    try {
      // In a real app, you would make an API call here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      // Show success message or toast notification
    } catch (error) {
      console.error("Error sending notification:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add ripple effect to buttons
  const addRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className =
      "absolute rounded-full bg-white bg-opacity-30 pointer-events-none";
    ripple.style.animation = "ripple 0.6s linear";

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3 space-y-6">
          <Card className="rounded-xl border-none shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 flex flex-row justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  Order #{orderDetails.id}
                  <Badge
                    variant="outline"
                    className={`ml-2 rounded-full px-3 py-1 text-xs font-medium ${
                      orderDetails.status === "delivered"
                        ? "bg-green-50 text-green-700"
                        : orderDetails.status === "preparing"
                        ? "bg-purple-50 text-purple-700"
                        : orderDetails.status === "pending"
                        ? "bg-amber-50 text-amber-700"
                        : orderDetails.status === "confirmed"
                        ? "bg-blue-50 text-blue-700"
                        : orderDetails.status === "ready"
                        ? "bg-teal-50 text-teal-700"
                        : orderDetails.status === "cancelled"
                        ? "bg-red-50 text-red-700"
                        : orderDetails.status === "Out for Delivery"
                        ? "bg-indigo-50 text-indigo-700"
                        : ""
                    }`}
                  >
                    {orderDetails.status}
                  </Badge>
                </CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(orderDetails.created_at)}
                  <Clock className="h-3 w-3 ml-2" />
                  {order.time}
                </CardDescription>
              </div>
              {/* <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl relative overflow-hidden transition-all hover:-translate-y-1"
                  onClick={addRipple}
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                <Button
                  size="sm"
                  className="rounded-xl bg-emerald-600 hover:bg-emerald-700 relative overflow-hidden transition-all hover:-translate-y-1"
                  onClick={(e) => {
                    addRipple(e);
                    setShowEditDialog(true);
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Order
                </Button>
              </div> */}
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="details">
                <TabsList className="p-4 justify-start gap-2 bg-transparent">
                  <TabsTrigger
                    value="details"
                    className="rounded-xl data-[state=active]:bg-green-50 data-[state=active]:text-green-700 relative transition-all"
                  >
                    Order Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="timeline"
                    className="rounded-xl data-[state=active]:bg-green-50 data-[state=active]:text-green-700 relative transition-all"
                  >
                    Timeline
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                alt={orderDetails.user.name}
                              />
                              <AvatarFallback>
                                {orderDetails.user.name
                                  .substring(0, 2)
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">
                                {orderDetails.user.name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {orderDetails.user.email}
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              {orderDetails.user.phone}
                            </div>
                            <div className="flex items-start gap-2">
                              <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                              <span>{orderDetails.user.address}</span>
                            </div>
                          </div>
                          <div className="mt-3">
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-xl w-full relative overflow-hidden transition-all hover:-translate-y-1"
                              asChild
                            >
                              <Link href={`/users/${orderDetails.user.id}`}>
                                <User className="h-3 w-3 mr-2" />
                                View Customer Profile
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                          Delivery Information
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2">
                              <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                              <span>
                                {orderDetails.delivery.delivery_address}
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4 text-gray-400 mt-0.5"
                              >
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                              </svg>
                              <span>
                                {orderDetails.delivery.delivery_instructions ||
                                  "N/A"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-400" />
                              Delivery date:{" "}
                              {orderDetails.delivery.delivery_date}
                            </div>
                          </div>
                          {/* <Separator className="my-3" />
                          <div className="space-y-2 text-sm">
                            <div className="font-medium">
                              Driver Information
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-gray-400" />
                              {order.delivery.driver.name}
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              {order.delivery.driver.phone}
                            </div>
                            <div className="flex items-center gap-2">
                              <Truck className="h-4 w-4 text-gray-400" />
                              {order.delivery.driver.vehicle} (
                              {order.delivery.driver.licensePlate})
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                          Order Items
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="space-y-3">
                            {orderDetails.items.map((item: any) => (
                              <div
                                key={item.id}
                                className="flex items-center justify-between py-2"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="h-10 w-10 rounded-md overflow-hidden bg-white">
                                    <img
                                      src={
                                        item.recipe.image_url ||
                                        "/placeholder.svg"
                                      }
                                      alt={item.recipe.name}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                  <div>
                                    <div className="font-medium text-sm">
                                      {item.recipe.name}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      {item.price} x {item.quantity}
                                    </div>
                                  </div>
                                </div>
                                <div className="font-medium">{item.total}</div>
                              </div>
                            ))}
                          </div>
                          <Separator className="my-3" />
                          <div className="space-y-2 pt-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                Subtotal
                              </span>
                              <span>₵{orderDetails.payment.amount}</span>
                            </div>
                            {/* <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Tax</span>
                              <span>{orderDetails.payment.tax || 0.0}</span>
                            </div> */}
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                Delivery
                              </span>
                              <span>₵{(0.0).toFixed(2)}</span>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between font-medium">
                              <span>Total</span>
                              <span>₵{orderDetails.payment.amount}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                          Payment Information
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Method
                              </span>
                              <span>{order.payment.method}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Card
                              </span>
                              <span>
                                {order.payment.cardType} ending in{" "}
                                {order.payment.last4}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Transaction ID
                              </span>
                              <Link
                                href={`/admin/payments/${order.payment.transactionId}`}
                                className="text-emerald-600 hover:underline"
                              >
                                {order.payment.transactionId}
                              </Link>
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-xl w-full relative overflow-hidden transition-all hover:-translate-y-1"
                              asChild
                            >
                              <Link
                                href={`/admin/payments/${order.payment.transactionId}`}
                              >
                                <Send className="h-3 w-3 mr-2" />
                                View Payment Details
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
                      {order.timeline.map((event, index) => (
                        <div
                          key={index}
                          className="flex items-start mb-6 last:mb-0"
                        >
                          <div className="flex flex-col items-center mr-4">
                            <div
                              className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                event.time
                                  ? "bg-emerald-100 text-emerald-600"
                                  : "bg-gray-100 text-gray-400 border border-dashed border-gray-300"
                              }`}
                            >
                              {index + 1}
                            </div>
                            {index < order.timeline.length - 1 && (
                              <div
                                className={`h-full w-0.5 ${
                                  event.time
                                    ? "bg-green-100"
                                    : "bg-gray-100 border-dashed"
                                }`}
                                style={{ height: "30px" }}
                              ></div>
                            )}
                          </div>
                          <div
                            className={`bg-gray-50 rounded-lg p-4 flex-1 ${
                              !event.time ? "opacity-50" : ""
                            }`}
                          >
                            <div className="font-medium">{event.status}</div>
                            {event.time ? (
                              <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                                <Calendar className="h-3 w-3" />
                                {event.date}
                                <Clock className="h-3 w-3 ml-2" />
                                {event.time}
                              </div>
                            ) : (
                              <div className="text-sm text-muted-foreground mt-1">
                                Pending
                              </div>
                            )}
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
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
              <CardTitle>Order Actions</CardTitle>
              <CardDescription>Manage this order</CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <Button
                className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 relative overflow-hidden transition-all hover:-translate-y-1"
                onClick={(e) => {
                  addRipple(e);
                  setShowEditDialog(true);
                }}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Order Status
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-xl relative overflow-hidden transition-all hover:-translate-y-1"
                onClick={handleSendNotification}
                disabled={isSubmitting}
              >
                <Send className="h-4 w-4 mr-2" />
                {isSubmitting ? "Sending..." : "Send Notification"}
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-xl relative overflow-hidden transition-all hover:-translate-y-1"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print Order
              </Button>
              {order.status !== "Delivered" && order.status !== "Cancelled" && (
                <Button
                  variant="destructive"
                  className="w-full rounded-xl relative overflow-hidden transition-all hover:-translate-y-1"
                  onClick={() => setShowCancelDialog(true)}
                >
                  Cancel Order
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-xl border-none shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
              <CardTitle>Customer Notes</CardTitle>
              <CardDescription>Add notes about this order</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <Textarea
                placeholder="Add notes about this order or customer..."
                className="resize-none min-h-[100px]"
              />
              <Button className="w-full mt-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 relative overflow-hidden transition-all hover:-translate-y-1">
                Save Notes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Order Status Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>
              Change the status of order #{order.id} to reflect its current
              state.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                Status
              </label>
              <Select
                defaultValue={order.status}
                onValueChange={setOrderStatus}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Confirmed">Confirmed</SelectItem>
                  <SelectItem value="Preparing">Preparing</SelectItem>
                  <SelectItem value="Ready">Ready</SelectItem>
                  <SelectItem value="Out for Delivery">
                    Out for Delivery
                  </SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="notes" className="text-sm font-medium">
                Notes
              </label>
              <Textarea
                id="notes"
                placeholder="Add any notes about this status change..."
                className="resize-none min-h-[80px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => handleStatusChange(orderStatus)}
              disabled={isSubmitting}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {isSubmitting ? "Updating..." : "Update Status"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Order Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent className="rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Order</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this order? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-lg">
              No, keep order
            </AlertDialogCancel>
            <AlertDialogAction
              className="rounded-lg bg-red-600 hover:bg-red-700"
              onClick={handleCancelOrder}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Cancelling..." : "Yes, cancel order"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
