/** @format */

import Image from "next/image";
import { homeData } from "@/Data";
import { Button } from "@/components/ui/shadcn/button";
import Link from "next/link";
import CustomButton from "@/components/ui/custom/button";

export default function AboutSection() {
  const { steps } = homeData.howItWorks;

  return (
    <div className="container mx-auto">
      <section className="mt-16 lg:mt-24 text-left ">
        <div className="grid grid-row lg:grid-cols-2 items-center gap-12 lg:gap-20">
          <div className="">
            <Image
              src="/newimages/about.png"
              alt="About Image"
              priority
              width={613}
              height={558}
              className="object-cover w-full h-auto"
            />
          </div>
          <div className="space-y-6 ">
            <Button className="font-medium  font-interTightText hover:bg-transparent text-sm leading-5 tracking-extra-wide text-kv-primary bg-kv-secondary py-1 px-2">
              About Us
            </Button>
            <h2 className="text-4xl lg:text-5xl font-gabaritoHeading leading-9 font-extrabold tracking-tighter text-kv-semi-black">
              {homeData.about.title}
            </h2>
            {homeData.about.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-sm lg:text-base font-interTightText font-normal leading-8 tracking-extra-wide text-gray-600"
              >
                {paragraph}
              </p>
            ))}
            <ul>
              <li>
                <CustomButton
                  asChild
                  className="text-base h-12 mt-10 font-interTightText"
                >
                  <Link href="/login">Get Started</Link>
                </CustomButton>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div className="py-28 text-center">
          <Button className="font-medium font-gabaritoHeading text-sm leading-5 tracking-tight text-[#FF4800] bg-kv-secondary py-1 px-2">
            How it Works
          </Button>
          <h2 className="mt-6 md:w-4/5 font-gabaritoHeading  leading-[1.2] mx-auto text-3xl md:text-[2.8rem] font-bold tracking-normal text-kv-semi-black">
            Your Event, Your Way - Simple Steps to Successful Event
          </h2>

          {/* Steps Grid */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col md:w-3/4 mt-8 mx-auto items-center text-center gap-2"
              >
                <div className=" rounded-full">
                  <Image src={step.icon} width={19.5} height={19.5} alt="" />
                </div>

                <h3 className="my-2 text-2xl font-gabaritoHeading font-semibold  text-kv-semi-black tracking-wide">
                  {step.title}
                </h3>
                <p className="font-normal font-interTightText text-base leading-7 text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center items-center ">
            <CustomButton
              asChild
              className=" font-medium font-interTightText text-base h-14"
            >
              <Link href={"/venues"}>Start Planning Today</Link>
            </CustomButton>
          </div>
        </div>
      </section>
    </div>
  );
}
