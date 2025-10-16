"use client";
import React, { useEffect } from "react";
import Hero from "@/components/ui/custom/hero";
import CardGrid from "@/components/ui/custom/card";
import NoData from "@/components/ui/custom/noAavaialbleData";
import useFetch from "@/hooks/useFetch";
import {SkeletonCardGrid } from "@/components/ui/custom/DashboardsSkeleton";

type FeaturedVendor = {
  id: number;
  name?: string;
  location: string;
  price: number;
  imageUrl: string;
};

type ApiResponse = {
  description: string;
  responseBody: {
    items: FeaturedVendor[];
  };
};

interface ApiError {
  message: string;
}

export default function Vendor() {
  const { data, isLoading, error, isError } = useFetch<ApiResponse, ApiError>({
    key: ["fetch-listings-website-vendor"],
    url: "/user-service/dashboard/fetch-listings-website",
  });

  console.log(data);

  const featuredVendor: FeaturedVendor[] = data?.responseBody?.items || [];

  return (
    <div>
      <Hero
        title="Connect with Top Event Vendors in Nigeria"
        description="Planning an event? KOVIOs vendor marketplace connects you with the best and verified photographers, caterers, decorators, DJs, makeup artists, and more. Browse profiles, view portfolios, and book trusted professionals for your event."
        button="Browse All Vendors"
        image="/newimages/vendor/vendor.png"
        Url="/vendors/browse-all-vendors"
      />

      {isError ? (
        <div className="container mx-auto px-4 py-8">
             {error?.message}
        </div>
      ) : isLoading ? (
        <SkeletonCardGrid />
      ) : !data || !data.responseBody.items || data.responseBody.items.length === 0 ? (
        <NoData />
      ) : (
        <CardGrid
          header="Featured Vendor"
          data={featuredVendor}
          baseRoute="vendors"
        />
      )}
    </div>
  );
}