"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Calendar,
  ClipboardList,
  CreditCard,
  Home,
  Menu,
  Package,
  Settings,
  ShoppingBag,
  Users,
  Tag,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Users",
      icon: Users,
      href: "/users",
      active: pathname === "/users",
    },
    {
      label: "Orders",
      icon: Package,
      href: "/orders",
      active: pathname === "/orders",
    },
    {
      label: "Meals",
      icon: ShoppingBag,
      href: "/meals",
      active: pathname === "/meals",
    },
    {
      label: "Categories",
      icon: Tag,
      href: "categories",
      active: pathname === "/admin/categories",
    },
    // {
    //   label: "Subscriptions",
    //   icon: ClipboardList,
    //   href: "/subscriptions",
    //   active: pathname === "/subscriptions",
    // },
    // {
    //   label: "Payments",
    //   icon: CreditCard,
    //   href: "/payments",
    //   active: pathname === "/payments",
    // },
    // {
    //   label: "Delivery Schedule",
    //   icon: Calendar,
    //   href: "/schedule",
    //   active: pathname === "/schedule",
    // },
    // {
    //   label: "Analytics",
    //   icon: BarChart3,
    //   href: "/analytics",
    //   active: pathname === "/analytics",
    // },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
      active: pathname === "/settings",
    },
  ];

  // Add ripple effect to buttons
  const addRipple = (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    const element = event.currentTarget;
    const ripple = document.createElement("span");
    const rect = element.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className =
      "absolute rounded-full bg-white bg-opacity-30 pointer-events-none";
    ripple.style.animation = "ripple 0.6s linear";

    element.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-white to-gray-50">
      <style jsx global>{`
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white/80 backdrop-blur-md px-4 md:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden relative overflow-hidden rounded-xl transition-all hover:-translate-y-1 hover:shadow-md active:translate-y-0"
          onClick={(e) => {
            addRipple(e);
            setOpen(true);
          }}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 text-white">
            <Package className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold">House Kitchen Admin</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative overflow-hidden rounded-xl transition-all hover:-translate-y-1 hover:shadow-md active:translate-y-0"
                onClick={addRipple}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="Admin"
                  />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-xl">
              <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/dashboard" className="flex items-center w-full">
                  <Home className="mr-2 h-4 w-4" />
                  <span>Customer Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Mobile menu */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-[280px] p-0 border-r-0">
          <div className="flex h-16 items-center gap-2 border-b px-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 text-white">
              <Package className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold">MealBox Admin</span>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto rounded-xl"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <div className="p-4 space-y-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2 transition-all",
                  route.active
                    ? "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                )}
                onClick={() => setOpen(false)}
              >
                <route.icon className="h-5 w-5" />
                {route.label}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-white md:block fixed h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="flex flex-col gap-2 p-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2 transition-all",
                  route.active
                    ? "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <route.icon className="h-5 w-5" />
                {route.label}
              </Link>
            ))}
          </div>
        </aside>
        <main className="flex-1 md:ml-64 w-full overflow-x-hidden">
          <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
