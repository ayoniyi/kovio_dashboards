"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "../../../public/newimages/logo.png";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import useMutateData from "@/hooks/useMutateData";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const FooterNav = [
  { title: "Venues", href: "/venues" },
  { title: "Vendors", href: "/vendors" },
  { title: "Blog/Resources", href: "/blogs" },
  { title: "FAQs", href: "/faqs" },
  { title: "Contact Us", href: "/contact" },
  { title: "Privacy Policy", href: "/privacy" },
  { title: "Terms of Service", href: "/terms" },
];

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Footer() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const { mutate, isLoading } = useMutateData({
    url: "/user-service/subscription/subscribe-newsletter",
    method: "POST",
    onSuccess: (data) => {
      console.log("Newsletter subscription success:", data);

      toast({
        title: "Success!",
        description: "Successfully subscribed to newsletter",
        variant: "default",
      });

      // Clear email input on success
      setEmail("");
    },
    onError: (error: any) => {
      console.error("Newsletter subscription error:", error);

      // More detailed error handling
      let errorMessage = "Failed to subscribe to newsletter";

      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const validateEmail = (email: string): string | null => {
    if (!email.trim()) {
      return "Please enter your email address";
    }

    if (!EMAIL_REGEX.test(email)) {
      return "Please enter a valid email address";
    }

    return null;
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateEmail(email);
    if (validationError) {
      toast({
        title: "Error",
        description: validationError,
        variant: "destructive",
      });
      return;
    }

    // Call the mutation with email payload
    mutate({ email: email.trim() });
  };

  return (
    <footer className="bg-kv-bg-slate mb-0">
      <div className="container mx-auto py-8 lg:py-12">
        <div className="flex flex-col-reverse lg:flex-row lg:justify-between lg:items-start">
          <Link href={"/"} className="mb-8 mt-20 lg:mt-0 lg:mb-0">
            <Image src={Logo} alt="Kovio Logo" className="mb-4" />
            <p className="text-kv-text-gray text-sm font-normal font-interTightText lg:text-base leading-[160%] lg:max-w-sm">
              Lorem ipsum dolor sit amt, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <div className="mt-8 lg:mt-12">
              <nav className="flex flex-col lg:flex-row lg:items-center lg:space-x-3 space-y-4 lg:space-y-0">
                {FooterNav.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="text-kv-text-gray hover:text-kv-primary lg:max-w-2xl font-interTightText text-sm lg:text-base tracking-extra-wide leading-6 font-normal"
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>
          </Link>

          <div className="lg:max-w-[400px]">
            <h3 className="text-kv-h1 text-xl font-gabaritoHeading font-semibold mb-2">
              Newsletter Signup
            </h3>
            <p className="text-kv-text-gray font-normal font-interTightText text-sm leading-7 lg:text-base mb-4">
              Stay Updated! Subscribe to our newsletter for the latest event
              trends, tips, and exclusive offers.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className={`w-full px-4 py-3 rounded-full border focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed border-[#E5E7EB] focus:border-kv-primary`}
                aria-invalid={false}
                aria-describedby={undefined}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-kv-primary text-white py-3 rounded-full hover:bg-kv-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                aria-label={
                  isLoading
                    ? "Subscribing to newsletter..."
                    : "Subscribe to newsletter"
                }
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Subscribing...
                  </>
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-0 lg:mt-8 pt-4 lg:pt-8 flex border-t flex-col-reverse lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <p className="text-[#94A3B8] text-sm font-interTightText mt-4 lg:mt-0">
            Copyright 2025 © Kovio, All Rights Reserved.
          </p>
          <div className="flex items-center space-x-4">
            <Link href="#" className="text-[#94A3B8] hover:text-kv-primary">
              <FaFacebook size={24} />
            </Link>
            <Link href="#" className="text-[#94A3B8] hover:text-kv-primary">
              <FaTwitter size={24} />
            </Link>
            <Link href="#" className="text-[#94A3B8] hover:text-kv-primary">
              <FaInstagram size={24} />
            </Link>
            <Link href="#" className="text-[#94A3B8] hover:text-kv-primary">
              <FaLinkedin size={24} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
