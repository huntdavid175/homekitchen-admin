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
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Eye,
  Filter,
  MapPin,
  MoreHorizontal,
  Search,
  Truck,
  User,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export function DeliveryScheduleManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Sample delivery data
  const deliveries = [
    {
      id: "DEL-7291",
      customer: "Alex Johnson",
      address: "123 Main St, New York, NY 10001",
      date: "April 11, 2023",
      timeSlot: "2:00 PM - 6:00 PM",
      status: "Delivered",
      driver: "John Smith",
      orderId: "ORD-7291",
    },
    {
      id: "DEL-6384",
      customer: "Sarah Williams",
      address: "456 Park Ave, New York, NY 10022",
      date: "April 11, 2023",
      timeSlot: "8:00 AM - 12:00 PM",
      status: "In Transit",
      driver: "Michael Davis",
      orderId: "ORD-6384",
    },
    {
      id: "DEL-5127",
      customer: "Michael Brown",
      address: "789 Broadway, New York, NY 10003",
      date: "April 11, 2023",
      timeSlot: "12:00 PM - 4:00 PM",
      status: "Scheduled",
      driver: "Lisa Johnson",
      orderId: "ORD-5127",
    },
    {
      id: "DEL-4982",
      customer: "Emily Davis",
      address: "321 5th Ave, New York, NY 10016",
      date: "April 11, 2023",
      timeSlot: "4:00 PM - 8:00 PM",
      status: "Scheduled",
      driver: "David Wilson",
      orderId: "ORD-4982",
    },
    {
      id: "DEL-3756",
      customer: "David Wilson",
      address: "654 Lexington Ave, New York, NY 10022",
      date: "April 11, 2023",
      timeSlot: "8:00 AM - 12:00 PM",
      status: "Scheduled",
      driver: "John Smith",
      orderId: "ORD-3756",
    },
    {
      id: "DEL-2891",
      customer: "Jessica Martinez",
      address: "987 Madison Ave, New York, NY 10075",
      date: "April 10, 2023",
      timeSlot: "2:00 PM - 6:00 PM",
      status: "Cancelled",
      driver: "N/A",
      orderId: "ORD-2891",
    },
    {
      id: "DEL-1745",
      customer: "James Taylor",
      address: "246 West End Ave, New York, NY 10023",
      date: "April 10, 2023",
      timeSlot: "12:00 PM - 4:00 PM",
      status: "Delivered",
      driver: "Michael Davis",
      orderId: "ORD-1745",
    },
    {
      id: "DEL-1632",
      customer: "Olivia Anderson",
      address: "135 Riverside Dr, New York, NY 10024",
      date: "April 10, 2023",
      timeSlot: "8:00 AM - 12:00 PM",
      status: "Delivered",
      driver: "Lisa Johnson",
      orderId: "ORD-1632",
    },
    {
      id: "DEL-1521",
      customer: "Daniel Thomas",
      address: "864 Columbus Ave, New York, NY 10025",
      date: "April 10, 2023",
      timeSlot: "4:00 PM - 8:00 PM",
      status: "Delivered",
      driver: "David Wilson",
      orderId: "ORD-1521",
    },
    {
      id: "DEL-1423",
      customer: "Sophia Jackson",
      address: "753 Amsterdam Ave, New York, NY 10025",
      date: "April 9, 2023",
      timeSlot: "2:00 PM - 6:00 PM",
      status: "Delivered",
      driver: "John Smith",
      orderId: "ORD-1423",
    },
    {
      id: "DEL-1312",
      customer: "Matthew White",
      address: "951 1st Ave, New York, NY 10022",
      date: "April 9, 2023",
      timeSlot: "12:00 PM - 4:00 PM",
      status: "Delivered",
      driver: "Michael Davis",
      orderId: "ORD-1312",
    },
    {
      id: "DEL-1201",
      customer: "Ava Harris",
      address: "357 2nd Ave, New York, NY 10010",
      date: "April 9, 2023",
      timeSlot: "8:00 AM - 12:00 PM",
      status: "Delivered",
      driver: "Lisa Johnson",
      orderId: "ORD-1201",
    },
  ];

  // Filter deliveries based on search term
  const filteredDeliveries = deliveries.filter(
    (delivery) =>
      delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.orderId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDeliveries.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredDeliveries.length / itemsPerPage);

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
          Delivery Schedule
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            Manage delivery schedules, routes, and driver assignments.
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
            <CardTitle className="text-sm font-medium">
              Today's Deliveries
            </CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground mt-1">
              +12 from yesterday
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-none shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-emerald-50 to-green-50">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">86</div>
            <p className="text-xs text-muted-foreground mt-1">
              34.8% completion rate
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-none shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-emerald-50 to-green-50">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground mt-1">
              17.0% of today's deliveries
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-none shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-emerald-50 to-green-50">
            <CardTitle className="text-sm font-medium">
              Active Drivers
            </CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground mt-1">
              Out of 24 total drivers
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="rounded-xl border-none shadow-md overflow-hidden md:col-span-2">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Delivery Calendar</CardTitle>
                <CardDescription>
                  View and manage scheduled deliveries
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px] rounded-xl">
                    <SelectValue placeholder="Select driver" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Drivers</SelectItem>
                    <SelectItem value="john">John Smith</SelectItem>
                    <SelectItem value="michael">Michael Davis</SelectItem>
                    <SelectItem value="lisa">Lisa Johnson</SelectItem>
                    <SelectItem value="david">David Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card className="rounded-xl border-none shadow-md overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
            <CardTitle>Time Slots</CardTitle>
            <CardDescription>
              Delivery distribution by time slot
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      8:00 AM - 12:00 PM
                    </span>
                  </div>
                  <span className="text-sm font-medium">86 deliveries</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100">
                  <div
                    className="h-2 rounded-full bg-emerald-500"
                    style={{ width: "35%" }}
                  ></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      12:00 PM - 4:00 PM
                    </span>
                  </div>
                  <span className="text-sm font-medium">94 deliveries</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100">
                  <div
                    className="h-2 rounded-full bg-emerald-500"
                    style={{ width: "38%" }}
                  ></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      4:00 PM - 8:00 PM
                    </span>
                  </div>
                  <span className="text-sm font-medium">67 deliveries</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100">
                  <div
                    className="h-2 rounded-full bg-emerald-500"
                    style={{ width: "27%" }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-xl border-none shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Deliveries</CardTitle>
              <CardDescription>
                View and manage delivery schedules
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search deliveries..."
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
                    size="sm"
                    className="flex items-center gap-2 rounded-xl hover:bg-emerald-50"
                  >
                    <Filter className="h-4 w-4 text-emerald-600" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-xl">
                  <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>All Deliveries</DropdownMenuItem>
                  <DropdownMenuItem>Scheduled</DropdownMenuItem>
                  <DropdownMenuItem>In Transit</DropdownMenuItem>
                  <DropdownMenuItem>Delivered</DropdownMenuItem>
                  <DropdownMenuItem>Cancelled</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Today</DropdownMenuItem>
                  <DropdownMenuItem>Tomorrow</DropdownMenuItem>
                  <DropdownMenuItem>This Week</DropdownMenuItem>
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
                All Deliveries
              </TabsTrigger>
              <TabsTrigger
                value="today"
                className="rounded-xl data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 relative transition-all"
              >
                Today
              </TabsTrigger>
              <TabsTrigger
                value="scheduled"
                className="rounded-xl data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 relative transition-all"
              >
                Scheduled
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="rounded-xl data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 relative transition-all"
              >
                Completed
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="overflow-x-auto">
                <Table className="border-collapse border-spacing-0">
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                        Delivery ID
                      </TableHead>
                      <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                        Customer
                      </TableHead>
                      <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                        Address
                      </TableHead>
                      <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                        Date
                      </TableHead>
                      <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                        Time Slot
                      </TableHead>
                      <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                        Status
                      </TableHead>
                      <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                        Driver
                      </TableHead>
                      <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                        Order ID
                      </TableHead>
                      <TableHead className="py-3 px-4 text-sm font-medium text-gray-600"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.length > 0 ? (
                      currentItems.map((delivery, index) => (
                        <TableRow
                          key={delivery.id}
                          className="transition-all duration-300 hover:bg-gray-50 hover:scale-[1.01] opacity-0 animate-[fadeIn_0.5s_cubic-bezier(0.22,1,0.36,1)_forwards]"
                          style={{
                            animationDelay: `${
                              0.1 + (index % itemsPerPage) * 0.1
                            }s`,
                          }}
                        >
                          <TableCell className="py-3 px-4 border-t border-gray-100 font-medium">
                            {delivery.id}
                          </TableCell>
                          <TableCell className="py-3 px-4 border-t border-gray-100">
                            {delivery.customer}
                          </TableCell>
                          <TableCell className="py-3 px-4 border-t border-gray-100 max-w-[200px] truncate">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                              <span className="truncate">
                                {delivery.address}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="py-3 px-4 border-t border-gray-100 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                              {delivery.date}
                            </div>
                          </TableCell>
                          <TableCell className="py-3 px-4 border-t border-gray-100 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              {delivery.timeSlot}
                            </div>
                          </TableCell>
                          <TableCell className="py-3 px-4 border-t border-gray-100">
                            <Badge
                              variant="outline"
                              className="rounded-full px-3 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-700"
                            >
                              {delivery.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="py-3 px-4 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                              <User className="h-3 w-3 text-muted-foreground" />
                              <span>{delivery.driver}</span>
                            </div>
                          </TableCell>
                          <TableCell className="py-3 px-4 border-t border-gray-100">
                            <Link
                              href={`/admin/orders/${delivery.orderId}`}
                              className="text-emerald-600 hover:underline"
                            >
                              {delivery.orderId}
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
                                  href={`/admin/schedule/${delivery.id}`}
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
                                  <DropdownMenuItem>
                                    View Order
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  {delivery.status === "Scheduled" && (
                                    <DropdownMenuItem className="text-emerald-600">
                                      Mark as In Transit
                                    </DropdownMenuItem>
                                  )}
                                  {(delivery.status === "Scheduled" ||
                                    delivery.status === "In Transit") && (
                                    <DropdownMenuItem className="text-emerald-600">
                                      Mark as Delivered
                                    </DropdownMenuItem>
                                  )}
                                  {delivery.status !== "Delivered" &&
                                    delivery.status !== "Cancelled" && (
                                      <>
                                        <DropdownMenuItem>
                                          Reassign Driver
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          Change Time Slot
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-emerald-600">
                                          Cancel Delivery
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
                          colSpan={9}
                          className="py-6 text-center text-muted-foreground"
                        >
                          No deliveries found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {filteredDeliveries.length > 0 && (
                <div className="flex items-center justify-between px-4 py-4 border-t border-gray-100">
                  <div className="text-sm text-muted-foreground">
                    Showing{" "}
                    <span className="font-medium">{indexOfFirstItem + 1}</span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastItem, filteredDeliveries.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">
                      {filteredDeliveries.length}
                    </span>{" "}
                    deliveries
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

            <TabsContent value="today" className="mt-0">
              <div className="p-6 text-center text-muted-foreground">
                Today's deliveries view is under development.
              </div>
            </TabsContent>

            <TabsContent value="scheduled" className="mt-0">
              <div className="p-6 text-center text-muted-foreground">
                Scheduled deliveries view is under development.
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-0">
              <div className="p-6 text-center text-muted-foreground">
                Completed deliveries view is under development.
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
