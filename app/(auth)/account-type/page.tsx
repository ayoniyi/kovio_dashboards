/** @format */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "@/public/assets/logo.svg";
import bg from "../../../public/newimages/authimg.png";
import { Suspense } from "react";
import Loader from "@/components/ui/custom/loader";

function AccountTypeContent() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const router = useRouter();

  const accountTypes = [
    {
      id: "venue",
      name: `Venue Owners & Managers `,
    },
    {
      id: "vendor",
      name: `Event Vendors & Service Providers`,
    },
    {
      id: "customer",
      name: `Looking for Vendors, Venues or Event Planners`,
    },
  ];

  const handleSelect = (id: string) => {
    setSelectedType(id);
    router.push(`/signup?accountType=${id}`);
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:block w-1/2 relative">
        <Image
          className="object-cover"
          src={bg}
          alt="Background"
          fill
          priority
        />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/">
              <Image
                src={logo}
                alt="Kovio Logo"
                className="mx-auto mb-6 w-[82.05px] h-[30.57px] lg:w-[94.41px] lg:h-[37.77px]"
              />
            </Link>

            <h2 className="text-2xl sm:text-3xl font-bold   text-gray-800 ">
              Welcome{" "}
            </h2>
            <p className="text-gray-500 mt-2 font-interTightText">
              What best describes you?
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {accountTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => handleSelect(type.id)}
                className={`shadow-[0_8px_30px_rgba(0,0,0,0.06)]
 border rounded-full p-5 hover:bg-slate-50 cursor-pointer transition-all duration-200 ${
   selectedType === type.id ? "border-kv-primary" : "border-gray-200"
 }`}
              >
                <div className="flex justify-center items-center">
                  <div className="text-center">
                    <p className="font-normal font-interTightText text-[14px] text-kv-gray-900">
                      {type.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AccountTypePage() {
  return (
    <Suspense fallback={<Loader />}>
      <AccountTypeContent />
    </Suspense>
  );
}
