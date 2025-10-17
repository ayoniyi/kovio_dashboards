"use client";
import React, { use, useContext } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/shadcn/card";
import { TableCell, TableRow } from "@/components/ui/shadcn/table";
import CustomTable from "@/components/ui/custom/CustomTable";
import CustomButton from "@/components/ui/custom/button";
import useFetch from "@/hooks/useFetch";
import Loading from "@/components/ui/custom/loader";
import NoData from "@/components/ui/custom/noAavaialbleData";
import DashboardMetrics from "@/components/ui/custom/dashboardMetrics";
import { formatPrice, capitalizeName } from "@/utilities/formatters";
import { TableCardSkeleton } from "@/components/ui/custom/DashboardsSkeleton";
import { useUserRequest } from "@/utilities/requestMethods";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "@/context/AuthContext";

interface DashboardListingData {
  id: number;
  location: string;
  price: number;
}

interface ApiResponse {
  description: string;
  responseBody: {
    items: DashboardListingData[];
  };
}

interface ApiError {
  message: string;
}

export default function VendorDashboard() {
  const [authState] = useContext<any>(AuthContext);
  //console.log("authState", authState);

  // const { data, isError, isLoading, error } = useFetch<ApiResponse, ApiError>({
  //   url: "/user-service/dashboard/fetch-listings",
  //   key: ["vendorDashboard"],
  // });
  const userRequest = useUserRequest();
  const { data, isLoading, error, isError } = useQuery<ApiResponse, ApiError>({
    queryKey: ["vendorDashboard"], //should change todashboardCategories
    queryFn: async () =>
      await userRequest
        ?.get("/user-service/dashboard/fetch-listings") // user-service/listing/fetch-all-listings
        .then((res: any) => {
          return res?.data;
        }),

    enabled: !!userRequest,
  });
  //console.log("dt", data);

  if (isLoading) {
    return (
      <>
        <DashboardMetrics />
        {/* <Loading /> */}
        <TableCardSkeleton title="kk" />
      </>
    );
  }

  // if (isError) {
  //   return (
  //     <div className="min-h-screen space-y-6">
  //       <DashboardMetrics />
  //       {error.message}
  //     </div>
  //   );
  // }

  // if (!data?.responseBody?.items) {
  //   return (
  //     <div className="min-h-screen space-y-6">
  //       <DashboardMetrics />
  //       <NoData />
  //     </div>
  //   );
  // }

  const listings = data?.responseBody?.items;

  return (
    <div className="min-h-screen space-y-6">
      <div className="min-h-screen text-sm text-center text-gray-500">
        Currently Under Construction
      </div>

      {/* <DashboardMetrics /> */}

      {/* <Card className="rounded-3xl shadow-sm">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-base lg:text-xl font-gabaritoHeading font-semibold tracking-extra-wide text-kv-semi-black">
            Recent Bookings
          </h2>
          <Link href="/bookings">
            <CustomButton className="font-bold text-sm" children="View All" />
          </Link>
        </div>

        <CustomTable
          headers={[
            { label: "Location" },
            { label: "Price" },
            { label: "Action" },
          ]}
          data={listings ?? []}
          renderRow={(listing) => (
            <TableRow key={listing.id}>
              <TableCell>{capitalizeName(listing.location)}</TableCell>
              <TableCell>{formatPrice(listing.price)}</TableCell>
              <TableCell>
                <Link
                  href={`/vendor/${listing.id}`}
                  className="text-kv-primary text-sm hover:text-orange-600 font-interTightText transition-colors"
                >
                  View Booking
                </Link>
              </TableCell>
            </TableRow>
          )}
        />
      </Card> */}
    </div>
  );
}
