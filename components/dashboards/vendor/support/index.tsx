/** @format */
"use client";
import React, { useState } from "react";
import CustomTable from "@/components/ui/custom/CustomTable";
import { Card } from "@/components/ui/shadcn/card";
import { TableCell, TableRow } from "@/components/ui/shadcn/table";
import CustomButton from "@/components/ui/custom/button";
import Link from "next/link";
import CustomTabs from "@/components/ui/custom/CustomTabs";
import { useAllContx } from "@/context/allcontext";

const supportDataMap = {
  "Open Tickets": [
    {
      id: 1,
      dateTime: "Feb 10, 2025 11:00 am",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
      id: 2,
      dateTime: "Feb 10, 2025 11:00 am",
      description: "14, Okugade Okuneye Street, Mende Maryland Lagos",
    },
    {
      id: 3,
      dateTime: "Feb 10, 2025 11:00 am",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
    },
    {
      id: 4,
      dateTime: "Feb 10, 2025 11:00 am",
      description: "14, Okugade Okuneye Street, Mende Maryland Lagos",
    },
    {
      id: 5,
      dateTime: "Feb 10, 2025 11:00 am",
      description: "14, Okugade Okuneye Street, Mende Maryland Lagos",
    },
  ],
  "Close Tickets": [
    {
      id: 6,
      dateTime: "Feb 12, 2025 02:30 pm",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
      id: 7,
      dateTime: "Feb 13, 2025 09:15 am",
      description: "14, Okugade Okuneye Street, Mende Maryland Lagos",
    },
    {
      id: 8,
      dateTime: "Feb 13, 2025 09:15 am",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
    },
    {
      id: 9,
      dateTime: "Feb 13, 2025 09:15 am",
      description: "14, Okugade Okuneye Street, Mende Maryland Lagos",
    },
    {
      id: 10,
      dateTime: "Feb 13, 2025 09:15 am",
      description: "14, Okugade Okuneye Street, Mende Maryland Lagos",
    },
  ],
};

export default function VendorSupport() {
  // const [activeTab, setActiveTab] = useState<string>();
  const [activeTab, setActiveTab] = useState<string>("Open Tickets");

  return (
    <div className="px-3 lg:px-6 min-h-screen">
      <CustomTabs
        tabs={["Open Tickets", "Close Tickets"]}
        defaultActiveTab={activeTab}
        onChange={(tab) => setActiveTab(tab)}
      />

      <Card className="rounded-3xl shadow-sm">
        <div className="items-center p-4 border-b">
          <h2 className="text-base lg:text-xl font-bold tracking-extra-wide text-kv-semi-black">
            {activeTab}
          </h2>
        </div>

        <CustomTable
          headers={[
            { label: "Date & Time" },
            { label: "Description" },
            { label: "Action" }
          ]}
          data={supportDataMap[activeTab as keyof typeof supportDataMap]}
          renderRow={(support) => (
            <TableRow key={support.id}>
              <TableCell>{support.dateTime}</TableCell>
              <TableCell>{support.description}</TableCell>
              <TableCell>
                <Link
                  href={`/vendor/support/${support.id}`}
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
