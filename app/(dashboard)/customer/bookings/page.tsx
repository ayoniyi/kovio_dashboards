/** @format */
"use client";
import CustomerBooking from "@/components/dashboards/customer/bookings";
import Loader from "@/components/ui/custom/loader";
import React, { Suspense } from "react";

export default function VendorBookings() {
  return (
    <div>
        <CustomerBooking />
     
    </div>
  );
}
