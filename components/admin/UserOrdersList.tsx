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
import { useRouter, useSearchParams } from "next/navigation";

interface UserOrdersListProps {
  userId: string;
  initialOrders: any[];
  totalOrders: number;
  currentPage: number;
  totalPages: number;
}

export function UserOrdersList({
  userId,
  initialOrders,
  totalOrders,
  currentPage: initialPage,
  totalPages,
}: UserOrdersListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // This would normally come from an API call using the userId
  const user = {
    id: userId,
    name: initialOrders[0]?.user?.name || "Customer",
  };

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

  return (
    <Card className="rounded-xl border-none shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Orders for {initialOrders[0].user.name}</CardTitle>
            <CardDescription>View and manage customer orders</CardDescription>
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
                        <TableCell className="py-3 px-4 border-t border-gray-100 flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {formatDate(order.created_at)}
                        </TableCell>
                        <TableCell className="py-3 px-4 border-t border-gray-100">
                          <Badge
                            variant="outline"
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              order.status === "delivered"
                                ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-700"
                                : order.status === "preparing"
                                ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-700"
                                : order.status === "pending"
                                ? "bg-amber-50 text-amber-700 hover:bg-amber-50 hover:text-amber-700"
                                : order.status === "confirmed"
                                ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-700"
                                : order.status === "ready"
                                ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-700"
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
                          {/* {order.payment} */}
                          Mastercard •••• 8888
                        </TableCell>
                        <TableCell className="py-3 px-4 border-t border-gray-100 text-right font-medium">
                          ₵{order.total_price}
                        </TableCell>
                        <TableCell className="py-3 px-4 border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            {/* <Button
                              variant="ghost"
                              size="sm"
                              className="rounded-xl relative overflow-hidden transition-all hover:-translate-y-1"
                              asChild
                              onClick={addRipple}
                            >
                              <Link
                                href={`/orders/${order.id}`}
                                className="flex items-center gap-1"
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </Link>
                            </Button> */}
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
                                {order.status === "Pending" && (
                                  <DropdownMenuItem className="text-blue-600">
                                    Confirm Order
                                  </DropdownMenuItem>
                                )}
                                {(order.status === "Pending" ||
                                  order.status === "Confirmed") && (
                                  <DropdownMenuItem className="text-purple-600">
                                    Mark as Preparing
                                  </DropdownMenuItem>
                                )}
                                {order.status === "Preparing" && (
                                  <DropdownMenuItem className="text-teal-600">
                                    Mark as Ready
                                  </DropdownMenuItem>
                                )}
                                {order.status === "Ready" && (
                                  <DropdownMenuItem className="text-green-600">
                                    Mark as Delivered
                                  </DropdownMenuItem>
                                )}
                                {order.status !== "Delivered" &&
                                  order.status !== "Cancelled" && (
                                    <>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem className="text-red-600">
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
