import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import useFetch from "@/hooks/useFetch";
import NoData from "./noAavaialbleData";
import MetricCardSkeleton from "./DashboardsSkeleton";

interface DashboardData {
  salesPercentageChange: number;
  totalBookings: number;
  bookingsPercentageChange: number;
}

interface ApiResponse {
  description: string;
  responseBody: DashboardData;
}

interface ApiError {
  message: string;
}

const CircularProgress = ({
  percentage,
  size = 200,
  strokeWidth = 28,
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}) => {
  // Responsive size - smaller on mobile
  const responsiveSize =
    typeof window !== "undefined" && window.innerWidth < 768 ? 120 : size;
  const responsiveStroke =
    typeof window !== "undefined" && window.innerWidth < 768 ? 20 : strokeWidth;

  const radius = (responsiveSize - responsiveStroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: responsiveSize, height: responsiveSize }}
    >
      <svg
        className="transform -rotate-90"
        width={responsiveSize}
        height={responsiveSize}
      >
        <circle
          cx={responsiveSize / 2}
          cy={responsiveSize / 2}
          r={radius}
          stroke="#f1f5f9"
          strokeWidth={responsiveStroke}
          fill="transparent"
        />
        <circle
          cx={responsiveSize / 2}
          cy={responsiveSize / 2}
          r={radius}
          stroke="url(#salesGradient)"
          strokeWidth={responsiveStroke}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-in-out"
        />
      </svg>
      <svg
        className="absolute inset-0 pointer-events-none"
        width="0"
        height="0"
      >
        <defs>
          <linearGradient
            id="salesGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`text-lg md:text-xl font-semibold ${
            percentage >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {percentage >= 0 ? "+" : ""}
          {percentage.toFixed(1)}%
        </span>
      </div>
    </div>
  );
};

const PieChart = ({
  segments,
  size = 220,
  totalBookings,
}: {
  segments: number[];
  size?: number;
  totalBookings: number;
}) => {
  // Responsive size - smaller on mobile
  const responsiveSize =
    typeof window !== "undefined" && window.innerWidth < 768 ? 140 : size;

  const colors = ["#6366f1", "#8b5cf6", "#c4b5fd"];
  let cumulativePercentage = 0;
  const radius = responsiveSize / 2 - 10;
  const centerX = responsiveSize / 2;
  const centerY = responsiveSize / 2;

  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const createPath = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return `M ${centerX} ${centerY} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
  };

  // If no bookings, show empty state
  if (totalBookings === 0) {
    return (
      <div
        className="relative flex items-center justify-center"
        style={{ width: responsiveSize, height: responsiveSize }}
      >
        <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
          <span className="text-sm text-gray-500">No Bookings</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: responsiveSize, height: responsiveSize }}
    >
      <svg
        width={responsiveSize}
        height={responsiveSize}
        className="transition-all duration-700"
      >
        {segments.map((segment, index) => {
          const startAngle = cumulativePercentage * 3.6;
          cumulativePercentage += segment;
          const endAngle = cumulativePercentage * 3.6;

          return (
            <path
              key={index}
              d={createPath(startAngle, endAngle)}
              fill={colors[index]}
              className="transition-all duration-700 hover:opacity-80 cursor-pointer"
            />
          );
        })}
      </svg>

      {/* Display total bookings in center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg md:text-xl font-semibold text-kv-semi-black">
          {totalBookings}
        </span>
      </div>
    </div>
  );
};

export default function DashboardMetrics() {
  const { data, isLoading, isError, error } = useFetch<ApiResponse, ApiError>({
    url: "user-service/dashboard/fetch-dashboard",
    key: ["dashboardData"],
  });

  const generateBookingSegments = (totalBookings: number) => {
    if (totalBookings === 0) return [0, 0, 0];

    if (totalBookings <= 5) {
      return [100];
    } else if (totalBookings <= 20) {
      return [60, 40];
    } else {
      return [50, 30, 20];
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-9">
        <MetricCardSkeleton />
        <MetricCardSkeleton />
      </div>
    );
  }

  if (isError) {
    {
      error?.message;
    }
  }

  if (!data?.responseBody) {
    return <NoData />;
  }

  const dashboardData = data.responseBody;

  const salesProgress = Math.min(
    Math.max(Math.abs(dashboardData.salesPercentageChange || 0), 0),
    100
  );
  const bookingsSegments = generateBookingSegments(
    dashboardData.totalBookings || 0
  );
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-9">
      {/* Total Sales Card */}
      <Card className="border shadow-md p-4 rounded-3xl flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex justify-center mb-4 md:mb-0">
          <CircularProgress
            percentage={dashboardData.salesPercentageChange || 0}
          />
        </div>
        <div className="flex-1 md:ml-6">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4 p-0">
            <div className="space-y-1">
              <CardTitle className="text-base lg:text-lg font-medium text-kv-semi-black font-gabaritoHeading">
                Total Sales
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 p-0 pt-4">
            <div>
              <p className="text-sm lg:text-base text-muted-foreground font-normal font-interTightText">
                Sales Growth
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-xl md:text-2xl font-semibold tracking-tight font-interTightText text-kv-semi-black">
                  {dashboardData.salesPercentageChange === 0
                    ? "0"
                    : "Growth Tracking"}
                </span>
                <span
                  className={`text-sm font-medium ${
                    dashboardData.salesPercentageChange >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {dashboardData.salesPercentageChange >= 0 ? "+" : ""}
                  {dashboardData.salesPercentageChange.toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Total Bookings Card */}
      <Card className="border p-4 rounded-3xl shadow-md flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex justify-center mb-4 md:mb-0">
          <PieChart
            segments={bookingsSegments}
            totalBookings={dashboardData.totalBookings || 0}
          />
        </div>

        <div className="flex-1 md:ml-6">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4 p-0">
            <div className="space-y-1">
              <CardTitle className="text-base lg:text-lg font-medium text-kv-semi-black font-gabaritoHeading">
                Total Bookings
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 p-0 pt-4">
            <div>
              <p className="text-sm lg:text-base text-muted-foreground font-normal font-interTightText">
                Accumulated Bookings
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-xl md:text-2xl font-semibold tracking-tight font-interTightText text-kv-semi-black">
                  {dashboardData.totalBookings || 0}
                </span>
                <span
                  className={`text-sm font-medium ${
                    dashboardData.bookingsPercentageChange >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {dashboardData.bookingsPercentageChange >= 0 ? "+" : ""}
                  {dashboardData.bookingsPercentageChange.toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
