"use client";
import React, { useState, useMemo } from "react";
import Directory from "@/components/ui/custom/customerDirectory";
import useFetch from "@/hooks/useFetch";
import NoData from "@/components/ui/custom/noAavaialbleData";
import { DirectoryLoadingSkeleton } from "@/components/ui/custom/DashboardsSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useUserRequest } from "@/utilities/requestMethods";
import { getTokenCookie } from "@/app/utils/cookieCutter";

type ApiItem = {
  id: number;
  name: string;
  location: string;
  price: number;
  imageUrl: string;
  category?: string;
  serviceType?: string;
};

type DashboardListingsResponse = {
  message: string;
  responseBody: {
    items: ApiItem[];
  };
};

type ApiError = {
  responseBody: string;
  message: string;
};

export default function CustomerDashboard() {
  const [nameSearchQuery, setNameSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // const { data, isLoading, isError, error } = useFetch<
  //   DashboardListingsResponse,
  //   ApiError
  // >({
  //   key: ["dashboardListings"],
  //   url: "/user-service/dashboard/fetch-listings", // fetch categories
  // });

  const userRequest = useUserRequest();

  const { data, isLoading, isError, error } = useQuery<
    DashboardListingsResponse,
    ApiError
  >({
    queryKey: ["dashboardListings"], //should change todashboardCategories
    queryFn: async () =>
      await userRequest
        ?.get("/user-service/dashboard/fetch-listings") // user-service/listing/fetch-all-listings
        .then((res: any) => {
          return res?.data;
        }),

    enabled: !!userRequest,
  });

  //console.log("Raw API data:", data);

  const filteredData = useMemo(() => {
    if (!data?.responseBody?.items) return [];

    let filtered = data.responseBody.items;

    if (nameSearchQuery.trim()) {
      const query = nameSearchQuery.toLowerCase().trim();
      filtered = filtered.filter((item) => {
        const nameMatch = item.name?.toLowerCase().includes(query) ?? false;
        return nameMatch;
      });
    }

    if (
      selectedService &&
      selectedService !== "All" &&
      selectedService !== ""
    ) {
      filtered = filtered.filter((item) => {
        if (item.category) {
          return item.category.toLowerCase() === selectedService.toLowerCase();
        } else if (item.serviceType) {
          return (
            item.serviceType.toLowerCase() === selectedService.toLowerCase()
          );
        }
        return false;
      });
    }

    if (selectedLocation.trim()) {
      const location = selectedLocation.toLowerCase().trim();
      filtered = filtered.filter((item) =>
        item.location.toLowerCase().includes(location)
      );
    }

    return filtered;
  }, [
    data?.responseBody?.items,
    nameSearchQuery,
    selectedService,
    selectedLocation,
  ]);

  const filterOptions = useMemo(() => {
    if (!data?.responseBody?.items) return [{ id: 1, value: "All" }];

    const services = new Set<string>();

    data.responseBody.items.forEach((item) => {
      if (item.category) {
        services.add(item.category);
      } else if (item.serviceType) {
        services.add(item.serviceType);
      }
    });

    const options = [{ id: 1, value: "All" }];
    Array.from(services).forEach((service, index) => {
      options.push({ id: index + 2, value: service });
    });

    return options;
  }, [data?.responseBody?.items]);

  const handleNameSearch = (value: string) => {
    console.log("Searching by name:", value);
    setNameSearchQuery(value);
  };

  const handleFilterSearch = (service: string, location: string) => {
    console.log("Filtering by service:", service, "and location:", location);
    setSelectedService(service);
    setSelectedLocation(location);
  };

  const handleFilterReset = () => {
    console.log("Filters reset");
    setNameSearchQuery("");
    setSelectedService("");
    setSelectedLocation("");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4">
        <DirectoryLoadingSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        {error?.message || "Something went wrong"}
      </div>
    );
  }

  if (!data?.responseBody?.items || data.responseBody.items.length === 0) {
    return <NoData />;
  }

  return (
    <div>
      {/*should be categories directory */}
      <Directory
        title="Vendors/Venue Directory"
        categories={filteredData}
        data={data.responseBody.items}
        filterOptions={filterOptions}
        basePath="customer"
        onSearch={handleNameSearch}
        onFilterSearch={handleFilterSearch}
        onFilterReset={handleFilterReset}
      />
    </div>
  );
}
