/** @format */

import React from "react";
import Image from "next/image";
import logo from "@/public/assets/logo.svg";
import bg from "@/public/newimages/authimg.png";
import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:block w-1/2 relative">
        <Image
          className="object-cover"
          src={bg}
          alt="Background"
          fill
          unoptimized
          priority
        />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/">
              <Image
                src={logo}
                unoptimized
                alt="Kovio Logo"
                className="mx-auto mb-6 w-[82.05px] h-[30.57px] lg:w-[94.41px] lg:h-[37.77px]"
              />
            </Link>
            <h2 className="text-2xl font-bold  sm:text-3xl sm:font-bold text-gray-800">
              Welcome back!{" "}
            </h2>
            <p className="text-gray-500  text-sm  mt-2">
              Sign in to your account to continue
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
