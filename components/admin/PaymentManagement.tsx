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
  CreditCard,
  Download,
  Eye,
  Filter,
  MoreHorizontal,
  Search,
} from "lucide-react";
import Link from "next/link";

export function PaymentManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  // Add state for filter status
  const [filterStatus, setFilterStatus] = useState("all");

  // Sample payment data
  const payments = [
    {
      id: "PAY-7291",
      customer: "Alex Johnson",
      date: "April 11, 2023",
      amount: "$59.96",
      status: "Completed",
      method: "Visa •••• 4242",
      orderId: "ORD-7291",
    },
    {
      id: "PAY-6384",
      customer: "Sarah Williams",
      date: "April 10, 2023",
      amount: "$44.97",
      status: "Completed",
      method: "Visa •••• 4242",
      orderId: "ORD-6384",
    },
    {
      id: "PAY-5127",
      customer: "Michael Brown",
      date: "April 9, 2023",
      amount: "$59.96",
      status: "Completed",
      method: "Mastercard •••• 8888",
      orderId: "ORD-5127",
    },
    {
      id: "PAY-4982",
      customer: "Emily Davis",
      date: "April 8, 2023",
      amount: "$29.98",
      status: "Completed",
      method: "Visa •••• 4242",
      orderId: "ORD-4982",
    },
    {
      id: "PAY-3756",
      customer: "David Wilson",
      date: "April 7, 2023",
      amount: "$59.96",
      status: "Pending",
      method: "Visa •••• 4242",
      orderId: "ORD-3756",
    },
    {
      id: "PAY-2891",
      customer: "Jessica Martinez",
      date: "April 6, 2023",
      amount: "$44.97",
      status: "Refunded",
      method: "Mastercard •••• 8888",
      orderId: "ORD-2891",
    },
    {
      id: "PAY-1745",
      customer: "James Taylor",
      date: "April 5, 2023",
      amount: "$59.96",
      status: "Completed",
      method: "Visa •••• 4242",
      orderId: "ORD-1745",
    },
    {
      id: "PAY-1632",
      customer: "Olivia Anderson",
      date: "April 4, 2023",
      amount: "$44.97",
      status: "Completed",
      method: "Visa •••• 4242",
      orderId: "ORD-1632",
    },
    {
      id: "PAY-1521",
      customer: "Daniel Thomas",
      date: "April 3, 2023",
      amount: "$59.96",
      status: "Completed",
      method: "Mastercard •••• 8888",
      orderId: "ORD-1521",
    },
    {
      id: "PAY-1423",
      customer: "Sophia Jackson",
      date: "April 2, 2023",
      amount: "$29.98",
      status: "Failed",
      method: "Visa •••• 4242",
      orderId: "ORD-1423",
    },
    {
      id: "PAY-1312",
      customer: "Matthew White",
      date: "April 1, 2023",
      amount: "$59.96",
      status: "Completed",
      method: "Visa •••• 4242",
      orderId: "ORD-1312",
    },
    {
      id: "PAY-1201",
      customer: "Ava Harris",
      date: "March 31, 2023",
      amount: "$44.97",
      status: "Completed",
      method: "Mastercard •••• 8888",
      orderId: "ORD-1201",
    },
    {
      id: "PAY-1101",
      customer: "William Clark",
      date: "March 30, 2023",
      amount: "$59.96",
      status: "Completed",
      method: "Visa •••• 4242",
      orderId: "ORD-1101",
    },
    {
      id: "PAY-1001",
      customer: "Emma Lewis",
      date: "March 29, 2023",
      amount: "$29.98",
      status: "Completed",
      method: "Visa •••• 4242",
      orderId: "ORD-1001",
    },
  ];

  // Update the filter function to include status filtering
  // Replace the filteredPayments definition with:
  const filteredPayments = payments.filter((payment) => {
    // First filter by search term
    const matchesSearch =
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.orderId.toLowerCase().includes(searchTerm.toLowerCase());

    // Then filter by status if not "all"
    const matchesStatus =
      filterStatus === "all" ||
      payment.status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPayments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

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
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-green-600">
          Payment Management
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            Manage payments, transactions, and refunds for customer orders.
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 rounded-xl hover:bg-emerald-50"
            >
              <Download className="h-4 w-4 text-emerald-600" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-xl border-none shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-emerald-50 to-green-50">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground mt-1">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-none shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-emerald-50 to-green-50">
            <CardTitle className="text-sm font-medium">
              Completed Payments
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground mt-1">+180 this week</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-none shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-emerald-50 to-green-50">
            <CardTitle className="text-sm font-medium">
              Pending Payments
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              -3 from yesterday
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-none shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-emerald-50 to-green-50">
            <CardTitle className="text-sm font-medium">
              Refunded Amount
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">$1,245.32</div>
            <p className="text-xs text-muted-foreground mt-1">
              2.1% of total revenue
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-xl border-none shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Transactions</CardTitle>
              <CardDescription>
                View and manage payment transactions
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
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
                    <Filter className="h-4 w-4 text-emerald-600" />
                    <span className="sr-only">Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-xl">
                  <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                    All Transactions
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setFilterStatus("completed")}
                  >
                    Completed
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("pending")}>
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("refunded")}>
                    Refunded
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("failed")}>
                    Failed
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Today</DropdownMenuItem>
                  <DropdownMenuItem>This Week</DropdownMenuItem>
                  <DropdownMenuItem>This Month</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                All Payments
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="rounded-xl data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 relative transition-all"
              >
                Completed
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="rounded-xl data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 relative transition-all"
              >
                Pending
              </TabsTrigger>
              <TabsTrigger
                value="refunded"
                className="rounded-xl data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 relative transition-all"
              >
                Refunded
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="overflow-x-auto">
                <Table className="border-collapse border-spacing-0">
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                        Transaction ID
                      </TableHead>
                      <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                        Customer
                      </TableHead>
                      <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                        Date
                      </TableHead>
                      <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                        Amount
                      </TableHead>
                      <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                        Status
                      </TableHead>
                      <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                        Payment Method
                      </TableHead>
                      <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                        Order ID
                      </TableHead>
                      <TableHead className="py-3 px-4 text-sm font-medium text-gray-600"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.length > 0 ? (
                      currentItems.map((payment, index) => (
                        <TableRow
                          key={payment.id}
                          className="transition-all duration-300 hover:bg-gray-50 hover:scale-[1.01] opacity-0 animate-[fadeIn_0.5s_cubic-bezier(0.22,1,0.36,1)_forwards]"
                          style={{
                            animationDelay: `${
                              0.1 + (index % itemsPerPage) * 0.1
                            }s`,
                          }}
                        >
                          <TableCell className="py-3 px-4 border-t border-gray-100 font-medium">
                            {payment.id}
                          </TableCell>
                          <TableCell className="py-3 px-4 border-t border-gray-100">
                            {payment.customer}
                          </TableCell>
                          <TableCell className="py-3 px-4 border-t border-gray-100 flex items-center gap-2">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            {payment.date}
                          </TableCell>
                          <TableCell className="py-3 px-4 border-t border-gray-100 font-medium">
                            {payment.amount}
                          </TableCell>
                          <TableCell className="py-3 px-4 border-t border-gray-100">
                            <Badge
                              variant="outline"
                              className={`rounded-full px-3 py-1 text-xs font-medium ${
                                payment.status === "Completed"
                                  ? "bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                                  : payment.status === "Pending"
                                  ? "bg-amber-50 text-amber-700 hover:bg-amber-50 hover:text-amber-700 animate-[pulse_2s_infinite]"
                                  : payment.status === "Refunded"
                                  ? "bg-purple-50 text-purple-700 hover:bg-purple-50 hover:text-purple-700"
                                  : payment.status === "Failed"
                                  ? "bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700"
                                  : ""
                              }`}
                            >
                              {payment.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="py-3 px-4 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-3 w-3 text-muted-foreground" />
                              <span>{payment.method}</span>
                            </div>
                          </TableCell>
                          <TableCell className="py-3 px-4 border-t border-gray-100">
                            <Link
                              href={`/admin/orders/${payment.orderId}`}
                              className="text-indigo-600 hover:underline"
                            >
                              {payment.orderId}
                            </Link>
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
                                  href={`/payments/${payment.id}`}
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
                                  <DropdownMenuItem asChild>
                                    <Link href={`/payments/${payment.id}`}>
                                      View Details
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem asChild>
                                    <Link href={`/orders/${payment.orderId}`}>
                                      View Order
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  {payment.status === "Completed" && (
                                    <DropdownMenuItem className="text-purple-600">
                                      Issue Refund
                                    </DropdownMenuItem>
                                  )}
                                  {payment.status === "Pending" && (
                                    <DropdownMenuItem className="text-green-600">
                                      Mark as Completed
                                    </DropdownMenuItem>
                                  )}
                                  {payment.status === "Pending" && (
                                    <DropdownMenuItem className="text-red-600">
                                      Mark as Failed
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem>
                                    Download Receipt
                                  </DropdownMenuItem>
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
                          No transactions found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {filteredPayments.length > 0 && (
                <div className="flex items-center justify-between px-4 py-4 border-t border-gray-100">
                  <div className="text-sm text-muted-foreground">
                    Showing{" "}
                    <span className="font-medium">{indexOfFirstItem + 1}</span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastItem, filteredPayments.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">
                      {filteredPayments.length}
                    </span>{" "}
                    transactions
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

            <TabsContent value="completed" className="mt-0">
              <div className="p-6 text-center text-muted-foreground">
                Completed transactions view is under development.
              </div>
            </TabsContent>

            <TabsContent value="pending" className="mt-0">
              <div className="p-6 text-center text-muted-foreground">
                Pending transactions view is under development.
              </div>
            </TabsContent>

            <TabsContent value="refunded" className="mt-0">
              <div className="p-6 text-center text-muted-foreground">
                Refunded transactions view is under development.
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
