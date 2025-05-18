"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RecentOrdersTable } from "@/components/admin/RecentOrdersTable";
import { UserStatsChart } from "@/components/admin/UserStatsChart";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { TopMeals } from "@/components/admin/TopMeals";
import { ContactSupportDialog } from "@/components/admin/ContactSupportDialog";
import {
  EmptyCardState,
  EmptyAnalyticsState,
} from "@/components/admin/EmptyStates";
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  CreditCard,
  DollarSign,
  Download,
  HelpCircle,
  Package,
  RefreshCw,
  Settings,
  ShoppingBag,
  Users,
} from "lucide-react";

interface AdminDashboardProps {
  showEmptyStates?: boolean;
  overview: any;
}

export function AdminDashboard({
  showEmptyStates = false,
  overview,
}: AdminDashboardProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [supportDialogOpen, setSupportDialogOpen] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-green-600">
          Admin Dashboard
        </h1>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-muted-foreground">
            Welcome back, Admin! Here's what's happening with your meal delivery
            service today.
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 rounded-xl"
              onClick={handleRefresh}
            >
              <RefreshCw
                className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Refresh Data
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 rounded-xl"
            >
              <Download className="h-4 w-4" />
              Download Report
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
          <TabsTrigger
            value="overview"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm whitespace-nowrap"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm whitespace-nowrap"
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger
            value="reports"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm whitespace-nowrap"
          >
            Reports
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm whitespace-nowrap"
          >
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {showEmptyStates ? (
              <>
                <Card className="rounded-xl border-none shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-gradient-to-r from-emerald-50 to-green-50 w-full">
                    <CardTitle className="text-sm font-medium">
                      Total Revenue
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="pt-6">
                    <EmptyCardState
                      title="No revenue data"
                      description="Revenue data will appear here once orders are processed."
                      icon={<DollarSign className="h-6 w-6 text-gray-400" />}
                    />
                  </CardContent>
                </Card>
                <Card className="rounded-xl border-none shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-gradient-to-r from-emerald-50 to-green-50">
                    <CardTitle className="text-sm font-medium">
                      Active Subscriptions
                    </CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="pt-6">
                    <EmptyCardState
                      title="No subscription data"
                      description="Subscription data will appear here once users subscribe."
                      icon={<CreditCard className="h-6 w-6 text-gray-400" />}
                    />
                  </CardContent>
                </Card>
                <Card className="rounded-xl border-none shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-gradient-to-r from-emerald-50 to-green-50">
                    <CardTitle className="text-sm font-medium">
                      Active Users
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="pt-6">
                    <EmptyCardState
                      title="No user data"
                      description="User data will appear here once users sign up."
                      icon={<Users className="h-6 w-6 text-gray-400" />}
                    />
                  </CardContent>
                </Card>
                <Card className="rounded-xl border-none shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-gradient-to-r from-emerald-50 to-green-50">
                    <CardTitle className="text-sm font-medium">
                      Pending Orders
                    </CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="pt-6">
                    <EmptyCardState
                      title="No pending orders"
                      description="Pending orders will appear here once customers place orders."
                      icon={<Package className="h-6 w-6 text-gray-400" />}
                    />
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                <Card className="rounded-xl border-none shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-gradient-to-r from-emerald-50 to-green-50 w-full">
                    <CardTitle className="text-sm font-medium">
                      Total Revenue
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      +20.1% from last month
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-xs text-green-600 font-medium">
                      <ArrowUp className="h-3 w-3" />
                      <span>18.2%</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="rounded-xl border-none shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-gradient-to-r from-emerald-50 to-green-50">
                    <CardTitle className="text-sm font-medium">
                      Active Subscriptions
                    </CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">+2,350</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      +180 this week
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-xs text-green-600 font-medium">
                      <ArrowUp className="h-3 w-3" />
                      <span>12.5%</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="rounded-xl border-none shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-gradient-to-r from-emerald-50 to-green-50">
                    <CardTitle className="text-sm font-medium">
                      Active Users
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">
                      +{overview.active_users.count}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      +{overview.active_users.growth.value} this month
                    </p>
                    <div
                      className={`mt-4 flex items-center gap-1 text-xs ${
                        overview.active_users.growth.trend === "no_change" ||
                        overview.active_users.growth.trend === "increase"
                          ? "text-green-600"
                          : "text-red-600"
                      } font-medium`}
                    >
                      {overview.active_users.growth.trend === "no_change" ||
                      overview.active_users.growth.trend === "increase" ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      )}
                      <span>{overview.active_users.growth.percentage}%</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="rounded-xl border-none shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-gradient-to-r from-emerald-50 to-green-50">
                    <CardTitle className="text-sm font-medium">
                      Pending Orders
                    </CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">
                      +{overview.pending_orders.count}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      +{overview.pending_orders.growth.value} since yesterday
                    </p>
                    <div
                      className={`mt-4 flex items-center gap-1 text-xs ${
                        overview.active_users.growth.trend === "no_change" ||
                        overview.active_users.growth.trend === "increase"
                          ? "text-green-600"
                          : "text-red-600"
                      } font-medium`}
                    >
                      {overview.pending_orders.growth.trend === "no_change" ||
                      overview.pending_orders.growth.trend === "increase" ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      )}
                      <span>{overview.active_users.growth.percentage}%</span>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
          {/* 
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="rounded-xl border-none shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
                <CardTitle className="text-sm font-medium">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex flex-col h-auto py-4 rounded-lg justify-center items-center gap-2 hover:bg-emerald-50 transition-all"
                    onClick={() => setSupportDialogOpen(true)}
                  >
                    <HelpCircle className="h-5 w-5 text-emerald-600" />
                    <span className="text-xs font-medium">Contact Support</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex flex-col h-auto py-4 rounded-lg justify-center items-center gap-2 hover:bg-emerald-50 transition-all"
                  >
                    <Settings className="h-5 w-5 text-emerald-600" />
                    <span className="text-xs font-medium">System Settings</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex flex-col h-auto py-4 rounded-lg justify-center items-center gap-2 hover:bg-emerald-50 transition-all"
                  >
                    <Download className="h-5 w-5 text-emerald-600" />
                    <span className="text-xs font-medium">Export Data</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex flex-col h-auto py-4 rounded-lg justify-center items-center gap-2 hover:bg-emerald-50 transition-all"
                  >
                    <Calendar className="h-5 w-5 text-emerald-600" />
                    <span className="text-xs font-medium">Schedule</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-xl border-none shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:col-span-2">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
                <CardTitle className="text-sm font-medium">
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">API Services</span>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Operational
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Payment Processing
                    </span>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Operational
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Delivery Tracking
                    </span>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Operational
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Notification System
                    </span>
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                      Degraded
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div> */}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            {showEmptyStates ? (
              <>
                <Card className="rounded-xl border-none shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:col-span-4">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Recent Orders</CardTitle>
                        <CardDescription>
                          Latest orders across the platform
                        </CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-lg bg-white"
                      >
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <RecentOrdersTable showEmptyState={true} />
                  </CardContent>
                </Card>
                <Card className="rounded-xl border-none shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:col-span-3">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
                    <CardTitle>Top Selling Meals</CardTitle>
                    <CardDescription>
                      Top 5 meals by order volume
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <TopMeals showEmptyState={true} />
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                {/* <Card className="rounded-xl border-none shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:col-span-4">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Revenue Overview</CardTitle>
                        <CardDescription>
                          Monthly revenue for the current year
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-lg bg-white"
                        >
                          Monthly
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-lg"
                        >
                          Yearly
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <RevenueChart />
                  </CardContent>
                </Card> */}
                <Card className="rounded-xl border-none shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:col-span-4">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Recent Orders</CardTitle>
                        <CardDescription>
                          Latest orders across the platform
                        </CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-lg bg-white"
                      >
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <RecentOrdersTable recentOrders={overview.recent_orders} />
                  </CardContent>
                </Card>
                <Card className="rounded-xl border-none shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:col-span-3">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
                    <CardTitle>Top Selling Meals</CardTitle>
                    <CardDescription>
                      Top 5 meals by order volume
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <TopMeals topMeals={overview.top_meals} />
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            {showEmptyStates ? (
              <>
                <Card className="rounded-xl border-none shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:col-span-4">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Recent Orders</CardTitle>
                        <CardDescription>
                          Latest orders across the platform
                        </CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-lg bg-white"
                      >
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <RecentOrdersTable showEmptyState={true} />
                  </CardContent>
                </Card>
                <Card className="rounded-xl border-none shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:col-span-3">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
                    <CardTitle>User Statistics</CardTitle>
                    <CardDescription>New vs returning users</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <UserStatsChart showEmptyState={true} />
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                <Card className="rounded-xl border-none shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:col-span-4">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Revenue Overview</CardTitle>
                        <CardDescription>
                          Monthly revenue for the current year
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-lg bg-white"
                        >
                          Monthly
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-lg"
                        >
                          Yearly
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <RevenueChart />
                  </CardContent>
                </Card>
                <Card className="rounded-xl border-none shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:col-span-3">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
                    <CardTitle>User Statistics</CardTitle>
                    <CardDescription>New vs returning users</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <UserStatsChart />
                  </CardContent>
                </Card>
              </>
            )}
          </div> */}

          {showEmptyStates ? (
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="rounded-xl border-none shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
                  <CardTitle>Upcoming Deliveries</CardTitle>
                  <CardDescription>Scheduled for today</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <EmptyCardState
                    title="No deliveries scheduled"
                    description="Upcoming deliveries will appear here once scheduled."
                    icon={<Calendar className="h-6 w-6 text-gray-400" />}
                  />
                </CardContent>
              </Card>
              <Card className="rounded-xl border-none shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
                  <CardTitle>Inventory Status</CardTitle>
                  <CardDescription>Current meal ingredients</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <EmptyCardState
                    title="No inventory data"
                    description="Inventory status will appear here once items are added."
                    icon={<ShoppingBag className="h-6 w-6 text-gray-400" />}
                  />
                </CardContent>
              </Card>
              <Card className="rounded-xl border-none shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
                  <CardTitle>Customer Satisfaction</CardTitle>
                  <CardDescription>Based on recent reviews</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <EmptyCardState
                    title="No reviews yet"
                    description="Customer satisfaction data will appear here once reviews are submitted."
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-gray-400"
                      >
                        <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                        <path d="M8.5 8.5v.01" />
                        <path d="M16 15.5v.01" />
                        <path d="M12 12v.01" />
                        <path d="M11 17v.01" />
                        <path d="M7 14v.01" />
                      </svg>
                    }
                  />
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="rounded-xl border-none shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
                  <CardTitle>Upcoming Deliveries</CardTitle>
                  <CardDescription>Scheduled for today</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                      <Calendar className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">247</div>
                      <p className="text-sm text-muted-foreground">
                        deliveries scheduled
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Morning (8am-12pm)
                      </span>
                      <span className="font-medium">86 orders</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Afternoon (12pm-4pm)
                      </span>
                      <span className="font-medium">94 orders</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Evening (4pm-8pm)
                      </span>
                      <span className="font-medium">67 orders</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-xl border-none shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
                  <CardTitle>Inventory Status</CardTitle>
                  <CardDescription>Current meal ingredients</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                      <ShoppingBag className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">98.2%</div>
                      <p className="text-sm text-muted-foreground">
                        inventory fulfillment
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Low stock items
                      </span>
                      <span className="font-medium">12 items</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Out of stock
                      </span>
                      <span className="font-medium">3 items</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Reorder needed
                      </span>
                      <span className="font-medium">8 items</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-xl border-none shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
                  <CardTitle>Customer Satisfaction</CardTitle>
                  <CardDescription>Based on recent reviews</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-emerald-600"
                      >
                        <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                        <path d="M8.5 8.5v.01" />
                        <path d="M16 15.5v.01" />
                        <path d="M12 12v.01" />
                        <path d="M11 17v.01" />
                        <path d="M7 14v.01" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">4.8/5</div>
                      <p className="text-sm text-muted-foreground">
                        average rating
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Food quality
                      </span>
                      <span className="font-medium">4.9/5</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Delivery time
                      </span>
                      <span className="font-medium">4.7/5</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Customer service
                      </span>
                      <span className="font-medium">4.8/5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          {showEmptyStates ? (
            <EmptyAnalyticsState />
          ) : (
            <Card className="rounded-xl border-none shadow-md overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
                <CardTitle>Analytics Content</CardTitle>
                <CardDescription>
                  Detailed analytics will be displayed here
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-muted-foreground">
                  Analytics content is under development.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          {showEmptyStates ? (
            <Card className="rounded-xl border-none shadow-md overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
                <CardTitle>Reports Content</CardTitle>
                <CardDescription>
                  Generated reports will be displayed here
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <EmptyCardState
                  title="No reports available"
                  description="Reports will be available once you have data to analyze."
                  actionLabel="Configure Reports"
                />
              </CardContent>
            </Card>
          ) : (
            <Card className="rounded-xl border-none shadow-md overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
                <CardTitle>Reports Content</CardTitle>
                <CardDescription>
                  Generated reports will be displayed here
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-muted-foreground">
                  Reports content is under development.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          {showEmptyStates ? (
            <Card className="rounded-xl border-none shadow-md overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
                <CardTitle>Notifications Content</CardTitle>
                <CardDescription>
                  System notifications will be displayed here
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <EmptyCardState
                  title="No notifications"
                  description="You're all caught up! New notifications will appear here."
                  actionLabel="Configure Notifications"
                />
              </CardContent>
            </Card>
          ) : (
            <Card className="rounded-xl border-none shadow-md overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
                <CardTitle>Notifications Content</CardTitle>
                <CardDescription>
                  System notifications will be displayed here
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-muted-foreground">
                  Notifications content is under development.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <ContactSupportDialog
        open={supportDialogOpen}
        onOpenChange={setSupportDialogOpen}
      />
    </div>
  );
}
