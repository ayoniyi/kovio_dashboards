
// "use client"

// import React from "react";
// import { ChevronLeft, MapPin } from "lucide-react";
// import CustomButton from "@/components/ui/custom/button";
// import { Card } from "@/components/ui/shadcn/card";
// import router from "next/router";
// // JavaScript data for the content
// const cateringServiceData = {
//   title: "Amazing Catering Service",
//   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//   services: ["Caterers/Food"],
//   mainImage: "/newimages/customer/viewhistory.png",
//   thumbnails: [1, 2, 3, 4, 5],
//   contact: {
//     location: "Ikeja Lagos",
//     price: "From NGN200,000",
//     message: "Using the negotiate option gives you the opportunity to chat with the vendor and discuss pricing before booking"
//   },
//   actions: {
//     book: "Book Now",
//     negotiate: "Negotiate"
//   }
// };

// const handleBookNow = () => {router.push("/customer/customer/catering/booknow")};
// export default function CateringServicePage() {
//   return (
//     <div className="max-w-5xl mx-auto">
//       {/* Header */}
//       <div className="p-4" onClick={() => window.history.back()}>
//         <button className="flex items-center text-sm">
//           <ChevronLeft className="h-4 w-4 mr-1" /> Go back
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className="grid md:grid-cols-2 gap-6 p-4">
//         {/* Left Column */}
//         <div>
//           <h1 className="text-2xl tracking-extra-wide text-black font-semibold mb-4">
//             {cateringServiceData.title}
//           </h1>
          
//           <p className="text-gray-700 mb-6">
//             {cateringServiceData.description}
//           </p>

//           <div className="mb-6">
//             <h2 className="text-xl tracking-extra-wide font-semibold mb-2">Services</h2>
//             <div className="text-gray-600 text-base">{cateringServiceData.services.join(", ")}</div>
//           </div>

//           <div>
//             <h2 className="text-xl font-semibold mb-4">Photos</h2>
            
//             {/* Main Image */}
//             <div className="mb-4 rounded-lg overflow-hidden">
//               <img 
//                 src={cateringServiceData.mainImage}
//                 alt="Healthy Box Probiotics"
//                 className="w-full h-64 object-cover"
//               />
//             </div>
            
//             {/* Thumbnail Images */}
//             <div className="flex gap-2 overflow-x-auto pb-2">
//               {cateringServiceData.thumbnails.map((i) => (
//                 <div 
//                   key={i} 
//                   className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border"
//                 >
//                   <img 
//                     src={cateringServiceData.mainImage}
//                     alt={`Thumbnail ${i}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right Column */}
//         <div>
//           <Card className="p-6 mb-4">
//             <h2 className="text-xl tracking-extra-wide font-semibold mb-4">Contact us</h2>
            
//             <div className="flex items-start gap-2 mb-4">
//               <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
//               <span className="text-sm text-kv-grey-600">{cateringServiceData.contact.location}</span>
//             </div>
            
//             <div className="mb-6">
//               <p className="font-medium text-sm text-kv-grey-600">{cateringServiceData.contact.price}</p>
//             </div>
            
//             <div className="bg-green-100 p-4 rounded-lg mb-6">
//               <div className="flex items-center gap-2">
//                 <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
//                   💬
//                 </div>
//                 <p className="text-sm">
//                   {cateringServiceData.contact.message}
//                 </p>
//               </div>
//             </div>
            
//             <div className="flex gap-4">
//               <CustomButton onClick={handleBookNow} className="flex-1 bg-orange-500 hover:bg-orange-600">
//                 {cateringServiceData.actions.book}
//               </CustomButton>
//               <CustomButton className="flex-1 border bg-transparent hover:bg-transparent hover:text-black text-base font-medium lading-6 tracking-extra-wide text-kv-venue-header">
//                 {cateringServiceData.actions.negotiate}
//               </CustomButton>
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }