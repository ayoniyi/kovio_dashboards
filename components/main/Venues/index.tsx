"use client";
import React, { useEffect } from "react";
import Hero from "@/components/ui/custom/hero";
import CardGrid from "@/components/ui/custom/card";
import NoData from "@/components/ui/custom/noAavaialbleData";
import useFetch from "@/hooks/useFetch";
import {SkeletonCardGrid } from "@/components/ui/custom/DashboardsSkeleton";

type FeaturedVenue = {
  id: number;
  name?: string;
  location: string;
  price: number;
  imageUrl: string;
};

type ApiResponse = {
  description: string;
  responseBody: {
    items: FeaturedVenue[];
  };
};

interface ApiError {
  message: string;
}

export default function Venues() {
  const { data, isLoading, error, isError } = useFetch<ApiResponse, ApiError>({
    key: ["fetch-listings-website-venues"],
    url: "/user-service/dashboard/fetch-listings-website",
  });

  console.log(data);

  const featuredVendor: FeaturedVenue[] = data?.responseBody?.items || [];

  return (
    <div>
      <Hero
        title='Find the Perfect Venue for Your Event ' 
       description='From luxurious ballrooms to cozy outdoor spaces, KOVIO offers a curated selection of venues for every occasion. Search by location, capacity, amenities, and budget to find the ideal setting for your event.  '
       button='Browse All Venues'
        image="/newimages/venue/hero.png"
        Url="/venues/browse-all-venues"
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
          header="Featured Venues"
          data={featuredVendor}
          baseRoute="venues"
        />
      )}
    </div>
  );
}