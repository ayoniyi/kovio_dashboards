'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from "next/navigation";
import { ChevronLeft, Send, Paperclip } from 'lucide-react'
import CustomButton from '@/components/ui/custom/button'
import Link from 'next/link'
import useMutateData from '@/hooks/useMutateData'
import { toast } from "@/hooks/use-toast";
import { X } from 'lucide-react';
import useFetch from '@/hooks/useFetch'
import Loader from '@/components/ui/custom/loader'
import NoData from '@/components/ui/custom/noAavaialbleData'

interface MessageProp {
  message: string;
  sender: string;
  attachment: string;
  date: string;
}

interface Support {
  reference: string;
  message: string;
  status: string;
  date: string;
  messages: MessageProp[]; 
}

interface ResponseBody {
  description: string;
  responseBody: Support;
}

interface ApiError {
  message: string;
}


export default function CustomerSupportID() {
  
   const params = useParams();
  const reference = params.reference as string;

   const { data, isLoading, isError, error } = useFetch<ResponseBody, ApiError>({
    key: ["fetchSingleticket", reference],
    url: `/user-service/support/fetch-support-requests?request_reference=${reference}`
  });

  console.log(data);
  

  return (
    <div className='min-h-screen p-4'>
      <h1 className="text-2xl text-kv-venue-header font-semibold mb-6 tracking-extra-wide text-gray-800">
        Ticket Details
      </h1>
     
     
    </div>
  )
}




