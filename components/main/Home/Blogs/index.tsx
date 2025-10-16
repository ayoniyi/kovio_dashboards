/** @format */

import React from "react";
import { MdArrowForward } from "react-icons/md";
import { Button } from "@/components/ui/shadcn/button";
import Card1 from "../../../ui/custom/card1";
import { homeData } from "@/Data";
import Link from "next/link";
import CustomButton from "@/components/ui/custom/button";
export default function Blogs() {
  return (
    <section>
      <div className="my-20 container mx-auto">
        <div className="">
          <div className="flex flex-wrap lg:flext-nowrap justify-between items-center mb-8">
            <div>
              <Button className="font-medium text-sm font-gabaritoHeading  leading-5 tracking-tight text-kv-primary bg-kv-secondary text">
                Blog/Resources
              </Button>
              <h1 className="my-5 font-semibold text-[32px] font-gabaritoHeading lg:text-4xl leading-10 tracking-normal text-kv-semi-black">
                Event Planning Tips & Inspiration
              </h1>
              <p className="mb-5 lg:mb-0 max-w-xl font-interTightText font-normal text-base leading-[160%] text-kv-grey-600">
                Explore our blog for expert advice, trending event ideas, and
                success stories from KOVIO users.
              </p>
            </div>
            <Link href={"blogs"}>
              <CustomButton className="font-medium text-lg leading-6 font-interTightText tracking-wider text-white py-6 px-5">
                Read Our Blog
                <span>
                  <MdArrowForward />
                </span>
              </CustomButton>
            </Link>
          </div>
        </div>
        <Card1 items={homeData.blogPosts} />
      </div>
    </section>
  );
}
