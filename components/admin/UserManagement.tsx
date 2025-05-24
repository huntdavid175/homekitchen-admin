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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  UserPlus,
  Users,
} from "lucide-react";
import { UserProfileDialog } from "@/components/admin/UserProfileDialog";
import { UserEditForm } from "@/components/admin/UserEditForm";
import { DeleteUserDialog } from "@/components/admin/DeleteUserDialog";
import { EmptyUsersState } from "@/components/admin/EmptyStates";
import { format, isValid } from "date-fns";

import Link from "next/link";

export function UserManagement({ users }: { users: any }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEmptyState, setShowEmptyState] = useState(false);

  // Dialog states
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Sample user data
  //   const users = [
  //     {
  //       id: "USR-1001",
  //       name: "Alex Johnson",
  //       email: "alex.johnson@example.com",
  //       status: "Active",
  //       role: "Customer",
  //       subscriptionPlan: "Premium",
  //       joinDate: "Jan 15, 2023",
  //       lastOrder: "Apr 11, 2023",
  //     },
  //     {
  //       id: "USR-1002",
  //       name: "Sarah Williams",
  //       email: "sarah.williams@example.com",
  //       status: "Active",
  //       role: "Customer",
  //       subscriptionPlan: "Basic",
  //       joinDate: "Feb 3, 2023",
  //       lastOrder: "Apr 10, 2023",
  //     },
  //     {
  //       id: "USR-1003",
  //       name: "Michael Brown",
  //       email: "michael.brown@example.com",
  //       status: "Active",
  //       role: "Customer",
  //       subscriptionPlan: "Premium",
  //       joinDate: "Dec 12, 2022",
  //       lastOrder: "Apr 9, 2023",
  //     },
  //     {
  //       id: "USR-1004",
  //       name: "Emily Davis",
  //       email: "emily.davis@example.com",
  //       status: "Inactive",
  //       role: "Customer",
  //       subscriptionPlan: "Basic",
  //       joinDate: "Mar 5, 2023",
  //       lastOrder: "Mar 28, 2023",
  //     },
  //     {
  //       id: "USR-1005",
  //       name: "David Wilson",
  //       email: "david.wilson@example.com",
  //       status: "Active",
  //       role: "Customer",
  //       subscriptionPlan: "Premium",
  //       joinDate: "Jan 20, 2023",
  //       lastOrder: "Apr 8, 2023",
  //     },
  //     {
  //       id: "USR-1006",
  //       name: "Jessica Martinez",
  //       email: "jessica.martinez@example.com",
  //       status: "Active",
  //       role: "Customer",
  //       subscriptionPlan: "Basic",
  //       joinDate: "Feb 15, 2023",
  //       lastOrder: "Apr 7, 2023",
  //     },
  //     {
  //       id: "USR-1007",
  //       name: "James Taylor",
  //       email: "james.taylor@example.com",
  //       status: "Suspended",
  //       role: "Customer",
  //       subscriptionPlan: "Premium",
  //       joinDate: "Nov 8, 2022",
  //       lastOrder: "Mar 15, 2023",
  //     },
  //     {
  //       id: "USR-1008",
  //       name: "Olivia Anderson",
  //       email: "olivia.anderson@example.com",
  //       status: "Active",
  //       role: "Customer",
  //       subscriptionPlan: "Basic",
  //       joinDate: "Mar 1, 2023",
  //       lastOrder: "Apr 5, 2023",
  //     },
  //     {
  //       id: "USR-1009",
  //       name: "Daniel Thomas",
  //       email: "daniel.thomas@example.com",
  //       status: "Active",
  //       role: "Customer",
  //       subscriptionPlan: "Premium",
  //       joinDate: "Jan 5, 2023",
  //       lastOrder: "Apr 3, 2023",
  //     },
  //     {
  //       id: "USR-1010",
  //       name: "Sophia Jackson",
  //       email: "sophia.jackson@example.com",
  //       status: "Inactive",
  //       role: "Customer",
  //       subscriptionPlan: "Basic",
  //       joinDate: "Feb 20, 2023",
  //       lastOrder: "Mar 10, 2023",
  //     },
  //     {
  //       id: "USR-1011",
  //       name: "Matthew White",
  //       email: "matthew.white@example.com",
  //       status: "Active",
  //       role: "Customer",
  //       subscriptionPlan: "Premium",
  //       joinDate: "Dec 5, 2022",
  //       lastOrder: "Apr 1, 2023",
  //     },
  //     {
  //       id: "USR-1012",
  //       name: "Ava Harris",
  //       email: "ava.harris@example.com",
  //       status: "Active",
  //       role: "Customer",
  //       subscriptionPlan: "Basic",
  //       joinDate: "Mar 15, 2023",
  //       lastOrder: "Mar 30, 2023",
  //     },
  //     {
  //       id: "ADM-1001",
  //       name: "John Smith",
  //       email: "john.smith@mealbox.com",
  //       status: "Active",
  //       role: "Admin",
  //       subscriptionPlan: "N/A",
  //       joinDate: "Jan 1, 2022",
  //       lastOrder: "N/A",
  //     },
  //     {
  //       id: "ADM-1002",
  //       name: "Lisa Johnson",
  //       email: "lisa.johnson@mealbox.com",
  //       status: "Active",
  //       role: "Admin",
  //       subscriptionPlan: "N/A",
  //       joinDate: "Jan 1, 2022",
  //       lastOrder: "N/A",
  //     },
  //   ];

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user: any) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

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

  // Handle user actions
  const handleViewProfile = (userId: string, userEmail: string) => {
    setSelectedUser(userId);
    setShowProfileDialog(true);
  };

  const handleEditUser = (userId: string) => {
    setSelectedUser(userId);
    setShowEditDialog(true);
  };

  const handleDeleteUser = (userId: string) => {
    setSelectedUser(userId);
    setShowDeleteDialog(true);
  };

  // Find selected user data
  const selectedUserData =
    users.find((user: any) => user.id === selectedUser) || users[0];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (!isValid(date)) {
      return "Invalid date";
    }
    return format(date, "MMMM d, yyyy");
  };

  if (showEmptyState) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-green-600">
            User Management
          </h1>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Manage user accounts, subscriptions, and permissions.
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex items-center gap-2 rounded-xl"
              >
                <Download className="h-4 w-4 text-emerald-600" />
                Export Users
              </Button>
              <Button
                size="sm"
                className="hidden md:flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700"
                onClick={() => setShowEmptyState(false)}
              >
                <UserPlus className="h-4 w-4" />
                Add User
              </Button>
            </div>
          </div>
        </div>

        <EmptyUsersState />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-green-600">
          User Management
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            Manage user accounts, subscriptions, and permissions.
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex items-center gap-2 rounded-xl"
            >
              <Download className="h-4 w-4 text-emerald-600" />
              Export Users
            </Button>
            <Button
              size="sm"
              className="hidden md:flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700"
              onClick={() => setShowEmptyState(true)}
            >
              <UserPlus className="h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>
      </div>

      <Card className="rounded-xl border-none shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Users</CardTitle>
              <CardDescription>
                Manage user accounts and permissions
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
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
                  <DropdownMenuItem>All Users</DropdownMenuItem>
                  <DropdownMenuItem>Active Users</DropdownMenuItem>
                  <DropdownMenuItem>Inactive Users</DropdownMenuItem>
                  <DropdownMenuItem>Suspended Users</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Premium Subscribers</DropdownMenuItem>
                  <DropdownMenuItem>Basic Subscribers</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Admins</DropdownMenuItem>
                  <DropdownMenuItem>Customers</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                size="sm"
                className="rounded-xl md:hidden bg-emerald-600 hover:bg-emerald-700 relative overflow-hidden transition-all hover:-translate-y-1"
                onClick={addRipple}
              >
                <Plus className="h-4 w-4" />
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
                All Users
              </TabsTrigger>
              <TabsTrigger
                value="customers"
                className="rounded-xl data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 relative transition-all"
              >
                Customers
              </TabsTrigger>
              <TabsTrigger
                value="admins"
                className="rounded-xl data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 relative transition-all"
              >
                Admins
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="overflow-x-auto">
                <Table className="border-collapse border-spacing-0">
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                        User
                      </TableHead>
                      <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                        ID
                      </TableHead>
                      <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                        Status
                      </TableHead>
                      <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                        Role
                      </TableHead>
                      {/* <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                        Subscription
                      </TableHead> */}
                      <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                        Join Date
                      </TableHead>
                      <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                        Last Order
                      </TableHead>
                      <TableHead className="py-3 px-4 text-sm font-medium text-gray-600"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.length > 0 ? (
                      currentItems.map((user: any, index: number) => (
                        <TableRow
                          key={user.id}
                          className="transition-all duration-300 hover:bg-gray-50 hover:scale-[1.01] opacity-0 animate-[fadeIn_0.5s_cubic-bezier(0.22,1,0.36,1)_forwards]"
                          style={{
                            animationDelay: `${
                              0.1 + (index % itemsPerPage) * 0.1
                            }s`,
                          }}
                        >
                          <TableCell className="py-3 px-4 border-t border-gray-100">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src="/placeholder.svg?height=32&width=32"
                                  alt={user.name}
                                />
                                <AvatarFallback>
                                  {user.name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="py-3 px-4 border-t border-gray-100 font-medium">
                            USR-{index}
                          </TableCell>
                          <TableCell className="py-3 px-4 border-t border-gray-100">
                            <Badge
                              variant="outline"
                              className={`rounded-full px-3 py-1 text-xs font-medium ${
                                user.status === "Active"
                                  ? "bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                                  : user.status === "Inactive"
                                  ? "bg-gray-50 text-gray-700 hover:bg-gray-50 hover:text-gray-700"
                                  : user.status === "Suspended"
                                  ? "bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700"
                                  : ""
                              }`}
                            >
                              {/* {user.status} */}
                              Active
                            </Badge>
                          </TableCell>
                          <TableCell className="py-3 px-4 border-t border-gray-100">
                            <Badge
                              variant="outline"
                              className="rounded-full px-3 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-700"
                            >
                              {user.role.charAt(0).toUpperCase() +
                                user.role.slice(1)}
                            </Badge>
                          </TableCell>
                          {/* <TableCell className="py-3 px-4 border-t border-gray-100">
                            {user.subscriptionPlan === "N/A" ? (
                              <span className="text-muted-foreground">N/A</span>
                            ) : (
                              <Badge
                                variant="outline"
                                className={`rounded-full px-3 py-1 text-xs font-medium ${
                                  user.subscriptionPlan === "Premium"
                                    ? "bg-amber-50 text-amber-700 hover:bg-amber-50 hover:text-amber-700"
                                    : "bg-teal-50 text-teal-700 hover:bg-teal-50 hover:text-teal-700"
                                }`}
                              >
                                {user.subscriptionPlan}
                              </Badge>
                            )}
                          </TableCell> */}
                          <TableCell className="py-3 px-4 border-t border-gray-100">
                            {formatDate(user.created_at)}
                          </TableCell>
                          <TableCell className="py-3 px-4 border-t border-gray-100">
                            {user.lastOrder === "N/A" ? (
                              <span className="text-muted-foreground">N/A</span>
                            ) : (
                              formatDate(user.last_order_date)
                            )}
                          </TableCell>
                          <TableCell className="py-3 px-4 border-t border-gray-100">
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
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleViewProfile(user.id, user.email)
                                  }
                                >
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleEditUser(user.id)}
                                >
                                  Edit User
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/users/${user.id}/orders`}>
                                    View Orders
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {user.status === "Active" ? (
                                  <DropdownMenuItem className="text-amber-600">
                                    Deactivate User
                                  </DropdownMenuItem>
                                ) : user.status === "Inactive" ? (
                                  <DropdownMenuItem className="text-green-600">
                                    Activate User
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem className="text-green-600">
                                    Unsuspend User
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => handleDeleteUser(user.id)}
                                >
                                  Delete User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          className="py-6 text-center text-muted-foreground"
                        >
                          No users found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {filteredUsers.length > 0 && (
                <div className="flex items-center justify-between px-4 py-4 border-t border-gray-100">
                  <div className="text-sm text-muted-foreground">
                    Showing{" "}
                    <span className="font-medium">{indexOfFirstItem + 1}</span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastItem, filteredUsers.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">{filteredUsers.length}</span>{" "}
                    users
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

            <TabsContent value="customers" className="mt-0">
              <div className="p-6 text-center text-muted-foreground">
                Customer management view is under development.
              </div>
            </TabsContent>

            <TabsContent value="admins" className="mt-0">
              <div className="p-6 text-center text-muted-foreground">
                Admin management view is under development.
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Dialogs */}
      {selectedUser && (
        <>
          <UserProfileDialog
            open={showProfileDialog}
            onOpenChange={setShowProfileDialog}
            userId={selectedUser}
            userEmail={selectedUserData?.email}
          />
          <UserEditForm
            open={showEditDialog}
            onOpenChange={setShowEditDialog}
            user={{
              id: selectedUserData.id,
              name: selectedUserData.name,
              email: selectedUserData.email,
              phone: "(555) 123-4567", // Default data for demo
              status: selectedUserData.status,
              role: selectedUserData.role,
              subscriptionPlan: selectedUserData.subscriptionPlan,
              joinDate: selectedUserData.joinDate,
              lastOrder: selectedUserData.lastOrder,
              totalOrders: 12,
              totalSpent: "$729.52",
              address: {
                street: "123 Main Street, Apt 4B",
                city: "New York",
                state: "NY",
                zip: "10001",
                country: "United States",
              },
              paymentMethods: [
                {
                  type: "Visa",
                  last4: "4242",
                  expiry: "04/25",
                  isDefault: true,
                },
                {
                  type: "Mastercard",
                  last4: "8888",
                  expiry: "09/24",
                  isDefault: false,
                },
              ],
              preferences: {
                dietaryRestrictions: ["Gluten-Free", "Low Carb"],
                allergies: ["Nuts"],
                favoriteCategories: [
                  "Italian",
                  "Asian Fusion",
                  "Mediterranean",
                ],
              },
            }}
          />
          <DeleteUserDialog
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
            userId={selectedUser}
            userName={selectedUserData.name}
          />
        </>
      )}
    </div>
  );
}
