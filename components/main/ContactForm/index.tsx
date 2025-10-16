/** @format */

import React from "react";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { Checkbox } from "@/components/ui/shadcn/checkbox";
import Link from "next/link";

export default function ContactForm() {
  return (
    <div className="w-full container mx-auto">
      <div className="max-w-[600px] mx-auto">
        <div className="text-center space-y-4 mb-8">
          <Button className="text-[#FF4D00] bg-kv-secondary font-medium text-sm leading-5 tracking-[0.5%]">
            Contact Us
          </Button>
          <h1 className="font-extrabold text-[32px] md:text-[48px] leading-[56px] tracking-[-1.6%] py-4">
            Let's Get In Touch.
          </h1>
          <p className="text-base md:text-xl leading-[24px] md:leading-[100%] tracking-[0.5%] font-normal">
            Or just reach out manually to{" "}
            <Link href="mailto:hello@kovio.com" className="text-[#FF4D00]">
              hello@kovio.com
            </Link>
          </p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="block font-normal text-sm leading-5 tracking-[0.5%]">
              Full Name
            </label>
            <Input
              type="text"
              placeholder="Enter your full name..."
              className="w-full outline-none px-4 py-2.5 rounded-lg focus:border-indigo-600 focus:outline-hidden"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-normal text-sm leading-5 tracking-[0.5%]">
              Email Address
            </label>
            <Input
              type="email"
              placeholder="Enter your email address..."
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-[#FF4D00] focus:border-[#FF4D00]"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-normal text-sm leading-5 tracking-[0.5%]">
              Phone Number
            </label>
            <div className="flex">
              <div className="flex items-center border rounded-l-lg px-3 bg-gray-50">
                <span className="text-sm">🇬🇧</span>
                <span className="ml-2 text-sm">+44</span>
              </div>
              <Input
                type="tel"
                placeholder="(000) 000-0000"
                className="flex-1 rounded-l-none border-l-0 focus:ring-[#FF4D00] focus:border-[#FF4D00]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block font-normal text-sm leading-5 tracking-[0.5%]">
              Message
            </label>
            <Textarea
              placeholder="Enter your main text here..."
              className="w-full px-4 py-2.5 rounded-lg border min-h-[120px] resize-none focus:ring-[#FF4D00] focus:border-[#FF4D00]"
            />
            <div className="text-right text-sm text-gray-500">300/300</div>
          </div>

          <div className="flex items-start gap-2">
            <Checkbox
              id="terms"
              className="mt-1 data-[state=checked]:bg-[#FF4D00] data-[state=checked]:border-[#FF4D00]"
            />
            <label
              htmlFor="terms"
              className="text-base leading-6 tracking-[0.5%] font-medium"
            >
              I hereby agree to our{" "}
              <Link href="/privacy" className="text-[#FF4D00]">
                Privacy Policy
              </Link>{" "}
              terms.
            </label>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#FF4D00] text-white font-medium text-sm leading-5 tracking-[0.5%] py-6 rounded-lg hover:bg-[#E64600] transition-colors"
          >
            Submit Form →
          </Button>
        </form>
      </div>

      {/* Contact Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
        {/* Live Chat Card */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="mb-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.5 21L5.89944 20.3229C6.28389 20.22 6.69119 20.2791 7.04753 20.4565C8.38837 21.1244 9.90029 21.5 11.5 21.5"
                stroke="#FF4D00"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-1">Live Chat</h3>
          <p className="text-sm text-gray-600 mb-4">
            Speak to our team quickly.
          </p>
          <Link
            href="mailto:hello@kovio.com"
            className="text-[#FF4D00] text-sm font-medium"
          >
            hello@kovio.com
          </Link>
        </div>

        {/* Submit Help Ticket Card */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="mb-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 11L12 14L15 11M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="#FF4D00"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-1">Submit Help Ticket</h3>
          <p className="text-sm text-gray-600 mb-4">
            We're available to help via email.
          </p>
          <Link
            href="mailto:support@kovio.com"
            className="text-[#FF4D00] text-sm font-medium"
          >
            support@kovio.com
          </Link>
        </div>

        {/* Visit Our Office Card */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="mb-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 10C20 16 12 22 12 22C12 22 4 16 4 10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10Z"
                stroke="#FF4D00"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                stroke="#FF4D00"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-1">Visit Our Office</h3>
          <p className="text-sm text-gray-600 mb-4">
            Visit our location in real life.
          </p>
          <p className="text-[#FF4D00] text-sm font-medium">
            221b Elementary Avenue, NY
          </p>
        </div>

        {/* Call Us Directly Card */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="mb-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.5 6.5C15.2372 6.64382 15.9689 6.96892 16.5 7.5C17.0311 8.03108 17.3562 8.76284 17.5 9.5M15 3C16.5315 3.17014 17.9097 3.91107 19 5C20.0903 6.08893 20.8279 7.46869 21 9M20.9995 16.4767V19.1864C21.0037 20.2223 20.0723 21.0873 19.0265 20.9929C10.0001 21 3.00006 13.935 3.00713 4.96919C2.91294 3.92895 3.77364 3.00106 4.80817 3.00009H7.52331C7.96253 2.99577 8.38835 3.151 8.72138 3.43684C9.66819 4.24949 10.2772 7.00777 10.0429 8.10428C9.85994 8.96036 8.99696 9.55929 8.41026 10.1448C9.69864 12.4062 11.5747 14.2785 13.8405 15.5644C14.4272 14.9788 15.0274 14.1176 15.8851 13.935C16.9855 13.7008 19.7615 14.3106 20.5709 15.264C20.858 15.6021 21.0105 16.0337 20.9995 16.4767Z"
                stroke="#FF4D00"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-1">Call Us Directly</h3>
          <p className="text-sm text-gray-600 mb-4">
            Available during working hours.
          </p>
          <p className="text-[#FF4D00] text-sm font-medium">
            (+1) 234 - 4567 - 789
          </p>
        </div>
      </div>
    </div>
  );
}
