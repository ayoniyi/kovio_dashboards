

"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import useFetch from '@/hooks/useFetch'
import NoData from '@/components/ui/custom/noAavaialbleData'
import { formatPrice, capitalizeName } from '@/utilities/formatters'
import { ChevronLeft, MapPin, Mail, User } from 'lucide-react'
import Loader from '@/components/ui/custom/loader'
import UserSample from "@/public/newimages/UserSample.avif"
import { FaNairaSign } from 'react-icons/fa6'

interface ResponseBody {
  id: number;
  name: string;
  location: string;
  price: number;
  imageUrl: string,
  otherImages: [],
  contactInformation: {
    firstName: string,
    lastName: string,
    email: string
  }
}

interface ApiResponse {
  description: string;
  responseBody: ResponseBody;
}
interface ApiError {
  message: string;
}

export default function BrowseAllVendorID() {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, error, isError } = useFetch<ApiResponse, ApiError>({
    key: [id],
    url: `/user-service/listing/fetch-listing-information?listing_id=${id}`,
  });

  console.log(data);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>{error?.message}</div>
  }

  if (!data || !data.responseBody) {
    return <NoData />;
  }

  const venueData = data.responseBody;

  return (
     <div  className='container mx-auto py-8'>
              
          <div className="mt-12 md:mt-0 mb-10">
            <button
              onClick={() => window.history.back()}
              className="group flex items-center space-x-2 hover:text-kv-primary transition-all duration-300 hover:scale-105"
            >
                <ChevronLeft className="w-5 h-5" />
              <span className="font-medium text-sm text-kv-grey-600 font-gabaritoHeading">Go back</span>
            </button>
       </div>
    
              
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 font-interTightText">{capitalizeName(venueData.name)}</h3> 
                    
                    <p className="text-lg font-interTightText text-kv-grey-600 mb-4">
                     Discover your perfect venue experience                
                    </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                      <div className="relative group overflow-hidden rounded-xl">
                        <img
                          src={ UserSample.src}
                          alt={venueData.name}
                          className="w-full h-68 object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder-image.jpg';
                          }}
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                      </div>
              
              
                     {/* {venueData.otherImages.map((image: string, index: number) => (  */}
                      <div  className="relative group overflow-hidden rounded-xl">
                        <img
                          src={ UserSample.src}
                          // alt={`${venueData.name} image ${index + 1}`}
                          alt='kk'
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder-image.jpg';
                          }}
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                      </div>
                    {/* ))}  */}
                  {/* </div> */}
                </div>
              

              {/* Contact Information */}
              {venueData.contactInformation && (
                <div className="border-t pt-8 mb-8">
                  <h3 className="text-xl font-bold text-kv-grey-600 mb-6 font-gabaritoHeading">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                         <p className="text-sm text-kv-gray-500 font-interTightText">Contact Person</p>
                        <p className="font-semibold text-gray-900">
                          {capitalizeName(venueData.contactInformation.firstName)} {capitalizeName(venueData.contactInformation.lastName)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                         <p className="text-sm text-gray-500 font-interTightText">Email Address</p>
                        <p className="font-semibold text-gray-900">{venueData.contactInformation.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Venue Details */}
              <div className="border-t pt-8">
                <h3 className="text-xl font-bold  text-kv-grey-600  mb-6">Venue Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <MapPin className="w-6 h-6 text-purple-600" />
                    </div>
                    <p className="text-sm lg:text-base font-semibold font-interTightText text-kv-grey-600 ">{capitalizeName(venueData.location)}</p>
                  </div>
                  
                  <div className="text-center bg-gray-50 p-6 rounded-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaNairaSign className="w-6 h-6 text-green-600" />
                    </div>

                    <p className="text-sm lg:text-base font-semibold font-interTightText text-kv-grey-600 ">{formatPrice(venueData.price)}</p>
                    </div>
              
                  
                </div>
              </div>

            </div>
          
      {/* Bottom Spacing */}
      <div className="h-20"></div>
    </div>
  );
}