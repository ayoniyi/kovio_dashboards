/** @format */

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/shadcn/card";
import Image from "next/image";

interface Card1Item {
  id: number;
  description: string;
  image: string;
  author: string;
  readTime: string;
  [key: string]: any;
}

interface Card1Props {
  items: Card1Item[];
}

export default function Card1({ items }: Card1Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {items.map((item) => (
        <Card
          key={item.id}
          className=" border-0 shadow-none overflow-hidden bg-transparent"
        >
          <CardHeader className="p-0">
            <div className="relative aspect-video  w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded-2xl"
                priority={item.id === 0} // Only prioritize first image
              />
            </div>
          </CardHeader>
          <CardContent className="pt-4 px-0">
            <h2 className="text-2xl font-semibold font-gabaritoHeading leading-8 tracking-tight text-kv-semi-black">
              {item.title}
            </h2>
            <p className="mt-2 text-base leading-relaxed font-interTightText text-gray-700">
              {item.description}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between items-center p-0 pt-4">
            <div className="flex items-center gap-2">
              <Image
                src="/newimages/avatar.png"
                width={40}
                height={40}
                alt="avatar"
                className="rounded-full"
              />
              <span className="text-sm font-interTightText font-bold tracking-tight">
                {item.author}
              </span>
            </div>
            <span className="text-sm font-light font-interTightText text-gray-500">
              {item.readTime}
            </span>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
