"use client";

import type React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import Link from "next/link";
import { EmptyTableState } from "@/components/admin/EmptyStates";

interface RecentOrdersTableProps {
  showEmptyState?: boolean;
}

export function RecentOrdersTable({
  showEmptyState = false,
}: RecentOrdersTableProps) {
  const orders = showEmptyState
    ? []
    : [
        {
          id: "ORD-7291",
          customer: "Alex Johnson",
          date: "April 11, 2023",
          status: "Delivered",
          total: "$59.96",
        },
        {
          id: "ORD-6384",
          customer: "Sarah Williams",
          date: "April 11, 2023",
          status: "Preparing",
          total: "$44.97",
        },
        {
          id: "ORD-5127",
          customer: "Michael Brown",
          date: "April 11, 2023",
          status: "Ready",
          total: "$59.96",
        },
        {
          id: "ORD-4982",
          customer: "Emily Davis",
          date: "April 10, 2023",
          status: "Confirmed",
          total: "$29.98",
        },
        {
          id: "ORD-3756",
          customer: "David Wilson",
          date: "April 10, 2023",
          status: "Pending",
          total: "$59.96",
        },
      ];

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

  if (showEmptyState || orders.length === 0) {
    return (
      <EmptyTableState
        title="No recent orders"
        description="When customers place orders, they will appear here."
        actionLabel="View All Orders"
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table className="border-collapse border-spacing-0">
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
              Order ID
            </TableHead>
            <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
              Customer
            </TableHead>
            <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
              Date
            </TableHead>
            <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
              Status
            </TableHead>
            <TableHead className="py-3 px-4 text-sm font-medium text-gray-600 text-right">
              Total
            </TableHead>
            <TableHead className="py-3 px-4 text-sm font-medium text-gray-600"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => (
            <TableRow
              key={order.id}
              className="transition-all duration-300 hover:bg-gray-50 hover:scale-[1.01] opacity-0 animate-[fadeIn_0.5s_cubic-bezier(0.22,1,0.36,1)_forwards]"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <TableCell className="py-3 px-4 border-t border-gray-100 font-medium">
                {order.id}
              </TableCell>
              <TableCell className="py-3 px-4 border-t border-gray-100">
                {order.customer}
              </TableCell>
              <TableCell className="py-3 px-4 border-t border-gray-100">
                {order.date}
              </TableCell>
              <TableCell className="py-3 px-4 border-t border-gray-100">
                <Badge
                  variant="outline"
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    order.status === "Delivered"
                      ? "bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700 animate-[pulse_2s_infinite]"
                      : order.status === "Preparing"
                      ? "bg-purple-50 text-purple-700 hover:bg-purple-50 hover:text-purple-700 animate-[pulse_2s_infinite]"
                      : order.status === "Pending"
                      ? "bg-amber-50 text-amber-700 hover:bg-amber-50 hover:text-amber-700 animate-[pulse_2s_infinite]"
                      : order.status === "Confirmed"
                      ? "bg-blue-50 text-blue-700 hover:bg-blue-50 hover:text-blue-700 animate-[pulse_2s_infinite]"
                      : order.status === "Ready"
                      ? "bg-teal-50 text-teal-700 hover:bg-teal-50 hover:text-teal-700 animate-[pulse_2s_infinite]"
                      : order.status === "Cancelled"
                      ? "bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700"
                      : ""
                  }`}
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell className="py-3 px-4 border-t border-gray-100 text-right font-medium">
                {order.total}
              </TableCell>
              <TableCell className="py-3 px-4 border-t border-gray-100">
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-xl relative overflow-hidden transition-all hover:-translate-y-1"
                  asChild
                  onClick={addRipple}
                >
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="flex items-center gap-1"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
