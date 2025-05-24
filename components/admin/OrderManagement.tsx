"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { updateOrderStatus } from "@/app/actions/updateOrderStatus";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Filter,
  MoreHorizontal,
  Search,
} from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/helpers";

interface OrderManagementProps {
  initialOrders: any[];
  totalOrders: number;
  currentPage: number;
  totalPages: number;
}

export function OrderManagement({
  initialOrders,
  totalOrders,
  currentPage: initialPage,
  totalPages,
}: OrderManagementProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter orders based on search term
  const filteredOrders = initialOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Change page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    router.push(`?${params.toString()}`);
  };

  const nextPage = () => {
    const nextPageNumber = Math.min(currentPage + 1, totalPages);
    paginate(nextPageNumber);
  };

  const prevPage = () => {
    const prevPageNumber = Math.max(currentPage - 1, 1);
    paginate(prevPageNumber);
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

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      toast.success("Order status updated successfully");
      // Refresh the page to show updated data
      router.refresh();
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };

  return (
    <Card className="rounded-xl border-none shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Orders</CardTitle>
            <CardDescription>View and manage all orders</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                className="pl-9 rounded-xl border-none bg-white shadow-sm"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-xl bg-white shadow-sm relative overflow-hidden transition-all hover:-translate-y-1"
                  onClick={addRipple}
                >
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-xl">
                <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>All Orders</DropdownMenuItem>
                <DropdownMenuItem>Pending Orders</DropdownMenuItem>
                <DropdownMenuItem>Confirmed Orders</DropdownMenuItem>
                <DropdownMenuItem>Preparing Orders</DropdownMenuItem>
                <DropdownMenuItem>Ready Orders</DropdownMenuItem>
                <DropdownMenuItem>Delivered Orders</DropdownMenuItem>
                <DropdownMenuItem>Cancelled Orders</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl bg-white shadow-sm"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="all">
          <TabsList className="p-4 justify-start gap-2 bg-transparent">
            <TabsTrigger
              value="all"
              className="rounded-xl data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 relative transition-all"
            >
              All Orders
            </TabsTrigger>
            <TabsTrigger
              value="active"
              className="rounded-xl data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 relative transition-all"
            >
              Active
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="rounded-xl data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 relative transition-all"
            >
              Completed
            </TabsTrigger>
            <TabsTrigger
              value="cancelled"
              className="rounded-xl data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 relative transition-all"
            >
              Cancelled
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="overflow-x-auto">
              <Table className="border-collapse border-spacing-0">
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                      Order ID
                    </TableHead>
                    <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                      Customer
                    </TableHead>
                    <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                      Date
                    </TableHead>
                    <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                      Status
                    </TableHead>
                    <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                      Items
                    </TableHead>
                    <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                      Payment
                    </TableHead>
                    <TableHead className="py-3 px-4 text-sm font-medium text-gray-600 text-right">
                      Total
                    </TableHead>
                    <TableHead className="py-3 px-4 text-sm font-medium text-gray-600"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {initialOrders.length > 0 ? (
                    initialOrders.map((order, index) => (
                      <TableRow
                        key={order.id}
                        className="transition-all duration-300 hover:bg-gray-50 hover:scale-[1.01] opacity-0 animate-[fadeIn_0.5s_cubic-bezier(0.22,1,0.36,1)_forwards]"
                        style={{
                          animationDelay: `${
                            0.1 + (index % itemsPerPage) * 0.1
                          }s`,
                        }}
                      >
                        <TableCell className="py-3 px-4 border-t border-gray-100 font-medium">
                          {/* {order.id} */}
                          ORD-0{index}
                        </TableCell>
                        <TableCell className="py-3 px-4 border-t border-gray-100 font-medium">
                          {order.user.name}
                        </TableCell>
                        <TableCell className="py-3 px-4 border-t border-gray-100 flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {formatDate(order.created_at)}
                        </TableCell>
                        <TableCell className="py-3 px-4 border-t border-gray-100">
                          <Badge
                            variant="outline"
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              order.status === "delivered"
                                ? "bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700 animate-[pulse_2s_infinite]"
                                : order.status === "preparing"
                                ? "bg-purple-50 text-purple-700 hover:bg-purple-50 hover:text-purple-700 animate-[pulse_2s_infinite]"
                                : order.status === "pending"
                                ? "bg-amber-50 text-amber-700 hover:bg-amber-50 hover:text-amber-700 animate-[pulse_2s_infinite]"
                                : order.status === "confirmed"
                                ? "bg-blue-50 text-blue-700 hover:bg-blue-50 hover:text-blue-700 animate-[pulse_2s_infinite]"
                                : order.status === "Ready"
                                ? "bg-teal-50 text-teal-700 hover:bg-teal-50 hover:text-teal-700 animate-[pulse_2s_infinite]"
                                : order.status === "cancelled"
                                ? "bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700"
                                : ""
                            }`}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-3 px-4 border-t border-gray-100">
                          {order.items.length}{" "}
                          {`item${order.items.length > 1 ? "s" : ""}`}
                        </TableCell>
                        <TableCell className="py-3 px-4 border-t border-gray-100">
                          Mastercard •••• 8888
                        </TableCell>
                        <TableCell className="py-3 px-4 border-t border-gray-100 text-right font-medium">
                          ₵{order.total_price}
                        </TableCell>
                        <TableCell className="py-3 px-4 border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-full relative overflow-hidden transition-all hover:-translate-y-1"
                                  onClick={addRipple}
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="rounded-xl"
                              >
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/orders/${order.id}`}
                                    className="flex items-center gap-1"
                                  >
                                    View Details
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>Edit Order</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {order.status === "pending" && (
                                  <DropdownMenuItem
                                    className="text-blue-600"
                                    onClick={() =>
                                      handleStatusUpdate(order.id, "confirmed")
                                    }
                                  >
                                    Confirm Order
                                  </DropdownMenuItem>
                                )}
                                {(order.status === "pending" ||
                                  order.status === "confirmed") && (
                                  <DropdownMenuItem
                                    className="text-purple-600"
                                    onClick={() =>
                                      handleStatusUpdate(order.id, "preparing")
                                    }
                                  >
                                    Mark as Preparing
                                  </DropdownMenuItem>
                                )}
                                {order.status === "preparing" && (
                                  <DropdownMenuItem
                                    className="text-teal-600"
                                    onClick={() =>
                                      handleStatusUpdate(order.id, "ready")
                                    }
                                  >
                                    Mark as Ready
                                  </DropdownMenuItem>
                                )}
                                {order.status === "ready" && (
                                  <DropdownMenuItem
                                    className="text-green-600"
                                    onClick={() =>
                                      handleStatusUpdate(order.id, "delivered")
                                    }
                                  >
                                    Mark as Delivered
                                  </DropdownMenuItem>
                                )}
                                {order.status !== "delivered" &&
                                  order.status !== "cancelled" && (
                                    <>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem
                                        className="text-red-600"
                                        onClick={() =>
                                          handleStatusUpdate(
                                            order.id,
                                            "cancelled"
                                          )
                                        }
                                      >
                                        Cancel Order
                                      </DropdownMenuItem>
                                    </>
                                  )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="py-6 text-center text-muted-foreground"
                      >
                        No orders found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalOrders > 0 && (
              <div className="flex items-center justify-between px-4 py-4 border-t border-gray-100">
                <div className="text-sm text-muted-foreground">
                  Showing{" "}
                  <span className="font-medium">
                    {Math.min(
                      (currentPage - 1) * itemsPerPage + 1,
                      totalOrders
                    )}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, totalOrders)}
                  </span>{" "}
                  of <span className="font-medium">{totalOrders}</span> orders
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl relative overflow-hidden transition-all hover:-translate-y-1"
                    onClick={(e) => {
                      addRipple(e);
                      prevPage();
                    }}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous page</span>
                  </Button>
                  <div className="hidden sm:flex items-center space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNumber) => (
                        <Button
                          key={`page-${pageNumber}`}
                          variant={
                            currentPage === pageNumber ? "default" : "outline"
                          }
                          size="sm"
                          className={`rounded-xl relative overflow-hidden transition-all hover:-translate-y-1 ${
                            currentPage === pageNumber
                              ? "bg-emerald-600 hover:bg-emerald-700"
                              : ""
                          }`}
                          onClick={(e) => {
                            addRipple(e);
                            paginate(pageNumber);
                          }}
                        >
                          {pageNumber}
                        </Button>
                      )
                    )}
                  </div>
                  <div className="sm:hidden">
                    <span className="text-sm font-medium">
                      Page {currentPage} of {totalPages}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl relative overflow-hidden transition-all hover:-translate-y-1"
                    onClick={(e) => {
                      addRipple(e);
                      nextPage();
                    }}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next page</span>
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="active" className="mt-0">
            <div className="p-6 text-center text-muted-foreground">
              Active orders view is under development.
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-0">
            <div className="p-6 text-center text-muted-foreground">
              Completed orders view is under development.
            </div>
          </TabsContent>

          <TabsContent value="cancelled" className="mt-0">
            <div className="p-6 text-center text-muted-foreground">
              Cancelled orders view is under development.
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
