"use client"

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import bookDetailsImg from "@/public/newimages/bookingDetailsImg.png"
type Booking = {
  id: number;
  customerName: string;
  dateTime: string;
  location: string;
  email: string;
  phone: string;
  services: string[];
  status: {
    bookingAccepted: boolean;
    amountSent: boolean;
    paymentMade: boolean;
  }
};

const bookingsData: Booking[] = [
  {
    id: 1,
    customerName: "James Kayode",
    dateTime: "Feb 10, 2025 11:00 am",
    location: "14, Okuneye, Maryland Lagos",
    email: "james.kayode@gmail.com",
    phone: "+234 801 234 5678",
    services: ["Buffet", "Small Chops", "Plated Service"],
    status: {
      bookingAccepted: true,
      amountSent: true,
      paymentMade: false
    }
  },
  {
    id: 2,
    customerName: "Sarah Johnson",
    dateTime: "Feb 12, 2025 02:30 pm",
    location: "5, Victoria Island, Lagos",
    email: "sarah.j@gmail.com",
    phone: "+234 802 345 6789",
    services: ["Buffet", "Dessert Table", "Drink Service"],
    status: {
      bookingAccepted: true,
      amountSent: true,
      paymentMade: true
    }
  },
  {
    id: 3,
    customerName: "Michael Adebayo",
    dateTime: "Feb 13, 2025 09:15 am",
    location: "23, Ikorodu Road, Lagos",
    email: "michael.adebayo@gmail.com",
    phone: "+234 803 456 7890",
    services: ["Small Chops", "Plated Service"],
    status: {
      bookingAccepted: true,
      amountSent: false,
      paymentMade: false
    }
  },
];

export default function DashboardVendorID() {
  const params = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    const bookingId = Number(params.id);
    const foundBooking = bookingsData.find(b => b.id === bookingId);
    
    if (foundBooking) {
      setBooking(foundBooking);
    }
    
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return <div className="max-w-4xl mx-auto p-6">Loading booking details...</div>;
  }

  if (!booking) {
    return <div className="max-w-4xl mx-auto p-6">Booking not found</div>;
  }

  const dateTimeParts = booking.dateTime.split(' ');
  const date = `${dateTimeParts[0]} ${dateTimeParts[1]} ${dateTimeParts[2]}`;
  const time = `${dateTimeParts[3]} ${dateTimeParts[4]}`;

  const locationParts = booking.location.split(', ');
  const address = locationParts[0];
  const city = locationParts.slice(1).join(', ');

  return (
    <div className="p-6">
     
      <h1 className="text-lg lg:text-2xl text-kv-venue-header font-semibold mb-6 tracking-extra-wide">Booking details</h1>
      
      <div className="mb-6">
        <Link href="/vendor/bookings" className="flex items-center text-gray-500 hover:text-gray-700">
          <ChevronLeft size={20} className="mr-1" />
          <span className="text-sm font-medium">Go back</span>
        </Link>
      </div>
      <div className="mb-6">
        <div className="flex items-center">
          <div className="rounded-full overflow-hidden">
          <Image src={bookDetailsImg}  alt='Booking Details'/>          

         </div>
        </div>
      </div>

      <div className="grid grid-cols-1 text-kv-venue-header font-semibold md:grid-cols-3 gap-4">

        <div className="border rounded-lg">
          <h2 className="text-base font-medium text-black border-b-2 leading-6 mb-4 p-4">Customer Information</h2>
          
        <div className='px-4'>
          <div className="mb-3">
            <p className="text-xs text-gray-500">Full Name</p>
            <p className="">{booking.customerName}</p>
          </div>
          
          <div className="mb-3">
            <p className="text-xs text-gray-500">Phone Number</p>
            <p className="">{booking.phone}</p>
          </div>
          
          <div className="mb-3">
            <p className="text-xs text-gray-500">Email</p>
            <p className="">{booking.email}</p>
          </div>
        </div>
      </div>
        {/* Event Information */}
        <div className="border rounded-lg">
          <h2 className="text-base font-medium text-black border-b-2 p-4 leading-6 mb-4">Event Information</h2>
         
        <div className='px-4'>
          <div className="mb-3">
            <p className="text-xs text-gray-500">Date</p>
            <p className="font-medium">{date}</p>
          </div>
          
          <div className="mb-3">
            <p className="text-xs text-gray-500">Time</p>
            <p className="font-medium">{time}</p>
          </div>
          
          <div className="mb-3">
            <p className="text-xs text-gray-500">Location</p>
            <p className="font-medium">{city}</p>
          </div>
         </div>
        </div>

        {/* Services Needed */}
        <div className="border rounded-lg ">
          <h2 className="text-base font-medium border-b-2 text-black leading-6 mb-4 p-4">Services Needed</h2>
          
           <div className='px-4'>
            <ol className="list-decimal pl-5 text-kv-venue-header text-sm font-semibold leading-5 tracking-extra-wide">
             {booking.services.map((service, index) => (
              <li key={index} className="mb-3">{service}</li> 
            ))}
          </ol>
           </div>
        </div>

       
                   
      

<div className="border rounded-lg ">
      <h2 className="text-base font-semibold mb-6 border-b-2 p-4">Status History</h2>
      
      <div className="relative">
        <div className="flex mb-3 relative">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 text-2xl font-medium z-10 relative">
              1
            </div>
            
            {(booking.status.amountSent || booking.status.bookingAccepted) && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 h-20 border-l-2 border-dashed mb-1 border-gray-400"></div>
            )}
          </div>
          
          <div className="ml-6 mt-2">
            <h3 className="text-sm font-medium">Booking Accepted</h3>
            <p className=" text-xs text-gray-500 mt-1">
              {booking.status.bookingAccepted ? 'Completed' : 'Pending'}
            </p>
          </div>
        </div>

       
        <div className="flex mb-3 relative">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 text-2xl font-medium z-10 relative">
              2
            </div>
            
            {/* {(booking.status.amountSent || booking.status.paymentMade) && ( */}
              {/* <div className="absolute top-full left-1/2 transform -translate-x-1/2 h-20 border-l-2 border-dashed mb-1 border-gray-400"> </div> */}
            {/* )} */}
          </div>
          
          <div className="ml-6 mt-2">
            <h3 className="text-sm font-medium">Send Amount</h3>
            <p className="text-xs text-gray-500 mt-1">
              {booking.status.amountSent ? 'Completed' : 'Pending'}
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex relative">
          <div className="relative">
            {/* Circle with number */}
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 text-2xl font-medium z-10 relative">
              3
            </div>
          </div>
          
          <div className="ml-6 mt-2">
            <h3 className="text-sm font-medium">Payment Made</h3>
            <p className=" text-xs text-gray-500 mt-1">
              {booking.status.paymentMade ? 'Completed' : 'Pending'}
            </p>
          </div>
        </div>
      </div>
    </div>







      </div>
    </div>
  );
}