"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Save, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AdminSettings() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-green-600">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Configure system settings, notifications, and preferences.
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 rounded-xl">
          <TabsTrigger
            value="general"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            General
          </TabsTrigger>
          {/* <TabsTrigger
            value="notifications"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Notifications
          </TabsTrigger> */}
          {/* <TabsTrigger
            value="delivery"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Delivery
          </TabsTrigger>
          <TabsTrigger
            value="payments"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Payments
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Security
          </TabsTrigger>
          <TabsTrigger
            value="api"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            API
          </TabsTrigger> */}
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="rounded-xl border-none shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your system-wide settings
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    defaultValue="House Kitchen"
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input
                    id="support-email"
                    type="email"
                    defaultValue="support@mealbox.com"
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-phone">Support Phone</Label>
                  <Input
                    id="support-phone"
                    type="tel"
                    defaultValue="(555) 123-4567"
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Default Timezone</Label>
                  <Select defaultValue="america_new_york">
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="america_new_york">
                        America/New York
                      </SelectItem>
                      <SelectItem value="america_chicago">
                        America/Chicago
                      </SelectItem>
                      <SelectItem value="america_denver">
                        America/Denver
                      </SelectItem>
                      <SelectItem value="america_los_angeles">
                        America/Los Angeles
                      </SelectItem>
                      <SelectItem value="europe_london">
                        Europe/London
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select defaultValue="mdy">
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 p-6 pt-0">
              <Button variant="outline" className="rounded-xl">
                Cancel
              </Button>
              <Button
                className="rounded-xl bg-emerald-600 hover:bg-emerald-700"
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>

          <Card className="rounded-xl border-none shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
              <CardTitle>System Maintenance</CardTitle>
              <CardDescription>
                Configure system maintenance settings
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Put the system in maintenance mode to prevent user access
                  </p>
                </div>
                <Switch id="maintenance-mode" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-backup">Automatic Backups</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable automatic daily backups of the system
                  </p>
                </div>
                <Switch id="auto-backup" defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="backup-time">Backup Time</Label>
                <Select defaultValue="midnight">
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select backup time" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="midnight">
                      12:00 AM (Midnight)
                    </SelectItem>
                    <SelectItem value="early_morning">3:00 AM</SelectItem>
                    <SelectItem value="morning">6:00 AM</SelectItem>
                    <SelectItem value="noon">12:00 PM (Noon)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 p-6 pt-0">
              <Button variant="outline" className="rounded-xl">
                Cancel
              </Button>
              <Button
                className="rounded-xl bg-emerald-600 hover:bg-emerald-700"
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="rounded-xl border-none shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure system notifications</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="order-notifications">
                      Order Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications for new orders
                    </p>
                  </div>
                  <Switch id="order-notifications" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="delivery-notifications">
                      Delivery Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications for delivery status changes
                    </p>
                  </div>
                  <Switch id="delivery-notifications" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="user-notifications">
                      User Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications for new user registrations
                    </p>
                  </div>
                  <Switch id="user-notifications" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="system-notifications">
                      System Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications for system events and errors
                    </p>
                  </div>
                  <Switch id="system-notifications" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 p-6 pt-0">
              <Button variant="outline" className="rounded-xl">
                Cancel
              </Button>
              <Button
                className="rounded-xl bg-emerald-600 hover:bg-emerald-700"
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="delivery" className="space-y-6">
          <Card className="rounded-xl border-none shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
              <CardTitle>Delivery Settings</CardTitle>
              <CardDescription>
                Configure delivery options and zones
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="delivery-radius">
                    Delivery Radius (miles)
                  </Label>
                  <Input
                    id="delivery-radius"
                    type="number"
                    defaultValue="25"
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="delivery-fee">
                    Standard Delivery Fee ($)
                  </Label>
                  <Input
                    id="delivery-fee"
                    type="number"
                    defaultValue="5.99"
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="free-delivery-threshold">
                    Free Delivery Threshold ($)
                  </Label>
                  <Input
                    id="free-delivery-threshold"
                    type="number"
                    defaultValue="50"
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="delivery-time-slots">
                    Delivery Time Slots
                  </Label>
                  <Textarea
                    id="delivery-time-slots"
                    className="rounded-xl h-24"
                    defaultValue="8:00 AM - 12:00 PM&#10;12:00 PM - 4:00 PM&#10;4:00 PM - 8:00 PM"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter one time slot per line
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 p-6 pt-0">
              <Button variant="outline" className="rounded-xl">
                Cancel
              </Button>
              <Button
                className="rounded-xl bg-emerald-600 hover:bg-emerald-700"
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card className="rounded-xl border-none shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>
                Configure payment methods and processors
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="stripe-enabled">Stripe Payments</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable Stripe payment processing
                    </p>
                  </div>
                  <Switch id="stripe-enabled" defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stripe-api-key">Stripe API Key</Label>
                  <Input
                    id="stripe-api-key"
                    type="password"
                    defaultValue="sk_test_••••••••••••••••"
                    className="rounded-xl"
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="paypal-enabled">PayPal Payments</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable PayPal payment processing
                    </p>
                  </div>
                  <Switch id="paypal-enabled" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paypal-client-id">PayPal Client ID</Label>
                  <Input id="paypal-client-id" className="rounded-xl" />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="tax-enabled">
                      Automatic Tax Calculation
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically calculate and apply taxes
                    </p>
                  </div>
                  <Switch id="tax-enabled" defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-rate">Default Tax Rate (%)</Label>
                  <Input
                    id="tax-rate"
                    type="number"
                    defaultValue="8.5"
                    className="rounded-xl"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 p-6 pt-0">
              <Button variant="outline" className="rounded-xl">
                Cancel
              </Button>
              <Button
                className="rounded-xl bg-emerald-600 hover:bg-emerald-700"
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="rounded-xl border-none shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor-auth">
                      Two-Factor Authentication
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Require two-factor authentication for admin accounts
                    </p>
                  </div>
                  <Switch id="two-factor-auth" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="password-expiry">Password Expiry</Label>
                    <p className="text-sm text-muted-foreground">
                      Force password reset after a certain period
                    </p>
                  </div>
                  <Switch id="password-expiry" defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-expiry-days">
                    Password Expiry Period (days)
                  </Label>
                  <Input
                    id="password-expiry-days"
                    type="number"
                    defaultValue="90"
                    className="rounded-xl"
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="session-timeout">Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically log out inactive users
                    </p>
                  </div>
                  <Switch id="session-timeout" defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="session-timeout-minutes">
                    Session Timeout (minutes)
                  </Label>
                  <Input
                    id="session-timeout-minutes"
                    type="number"
                    defaultValue="30"
                    className="rounded-xl"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 p-6 pt-0">
              <Button variant="outline" className="rounded-xl">
                Cancel
              </Button>
              <Button
                className="rounded-xl bg-emerald-600 hover:bg-emerald-700"
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card className="rounded-xl border-none shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
              <CardTitle>API Settings</CardTitle>
              <CardDescription>Manage API keys and access</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="api-enabled">API Access</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable API access for third-party integrations
                    </p>
                  </div>
                  <Switch id="api-enabled" defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="api-key"
                      readOnly
                      defaultValue="mbox_api_••••••••••••••••"
                      className="rounded-xl flex-1"
                    />
                    <Button variant="outline" className="rounded-xl">
                      Regenerate
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api-rate-limit">
                    API Rate Limit (requests per minute)
                  </Label>
                  <Input
                    id="api-rate-limit"
                    type="number"
                    defaultValue="100"
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input
                    id="webhook-url"
                    defaultValue="https://example.com/webhook"
                    className="rounded-xl"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 p-6 pt-0">
              <Button variant="outline" className="rounded-xl">
                Cancel
              </Button>
              <Button
                className="rounded-xl bg-emerald-600 hover:bg-emerald-700"
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
