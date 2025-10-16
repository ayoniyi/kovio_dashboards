// Skeleton Components
import React from "react";
import { Card } from "../shadcn/card";
import { CardHeader } from "../shadcn/card";
import { CardContent } from "../shadcn/card";
import { SearchInput } from "../shadcn/search";
import react from "react";

export const StatCardSkeleton = () => (
  <Card className="p-4 lg:p-8 rounded-3xl shadow-md">
    <div className="mb-6 w-10 h-10 bg-gray-200 animate-pulse rounded-full"></div>
    <div className="h-4 bg-gray-200 animate-pulse rounded mb-3 w-24"></div>
    <div className="flex justify-between items-baseline mt-1">
      <div className="h-8 bg-gray-200 animate-pulse rounded w-20"></div>
      <div className="h-4 bg-gray-200 animate-pulse rounded w-24"></div>
    </div>
  </Card>
);

// export const TableCardSkeleton = ({ title }: { title: string }) => (
//   <Card className="rounded-3xl shadow-sm">
//     <div className="flex justify-between items-center p-4 border-b">
//       <h2 className="text-base lg:text-xl font-semibold tracking-extra-wide text-kv-semi-black">
//         {title}
//       </h2>
//       <div className="h-8 bg-gray-200 animate-pulse rounded w-20"></div>
//     </div>
//     <div className="p-4">
//       {[...Array(5)].map((_, i) => (
//         <div key={i} className="flex justify-between items-center py-3 border-b last:border-b-0">
//           <div className="h-4 bg-gray-200 animate-pulse rounded flex-1 mr-4"></div>
//           <div className="h-4 bg-gray-200 animate-pulse rounded w-16"></div>
//           <div className="h-4 bg-gray-200 animate-pulse rounded w-12 ml-4"></div>
//         </div>
//       ))}
//     </div>
//   </Card>
// );

export const TableCardSkeleton = ({ 

  rows = 5,
  maxHeight = "80vh"
}: { 
  title: string;
  rows?: number;
  maxHeight?: string;
}) => (
  <div className="flex flex-col w-full ">
    {/* Table container with same styling as your CustomTable */}
    <div
      className="w-full border rounded-b-3xl shadow-sm bg-white 
         overflow-x-auto overflow-y-auto table-container"
      style={{ 
        maxHeight,
        WebkitOverflowScrolling: 'touch'
      }}
    >
      <div className="w-full min-w-[600px]">



         <div className="flex justify-between items-center p-4 border-b">
      <h2 className="bg-gray-200 animate-pulse rounded">
      </h2>
      <div className="h-8 bg-gray-200 animate-pulse rounded w-20"></div>
    </div>
    
    {/* Table Header */}
    <div className="flex justify-between items-center px-4 py-3 border-b bg-gray-50">
      <div className="h-4 bg-gray-200 animate-pulse rounded w-16"></div>
      <div className="h-4 bg-gray-200 animate-pulse rounded w-12"></div>
      <div className="h-4 bg-gray-200 animate-pulse rounded w-14"></div>
    </div>
        {/* Table Header - matches your sticky header */}
        {/* <div className="sticky top-0 z-10">
          <div className="flex hover:bg-transparent bg-gray-50 border-b">
            <div className="flex-1 px-4 py-3">
              <div className="h-4 bg-gray-300 animate-pulse rounded w-16"></div>
            </div>
            <div className="flex-1 px-4 py-3">
              <div className="h-4 bg-gray-300 animate-pulse rounded w-12"></div>
            </div>
            <div className="flex-1 px-4 py-3">
              <div className="h-4 bg-gray-300 animate-pulse rounded w-14"></div>
            </div>
          </div> */}
        {/* </div> */}
        
        {/* Table Body */}
        <div>
          {[...Array(rows)].map((_, i) => (
            <div key={i} className="flex border-b hover:bg-gray-50/50 transition-colors">
              {/* Location column */}
              <div className="flex-1 px-4 py-4">
                <div className="h-4 bg-gray-200 animate-pulse rounded w-20"></div>
              </div>
              
              {/* Price column */}
              <div className="flex-1 px-4 py-4">
                <div className="h-4 bg-gray-200 animate-pulse rounded w-24"></div>
              </div>
              
              {/* Action column */}
              <div className="flex-1 px-4 py-4">
                <div className="h-6 bg-orange-200 animate-pulse rounded-md w-24"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

   </div>
);

// For Vendor Dashboard Metrics
const MetricCardSkeleton = () => (
  <Card className="border shadow-md p-4 rounded-3xl flex flex-col md:flex-row md:justify-between md:items-center">
    <div className="flex justify-center mb-4 md:mb-0">
      <div className="w-[120px] h-[120px] md:w-[200px] md:h-[200px] bg-gray-200 animate-pulse rounded-full flex-shrink-0"></div>
    </div>
    
    <div className="flex-1 md:ml-6">
      <div className="space-y-4">
        <div className="h-5 lg:h-6 bg-gray-200 animate-pulse rounded w-24 lg:w-32"></div>
        
        <div className="space-y-6 pt-4">
          <div>
            <div className="h-3 lg:h-4 bg-gray-200 animate-pulse rounded w-28 lg:w-36 mb-2"></div>
            
            <div className="flex items-baseline gap-2">
              <div className="h-6 md:h-8 bg-gray-200 animate-pulse rounded w-32 md:w-40"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded w-12"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Card>
);

export default MetricCardSkeleton;


export const DirectoryLoadingSkeleton = () => {
  return (
    <div className="container mx-auto px-4">
      {/* Header Section */}
      <div className="flex items-center justify-between lg:justify-start lg:gap-x-12 mb-3 lg:mb-8">
        {/* Title Skeleton */}
        <div className="animate-pulse bg-gray-200 h-7 w-48 lg:w-64 rounded"></div>
        
        {/* Search Bar - Desktop */}
        <div className="hidden md:block lg:mb-8">
          <div className="animate-pulse bg-gray-200 h-12 w-80 rounded-full"></div>
        </div>
        
        {/* Filter Button - Mobile */}
        <div className="md:hidden">
          <div className="animate-pulse bg-gray-200 h-10 w-10 rounded-full mb-3"></div>
        </div>
      </div>

      {/* Search Bar - Mobile */}
      <div className="md:hidden mb-8">
        <div className="animate-pulse bg-gray-200 h-12 w-full rounded-full"></div>
      </div>

      <div className="lg:flex justify-between items-start">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow">
          {/* Generate 6 skeleton cards to match your layout */}
          {[...Array(6)].map((_, index) => (
            <div 
              key={index}
              className="border rounded-3xl overflow-hidden"
            >
              {/* Image Skeleton */}
              <div className="h-48 bg-gray-200 animate-pulse"></div>
              
              {/* Content Section */}
              <div className="p-3">
                {/* Title Skeleton */}
                <div className="animate-pulse bg-gray-200 h-5 w-3/4 rounded mb-2"></div>
                
                {/* Location Skeleton with Icon */}
                <div className="flex items-center mb-2">
                  <div className="animate-pulse bg-gray-200 h-4 w-4 rounded mr-2"></div>
                  <div className="animate-pulse bg-gray-200 h-4 w-1/2 rounded"></div>
                </div>
                
                {/* Price Skeleton */}
                <div className="animate-pulse bg-gray-200 h-4 w-1/3 rounded"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Sidebar - Desktop Only */}
        <div className="hidden lg:block lg:ml-2 mt-10 lg:mt-0">
          <div className="border rounded-3xl p-3 w-64">
            {/* Filter Title */}
            <div className="animate-pulse bg-gray-200 h-6 w-16 rounded mb-4"></div>
            
            {/* Service Filter */}
            <div className="mb-4">
              <div className="animate-pulse bg-gray-200 h-4 w-16 rounded mb-2"></div>
              <div className="animate-pulse bg-gray-200 h-12 w-full rounded-full border"></div>
            </div>
            
            {/* Location Filter */}
            <div className="mb-4">
              <div className="animate-pulse bg-gray-200 h-4 w-20 rounded mb-2"></div>
              <div className="animate-pulse bg-gray-200 h-12 w-full rounded-full border"></div>
            </div>
            
            {/* Search Button Skeleton */}
            <div className="animate-pulse bg-orange-200 h-12 w-full rounded-full mb-2"></div>
            
            {/* Reset Button Skeleton */}
            <div className="animate-pulse bg-gray-100 h-12 w-full rounded-full border"></div>
          </div>
        </div>
      </div>
    </div>
  );
};




export function SkeletonCard() {
  return (
    <Card className="rounded-3xl overflow-hidden animate-pulse">
      <CardHeader className="p-0">
        <div className="relative h-48 bg-gray-200">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 space-y-3">
        {/* Title skeleton */}
        <div className="h-4 bg-gray-200 rounded-md w-3/4">
          <div className="h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md"></div>
        </div>
        {/* Location skeleton */}
        <div className="h-3 bg-gray-200 rounded-md w-2/3">
          <div className="h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md"></div>
        </div>
        {/* Price skeleton */}
        <div className="h-3 bg-gray-200 rounded-md w-1/2">
          <div className="h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md"></div>
        </div>
      </CardContent>
    </Card>
  );
}

// Skeleton Grid Component
export function SkeletonCardGrid() {

  return (
    <div className="container mx-auto px-4 py-8">
       


 <div className="flex justify-between animate-pulse mb-6 container">
      {/* Header title skeleton */}
      <div className="mb-3 lg:mb-8">
        <div className="h-6 lg:h-8 bg-gray-200 rounded-md w-48 lg:w-64">
          <div className="h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md"></div>
        </div>
      </div>
    
      {/* Search input skeleton */}
      <div className="w-64 h-10 bg-gray-200 rounded-md">
        <div className="h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md"></div>
      </div>
    </div>



      <div className="grid grid-cols-1 container md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </div>
  );
}



export function MessageSkeleton() {
  return (
    <div className="px-5 py-3 flex items-center border-b border-gray-50 animate-pulse">
      {/* Avatar skeleton */}
      <div className="flex-shrink-0 mr-3">
        <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
      </div>
      
      {/* Content skeleton */}
      <div className="flex-1 min-w-0">
        <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-48"></div>
      </div>
      
      {/* Time and notification skeleton */}
      <div className="flex flex-col items-end ml-3">
        <div className="h-3 bg-gray-200 rounded w-12 mb-1"></div>
        <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
}