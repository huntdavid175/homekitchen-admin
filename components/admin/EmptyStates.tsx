"use client";

import { Button } from "@/components/ui/button";

import type React from "react";

import {
  PackageIcon,
  FileIcon,
  SearchIcon,
  UsersIcon,
  BarChart3,
} from "lucide-react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onClick?: () => void;
}

export function EmptyCardState({
  icon,
  title,
  description,
  actionLabel,
  onClick,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        {icon || <FileIcon className="h-6 w-6 text-gray-400" />}
      </div>
      <h3 className="mt-4 text-sm font-medium">{title}</h3>
      <p className="mt-2 text-xs text-muted-foreground">{description}</p>
      {actionLabel && onClick && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClick}
          className="mt-4 rounded-xl"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export function EmptyTableState({
  icon,
  title,
  description,
  actionLabel,
  onClick,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        {icon || <FileIcon className="h-6 w-6 text-muted-foreground" />}
      </div>
      <h3 className="mt-4 text-sm font-medium">{title}</h3>
      <p className="mt-2 text-xs text-muted-foreground">{description}</p>
      {actionLabel && onClick && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClick}
          className="mt-4 rounded-xl"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export function EmptyAnalyticsState() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <BarChart3 className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-medium">No analytics data available</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Analytics data will appear here once your store starts generating
        revenue.
      </p>
    </div>
  );
}

export function EmptyOrdersState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <PackageIcon className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-sm font-medium">No orders found</h3>
      <p className="mt-2 text-xs text-muted-foreground">
        There are no orders to display at this time.
      </p>
    </div>
  );
}

export function EmptyChartState() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <SearchIcon className="h-6 w-6 text-muted-foreground" />
      <p className="mt-2 text-sm text-muted-foreground">
        No data to display chart.
      </p>
    </div>
  );
}

export function EmptyUsersState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <UsersIcon className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-sm font-medium">No users found</h3>
      <p className="mt-2 text-xs text-muted-foreground">
        There are no users to display at this time.
      </p>
    </div>
  );
}
