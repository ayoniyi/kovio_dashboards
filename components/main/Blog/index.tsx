/** @format */

"use client";

import React from "react";
import { Button } from "@/components/ui/shadcn/button";
import Image from "next/image";
import Card1 from "@/components/ui/custom/card1";
import blogPosts2 from "@/Data";
import { SearchInput } from "@/components/ui/shadcn/search";
import blogHero from "@/public/newimages/blog/hero1.jpeg";

export default function Blog() {
  const handleSubmit = (value: string) => {
    console.log(value);
  };

  return (
    <div className="container m-auto mt-16">
      <button className="text-xl text-kv-primary font-gabaritoHeading m-auto text-center h-screen flex flex-col justify-center items-center">
        Check back later for our blog!
      </button>
    </div>
  );
}
