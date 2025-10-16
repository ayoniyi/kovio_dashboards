import React from 'react'
import { ChevronLeft } from 'lucide-react'
import CustomButton from '@/components/ui/custom/button'
import Link from 'next/link'



const support1 = [
  {
    id: 1,
    greet: "Hello, James Kayode",
    description: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim ",
        "veniam, quis nostrud exercitation. ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu",
        "fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    ],
  }
]
export default function SupportID() {
  return (
    <div className='px-3 lg:px-6 min-h-screen'>
         <h1 className="text-2xl text-kv-venue-header font-semibold mb-6 tracking-extra-wide">Tickets details</h1>

    <div className="flex justify-between items-center">
 
       <div>
        <Link href="/vendor/support" className="flex items-center text-gray-500 hover:text-gray-700">
        <ChevronLeft size={20} className="mr-1" />
        <span className="text-sm font-medium">Go back</span>
        </Link>
       </div>
 
       <div>
 
          <CustomButton 
            className="px-4 py-2 text-white "
            children="Reply" 
          />
  
           </div>
        
    </div>

    <div className='border rounded-lg mt-4'>
         <h2 className="text-base font-medium text-black border-b-2 p-4 leading-6 mb-4">Kovio Support</h2>
          {support1.map((support) => (
            <div key={support.id} className='p-4'>
            <div className="mb-3 text-sm">
                <p className=" text-gray-500 mb-1">{support.greet}</p>
                <p >{support.description.map((desc, index) => (
                <p key={index} >{desc}</p>
                ))}</p>
            </div>
       </div>))}

        </div>


        <div className='border rounded-lg mt-4'>
            <h2 className="text-base font-medium text-black border-b-2 p-4 leading-6 mb-4">Isaac John</h2>

        {support1.map((support) => (
            <div key={support.id} className='p-4'>
            <div className="mb-3 text-sm">
                <p className=" text-gray-500 mb-1">{support.greet}</p>
                <p >{support.description.map((desc, index) => (
                <p key={index} >{desc}</p>
                ))}</p>
            </div>
       </div>))}
        </div>
    </div>)}
        
        