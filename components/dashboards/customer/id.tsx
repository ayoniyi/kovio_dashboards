"use client";
import useFetch from "@/hooks/useFetch";
import NoData from "@/components/ui/custom/noAavaialbleData";
import Link from "next/link";
import React from "react";
import { MapPin, Car, Utensils, Shield, Zap, Star } from "lucide-react";
import UserSample from "@/public/newimages/UserSample.avif";
import { useParams } from "next/navigation";
import { formatPrice, capitalizeName } from "@/utilities/formatters";

type ApiItem = {
  id: number;
  listingName: string;
  type: string;
  parkingAvailable: string;
  availableAmenities: string;
  location: string;
  cateringOptions: string;
  alcoholPolicy: string;
  maxPrice: number;
  imageUrl: string;
  powerSupply: string;
  security: string;
  bookingPolicy: string;
  userId: number;
  status: boolean;
};

type DashboardIDListingsResponse = {
  message: string;
  responseBody: {
    items: ApiItem[];
  };
};

type ApiError = {
  responseBody: string;
  message: string;
};

// Enhanced Skeleton Component
const DetailedListingCardSkeleton = () => (
  <div className="container mx-auto px-4 animate-pulse">
    {/* Back button skeleton */}
    <div className="mb-3 lg:mb-8 flex items-center">
      <div className="w-5 h-5 bg-gray-200 rounded mr-2"></div>
      <div className="w-16 h-4 bg-gray-200 rounded"></div>
    </div>

    {/* Title skeleton */}
    <div className="w-64 h-6 bg-gray-200 rounded mb-4"></div>

    {/* Image skeleton */}
    <div className="w-4/5 h-80 bg-gray-200 rounded-3xl mb-6"></div>

    {/* Content skeleton */}
    <div className="p-6">
      {/* Type skeleton */}
      <div className="w-32 h-5 bg-gray-200 rounded mb-4"></div>

      {/* Location skeleton */}
      <div className="flex items-center gap-1 mb-4">
        <div className="w-4 h-4 bg-gray-200 rounded"></div>
        <div className="w-40 h-4 bg-gray-200 rounded"></div>
      </div>

      {/* Badges skeleton */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="w-20 h-6 bg-gray-200 rounded-full"></div>
        ))}
      </div>

      {/* Price skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-1">
          <div className="w-20 h-6 bg-gray-200 rounded"></div>
          <div className="w-12 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

export default function CustomerId() {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, isError, error } = useFetch<
    DashboardIDListingsResponse,
    ApiError
  >({
    key: ["dashboardIDListings", id],
    url: `/user-service/listing/fetch-all-listings?id=${id}`,
  });

  console.log("listing info?", data);

  if (isLoading) {
    return (
      <>
        <DetailedListingCardSkeleton />
      </>
    );
  }

  if (isError) {
    {
      error?.message;
    }
  }

  if (!data?.responseBody?.items || data.responseBody.items.length === 0) {
    return <NoData />;
  }

  const UserID: ApiItem[] = data?.responseBody?.items;

  // Filter Badge Component
  const FilterBadge = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: any;
    label: string;
    value: string;
  }) => {
    if (value === "yes" || value === "true") {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
          <Icon size={12} />
          {label}
        </span>
      );
    }
    return null;
  };
  return (
    <div>
      <Link
        href={"/customerDashboard"}
        className=" mb-3 lg:mb-8 flex items-center text-sm leading-5 tracking-extral-wide text-[#374151] mr-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7"></path>
        </svg>
        <span className="ml-1">Go back</span>
      </Link>

      <div>
        {UserID.map((item) => {
          return (
            <div key={item.id}>
              <h3 className="font-semibold font-gabaritoHeading text-lg lg:text-2xl text-kv-semi-black mb-2 transition-colors">
                {/* {capitalizeName(item.listingName)} */}
              </h3>

              <div className="relative">
                <img
                  src={UserSample.src}
                  // alt={item.listingName}
                  className="w-4/5 h-2/5 transform shadow-sm duration-350  cursor-pointer object-cover group-hover:scale-105 rounded-3xl transition-all"
                />
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-lg text-kv-primary mb-2 group-hover:text-blue-600 transition-colors">
                  {/* {capitalizeName(item.type)} */}
                </h3>

                <div className="flex items-center gap-1 text-gray-600 mb-4">
                  <MapPin size={16} />
                  <span className="text-sm capitalize">{item.location}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4 font-interTightText">
                  <FilterBadge
                    icon={Car}
                    label="Parking"
                    value={item.parkingAvailable}
                  />
                  <FilterBadge
                    icon={Utensils}
                    label="Catering"
                    value={item.cateringOptions}
                  />
                  <FilterBadge
                    icon={Zap}
                    label="Power"
                    value={item.powerSupply}
                  />
                  <FilterBadge
                    icon={Shield}
                    label="Security"
                    value={item.security}
                  />
                  <FilterBadge
                    icon={Shield}
                    label="Alcohol"
                    value={item.security}
                  />
                  <FilterBadge
                    icon={Star}
                    label="Amenities"
                    value={item.availableAmenities}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="font-interTightText text-base font-semibold text-gray-900">
                      {/* ₦{item.maxPrice} */}
                    </span>
                    <span className=" font-interTightText text-sm text-gray-500">
                      /hour
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h4 className="font-semibold text-base mb-3 text-gray-500 font-interTightText">
                    Booking Information
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium font-sm text-gray-500 font-interTightText">
                      Booking Policy:
                    </span>{" "}
                    {item.bookingPolicy}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium font-sm text-gray-500 font-interTightText">
                      Status:
                    </span>
                    <span
                      className={`ml-1 px-2 font-sm text-gray-500 font-interTightText  py-1 rounded-full text-xs ${
                        item.status
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {/* {item.status ? "Available" : "Unavailable"} */}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
