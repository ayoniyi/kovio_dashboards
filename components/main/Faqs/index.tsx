/** @format */

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { SearchInput } from "@/components/ui/shadcn/search";
interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How long can i try free trial for?",
    answer:
      "Mattis ullamcorper velit sed ullamcorper morbi tincidunt. In metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Diam quis enim lobortis scelerisque fermentum dui faucibus. Urna nec id cursus metus aliquam eleifend. Gravida quis blandit turpis cursus in hac.",
  },
  {
    question: "Can i refund product if i don't like?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    question: "How much does the product cost?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    question: "Who is the target audience of the product?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    question: "What exactly is slothUI?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    question: "How long it takes to make your product?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className=" pt-16">
      <div className="container mx-auto grid grid-row lg:grid-cols-2 mb-4 items-center">
        <div>
          <Button className="text-sm font-medium leading-5 tracking-[0.5%] text-kv-primary bg-kv-secondary mb-6">
            FAQ
          </Button>

          <h1 className="font-bold text-4xl lg:text-5xl leading-10  tracking-[-1.6%] text-kv-semi-black mb-4">
            Still Have Any Questions?
          </h1>
        </div>

        <div>
          <p className="font-normal  text-base lg:text-xl leading-6 lg:leading-[100%] tracking-[0.5%] text-kv-text-gray">
            Then don't hesitate to get in touch with us. We'll help in any way
            we can.
          </p>
        </div>

        <div className="lg:flex items-center gap-2 my-10">
          <SearchInput
            onSubmit={function (value: string): void {
              throw new Error("Function not implemented.");
            }}
          />
          <Button className="w-full lg:w-1/5 mt-3 lg:mt-0 bg-kv-primary text-white">
            Search
          </Button>
        </div>
      </div>

      <div className="py-16 bg-kv-bg-slate">
        <div className="text-center">
          <Button className="text-sm font-medium leading-5 tracking-[0.5%] text-kv-primary bg-kv-secondary mb-6">
            FAQ
          </Button>

          <h2 className="font-bold text-[36px] leading-[44px] tracking-[-1.4%] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="font-normal text-xl leading-[100%] tracking-[0.5%] text-kv-text pt-3 pb-10">
            Here you can find the most common questions.
          </p>
        </div>

        <div className="max-w-[856px] mx-auto space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenQuestion(openQuestion === index ? null : index)
                }
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-semibold text-base leading-6 tracking-[0.5%]">
                  {faq.question}
                </span>
                <span className="ml-4">
                  {openQuestion === index ? "−" : "+"}
                </span>
              </button>
              {openQuestion === index && (
                <div className="px-6 pb-6">
                  <p className="font-normal text-sm leading-5 tracking-[0.5%] text-kv-text">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
