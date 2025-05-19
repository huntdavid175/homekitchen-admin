"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CreditCard, Edit, MapPin, Phone } from "lucide-react";
import { UserOrdersTable } from "@/components/admin/UserOrdersTable";
import { UserEditForm } from "@/components/admin/UserEditForm";
import { DeleteUserDialog } from "@/components/admin/DeleteUserDialog";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { formatDate } from "@/lib/helpers";

interface UserProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId?: string;
  userEmail?: string;
}

export function UserProfileDialog({
  open,
  onOpenChange,
  userId = "USR-1001",
  userEmail,
}: UserProfileDialogProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserProfile() {
      if (!open || !userEmail) return;

      try {
        setLoading(true);
        setError(null);

        // Get Supabase client and session
        const supabase = createClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          throw new Error("No active session");
        }

        // Fetch user profile
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URL}/api/users/${userEmail}`,
          {
            headers: {
              Authorization: `Bearer ${session.access_token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch user profile: ${response.statusText}`
          );
        }

        const userData = await response.json();
        console.log(userData);
        setUser(userData);
      } catch (err: any) {
        console.error("Error fetching user profile:", err);
        setError(err.message || "Failed to load user profile");
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, [open, userEmail]);

  if (!user && !loading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent className="sm:max-w-[900px] p-6 rounded-xl border-none shadow-lg">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-red-600">Error</h3>
            <p className="text-muted-foreground">
              {error || "Failed to load user profile"}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (loading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTitle>Loading</DialogTitle>
        <DialogContent className="sm:max-w-[900px] p-6 rounded-xl border-none shadow-lg">
          <div className="text-center">
            <h3 className="text-lg font-semibold">Loading...</h3>
            <p className="text-muted-foreground">
              Please wait while we fetch the user profile
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[900px] p-0 rounded-xl border-none shadow-lg overflow-hidden max-h-[90vh] overflow-y-auto">
          <DialogHeader className="sticky top-0 z-10 p-6 bg-gradient-to-r from-indigo-50 to-purple-50">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold">
                Customer Profile
              </DialogTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg bg-white"
                  onClick={() => setShowEditDialog(true)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit User
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="rounded-lg"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  Delete User
                </Button>
              </div>
            </div>
          </DialogHeader>

          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="flex flex-col items-center md:items-start gap-4">
                <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                  <AvatarImage
                    src="/placeholder.svg?height=96&width=96"
                    alt={user.name}
                  />
                  <AvatarFallback className="text-2xl">
                    {user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-muted-foreground">{user.email}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
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
                    <Badge
                      variant="outline"
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        user.role === "admin"
                          ? "bg-purple-50 text-purple-700 hover:bg-purple-50 hover:text-purple-700"
                          : "bg-blue-50 text-blue-700 hover:bg-blue-50 hover:text-blue-700"
                      }`}
                    >
                      {user.role}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 md:mt-0">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-indigo-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Member Since</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(user.created_at)}
                    </p>
                  </div>
                </div>
                {user.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-indigo-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">
                        {user.phone}
                      </p>
                    </div>
                  </div>
                )}
                {user.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-indigo-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">
                        {user.address}
                      </p>
                      {/* <p className="text-sm text-muted-foreground">
                        {user.address.city}, {user.address.state}{" "}
                        {user.address.zip}
                      </p> */}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card className="rounded-xl border shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Orders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {user.total_orders || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Last order on{" "}
                    {user.last_order_date
                      ? formatDate(user.last_order_date)
                      : "N/A"}
                  </p>
                </CardContent>
              </Card>
              <Card className="rounded-xl border shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Spent
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ₵{user.total_spent || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Lifetime value
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Recent Orders</h3>
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg"
                asChild
              >
                <Link href={`/users/${userId}/orders`}>View All Orders</Link>
              </Button>
            </div>

            <Card className="rounded-xl border shadow-sm">
              <CardContent className="p-0">
                <UserOrdersTable recentOrders={user.recent_orders} />
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      <UserEditForm
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        user={user}
      />
      <DeleteUserDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        userId={userId}
        userName={user.name}
      />
    </>
  );
}
