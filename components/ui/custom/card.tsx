

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/shadcn/card";
import Image from "next/image";
import Link from "next/link";
import sampleImg from "@/public/newimages/sample2.avif";
import { SearchInput } from "@/components/ui/shadcn/search";
import { formatPrice, capitalizeName } from "@/utilities/formatters";


interface CardItem {
  id: number;
  name?: string;  
  location: string;
  price: number;
  imageUrl: string 
}

interface CardGridProps {
  data: CardItem[];
  header: string;
  baseRoute: string;
}

export default function CardGrid({data, header, baseRoute}: CardGridProps) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredData = React.useMemo(() => {
    if (!searchQuery.trim()) {
      return data;
    }

    const query = searchQuery.toLowerCase().trim();
    
    return data.filter(item => {
      const nameMatch = item.name?.toLowerCase().includes(query) ?? false;
      const locationMatch = item.location.toLowerCase().includes(query);
      
      return nameMatch || locationMatch;
    });
  }, [data, searchQuery]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <div className="my-20 container mx-auto">
      <div className="flex  flex-col lg:flex-row justify-between mb-3 lg:mb-0">
        <h1 className="text-xl lg:text-2xl mb-3 lg:mb-8 font-bold font-gabaritoHeading text-center lg:text-left tracking-extra-wide text-kv-semi-black">
          {header}
        </h1>


         <div>
          <SearchInput 
          onSubmit={handleSearch}
        /> </div>
         
      </div>
    {/* // Show search results count */}
    {searchQuery && (
        <div className="mb-4 text-sm text-kv-text-gray font-interTightText">

         {filteredData.length > 0 && (  <p>
          Showing {filteredData.length} result{filteredData.length !== 1 ? 's' : ''} for "{searchQuery}"
         </p> )}
                  
        </div>
      )} 
    
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {filteredData.map((item) => (
          <Link 
            key={item.id} 
            href={`/${baseRoute}/${item.id}`}
            className="block transition-transform duration-200 hover:scale-105"
          >
            <Card className="rounded-3xl overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative h-48">
                  <Image 
                    src={sampleImg}
                    // src={item.imageUrl} 
                    alt={item.name || 'Item'}     
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <h2 className="text-sm lg:text-base font-gabaritoHeading font-semibold leading-[32px] lg:leading-8 tracking-[-1.2%] text-kv-semi-black">
                  {capitalizeName(item.name ?? "Not Available")}
                </h2>
                <div className="flex flex-col font-normal font-interTightText text-kv-text-gray text-sm">
                  <div>Location: {item.location}</div>
                  <div>{formatPrice(item.price)}</div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredData.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <p className="text-kv-text-gray text-lg mb-2 font-gabaritoHeading">No items found</p>
          <p className="text-sm text-kv-text-gray font-interTightText">
            Try searching with different keywords or clear the search 
          </p>
        </div>
      )}
    </div>
  );
}