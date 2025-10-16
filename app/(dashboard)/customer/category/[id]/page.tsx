"use client";
import React, { ReactNode, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoFilter } from "react-icons/io5";
import CustomSelect from "@/components/ui/custom/select";
import CustomButton from "@/components/ui/custom/button";
import { SearchInput } from "@/components/ui/shadcn/search";
import { useForm } from "react-hook-form";
import samplesImg from "@/public/newimages/sample2.avif";
import cater from "@/public/newimages/catering.png";
import { formatPrice, capitalizeName } from "@/utilities/formatters";
import Link from "next/link";
import ItemCard from "./ItemCard";
import { useQuery } from "@tanstack/react-query";
import { useUserRequest } from "@/utilities/requestMethods";
import { DirectoryLoadingSkeleton } from "@/components/ui/custom/DashboardsSkeleton";

export type CategoryItem = {
  id: number;
  name: string;
  location: string;
  price: number;
  imageUrl: string;
};

export type FilterOption = {
  id: number;
  value: string;
};

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

type DirectoryProps = {
  title?: string;
  categories: CategoryItem[];
  filterOptions?: FilterOption[];
  basePath?: string;
  onSearch?: (query: string) => void;
  onFilterSearch?: (service: string, location: string) => void;
  onFilterReset?: () => void;
  children?: React.ReactNode;
  data: CategoryItem[];
};

interface FormValues {
  service: string;
  location: string;
}

function Category({
  title = "Catering, Food and Beverages",
  categories = [],
  data = [],
  filterOptions = [
    { id: 1, value: "All" },
    { id: 2, value: "Catering" },
    { id: 3, value: "Drinks and Beverages" },
    { id: 4, value: "Refrigeration Units/Services" },
    { id: 5, value: "Water/Ice Supply" },
  ],
  basePath = "directory",
  onSearch = () => {},
  onFilterSearch = () => {},
  onFilterReset = () => {},
  children,
}: any) {
  const router = useRouter();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = React.useMemo(() => {
    if (!searchQuery.trim()) {
      return data;
    }

    const query = searchQuery.toLowerCase().trim();

    return data.filter((item: CategoryItem) => {
      const nameMatch = item.name?.toLowerCase().includes(query) ?? false;
      const locationMatch =
        item.location?.toLowerCase().includes(query) ?? false;

      return nameMatch || locationMatch;
    });
  }, [data, searchQuery]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      service: "",
      location: "",
    },
  });

  const toggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  const handleCategoryClick = (categoryId: number) => {
    router.push(`/${basePath}/${categoryId}`);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/placeholder-image.jpg";
  };

  const handleFilterSubmit = (formData: FormValues) => {
    onFilterSearch(formData.service, formData.location);
    setShowFilterModal(false);
  };

  const handleFilterReset = () => {
    reset();
    onFilterReset();
    setShowFilterModal(false);
  };

  const userRequest = useUserRequest();
  const {
    data: fetchData,
    isLoading,
    error,
  } = useQuery<DashboardListingsResponse, ApiError>({
    queryKey: ["dashboardListings"], //should change todashboardCategories
    queryFn: async () =>
      await userRequest
        ?.get("/user-service/dashboard/fetch-listings") // user-service/listing/fetch-all-listings
        .then((res: any) => {
          return res?.data;
        }),

    enabled: !!userRequest,
  });

  const dataToRender = searchQuery.trim()
    ? filteredData
    : fetchData?.responseBody.items;

  console.log("dataTR", dataToRender);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4">
        <DirectoryLoadingSkeleton />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between lg:justify-start lg:gap-x-12 ">
        {children}
        <Link
          href={"/customer"}
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
        <h1 className="text-2xl mb-3 lg:mb-8 font-bold font-gabaritoHeading text-center lg:text-left tracking-extra-wide text-kv-semi-black">
          {title}
        </h1>

        <div className="hidden md:block lg:mb-8">
          <SearchInput onSubmit={handleSearch} />
        </div>

        <button
          className="md:hidden rounded-full p-1 mb-3 bg-black text-white"
          onClick={toggleFilterModal}
          aria-label="Filter"
        >
          <IoFilter size={26} />
        </button>
      </div>

      <div className="md:hidden mb-8">
        <SearchInput onSubmit={handleSearch} />
      </div>

      {/* Mobile Filter Modal */}
      {showFilterModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="filter-modal-title"
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center md:hidden"
        >
          <div className="bg-white p-4 rounded-t-3xl w-full max-h-[80vh] overflow-y-auto">
            <form
              onSubmit={handleSubmit(handleFilterSubmit)}
              className="relative rounded-3xl p-4 font-medium text-base lg:text-sm leading-5 tracking-extra-wide"
            >
              <button
                type="button"
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                onClick={() => setShowFilterModal(false)}
                aria-label="Close filter"
              >
                ✕
              </button>
              <h2
                id="filter-modal-title"
                className="text-xl font-semibold tracking-extra-wide mb-4 font-interTightText"
              >
                Filter
              </h2>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-semibold font-interTightText text-kv-semi-black">
                  Service
                </label>
                <CustomSelect
                  name="service"
                  control={control}
                  data={filterOptions}
                  rules={{ required: "Service is required" }}
                  error={errors.service?.message}
                />
                {errors.service && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.service.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-semibold text-kv-semi-black">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Search cities"
                  className="w-full p-3 border rounded-full outline-none"
                  {...control.register("location")}
                />
              </div>

              <CustomButton
                type="submit"
                children="Search"
                className="w-full mx-auto mb-2"
              />

              <CustomButton
                type="button"
                onClick={handleFilterReset}
                children="Reset Filters"
                className="w-full text-kv-primary hover:text-kv-primary bg-[#F9FAFB] hover:bg-[#F9FAFB]"
              />
            </form>
          </div>
        </div>
      )}

      <div className="lg:flex justify-between items-start">
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow"> */}
        <div className="flex flex-col">
          <ItemCard key={2} category={""} />
          {dataToRender ? (
            dataToRender.map((category: any) => (
              <>
                <ItemCard key={category.id} category={category} />
              </>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No items found matching your search.
              {/* <ItemCard
                //key={category.id}
                category={""}
              /> */}
            </div>
          )}
        </div>

        <div className="hidden lg:block lg:ml-4 mt-10 lg:mt-0">
          <form
            onSubmit={handleSubmit(handleFilterSubmit)}
            className="border rounded-3xl p-3 font-medium text-base leading-5 tracking-extra-wide"
          >
            <h2 className="text-lg font-medium text-kv-semi-black tracking-extra-wide font-interTightText mb-4">
              Filter
            </h2>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium font-interTightText text-kv-semi-black">
                Service
              </label>
              <CustomSelect
                name="service"
                control={control}
                data={filterOptions}
                rules={{ required: "Service is required" }}
                error={errors.service?.message}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium font-interTightText text-kv-semi-black">
                Location
              </label>
              <input
                type="text"
                placeholder="Search by location"
                className="w-full text-sm p-3 border rounded-full outline-none"
                aria-label="Search location"
                {...control.register("location")}
              />
            </div>

            <CustomButton
              type="submit"
              children="Search"
              className="w-full mx-auto mb-2 text-sm font-interTightText"
            />

            <CustomButton
              type="button"
              onClick={handleFilterReset}
              children="Reset Filters"
              className="w-full text-kv-primary text-sm font-interTightText border shadow-sm hover:text-kv-primary bg-[#F9FAFB] hover:bg-[#F9FAFB]"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Category;
