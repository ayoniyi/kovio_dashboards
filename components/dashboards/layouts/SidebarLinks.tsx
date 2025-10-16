/** @format */

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";

interface SidebarLinkProps {
  href: string;
  label: string;
  icon: LucideIcon | React.JSXElementConstructor<any>;
  badgeLabel?: string;
  matchBasePath?:string
}

export default function SidebarLink({
  href,
  label,
  icon: Icon,
  badgeLabel,
}: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center font-interTightText hover:bg-kv-secondary w-full my-1.5 px-7 py-2 text-kv-gray-900 transition-colors duration-200  ${
        isActive
          ? "bg-kv-secondary  border-r-4 border-kv-primary text-kv-primary font-medium"
          : "hover:bg-kv-orange-light"
      }`}
      style={{ zIndex: 50 }}
    >
      <Icon
        className={`w-4 h-4 mr-2 ${
          isActive ? "text-kv-primary" : " text-kv-gray-900"
        }`}
      />
      <span className="text-sm text-kv-h1 leading-6 font-normal">
         {label} 
        
        </span>
      {badgeLabel && (
        <span className="ml-auto text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
          {badgeLabel}
        </span>
      )}
    </Link>
  );
}
