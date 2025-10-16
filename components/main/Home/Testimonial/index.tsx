/** @format */

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/shadcn/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface Testimonial {
  id: number;
  content: string;
  author: string;
  location: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    content:
      "KOVIO made planning my wedding so easy! I found the perfect venue and vendors all in one place. Highly recommend!",
    author: "Tolu",
    location: "Lagos",
    avatar: "/newimages/avatar.png",
  },
  {
    id: 2,
    content:
      "The platform saved us so much time. We were able to compare options and book everything within a week!",
    author: "Sarah",
    location: "Abuja",
    avatar: "/newimages/avatar.png",
  },
  {
    id: 3,
    content:
      "My dream wedding came to life thanks to KOVIO. Their vendor selection is unmatched!",
    author: "Michael",
    location: "Port Harcourt",
    avatar: "/newimages/avatar.png",
  },
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="container text-center mx-auto py-20 px-4">
      <div className="flex justify-center mb-6">
        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-blue-500"></div>
        </div>
      </div>

      <p className="font-medium leading-10 tracking-normal mb-8 px-4 text-3xl lg:text-4xl text-kv-semi-black">
        {currentTestimonial.content}
      </p>

      <div className="max-w-xs mx-auto mb-6"></div>

      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 rounded-full overflow-hidden mb-2">
          <Image
            src={currentTestimonial.avatar}
            alt={currentTestimonial.author}
            width={64}
            height={64}
            className="object-cover"
          />
        </div>
        <h3 className="font-semibold text-lg leading-6 tracking-wider text-kv-semi-black">
          {currentTestimonial.author}
        </h3>
        <p className="text-base text-kv-text-gray leading-5 tracking-more-wide">
          {currentTestimonial.location}
        </p>
      </div>

      <div className="flex justify-center items-center gap-4 text-kv-text-gray">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-[#CBD5E1] "
          onClick={prevTestimonial}
        >
          <FaChevronLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-[#CBD5E1]"
          onClick={nextTestimonial}
        >
          <FaChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
