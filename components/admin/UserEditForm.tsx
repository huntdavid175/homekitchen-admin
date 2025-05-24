"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  role: string;
  subscriptionPlan: string;
  joinDate: string;
  lastOrder: string;
  totalOrders: number;
  totalSpent: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  paymentMethods: Array<{
    type: string;
    last4: string;
    expiry: string;
    isDefault: boolean;
  }>;
  preferences: {
    dietaryRestrictions: string[];
    allergies: string[];
    favoriteCategories: string[];
  };
}

interface UserEditFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
}

export function UserEditForm({ open, onOpenChange, user }: UserEditFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      // Here you would typically update the user data in your backend
    }, 1500);
  };

  const handleRemovePreference = (
    type: "dietaryRestrictions" | "allergies" | "favoriteCategories",
    item: string
  ) => {
    setFormData({
      ...formData,
      preferences: {
        ...formData.preferences,
        [type]: formData.preferences[type].filter((i) => i !== item),
      },
    });
  };

  const handleAddPreference = (
    type: "dietaryRestrictions" | "allergies" | "favoriteCategories",
    item: string
  ) => {
    if (item && !formData.preferences[type].includes(item)) {
      setFormData({
        ...formData,
        preferences: {
          ...formData.preferences,
          [type]: [...formData.preferences[type], item],
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] p-0 rounded-xl border-none shadow-lg overflow-hidden">
        <DialogHeader className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50">
          <DialogTitle className="text-xl font-bold">Edit User</DialogTitle>
          <DialogDescription>
            Update user information and preferences
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="bg-muted/50 p-1 rounded-xl mb-6">
              <TabsTrigger
                value="basic"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Basic Info
              </TabsTrigger>
              <TabsTrigger
                value="address"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Address
              </TabsTrigger>
              <TabsTrigger
                value="preferences"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Preferences
              </TabsTrigger>
              <TabsTrigger
                value="subscription"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Subscription
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger id="status" className="rounded-lg">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={
                      formData.role.charAt(0).toUpperCase() +
                      formData.role.slice(1)
                    }
                    onValueChange={(value) =>
                      setFormData({ ...formData, role: value })
                    }
                  >
                    <SelectTrigger id="role" className="rounded-lg">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Customer">Customer</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            {/* <TabsContent value="address" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  value={formData.address.street}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, street: e.target.value },
                    })
                  }
                  className="rounded-lg"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.address.city}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: { ...formData.address, city: e.target.value },
                      })
                    }
                    className="rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.address.state}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: { ...formData.address, state: e.target.value },
                      })
                    }
                    className="rounded-lg"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input
                    id="zip"
                    value={formData.address.zip}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: { ...formData.address, zip: e.target.value },
                      })
                    }
                    className="rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={formData.address.country}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: {
                          ...formData.address,
                          country: e.target.value,
                        },
                      })
                    }
                    className="rounded-lg"
                  />
                </div>
              </div>
            </TabsContent> */}

            {/* <TabsContent value="preferences" className="space-y-6">
              <div className="space-y-4">
                <Label>Dietary Restrictions</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.preferences.dietaryRestrictions.map(
                    (restriction) => (
                      <Badge
                        key={restriction}
                        variant="secondary"
                        className="rounded-full pl-3 pr-2 py-1.5"
                      >
                        {restriction}
                        <button
                          type="button"
                          className="ml-1 rounded-full hover:bg-muted"
                          onClick={() =>
                            handleRemovePreference(
                              "dietaryRestrictions",
                              restriction
                            )
                          }
                        >
                          ×
                        </button>
                      </Badge>
                    )
                  )}
                </div>
                <div className="flex gap-2">
                  <Input
                    id="newRestriction"
                    placeholder="Add restriction..."
                    className="rounded-lg"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddPreference(
                          "dietaryRestrictions",
                          e.currentTarget.value
                        );
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-lg"
                    onClick={(e) => {
                      const input = document.getElementById(
                        "newRestriction"
                      ) as HTMLInputElement;
                      handleAddPreference("dietaryRestrictions", input.value);
                      input.value = "";
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Allergies</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.preferences.allergies.map((allergy) => (
                    <Badge
                      key={allergy}
                      variant="destructive"
                      className="rounded-full pl-3 pr-2 py-1.5"
                    >
                      {allergy}
                      <button
                        type="button"
                        className="ml-1 rounded-full hover:bg-red-700"
                        onClick={() =>
                          handleRemovePreference("allergies", allergy)
                        }
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    id="newAllergy"
                    placeholder="Add allergy..."
                    className="rounded-lg"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddPreference("allergies", e.currentTarget.value);
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-lg"
                    onClick={(e) => {
                      const input = document.getElementById(
                        "newAllergy"
                      ) as HTMLInputElement;
                      handleAddPreference("allergies", input.value);
                      input.value = "";
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Favorite Categories</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.preferences.favoriteCategories.map((category) => (
                    <Badge
                      key={category}
                      variant="outline"
                      className="rounded-full pl-3 pr-2 py-1.5"
                    >
                      {category}
                      <button
                        type="button"
                        className="ml-1 rounded-full hover:bg-muted"
                        onClick={() =>
                          handleRemovePreference("favoriteCategories", category)
                        }
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    id="newCategory"
                    placeholder="Add category..."
                    className="rounded-lg"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddPreference(
                          "favoriteCategories",
                          e.currentTarget.value
                        );
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-lg"
                    onClick={(e) => {
                      const input = document.getElementById(
                        "newCategory"
                      ) as HTMLInputElement;
                      handleAddPreference("favoriteCategories", input.value);
                      input.value = "";
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </TabsContent> */}

            {/* <TabsContent value="subscription" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subscriptionPlan">Subscription Plan</Label>
                <Select
                  value={formData.subscriptionPlan}
                  onValueChange={(value) =>
                    setFormData({ ...formData, subscriptionPlan: value })
                  }
                >
                  <SelectTrigger id="subscriptionPlan" className="rounded-lg">
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Plans</SelectLabel>
                      <SelectItem value="Basic">Basic</SelectItem>
                      <SelectItem value="Premium">Premium</SelectItem>
                      <SelectItem value="Family">Family</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Subscription Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any notes about this user's subscription..."
                  className="rounded-lg min-h-[100px]"
                />
              </div>
            </TabsContent> */}
          </Tabs>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-lg"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-lg bg-indigo-600 hover:bg-indigo-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
