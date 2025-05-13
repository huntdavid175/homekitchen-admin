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

interface UserOrdersListProps {
  userId: string;
}

export function UserOrdersList({ userId }: UserOrdersListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // This would normally come from an API call using the userId
  const user = {
    id: userId,
    name: "Alex Johnson",
  };

  // Sample order data
  const orders = [
    {
      id: "ORD-7291",
      date: "April 11, 2023",
      status: "Delivered",
      items: 4,
      total: "$59.96",
      payment: "Visa •••• 4242",
    },
    {
      id: "ORD-6384",
      date: "April 10, 2023",
      status: "Preparing",
      items: 3,
      total: "$44.97",
      payment: "Visa •••• 4242",
    },
    {
      id: "ORD-5127",
      date: "April 9, 2023",
      status: "Ready",
      items: 4,
      total: "$59.96",
      payment: "Mastercard •••• 8888",
    },
    {
      id: "ORD-4982",
      date: "April 8, 2023",
      status: "Confirmed",
      items: 2,
      total: "$29.98",
      payment: "Visa •••• 4242",
    },
    {
      id: "ORD-3756",
      date: "April 7, 2023",
      status: "Pending",
      items: 4,
      total: "$59.96",
      payment: "Visa •••• 4242",
    },
    {
      id: "ORD-2891",
      date: "April 6, 2023",
      status: "Cancelled",
      items: 3,
      total: "$44.97",
      payment: "Mastercard •••• 8888",
    },
    {
      id: "ORD-1745",
      date: "April 5, 2023",
      status: "Delivered",
      items: 4,
      total: "$59.96",
      payment: "Visa •••• 4242",
    },
    {
      id: "ORD-1632",
      date: "April 4, 2023",
      status: "Delivered",
      items: 3,
      total: "$44.97",
      payment: "Visa •••• 4242",
    },
    {
      id: "ORD-1521",
      date: "April 3, 2023",
      status: "Delivered",
      items: 4,
      total: "$59.96",
      payment: "Mastercard •••• 8888",
    },
    {
      id: "ORD-1423",
      date: "April 2, 2023",
      status: "Delivered",
      items: 2,
      total: "$29.98",
      payment: "Visa •••• 4242",
    },
    {
      id: "ORD-1312",
      date: "April 1, 2023",
      status: "Delivered",
      items: 4,
      total: "$59.96",
      payment: "Visa •••• 4242",
    },
    {
      id: "ORD-1201",
      date: "March 31, 2023",
      status: "Delivered",
      items: 3,
      total: "$44.97",
      payment: "Mastercard •••• 8888",
    },
  ];

  // Filter orders based on search term
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

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
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Orders for {user.name}</CardTitle>
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
              className="rounded-xl data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 relative transition-all"
            >
              All Orders
            </TabsTrigger>
            <TabsTrigger
              value="active"
              className="rounded-xl data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 relative transition-all"
            >
              Active
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="rounded-xl data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 relative transition-all"
            >
              Completed
            </TabsTrigger>
            <TabsTrigger
              value="cancelled"
              className="rounded-xl data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 relative transition-all"
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
                  {currentItems.length > 0 ? (
                    currentItems.map((order, index) => (
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
                          {order.id}
                        </TableCell>
                        <TableCell className="py-3 px-4 border-t border-gray-100 flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {order.date}
                        </TableCell>
                        <TableCell className="py-3 px-4 border-t border-gray-100">
                          <Badge
                            variant="outline"
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              order.status === "Delivered"
                                ? "bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                                : order.status === "Preparing"
                                ? "bg-purple-50 text-purple-700 hover:bg-purple-50 hover:text-purple-700"
                                : order.status === "Pending"
                                ? "bg-amber-50 text-amber-700 hover:bg-amber-50 hover:text-amber-700"
                                : order.status === "Confirmed"
                                ? "bg-blue-50 text-blue-700 hover:bg-blue-50 hover:text-blue-700"
                                : order.status === "Ready"
                                ? "bg-teal-50 text-teal-700 hover:bg-teal-50 hover:text-teal-700"
                                : order.status === "Cancelled"
                                ? "bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700"
                                : ""
                            }`}
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-3 px-4 border-t border-gray-100">
                          {order.items} items
                        </TableCell>
                        <TableCell className="py-3 px-4 border-t border-gray-100">
                          {order.payment}
                        </TableCell>
                        <TableCell className="py-3 px-4 border-t border-gray-100 text-right font-medium">
                          {order.total}
                        </TableCell>
                        <TableCell className="py-3 px-4 border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            <Button
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
                            </Button>
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
                                <DropdownMenuItem>
                                  View Details
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
            {filteredOrders.length > 0 && (
              <div className="flex items-center justify-between px-4 py-4 border-t border-gray-100">
                <div className="text-sm text-muted-foreground">
                  Showing{" "}
                  <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(indexOfLastItem, filteredOrders.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">{filteredOrders.length}</span>{" "}
                  orders
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
                              ? "bg-indigo-600 hover:bg-indigo-700"
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
