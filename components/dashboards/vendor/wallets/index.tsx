"use client";

import React from "react";
import CustomTable from "@/components/ui/custom/CustomTable";
import { TableCell, TableRow } from "@/components/ui/shadcn/table";
import { Card } from "@/components/ui/shadcn/card";
import CustomButton from "@/components/ui/custom/button";
import Link from "next/link";

const walletData = [
  {
    id: 1,
    date: "Feb 10, 2025",
    time:"11:00 am",
    amount: "NGN 450,000",
    status: "Pending",
  },
  {
    id: 2,
    date: "Feb 10, 2025",
    time: "John Doe",
    amount: "NGN 300,000",
    status: "Successful",
  },
  {
    id: 3,
    date: "Feb 10, 2025",
    time: "11:00 am",
    amount: "NGN30,500",
    status: "Failed",
  },
  {
    id: 4,
    date: "Feb 10, 2025",
    time: "Kemi Adetiba",
    amount: "NGN 300,000",
    status: "Successful",
  },
  {
    id: 5,
    date: "Feb 10, 2025",
    time: "12:00 pm",
    amount: "NGN 500,000",
    status: "Successful",
  },
  {
    id: 6,
    date: "Feb 10, 2025",
    time: "11:00 am",
    amount: "NGN 300,000",
    status: "Failed",
  },
  {
    id: 7,
    date: "Feb 10, 2025",
    time: "7",
    amount: "NGN 300,000",
    status: "Successful",
  },
  {
    id: 8,
    date: "Feb 10, 2025",
    time: "13:00 pm",
    amount: "NGN 300,000",
    status: "Successful",
  },
];

export default function VendorWallet() {
  
  return (
    <div className="min-h-screen">
       
       <Card className="rounded-3xl shadow-sm">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-base lg:text-xl font-gabaritoHeading font-semibold tracking-extra-wide text-kv-semi-black ">
              Recent Transactions
            </h2>
            <Link href="/">
              <CustomButton
                className="font-bold font-gabaritoHeading text-sm "
                children={"View All"}
              />
            </Link>
          </div>

        <CustomTable
          headers={[
            { label: "Date" },
            { label: "Time" },
            { label: "Amount" },
            { label: "Status" },
          ]}
          data={walletData}
          renderRow={(wallet) => (
            <TableRow key={wallet.id}>
              <TableCell>{wallet.date}</TableCell>
              <TableCell>{wallet.time}</TableCell>
              <TableCell>{wallet.amount}</TableCell>
              <TableCell>
                <span
                  className={`font-medium ${
                    wallet.status === "Successful"
                      ? "text-[#20AF0B]"
                      : wallet.status === "Pending"
                      ? "text-[#FFC22E]"
                      : wallet.status === "Failed"
                      ? "text-[#E01A00]"
                      : "text-red-500"
                  }`}
                >
                  {wallet.status}
                </span>
              </TableCell>
            </TableRow>
          )}
        />
      </Card>
    </div>
  );
}
