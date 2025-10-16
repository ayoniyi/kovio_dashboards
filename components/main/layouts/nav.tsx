"use client";

import { Button } from "@/components/ui/shadcn/button";
import { SearchInput } from "@/components/ui/shadcn/search";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Logo from "../../../public/newimages/logo.png";
import CustomButton from "@/components/ui/custom/button";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  if (session) {
    console.log("User is logged in:", session.user);
  } else {
    console.log("User is not logged in");
  }

  const getDashboardUrl = () => {
    if (!session?.user?.userType) return "/login";

    switch (session.user.userType.toLowerCase()) {
      case "vendor":
        return "/vendor";
      case "customer":
        return "/customer";
      case "admin":
        return "/admin";
      default:
        return "/login";
    }
  };

  const handleSearch = (value: string) => {
    console.log("Search submitted:", value);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActiveLink = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  const navItems = [
    { href: "/venues", label: "Venues" },
    { href: "/vendors", label: "Vendors" },
    { href: "/blogs", label: "Blog/Resources" },
  ];

  return (
    <nav className="border-b w-full fixed lg:relative z-50 lg:z-0 bg-[#FFFFFF] mt-0 mb-10 lg:mb-0 shadow-md">
      <div className="container flex gap-4 flex-row font-gabaritoHeading justify-between py-3 sm:py-4 items-center">
        <div className="flex order-2 lg:order-none ">
          <Link href={"/"}>
            <Image
              src={Logo}
              alt="Logo"
              className="w-[82.05px] h-[30.57px] lg:w-[94.41px] lg:h-[37.77px]"
            />
          </Link>
        </div>

        {/* Mobile Menu Button - Left side on mobile */}
        <button
          className="lg:hidden text-kv-primary order-1 lg:order-none transition-transform duration-300 ease-in-out"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          style={{
            transform: isMenuOpen ? "rotate(90deg)" : "rotate(0deg)",
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-all duration-300"
          >
            {!isMenuOpen ? (
              <>
                <path
                  d="M3 12H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 6H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 18H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            ) : (
              <>
                <path
                  d="M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex font-medium text-base font-gabaritoHeading items-center md:gap-6 leading-6 text-gray-700 tracking-extra-wide">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`hover:text-kv-primary transition-colors duration-200 ${
                  isActiveLink(item.href) ? "text-kv-primary" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <SearchInput onSubmit={handleSearch} />
        </div>

        {/* Desktop Action Buttons */}
        <ul className="hidden lg:flex gap-2">
          {session && session.user ? (
            <>
              <li>
                <CustomButton
                  asChild
                  className="bg-transparent hover:bg-transparent hover:text-kv-semi-black h-10 text-kv-h1 border transition-all duration-200"
                >
                  <Link href={getDashboardUrl()}>Dashboard</Link>
                </CustomButton>
              </li>
              <li>
                <CustomButton
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="h-10 transition-all duration-200"
                >
                  Log Out
                </CustomButton>
              </li>
            </>
          ) : (
            <>
              <li>
                <CustomButton
                  asChild
                  className=" bg-transparent hover:bg-transparent hover:text-text-kv-h1 h-10 text-kv-h1 border transition-all duration-200"
                >
                  <Link href="/login">Login</Link>
                </CustomButton>
              </li>
              <li>
                <CustomButton
                  asChild
                  className="h-10 transition-all duration-200"
                >
                  <Link href="/account-type">Create Account</Link>
                </CustomButton>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile Menu with Animation */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          backgroundColor: "#FFFFFF",
          borderTop: isMenuOpen ? "1px solid #e5e7eb" : "none",
        }}
      >
        <div
          className="container py-4 space-y-4 transform transition-transform duration-300 ease-in-out"
          style={{
            transform: isMenuOpen ? "translateY(0)" : "translateY(-20px)",
          }}
        >
          {/* Search Input */}
          <div
            className="transform transition-all duration-300 delay-100"
            style={{
              opacity: isMenuOpen ? 1 : 0,
              transform: isMenuOpen ? "translateY(0)" : "translateY(-10px)",
            }}
          >
            <SearchInput onSubmit={handleSearch} />
          </div>

          {/* Navigation Links */}
          <ul>
            {navItems.map((item, index) => (
              <li
                key={item.href}
                className="transform transition-all duration-300 delay-150"
                style={{
                  opacity: isMenuOpen ? 1 : 0,
                  transform: isMenuOpen ? "translateY(0)" : "translateY(-10px)",
                  transitionDelay: `${150 + index * 50}ms`,
                }}
              >
                <Link
                  href={item.href}
                  className="block py-2 font-medium text-base font-gabaritoHeading leading-6 text-gray-700 tracking-extra-wide items-center hover:text-kv-primary transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Action Buttons */}
          <ul className="space-y-2">
            {session && session.user ? (
              <>
                <li
                  className="transform transition-all duration-300"
                  style={{
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen
                      ? "translateY(0)"
                      : "translateY(-10px)",
                    transitionDelay: "300ms",
                  }}
                >
                  <Link
                    href={getDashboardUrl()}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button className="w-full transition-all bg-kv-semi-black duration-200 hover:scale-105">
                      Dashboard
                    </Button>
                  </Link>
                </li>
                <li
                  className="transform transition-all duration-300"
                  style={{
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen
                      ? "translateY(0)"
                      : "translateY(-10px)",
                    transitionDelay: "350ms",
                  }}
                >
                  <Button
                    onClick={() => {
                      setIsMenuOpen(false);
                      signOut({ callbackUrl: "/login" });
                    }}
                    className="w-full transition-all bg-kv-primary duration-200 hover:scale-105"
                  >
                    Log Out
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li
                  className="transform transition-all duration-300"
                  style={{
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen
                      ? "translateY(0)"
                      : "translateY(-10px)",
                    transitionDelay: "300ms",
                  }}
                >
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-kv-primary transition-all duration-200 hover:scale-105">
                      Login
                    </Button>
                  </Link>
                </li>
                <li
                  className="transform transition-all duration-300"
                  style={{
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen
                      ? "translateY(0)"
                      : "translateY(-10px)",
                    transitionDelay: "350ms",
                  }}
                >
                  <Link
                    href="/account-type"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button className="w-full bg-kv-semi-black transition-all duration-200 hover:scale-105">
                      Create Account
                    </Button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
