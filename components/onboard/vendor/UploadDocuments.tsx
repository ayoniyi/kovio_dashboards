// import { FC, useState } from 'react'; 
// import CustomButton from '@/components/ui/custom/button';
// import useMutateData from '@/hooks/useMutateData';
// import { toast } from "@/hooks/use-toast";

// interface UploadDocumentsProps {
//   onContinue: () => void;
//   onBack: () => void;
//   vendorId?: string;
// }

// interface PortfolioState {
//   file: File | null;
//   uploading: boolean;
//   uploaded: boolean;
//   error: string | null;
//   url: string | null;t
// f}

// interface UploadResponse {
//   id: number;
//   file_name: string;
//   url: string;
// }

// const UploadDocuments: FC<UploadDocumentsProps> = ({ onContinue, onBack, vendorId }) => {
//   const [portfolioImages, setPortfolioImages] = useState<PortfolioState>({
//     file: null,
//     uploading: false,
//     uploaded: false,
//     error: null,
//     url: null
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Option 1: If your API expects multipart/form-data but the doc is wrong
//   const uploadWithFormData = async (file: File) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('type', 'portfolio');
//     if (vendorId) {
//       formData.append('vendorId', vendorId);
//     }

//     try {
//       // Direct fetch call since useMutateData might not handle FormData correctly
//       const response = await fetch('/api/user-service/upload', {
//         method: 'POST',
//         body: formData,
//         headers: {
//           // Don't set Content-Type - browser will set it with boundary for FormData
//           'Authorization': `Bearer ${getAuthToken()}`, // You'll need to get this from your auth context
//         },
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.response_message || 'Upload failed');
//       }

//       const data: UploadResponse = await response.json();
//       return data;
//     } catch (error) {
//       throw error;
//     }
//   };

//   // Option 2: Convert file to base64 and send as JSON
//   const convertFileToBase64 = (file: File): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         if (typeof reader.result === 'string') {
//           resolve(reader.result);
//         } else {
//           reject(new Error('Failed to convert file to base64'));
//         }
//       };
//       reader.onerror = error => reject(error);
//     });
//   };

//   const uploadWithBase64 = async (file: File) => {
//     try {
//       const base64Data = await convertFileToBase64(file);
      
//       const uploadPayload = {
//         id: 0,
//         file_name: file.name,
//         url: base64Data, // Full data URL with prefix
//         type: 'portfolio',
//         ...(vendorId && { vendorId })
//       };

//       // Use your existing mutate function
//       return uploadPayload;
//     } catch (error) {
//       throw new Error('Failed to process file');
//     }
//   };

//   // Upload mutation using useMutateData for JSON approach
//   const { mutate: uploadMutate } = useMutateData<UploadResponse>({
//     url: "/user-service/upload",
//     method: "POST",
//     onSuccess: (data: UploadResponse) => {
//       setPortfolioImages(prev => ({
//         ...prev,
//         uploading: false,
//         uploaded: true,
//         url: data.url,
//       }));

//       toast({
//         title: "Upload successful!",
//         description: "Portfolio image uploaded successfully",
//       });
//     },
//     onError: (error: any) => {
//       setPortfolioImages(prev => ({
//         ...prev,
//         uploading: false,
//         error: error.message || 'Upload failed'
//       }));

//       toast({
//         title: "Upload failed",
//         description: error.message || 'Please try again',
//         variant: "destructive",
//       });
//     },
//   });

//   const { mutate: saveMutate, isLoading } = useMutateData({
//     url: '/user-service/upload',
//     method: 'POST',
//     onSuccess: () => {
//       toast({
//         title: "Portfolio saved successfully!",
//         description: "Your portfolio has been saved.",
//       });
//       setIsSubmitting(false);
//       onContinue();
//     },
//     onError: (error: any) => {
//       toast({
//         title: "Save failed",
//         description: error.message || "Failed to save your portfolio. Please try again.",
//         variant: "destructive",
//       });
//       setIsSubmitting(false);
//     },
//   });

//   const validateFile = (file: File): string | null => {
//     if (file.size > 50 * 1024 * 1024) {
//       return 'File size must be less than 50MB';
//     }

//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
//     if (!allowedTypes.includes(file.type)) {
//       return 'Please upload only JPG, PNG, or PDF files';
//     }

//     return null;
//   };

//   // Helper function to get auth token (you'll need to implement this based on your auth setup)
//   const getAuthToken = () => {
//     // Return your auth token from wherever you store it (localStorage, context, etc.)
//     return localStorage.getItem('authToken') || '';
//   };

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
      
//       setPortfolioImages(prev => ({ ...prev, error: null }));
      
//       const validationError = validateFile(file);
//       if (validationError) {
//         setPortfolioImages(prev => ({
//           ...prev,
//           error: validationError
//         }));
//         return;
//       }

//       setPortfolioImages(prev => ({
//         ...prev,
//         file,
//         uploading: true,
//         uploaded: false,
//         error: null,
//         url: null
//       }));

//       try {
//         // Try Method 1: FormData (if your API actually accepts it)
//         // Uncomment this and comment out Method 2 to try
//         /*
//         const result = await uploadWithFormData(file);
//         setPortfolioImages(prev => ({
//           ...prev,
//           uploading: false,
//           uploaded: true,
//           url: result.url,
//         }));
//         toast({
//           title: "Upload successful!",
//           description: "Portfolio image uploaded successfully",
//         });
//         */

//         // Method 2: Base64 JSON (current approach based on API doc)
//         const uploadPayload = await uploadWithBase64(file);
//         uploadMutate(uploadPayload);

//       } catch (error: any) {
//         setPortfolioImages(prev => ({
//           ...prev,
//           uploading: false,
//           error: error.message || 'Upload failed'
//         }));
        
//         toast({
//           title: "Upload failed",
//           description: error.message || 'Please try again',
//           variant: "destructive",
//         });
//       }
//     }
//   };

//   const handleRemoveFile = () => {
//     setPortfolioImages({
//       file: null,
//       uploading: false,
//       uploaded: false,
//       error: null,
//       url: null
//     });
    
//     const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
//     if (fileInput) {
//       fileInput.value = '';
//     }
//   };

//   const handleContinue = async () => {
//     if (!portfolioImages.uploaded || !portfolioImages.url) {
//       toast({
//         title: "Portfolio image required",
//         description: "Please upload a portfolio image to continue.",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsSubmitting(true);

//     const saveData = {
//       portfolioImageUrl: portfolioImages.url,
//       ...(vendorId && { vendorId })
//     };

//     saveMutate(saveData);
//   };

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     const files = e.dataTransfer.files;
//     if (files && files[0]) {
//       const file = files[0];
      
//       const syntheticEvent = {
//           target: { files: [file] }
//       } as unknown as React.ChangeEvent<HTMLInputElement>;
      
//       handleFileChange(syntheticEvent);
//     }
//   };

//   return (
//     <div className="py-6 lg:py-12 container mx-auto text-kv-venue-header">
//       <h1 className="text-xl lg:text-3xl font-bold leading-9 mb-8">Upload Portfolio</h1>
      
//       <div className="max-w-md mx-auto text-sm">
//         <div className="flex items-center mb-2">
//           <p className="text-sm font-normal leading-5 tracking-extra-wide">
//             Upload Portfolio Images (Previous Work)
//           </p>
//           <span className="text-red-500 ml-1">*</span>
//         </div>
        
//         <div 
//           className="border-2 border-dashed border-gray-300 rounded-lg text-center p-6 transition-colors hover:border-gray-400"
//           onDragOver={handleDragOver}
//           onDrop={handleDrop}
//         >
//           {portfolioImages.uploading ? (
//             <div className="py-4">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-kv-primary mx-auto"></div>
//               <p className="mt-2 text-gray-600">Uploading your portfolio image...</p>
//             </div>
//           ) : portfolioImages.uploaded && portfolioImages.url ? (
//             <div className="py-4">
//               <div className="text-green-600 mb-2 text-lg">✓</div>
//               <p className="text-green-600 font-medium mb-2">Uploaded successfully!</p>
//               <p className="text-sm text-gray-600 mb-3">{portfolioImages.file?.name}</p>
              
//               {portfolioImages.file?.type.startsWith('image/') && (
//                 <div className="mb-3">
//                   <img 
//                     src={portfolioImages.url.startsWith('data:') ? portfolioImages.url : `data:image/*;base64,${portfolioImages.url}`} 
//                     alt="Portfolio preview" 
//                     className="max-w-full h-32 object-cover rounded-md mx-auto"
//                   />
//                 </div>
//               )}
              
//               <button
//                 onClick={handleRemoveFile}
//                 className="text-red-500 text-sm hover:text-red-700 underline"
//                 disabled={isSubmitting}
//               >
//                 Remove file
//               </button>
//             </div>
//           ) : (
//             <div>
//               <div className="mb-4">
//                 <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
//                   <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//               </div>
//               <span className='font-normal text-base leading-6 tracking-extra-wide'>
//                 Drag and drop your images here, or{' '}
//                 <span className='text-kv-primary'>
//                   <label className="cursor-pointer hover:underline">
//                     browse files
//                     <input
//                       type="file"
//                       className="hidden"
//                       onChange={handleFileChange}
//                       accept=".pdf,.jpg,.jpeg,.png"
//                       disabled={portfolioImages.uploading}
//                     />
//                   </label>
//                 </span>
//               </span>
//               <p className='font-medium text-sm leading-5 tracking-extra-wide text-[#9CA3AF] mt-2'>
//                 JPG, PNG or PDF • Maximum size: 50MB
//               </p>
//             </div>
//           )}
          
//           {portfolioImages.error && (
//             <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-md">
//               <p className="text-red-600 text-sm">{portfolioImages.error}</p>
//             </div>
//           )}
//         </div>

//         <div className="mt-6 mb-8">
//           <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
//             <span>Upload Progress</span>
//             <span>{portfolioImages.uploaded ? '1' : '0'}/1 required uploads complete</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div 
//               className="bg-kv-primary h-2 rounded-full transition-all duration-300" 
//               style={{ width: portfolioImages.uploaded ? '100%' : '0%' }}
//             ></div>
//           </div>
//         </div>

//         <div className="flex items-center justify-between gap-4">
//           <button
//             onClick={onBack}
//             className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-interTightText"
//             disabled={isSubmitting || portfolioImages.uploading}
//           >
//             Go Back
//           </button>
          
//           <CustomButton 
//             onClick={handleContinue}
//             disabled={!portfolioImages.uploaded || isSubmitting || isLoading || portfolioImages.uploading}
//             className="min-w-[120px]"
//           >
//             {isSubmitting || isLoading ? (
//               <div className="flex items-center">
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                 Saving...
//               </div>
//             ) : (
//               'Continue'
//             )}
//           </CustomButton>
//         </div>
//       </div>
//     </div> 
//   );
// };

// export default UploadDocuments;