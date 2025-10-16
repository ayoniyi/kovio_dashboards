"use client";
import React, { ReactNode, useState } from 'react';
import CardGrid from "@/components/ui/custom/card";
import NoData from "@/components/ui/custom/noAavaialbleData";
import Loader from "@/components/ui/custom/loader";
import useFetch from "@/hooks/useFetch";

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


function BrowseAllVenue() {
 
 const { data, isLoading, error, isError } = useFetch<ApiResponse,ApiError>({
    key: ["fetch-browse-all-listing"],
    url: "/user-service/dashboard/fetch-listings-website",
  });

  console.log(data);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>{error?.message}</div>;
  }

  if (!data || !data.responseBody.items) {
    return <NoData />;
  }

   const featuredVendor: FeaturedVenue[] = data.responseBody.items;

  return (
  <div>k

      <CardGrid
        header="All Venue/Vendor"
        data={featuredVendor}
        baseRoute="venues/browse-all-venues"
      />
    </div>
  );
}

export default BrowseAllVenue;

    