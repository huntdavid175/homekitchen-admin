"use client";

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
import { Calendar, Eye } from "lucide-react";
import Link from "next/link";

interface UserOrdersTableProps {
  userId: string;
  limit?: number;
}

export function UserOrdersTable({ userId, limit }: UserOrdersTableProps) {
  // This would normally come from an API call using the userId
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
  ];

  // Apply limit if provided
  const displayedOrders = limit ? orders.slice(0, limit) : orders;

  return (
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
          {displayedOrders.map((order, index) => (
            <TableRow
              key={order.id}
              className="transition-all duration-300 hover:bg-gray-50 hover:scale-[1.01] opacity-0 animate-[fadeIn_0.5s_cubic-bezier(0.22,1,0.36,1)_forwards]"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
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
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-xl"
                  asChild
                >
                  <Link
                    href={`/orders/${order.id}`}
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
