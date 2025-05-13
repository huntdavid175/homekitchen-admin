"use client";

import { useEffect, useRef } from "react";
import { EmptyChartState } from "@/components/admin/EmptyStates";

interface UserStatsChartProps {
  showEmptyState?: boolean;
}

export function UserStatsChart({
  showEmptyState = false,
}: UserStatsChartProps) {
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
    const data = [
      { label: "New Users", value: 65, color: "#8b5cf6" },
      { label: "Returning Users", value: 35, color: "#6366f1" },
    ];

    // Chart dimensions
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 40;
    const total = data.reduce((sum, item) => sum + item.value, 0);

    // Draw the pie chart
    let startAngle = -Math.PI / 2; // Start from the top

    data.forEach((item) => {
      const sliceAngle = (2 * Math.PI * item.value) / total;

      // Draw the slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();

      ctx.fillStyle = item.color;
      ctx.fill();

      // Calculate the middle angle for the label
      const middleAngle = startAngle + sliceAngle / 2;
      const labelRadius = radius * 0.7;
      const labelX = centerX + labelRadius * Math.cos(middleAngle);
      const labelY = centerY + labelRadius * Math.sin(middleAngle);

      // Draw the percentage label
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 16px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${item.value}%`, labelX, labelY);

      startAngle += sliceAngle;
    });

    // Draw the center circle (donut hole)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.5, 0, 2 * Math.PI);
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    // Draw the legend
    const legendY = canvas.height - 50;
    const legendSpacing = 120;
    const legendStartX = centerX - ((data.length - 1) * legendSpacing) / 2;

    data.forEach((item, index) => {
      const legendX = legendStartX + index * legendSpacing;

      // Draw legend color box
      ctx.fillStyle = item.color;
      ctx.fillRect(legendX - 40, legendY, 15, 15);

      // Draw legend text
      ctx.fillStyle = "#374151";
      ctx.font = "14px Inter, sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(item.label, legendX - 20, legendY + 7);
    });
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
