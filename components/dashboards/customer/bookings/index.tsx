"use client";

import React from "react";
import { Card } from "@/components/ui/shadcn/card";
import { TableCell, TableRow } from "@/components/ui/shadcn/table";
import CustomTable from "@/components/ui/custom/CustomTable";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/ui/custom/loader";
import NoData from "@/components/ui/custom/noAavaialbleData";

interface ApiPlan {
  status: string;
  id: number;
  bookingCode: string;
  dateTime: string;
  customerName: string;
}

interface ApiResponse {
  description: string;
  responseBody: {
    items: ApiPlan[];
  };
}

interface ApiError {
  message: string;
}

export default function CustomerBookings() {
  const router = useRouter();

  const { data, isLoading, error, isError } = useFetch<ApiResponse, ApiError>({
    url: "/user-service/booking/view-bookings",
    key: ["customer-bookings"],
  });

  const bookings = [
    {
      id: 1,
      bookingCode: "ABC123",
      customerName: "John Doe",
      dateTime: "2023-08-10 10:00 AM",

      status: "Pending",
      action: "View",
    },
    // {
    //   id: 2,
    //   name: "Jane Smith",
    //   date: "2023-08-11",
    //   time: "11:00 AM",
    //   status: "Approved",
    //   action: "View",
    // },
  ];

  console.log(data);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    {
      error?.message;
    }
  }
  console.log(isError);

  if (!data || !data.responseBody) {
    return <NoData />;
  }

  //: ApiPlan[] = data.responseBody.items || [];
  return (
    <div className="min-h-screen">
      <Card className="rounded-3xl shadow-sm">
        <div className="items-center p-4 border-b flex justify-between">
          <h2 className="text-base  font-gabaritoHeading lg:text-xl font-semibold tracking-extra-wide text-kv-semi-black">
            Your Booking
          </h2>
        </div>

        <CustomTable
          headers={[
            { label: "Booking Code" },
            { label: "Customer Name" },
            { label: "Date & Time" },
            { label: "Status" },
            { label: "Action" },
          ]}
          data={bookings}
          renderRow={(booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.bookingCode}</TableCell>
              <TableCell>{booking.customerName}</TableCell>
              <TableCell>{booking.dateTime}</TableCell>
              <TableCell>{booking.status}</TableCell>
              <TableCell>
                <button
                  onClick={() =>
                    router.push(`/customer/bookings/${booking.id}`)
                  }
                  className="text-kv-primary hover:text-orange-600 font-medium"
                >
                  View Booking
                </button>
              </TableCell>
            </TableRow>
          )}
        />
      </Card>
    </div>
  );
}
