
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

type BookingData = {
  customerinformation: {
    fullName?: string;
    email?: string;
  };
  bookingInformation: {
    bookingCode?: string;
    customerName?: string;
    dateTime?: string;
    bookingId?: number;
    status?: string;
  };
  servicesNeeded: Record<string, string>;
  vendorInformation: {
    businessName?: string;
    businessType?: string;
    businessStreet?: string;
    businessCity?: string;
    businessCountry?: string;
  };
  paymentResponse: {
    amount?: number;
    status?: string;
    method?: string;
  };
};

interface ApiResponse {
  message: string;
  description: string;
  responseBody: BookingData;
}

interface ApiError {
  responseBody: any;
  message: string;
}

import { Toaster } from "@/components/ui/shadcn/toaster";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/ui/custom/loader";
import NoData from "@/components/ui/custom/noAavaialbleData";

export default function BookingDetailsID() {
  const { data, isLoading, error, isError } = useFetch<ApiError, ApiResponse>({
    url: "/booking/view-booking-information",
    key: ["customer-bookings"]
  });

  const params = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<BookingData | null>(null);

  console.log(data);

  useEffect(() => {
    if (data?.responseBody) {
      const bookingId = Number(params.id);
      if (data.responseBody.bookingInformation?.bookingId === bookingId) {
        setBooking(data.responseBody);
      }
    }
  }, [params.id, data]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
        {error?.message}
  }

  if (!data?.responseBody) { 
        <NoData />
  }

  if (!booking) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-600 text-center">Booking not found.</p>
      </div>
    );
  }

  // Helper functions for safe data extraction
  const formatDateTime = (dateTime?: string) => {
    if (!dateTime) return { date: "N/A", time: "N/A" };
    
    try {
      const dt = new Date(dateTime);
      const date = dt.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      const time = dt.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      return { date, time };
    } catch {
      return { date: dateTime, time: "N/A" };
    }
  };

  const getServicesArray = (services: Record<string, string>) => {
    if (!services || Object.keys(services).length === 0) return [];
    return Object.values(services).filter(service => service && service.trim() !== "");
  };

  const getFullAddress = (vendorInfo: BookingData['vendorInformation']) => {
    const parts = [];
    if (vendorInfo.businessStreet) parts.push(vendorInfo.businessStreet);
    if (vendorInfo.businessCity) parts.push(vendorInfo.businessCity);
    if (vendorInfo.businessCountry) parts.push(vendorInfo.businessCountry);
    return parts.join(", ") || "N/A";
  };

  // Extract data safely
  const { date, time } = formatDateTime(booking.bookingInformation?.dateTime);
  const services = getServicesArray(booking.servicesNeeded || {});
  const fullAddress = getFullAddress(booking.vendorInformation || {});
  const amount = booking.paymentResponse?.amount ? `NGN ${booking.paymentResponse.amount.toLocaleString()}` : "N/A";

  // Styles
  const labelClass = "text-sm text-[#6B7280] leading-5 tracking-extra-wide";
  const valueClass = "text-sm font-semibold leading-5 tracking-extra-wide text-[#1F2937]";
  const sectionTitleClass = "text-base font-normal text-black border-b-2 leading-6 mb-4 p-4";
  const cardClass = "border rounded-3xl shadow-sm";

  return (
    <div>
      <h1 className="text-lg lg:text-xl text-kv-venue-header font-gabaritoHeading font-semibold mb-6 tracking-extra-wide">
        Booking Details
      </h1>

      <div className="mb-6">
        <Link
          href=""
          onClick={() => window.history.back()}
          className="flex items-center text-gray-500 hover:text-gray-700"
        >
          <ChevronLeft size={20} className="mr-1" />
          <span className="text-sm font-medium">Go back</span>
        </Link>
      </div>

      {/* Booking Code Display */}
      {booking.bookingInformation?.bookingCode && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600">Booking Code</p>
          <p className="text-lg font-semibold text-blue-800">
            {booking.bookingInformation.bookingCode}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 text-kv-venue-header font-normal font-interTightText md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Customer Information */}
        <div className={cardClass}>
          <h2 className={sectionTitleClass}>Customer Information</h2>
          <div className="px-4 pb-4">
            <div className="mb-3">
              <p className={labelClass}>Full Name</p>
              <p className={valueClass}>
                {booking.customerinformation?.fullName || booking.bookingInformation?.customerName || "N/A"}
              </p>
            </div>
            <div className="mb-3">
              <p className={labelClass}>Email</p>
              <p className={valueClass}>
                {booking.customerinformation?.email || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Event Information */}
        <div className={cardClass}>
          <h2 className={sectionTitleClass}>Event Information</h2>
          <div className="px-4 pb-4">
            <div className="mb-3">
              <p className={labelClass}>Date</p>
              <p className={valueClass}>{date}</p>
            </div>
            <div className="mb-3">
              <p className={labelClass}>Time</p>
              <p className={valueClass}>{time}</p>
            </div>
            <div className="mb-3">
              <p className={labelClass}>Location</p>
              <p className={valueClass}>{fullAddress}</p>
            </div>
            <div className="mb-3">
              <p className={labelClass}>Status</p>
              <p className={`${valueClass} ${
                booking.bookingInformation?.status === 'INITIATED' ? 'text-orange-600' :
                booking.bookingInformation?.status === 'CONFIRMED' ? 'text-green-600' :
                booking.bookingInformation?.status === 'CANCELLED' ? 'text-red-600' : ''
              }`}>
                {booking.bookingInformation?.status || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Vendor Information */}
        <div className={cardClass}>
          <h2 className={sectionTitleClass}>Vendor Information</h2>
          <div className="px-4 pb-4">
            <div className="mb-3">
              <p className={labelClass}>Business Name</p>
              <p className={valueClass}>
                {booking.vendorInformation?.businessName || "N/A"}
              </p>
            </div>
            <div className="mb-3">
              <p className={labelClass}>Business Type</p>
              <p className={valueClass}>
                {booking.vendorInformation?.businessType || "N/A"}
              </p>
            </div>
            <div className="mb-3">
              <p className={labelClass}>Address</p>
              <p className={valueClass}>{fullAddress}</p>
            </div>
          </div>
        </div>

        {/* Services Needed */}
        <div className={cardClass}>
          <h2 className={sectionTitleClass}>Services Needed</h2>
          <div className="px-4 pb-4">
            {services.length > 0 ? (
              <ol className="list-decimal pl-5 text-kv-venue-header text-sm font-medium leading-5 tracking-extra-wide">
                {services.map((service, index) => (
                  <li key={index} className="mb-2">
                    {service}
                  </li>
                ))}
              </ol>
            ) : (
              <p className={valueClass}>No services specified</p>
            )}
          </div>
        </div>

        {/* Payment Information */}
        <div className={cardClass}>
          <h2 className={sectionTitleClass}>Payment Information</h2>
          <div className="px-4 pb-4">
            <div className="mb-3">
              <p className={labelClass}>Amount</p>
              <p className={valueClass}>{amount}</p>
            </div>
            <div className="mb-3">
              <p className={labelClass}>Payment Method</p>
              <p className={valueClass}>
                {booking.paymentResponse?.method === "NA" ? "Not Available" : booking.paymentResponse?.method || "N/A"}
              </p>
            </div>
            <div className="mb-3">
              <p className={labelClass}>Payment Status</p>
              <p className={`${valueClass} ${
                booking.paymentResponse?.status === 'INITIATED' ? 'text-orange-600' :
                booking.paymentResponse?.status === 'COMPLETED' ? 'text-green-600' :
                booking.paymentResponse?.status === 'FAILED' ? 'text-red-600' : ''
              }`}>
                {booking.paymentResponse?.status || "N/A"}
              </p>
            </div>
            {booking.paymentResponse?.status === 'COMPLETED' && (
              <div className="mb-3">
                <p className={labelClass}>Receipt</p>
                <div className="flex gap-5 items-center text-kv-primary text-sm font-semibold leading-5 tracking-extra-wide">
                  <button className="hover:underline">View</button>
                  <button className="hover:underline">Download</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
}