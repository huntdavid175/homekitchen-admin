"use client";

import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  Download,
  RefreshCw,
  TrendingUp,
  Users,
} from "lucide-react";

export function AnalyticsDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const revenueChartRef = useRef<HTMLCanvasElement>(null);
  const ordersChartRef = useRef<HTMLCanvasElement>(null);
  const usersChartRef = useRef<HTMLCanvasElement>(null);
  const mealPopularityChartRef = useRef<HTMLCanvasElement>(null);
  const customerRetentionChartRef = useRef<HTMLCanvasElement>(null);
  const deliveryPerformanceChartRef = useRef<HTMLCanvasElement>(null);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  useEffect(() => {
    // Revenue Chart
    if (revenueChartRef.current) {
      const ctx = revenueChartRef.current.getContext("2d");
      if (ctx) {
        // Set canvas dimensions
        revenueChartRef.current.width = revenueChartRef.current.offsetWidth;
        revenueChartRef.current.height = revenueChartRef.current.offsetHeight;

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

        // Chart dimensions
        const padding = 40;
        const width = revenueChartRef.current.width - padding * 2;
        const height = revenueChartRef.current.height - padding * 2;

        // Find max value for scaling
        const maxValue = Math.max(...revenue) * 1.1;

        // Draw chart background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(
          0,
          0,
          revenueChartRef.current.width,
          revenueChartRef.current.height
        );

        // Draw grid lines
        ctx.strokeStyle = "#e5e7eb";
        ctx.lineWidth = 1;
        ctx.beginPath();

        // Horizontal grid lines
        for (let i = 0; i <= 5; i++) {
          const y = padding + (height - height * (i / 5));
          ctx.moveTo(padding, y);
          ctx.lineTo(revenueChartRef.current.width - padding, y);
        }

        // Vertical grid lines
        for (let i = 0; i < months.length; i++) {
          const x = padding + i * (width / (months.length - 1));
          ctx.moveTo(x, padding);
          ctx.lineTo(x, revenueChartRef.current.height - padding);
        }

        ctx.stroke();

        // Draw axes labels
        ctx.fillStyle = "#6b7280";
        ctx.font = "12px Inter, sans-serif";
        ctx.textAlign = "center";

        // X-axis labels (months)
        for (let i = 0; i < months.length; i++) {
          const x = padding + i * (width / (months.length - 1));
          ctx.fillText(
            months[i],
            x,
            revenueChartRef.current.height - padding / 2
          );
        }

        // Y-axis labels (values)
        ctx.textAlign = "right";
        for (let i = 0; i <= 5; i++) {
          const y = padding + (height - height * (i / 5));
          const value = Math.round((maxValue * i) / 5);
          ctx.fillText(`$${value.toLocaleString()}`, padding - 10, y + 4);
        }

        // Draw revenue line
        ctx.strokeStyle = "#8b5cf6";
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let i = 0; i < months.length; i++) {
          const x = padding + i * (width / (months.length - 1));
          const y = padding + height - (revenue[i] / maxValue) * height;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();

        // Draw area under the line
        ctx.fillStyle = "rgba(139, 92, 246, 0.1)";
        ctx.beginPath();
        for (let i = 0; i < months.length; i++) {
          const x = padding + i * (width / (months.length - 1));
          const y = padding + height - (revenue[i] / maxValue) * height;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.lineTo(padding + width, padding + height);
        ctx.lineTo(padding, padding + height);
        ctx.closePath();
        ctx.fill();

        // Draw data points
        ctx.fillStyle = "#8b5cf6";
        for (let i = 0; i < months.length; i++) {
          const x = padding + i * (width / (months.length - 1));
          const y = padding + height - (revenue[i] / maxValue) * height;
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Orders Chart
    if (ordersChartRef.current) {
      const ctx = ordersChartRef.current.getContext("2d");
      if (ctx) {
        // Set canvas dimensions
        ordersChartRef.current.width = ordersChartRef.current.offsetWidth;
        ordersChartRef.current.height = ordersChartRef.current.offsetHeight;

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
        const orders = [
          1200, 1350, 1280, 1500, 1650, 1800, 1750, 1900, 2000, 2100, 2050,
          2200,
        ];

        // Chart dimensions
        const padding = 40;
        const width = ordersChartRef.current.width - padding * 2;
        const height = ordersChartRef.current.height - padding * 2;
        const barWidth = width / months.length - 10;

        // Find max value for scaling
        const maxValue = Math.max(...orders) * 1.1;

        // Draw chart background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(
          0,
          0,
          ordersChartRef.current.width,
          ordersChartRef.current.height
        );

        // Draw grid lines
        ctx.strokeStyle = "#e5e7eb";
        ctx.lineWidth = 1;
        ctx.beginPath();

        // Horizontal grid lines
        for (let i = 0; i <= 5; i++) {
          const y = padding + (height - height * (i / 5));
          ctx.moveTo(padding, y);
          ctx.lineTo(ordersChartRef.current.width - padding, y);
        }

        ctx.stroke();

        // Draw axes labels
        ctx.fillStyle = "#6b7280";
        ctx.font = "12px Inter, sans-serif";
        ctx.textAlign = "center";

        // X-axis labels (months)
        for (let i = 0; i < months.length; i++) {
          const x = padding + i * (width / months.length) + barWidth / 2;
          ctx.fillText(
            months[i],
            x,
            ordersChartRef.current.height - padding / 2
          );
        }

        // Y-axis labels (values)
        ctx.textAlign = "right";
        for (let i = 0; i <= 5; i++) {
          const y = padding + (height - height * (i / 5));
          const value = Math.round((maxValue * i) / 5);
          ctx.fillText(value.toLocaleString(), padding - 10, y + 4);
        }

        // Draw bars
        for (let i = 0; i < months.length; i++) {
          const x = padding + i * (width / months.length);
          const barHeight = (orders[i] / maxValue) * height;
          const y = padding + height - barHeight;

          // Create gradient for bars
          const gradient = ctx.createLinearGradient(x, y, x, padding + height);
          gradient.addColorStop(0, "#6366f1");
          gradient.addColorStop(1, "#818cf8");

          ctx.fillStyle = gradient;
          ctx.fillRect(x, y, barWidth, barHeight);
        }
      }
    }

    // Users Chart
    if (usersChartRef.current) {
      const ctx = usersChartRef.current.getContext("2d");
      if (ctx) {
        // Set canvas dimensions
        usersChartRef.current.width = usersChartRef.current.offsetWidth;
        usersChartRef.current.height = usersChartRef.current.offsetHeight;

        // Data for the chart
        const data = [
          { label: "New Users", value: 65, color: "#8b5cf6" },
          { label: "Returning Users", value: 35, color: "#6366f1" },
        ];

        // Chart dimensions
        const centerX = usersChartRef.current.width / 2;
        const centerY = usersChartRef.current.height / 2;
        const radius = Math.min(centerX, centerY) - 40;
        const total = data.reduce((sum, item) => sum + item.value, 0);

        // Draw the pie chart
        let startAngle = -Math.PI / 2; // Start from the top

        data.forEach((item) => {
          const sliceAngle = (2 * Math.PI * item.value) / total;

          // Draw the slice
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.arc(
            centerX,
            centerY,
            radius,
            startAngle,
            startAngle + sliceAngle
          );
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
        const legendY = usersChartRef.current.height - 50;
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
      }
    }

    // Meal Popularity Chart
    if (mealPopularityChartRef.current) {
      const ctx = mealPopularityChartRef.current.getContext("2d");
      if (ctx) {
        // Set canvas dimensions
        mealPopularityChartRef.current.width =
          mealPopularityChartRef.current.offsetWidth;
        mealPopularityChartRef.current.height =
          mealPopularityChartRef.current.offsetHeight;

        // Data for the chart
        const meals = [
          "Garlic Butter Salmon",
          "Chicken Fajita Bowl",
          "Vegetable Stir Fry",
          "Beef Tacos",
          "Mushroom Risotto",
        ];
        const orders = [1245, 1120, 980, 865, 740];

        // Chart dimensions
        const padding = 100;
        const width = mealPopularityChartRef.current.width - padding * 2;
        const height = mealPopularityChartRef.current.height - padding * 2;
        const barHeight = height / meals.length - 10;

        // Find max value for scaling
        const maxValue = Math.max(...orders) * 1.1;

        // Draw chart background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(
          0,
          0,
          mealPopularityChartRef.current.width,
          mealPopularityChartRef.current.height
        );

        // Draw grid lines
        ctx.strokeStyle = "#e5e7eb";
        ctx.lineWidth = 1;
        ctx.beginPath();

        // Vertical grid lines
        for (let i = 0; i <= 5; i++) {
          const x = padding + (width * i) / 5;
          ctx.moveTo(x, padding);
          ctx.lineTo(x, padding + height);
        }

        ctx.stroke();

        // Draw axes labels
        ctx.fillStyle = "#6b7280";
        ctx.font = "12px Inter, sans-serif";
        ctx.textAlign = "center";

        // X-axis labels (values)
        for (let i = 0; i <= 5; i++) {
          const x = padding + (width * i) / 5;
          const value = Math.round((maxValue * i) / 5);
          ctx.fillText(value.toLocaleString(), x, padding + height + 20);
        }

        // Y-axis labels (meals)
        ctx.textAlign = "right";
        for (let i = 0; i < meals.length; i++) {
          const y = padding + i * (height / meals.length) + barHeight / 2;
          ctx.fillText(meals[i], padding - 10, y + 4);
        }

        // Draw horizontal bars
        for (let i = 0; i < meals.length; i++) {
          const y = padding + i * (height / meals.length);
          const barWidth = (orders[i] / maxValue) * width;
          const x = padding;

          // Create gradient for bars
          const gradient = ctx.createLinearGradient(x, y, x + barWidth, y);
          gradient.addColorStop(0, "#8b5cf6");
          gradient.addColorStop(1, "#6366f1");

          ctx.fillStyle = gradient;
          ctx.fillRect(x, y, barWidth, barHeight);
        }
      }
    }

    // Customer Retention Chart
    if (customerRetentionChartRef.current) {
      const ctx = customerRetentionChartRef.current.getContext("2d");
      if (ctx) {
        // Set canvas dimensions
        customerRetentionChartRef.current.width =
          customerRetentionChartRef.current.offsetWidth;
        customerRetentionChartRef.current.height =
          customerRetentionChartRef.current.offsetHeight;

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
        const newUsers = [
          300, 320, 310, 350, 370, 390, 380, 400, 410, 420, 410, 430,
        ];
        const returningUsers = [
          800, 850, 830, 900, 950, 1000, 980, 1050, 1100, 1150, 1130, 1200,
        ];

        // Chart dimensions
        const padding = 40;
        const width = customerRetentionChartRef.current.width - padding * 2;
        const height = customerRetentionChartRef.current.height - padding * 2;
        const barWidth = width / months.length - 10;
        const groupWidth = barWidth * 2 + 4;

        // Find max value for scaling
        const maxValue = Math.max(...newUsers, ...returningUsers) * 1.1;

        // Draw chart background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(
          0,
          0,
          customerRetentionChartRef.current.width,
          customerRetentionChartRef.current.height
        );

        // Draw grid lines
        ctx.strokeStyle = "#e5e7eb";
        ctx.lineWidth = 1;
        ctx.beginPath();

        // Horizontal grid lines
        for (let i = 0; i <= 5; i++) {
          const y = padding + (height - height * (i / 5));
          ctx.moveTo(padding, y);
          ctx.lineTo(customerRetentionChartRef.current.width - padding, y);
        }

        ctx.stroke();

        // Draw axes labels
        ctx.fillStyle = "#6b7280";
        ctx.font = "12px Inter, sans-serif";
        ctx.textAlign = "center";

        // X-axis labels (months)
        for (let i = 0; i < months.length; i++) {
          const x = padding + i * (width / months.length) + groupWidth / 2;
          ctx.fillText(
            months[i],
            x,
            customerRetentionChartRef.current.height - padding / 2
          );
        }

        // Y-axis labels (values)
        ctx.textAlign = "right";
        for (let i = 0; i <= 5; i++) {
          const y = padding + (height - height * (i / 5));
          const value = Math.round((maxValue * i) / 5);
          ctx.fillText(value.toLocaleString(), padding - 10, y + 4);
        }

        // Draw bars
        for (let i = 0; i < months.length; i++) {
          const x = padding + i * (width / months.length);

          // New users bar
          const newUserBarHeight = (newUsers[i] / maxValue) * height;
          const newUserY = padding + height - newUserBarHeight;

          // Create gradient for new users bars
          const newUserGradient = ctx.createLinearGradient(
            x,
            newUserY,
            x,
            padding + height
          );
          newUserGradient.addColorStop(0, "#8b5cf6");
          newUserGradient.addColorStop(1, "#a78bfa");

          ctx.fillStyle = newUserGradient;
          ctx.fillRect(x, newUserY, barWidth, newUserBarHeight);

          // Returning users bar
          const returningUserBarHeight =
            (returningUsers[i] / maxValue) * height;
          const returningUserY = padding + height - returningUserBarHeight;
          const returningUserX = x + barWidth + 4;

          // Create gradient for returning users bars
          const returningUserGradient = ctx.createLinearGradient(
            returningUserX,
            returningUserY,
            returningUserX,
            padding + height
          );
          returningUserGradient.addColorStop(0, "#6366f1");
          returningUserGradient.addColorStop(1, "#818cf8");

          ctx.fillStyle = returningUserGradient;
          ctx.fillRect(
            returningUserX,
            returningUserY,
            barWidth,
            returningUserBarHeight
          );
        }

        // Draw legend
        const legendY = 30;
        const legendX1 = customerRetentionChartRef.current.width / 2 - 100;
        const legendX2 = customerRetentionChartRef.current.width / 2 + 20;

        // New users legend
        ctx.fillStyle = "#8b5cf6";
        ctx.fillRect(legendX1 - 20, legendY, 15, 15);
        ctx.fillStyle = "#374151";
        ctx.textAlign = "left";
        ctx.fillText("New Users", legendX1, legendY + 8);

        // Returning users legend
        ctx.fillStyle = "#6366f1";
        ctx.fillRect(legendX2 - 20, legendY, 15, 15);
        ctx.fillStyle = "#374151";
        ctx.fillText("Returning Users", legendX2, legendY + 8);
      }
    }

    // Delivery Performance Chart
    if (deliveryPerformanceChartRef.current) {
      const ctx = deliveryPerformanceChartRef.current.getContext("2d");
      if (ctx) {
        // Set canvas dimensions
        deliveryPerformanceChartRef.current.width =
          deliveryPerformanceChartRef.current.offsetWidth;
        deliveryPerformanceChartRef.current.height =
          deliveryPerformanceChartRef.current.offsetHeight;

        // Data for the chart
        const data = [
          { label: "On Time", value: 82, color: "#10b981" },
          { label: "Early", value: 10, color: "#6366f1" },
          { label: "Late", value: 8, color: "#f43f5e" },
        ];

        // Chart dimensions
        const centerX = deliveryPerformanceChartRef.current.width / 2;
        const centerY = deliveryPerformanceChartRef.current.height / 2;
        const radius = Math.min(centerX, centerY) - 40;
        const total = data.reduce((sum, item) => sum + item.value, 0);

        // Draw the pie chart
        let startAngle = -Math.PI / 2; // Start from the top

        data.forEach((item) => {
          const sliceAngle = (2 * Math.PI * item.value) / total;

          // Draw the slice
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.arc(
            centerX,
            centerY,
            radius,
            startAngle,
            startAngle + sliceAngle
          );
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
        const legendY = deliveryPerformanceChartRef.current.height - 50;
        const legendSpacing = 100;
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
      }
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
          Analytics Dashboard
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            Comprehensive analytics and insights for your meal delivery
            business.
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex items-center gap-2 rounded-xl"
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
              className="hidden md:flex items-center gap-2 rounded-xl"
            >
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-xl border-none shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-indigo-50 to-purple-50">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
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
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-indigo-50 to-purple-50">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground mt-1">+180 this week</p>
            <div className="mt-4 flex items-center gap-1 text-xs text-green-600 font-medium">
              <ArrowUp className="h-3 w-3" />
              <span>12.5%</span>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-none shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-indigo-50 to-purple-50">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">12,234</div>
            <p className="text-xs text-muted-foreground mt-1">
              +2.6% from last month
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs text-green-600 font-medium">
              <ArrowUp className="h-3 w-3" />
              <span>4.3%</span>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-none shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-indigo-50 to-purple-50">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">3.6%</div>
            <p className="text-xs text-muted-foreground mt-1">
              +0.8% from last month
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs text-red-600 font-medium">
              <ArrowDown className="h-3 w-3" />
              <span>0.2%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 rounded-xl">
          <TabsTrigger
            value="overview"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="revenue"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Revenue
          </TabsTrigger>
          <TabsTrigger
            value="users"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Users
          </TabsTrigger>
          <TabsTrigger
            value="meals"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Meals
          </TabsTrigger>
          <TabsTrigger
            value="delivery"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Delivery
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="rounded-xl border-none shadow-md overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Revenue Overview</CardTitle>
                    <CardDescription>
                      Monthly revenue for the current year
                    </CardDescription>
                  </div>
                  <Select defaultValue="year">
                    <SelectTrigger className="w-[120px] rounded-xl">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="year">This Year</SelectItem>
                      <SelectItem value="quarter">This Quarter</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="w-full h-[300px]">
                  <canvas
                    ref={revenueChartRef}
                    className="w-full h-full"
                  ></canvas>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-xl border-none shadow-md overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Orders Overview</CardTitle>
                    <CardDescription>
                      Monthly orders for the current year
                    </CardDescription>
                  </div>
                  <Select defaultValue="year">
                    <SelectTrigger className="w-[120px] rounded-xl">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="year">This Year</SelectItem>
                      <SelectItem value="quarter">This Quarter</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="w-full h-[300px]">
                  <canvas
                    ref={ordersChartRef}
                    className="w-full h-full"
                  ></canvas>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="rounded-xl border-none shadow-md overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                <CardTitle>User Statistics</CardTitle>
                <CardDescription>New vs returning users</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="w-full h-[300px]">
                  <canvas
                    ref={usersChartRef}
                    className="w-full h-full"
                  ></canvas>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-xl border-none shadow-md overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                <CardTitle>Top Selling Meals</CardTitle>
                <CardDescription>
                  Most popular meals by order volume
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="w-full h-[300px]">
                  <canvas
                    ref={mealPopularityChartRef}
                    className="w-full h-full"
                  ></canvas>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <Card className="rounded-xl border-none shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
              <CardTitle>Revenue Analysis</CardTitle>
              <CardDescription>
                Detailed breakdown of revenue sources
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">
                    Revenue by Subscription Type
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Premium Plan</span>
                        <span className="text-sm font-medium">$32,450.65</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div
                          className="h-2 rounded-full bg-indigo-500"
                          style={{ width: "72%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Basic Plan</span>
                        <span className="text-sm font-medium">$12,781.24</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div
                          className="h-2 rounded-full bg-indigo-500"
                          style={{ width: "28%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">
                    Revenue by Payment Method
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Credit Card</span>
                        <span className="text-sm font-medium">68%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div
                          className="h-2 rounded-full bg-indigo-500"
                          style={{ width: "68%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">PayPal</span>
                        <span className="text-sm font-medium">22%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div
                          className="h-2 rounded-full bg-indigo-500"
                          style={{ width: "22%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Other</span>
                        <span className="text-sm font-medium">10%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div
                          className="h-2 rounded-full bg-indigo-500"
                          style={{ width: "10%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card className="rounded-xl border-none shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
              <CardTitle>User Retention</CardTitle>
              <CardDescription>
                New vs returning users over time
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="w-full h-[300px]">
                <canvas
                  ref={customerRetentionChartRef}
                  className="w-full h-full"
                ></canvas>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meals" className="space-y-6">
          <Card className="rounded-xl border-none shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
              <CardTitle>Meal Popularity</CardTitle>
              <CardDescription>Most ordered meals by volume</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="w-full h-[300px]">
                <canvas
                  ref={mealPopularityChartRef}
                  className="w-full h-full"
                ></canvas>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delivery" className="space-y-6">
          <Card className="rounded-xl border-none shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
              <CardTitle>Delivery Performance</CardTitle>
              <CardDescription>On-time delivery statistics</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="w-full h-[300px]">
                <canvas
                  ref={deliveryPerformanceChartRef}
                  className="w-full h-full"
                ></canvas>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
