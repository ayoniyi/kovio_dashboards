/** @format */

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/shadcn/button";
import { homeData } from "@/Data";
import { FaCheck } from "react-icons/fa6";
import TestimonialCarousel from "../Testimonial";
import CustomButton from "@/components/ui/custom/button";

const { aiFeatures } = homeData.howItWorks;

export default function AiAssistance() {
  return (
    <div className="bg-kv-bg-slate">
      <section className="container mx-auto ">
        <div className="grid grid-row lg:grid-cols-2 gap-8 pt-16 pb-4">
          <div className=" text-left space-y-6">
            <Button className="text-sm font-interTightText font-medium leading-5 tracking-[-0.6%] text-center text-kv-primary bg-kv-secondary py-1 px-2">
              AI-Powered Event Assistant
            </Button>
            <h3 className="text-[32px] font-gabaritoHeading font-semibold leading-[44px] tracking-[-1.4%] lg:text-4xl lg:leading-[110%] lg:tracking-tighter text-kv-semi-black">
              Meet Your AI Event Planning Assistant
            </h3>
            <p className="text-base font-interTightText font-normal leading-[160%] tracking-[0%] lg:leading-8 lg:tracking-extra-wide text-kv-semi-black">
              Struggling to find the right venue or vendor? Our AI-powered
              assistant is here to help! Answer a few questions about your
              event, and we'll provide personalized recommendations tailored to
              your needs.
            </p>
            <p className="text-[18px] font-normal leading-[160%] tracking-[0%] lg:text-lg lg:leading-8 text-grey-600">
              Features:
            </p>
            <ul className="space-y-2 text-gray-600 font-interTightText">
              {aiFeatures.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2 text-kv-primary py-1.5 px-1 bg-kv-secondary rounded-full">
                    <FaCheck className="h-3" />
                  </span>
                  <span className="text-[18px] font-normal leading-[160%] tracking-[0%] lg:text-lg lg:leading-8">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="">
            <Image
              src="/newimages/aiAssistance.png"
              alt="AI Assistant Image"
              priority
              width={600}
              height={600}
              className="object-cover rounded-lg w-full h-auto"
            />
          </div>
        </div>
        <Link href="/ai-assistant">
          <CustomButton className="text-base font-medium leading-6 tracking-[0.5%] lg:text-lg">
            Explore Our AI Assistant
          </CustomButton>
        </Link>
      </section>

      <section>
        <TestimonialCarousel />
      </section>
    </div>
  );
}
