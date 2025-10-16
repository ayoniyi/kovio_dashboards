/** @format */

import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/assets/logo.svg";
import bg from "../../../public/newimages/authimg.png";
import SignupForm from "@/components/auth/SignupForm";
import { Suspense } from "react";
interface SignupPageProps {
  searchParams: {
    accountType?: string;
  };
}

export default function SignupPage({ searchParams }: SignupPageProps) {
  const accountType = searchParams.accountType || "customer";

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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Create your account
            </h2>
            <p className="text-gray-500 mt-2">
              {accountType === "venue"
                ? "Register as a Venue Owner"
                : accountType === "vendor"
                ? "Register as a Vendor"
                : "Register as a Customer"}
            </p>
          </div>

          <SignupForm accountType={accountType} />
        </div>
      </div>
    </div>
  );
}
