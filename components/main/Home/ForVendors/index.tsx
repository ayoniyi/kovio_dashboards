/** @format */

import React from "react";
import { FaCheck } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/shadcn/button";
import { homeData } from "@/Data";
import CustomButton from "@/components/ui/custom/button";

export default function Vendors() {
  const { vendorBenefits } = homeData.howItWorks;

  return (
    <section className="container mx-auto pb-20 grid grid-row lg:grid-cols-2 gap-x-20 items-center text-left gap-8">
      <div>
        <Image
          src="/newimages/dashboard.png"
          alt="Grow Your Business Image"
          width={560}
          height={525}
          className="object-cover w-full h-auto"
        />
      </div>

      <div>
        <h2
          className="my-8 text-[32px] lg:text-[48px] font-gabaritoHeading font-semibold text-kv-semi-black tracking-tighter"
          style={{ lineHeight: "100%", letterSpacing: "-1.3%" }}
        >
          Grow Your Business with KOVIO
        </h2>

        <p className="text-kv-grey-600  font-interTightText font-normal text-base tracking-tight ">
          Are you a venue owner or event vendor? Join KOVIO to showcase your
          services, reach a wider audience, and grow your business.
        </p>
        <p className="font-normal text-lg font-gabaritoHeading tracking-tight text-kv-text-gray py-4">
          Benefits:
        </p>
        <ul className="space-y-3 text-gray-600">
          {vendorBenefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="shrink-0 mt-0.5 w-[1.75rem] h-[1.75rem] bg-[#EEF2FF] rounded-full flex items-center justify-center">
                <FaCheck className="text-[0.75rem] text-[#4F46E5]" />
              </span>
              <span className=" text-sm lg:text-base  font-interTightText leading-[1.5rem] tracking-[0.01em]">
                {benefit}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-8 gap-4 items-center font-semibold text-base tracking-more-wide leading-5">
          <ul className="lg:flex items-center gap-4 space-y-2">
            <li>
              <Link href="/signup?accountType=vendor">
                <CustomButton className="w-full border font-interTightText hover:text-text-kv-grey-600 bg-transparent hover:bg-transparent h-12 text-kv-grey-600">
                  Sign Up as a Vendor
                </CustomButton>
              </Link>
            </li>
            <li>
              <Link href="/venues">
                <CustomButton className="w-full bg-kv-semi-black hover:bg-kv-semi-black font-interTightText h-12 ">
                  List Your Venue
                </CustomButton>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
