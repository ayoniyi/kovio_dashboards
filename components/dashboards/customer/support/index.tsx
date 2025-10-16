'use client'

import React, { useState } from "react";
import CustomTable from "@/components/ui/custom/CustomTable";
import { Card } from "@/components/ui/shadcn/card";
import { TableCell, TableRow } from "@/components/ui/shadcn/table";
import CustomButton from "@/components/ui/custom/button";
import Link from "next/link";
import CustomTabs from "@/components/ui/custom/CustomTabs";
import { useAllContx } from "@/context/allcontext";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/ui/custom/loader";
import NoData from "@/components/ui/custom/noAavaialbleData";

 interface response{
      reference: string,
      message:  string,
      status: string,
      date: string
    }
  
    interface Api{
      responseBody:[
        response
      ]
    }

    interface ApiError{
      message:string
    }
export default function CustomerSupport() {
   const [activeTab, setActiveTab] = useState<string>("Open Tickets");
     

   const {data, isLoading, isError, error} = useFetch<Api, ApiError>({
    key: ["fetch-support-requests"],
    url: "/user-service/support/fetch-support-requests",
   })

   console.log(data)

   if(isLoading){
    <Loader/>
   }

   if(isError){
    <div>{error.message}</div>
   }

   if(!data?.responseBody){
   <div> <NoData/></div>
   }
  const support = data?.responseBody || []
  return (
    <div className="min-h-screen">

      <Card className="rounded-3xl shadow-sm">
        <div className="items-center p-4 border-b">
          <h2 className="text-base lg:text-xl font-semibold tracking-extra-wide text-kv-semi-black">
             Open Support Tickets
          </h2>
        </div>

        <CustomTable
          headers={[
            { label: "Message" },
            { label: "Date & Time" },
            { label: "Status" },
            { label: "Action" }


          ]}
          data={support}
          renderRow={(details) => (
            <TableRow key={details.reference}>
              <TableCell>{details.message}</TableCell>
              <TableCell>{details.date}</TableCell>
               <TableCell>{details.status}</TableCell>
               <TableCell>
                <Link
                  href={`/customer/support/${details.reference}`}
                  className="text-kv-primary hover:text-orange-600"
                >
                  <CustomButton children="View" />
                </Link>
              </TableCell>
            </TableRow>
          )}
        />
      </Card>
    </div>
  );
}

