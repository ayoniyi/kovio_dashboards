/** @format */
"use client";
import Loader from "@/components/ui/custom/loader";
import React, { Suspense } from "react";
import VendorBookings from "@/components/dashboards/vendor/bookings";
export default function page() {
  return (
    <div>
      <Suspense fallback={
        <Loader />
      }>
        <VendorBookings />
      </Suspense>
    </div>
  );
}
