/** @format */

import React from "react";
import Image from "next/image";
import CustomButton from "./button";
import Link from "next/link";

interface HeroProps {
  title: string;
  description: string;
  button: string;
  image: string;
  Url: string;
}

export default function Hero({ title, description, button, image, Url}: HeroProps) {
  return (
    <div className="grid grid-row lg:grid-cols-2 items-center container mx-auto gap-8 pt-24 lg:pt-10">
      <div className="space-y-8 order-2 lg:order-1">
        <h1 className="font-gabaritoHeading text-[26px] lg:text-[48px] font-semibold leading-[100%] lg:leading-[110%] tracking-[-1%] text-grey-900">
          {title}
        </h1>
        <p className="text-sm lg:text-lg font-interTightText leading-6 lg:leading-8 tracking-[0%] text-kv-grey-600">
          {description}
        </p>
        <ul>
          <Link href={Url} className="block">
         <li className="block">
            <CustomButton className="text-base text font-interTightText" 
               children={button}
            />
          </li> 
          </Link>

        </ul>
      </div>
      <div className="order-1 lg:order-2">
        <Image
          src={image}
          alt="Hero Image"
          priority
          width={613}
          height={527}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
