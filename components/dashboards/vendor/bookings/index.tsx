"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/shadcn/card";
import { TableCell, TableRow } from "@/components/ui/shadcn/table";
import CustomTable from "@/components/ui/custom/CustomTable";
import useFetch from "@/hooks/useFetch";
import NoData from "@/components/ui/custom/noAavaialbleData";
import Loader from "@/components/ui/custom/loader";

interface VendorBookings{
  bookingCode: string,
  customerName: string,
  dateTime:string,
  bookingId: number,
  status: string
}

interface BookingResponse{
  description: string
  responseBody:{
    items: VendorBookings[]
  }
}

interface ApiError{ 
  message:string
}
export default function VendorBookings() {
  
  const {data, isLoading, isError, error} = useFetch<BookingResponse, ApiError>({
   key: ["VendorBooking"],
   url: "/user-service/booking/fetch-business-bookings"
  })


  console.log(data)

  if (isLoading){
    <Loader/>
  }

  if(isError){
    error.message
  }

  if(!data){
    <NoData/>
  }
   const  VendorBooking = data?.responseBody.items || []

  return (
    <div className="min-h-screen">
      <Card className=" rounded-3xl shadow-sm ">
        <div className=" items-center p-4 border-b">
          <h2 className="text-base lg:text-xl font-gabaritoHeading font-semibold tracking-extra-wide text-kv-semi-black ">
            Your Bookings
          </h2>
        </div>

        <CustomTable
          headers={[
            { label: "Booking Code" },
            { label: "Customer Name" },
            { label: "Date & Time" },
            { label: "Status" }
          ]}
          data={VendorBooking}
          renderRow={(booking) => (
            <TableRow key={booking.bookingId}>
              <TableCell>{booking.bookingCode}</TableCell>
              <TableCell>{booking.customerName}</TableCell>
              <TableCell>{booking.dateTime}</TableCell>

              <TableCell>
                  {booking.status}
              </TableCell>
            </TableRow>
          )}
        />
      </Card>
    </div>
  );
}
