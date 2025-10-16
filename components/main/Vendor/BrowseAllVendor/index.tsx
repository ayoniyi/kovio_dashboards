"use client";
import React, { ReactNode, useState } from 'react';
import CardGrid from "@/components/ui/custom/card";

import NoData from "@/components/ui/custom/noAavaialbleData";
import Loader from "@/components/ui/custom/loader";
import useFetch from "@/hooks/useFetch";

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


function BrowseAllVendor() {
 
  
 
   const handleSearch = () => {
    //  onSearch(searchQuery);
    //  setShowFilterModal(false);
   };
 
  //  };
 
 
 const { data, isLoading, error, isError } = useFetch<ApiResponse,ApiError>({
    key: ["fetch-listings-website-venues"],
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

   const featuredVendor: FeaturedVendor[] = data.responseBody.items;

  return (
  <div>

       <CardGrid
              header="All Vendor/Venue"
              data={featuredVendor}
              baseRoute="vendors/browse-all-vendors"
            />
      
    </div>
  );
}

export default BrowseAllVendor;

    