"use client";

import { useEffect, useRef } from "react";
import { EmptyChartState } from "@/components/admin/EmptyStates";

interface RevenueChartProps {
  showEmptyState?: boolean;
}

export function RevenueChart({ showEmptyState = false }: RevenueChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (showEmptyState) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Data for the chart
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const revenue = [
      30000, 35000, 32000, 40000, 45000, 50000, 48000, 52000, 55000, 58000,
      56000, 60000,
    ];
    const expenses = [
      20000, 22000, 21000, 25000, 28000, 30000, 29000, 31000, 33000, 35000,
      34000, 36000,
    ];

    // Chart dimensions
    const padding = 40;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;
    const barWidth = width / months.length / 3;
    const spacing = barWidth / 2;

    // Find max value for scaling
    const maxValue = Math.max(...revenue, ...expenses) * 1.1;

    // Draw chart background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    ctx.beginPath();

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (height - height * (i / 5));
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
    }

    // Vertical grid lines
    for (let i = 0; i < months.length; i++) {
      const x = padding + i * (width / (months.length - 1));
      ctx.moveTo(x, padding);
      ctx.lineTo(x, canvas.height - padding);
    }

    ctx.stroke();

    // Draw axes labels
    ctx.fillStyle = "#6b7280";
    ctx.font = "12px Inter, sans-serif";
    ctx.textAlign = "center";

    // X-axis labels (months)
    for (let i = 0; i < months.length; i++) {
      const x = padding + i * (width / (months.length - 1));
      ctx.fillText(months[i], x, canvas.height - padding / 2);
    }

    // Y-axis labels (values)
    ctx.textAlign = "right";
    for (let i = 0; i <= 5; i++) {
      const y = padding + (height - height * (i / 5));
      const value = Math.round((maxValue * i) / 5);
      ctx.fillText(`$${value.toLocaleString()}`, padding - 10, y + 4);
    }

    // Draw revenue bars
    for (let i = 0; i < months.length; i++) {
      const x =
        padding + i * (width / (months.length - 1)) - barWidth - spacing / 2;
      const barHeight = (revenue[i] / maxValue) * height;
      const y = canvas.height - padding - barHeight;

      // Create gradient for revenue bars
      const gradient = ctx.createLinearGradient(
        x,
        y,
        x,
        canvas.height - padding
      );
      gradient.addColorStop(0, "#8b5cf6");
      gradient.addColorStop(1, "#a78bfa");

      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth, barHeight);
    }

    // Draw expenses bars
    for (let i = 0; i < months.length; i++) {
      const x = padding + i * (width / (months.length - 1)) + spacing / 2;
      const barHeight = (expenses[i] / maxValue) * height;
      const y = canvas.height - padding - barHeight;

      // Create gradient for expenses bars
      const gradient = ctx.createLinearGradient(
        x,
        y,
        x,
        canvas.height - padding
      );
      gradient.addColorStop(0, "#6366f1");
      gradient.addColorStop(1, "#818cf8");

      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth, barHeight);
    }

    // Draw legend
    const legendX = canvas.width - 150;
    const legendY = padding + 20;

    // Revenue legend
    ctx.fillStyle = "#8b5cf6";
    ctx.fillRect(legendX, legendY, 15, 15);
    ctx.fillStyle = "#374151";
    ctx.textAlign = "left";
    ctx.fillText("Revenue", legendX + 25, legendY + 12);

    // Expenses legend
    ctx.fillStyle = "#6366f1";
    ctx.fillRect(legendX, legendY + 25, 15, 15);
    ctx.fillStyle = "#374151";
    ctx.fillText("Expenses", legendX + 25, legendY + 37);
  }, [showEmptyState]);

  if (showEmptyState) {
    return <EmptyChartState />;
  }

  return (
    <div className="w-full h-[300px]">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  );
}
