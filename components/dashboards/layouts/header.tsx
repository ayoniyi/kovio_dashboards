/** @format */

"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/public/assets/logo.svg";
import { Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { customerNavItems, vendorNavItems } from "./links";
import SidebarLink from "./SidebarLinks";
import { LogOut } from "lucide-react";
import { useAllContx } from "@/context/allcontext";
import { signOut } from "next-auth/react";
import CustomButton from "@/components/ui/custom/button";
import React, { useState } from "react";
import { X } from "lucide-react";
import useMutateData from "@/hooks/useMutateData";
import { toast } from "@/hooks/use-toast";
import { buttonVariants } from "@/components/ui/shadcn/button";
const Header = () => {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useAllContx();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploadingToCloudinary, setIsUploadingToCloudinary] = useState(false);

  const { mutate, isLoading } = useMutateData({
    url: "/user-service/support/raise-ticket",
    method: "POST",
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: "Support ticket submitted successfully!",
      });
      setMessage("");
      setFile(null);
      setIsOpen(false);
    },
    onError: (error: any) => {
      console.log(error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit support ticket",
        variant: "destructive",
      });
    },
  });

  // Cloudinary upload function
  const uploadToCloudinary = async (file: File): Promise<string> => {
    setIsUploadingToCloudinary(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "support_tickets"); // Replace with your actual preset

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/your_cloud_name/auto/upload`, // Replace with your cloud name
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Cloudinary upload failed");
      }

      const data = await response.json();
      return data.secure_url; // This is the URL we'll send to your API
    } catch (error) {
      throw new Error("Failed to upload file to Cloudinary");
    } finally {
      setIsUploadingToCloudinary(false);
    }
  };

  // Upload metadata to your backend after Cloudinary upload
  const { mutate: uploadMetadata, isLoading: isUploadingMetadata } =
    useMutateData({
      url: "/upload",
      method: "POST",
      onSuccess: (uploadData: { url?: string; id?: string | number }) => {
        // After successful metadata upload, submit the ticket
        submitTicketWithAttachment(uploadData);
      },
      onError: (error: any) => {
        toast({
          title: "Upload Error",
          description: error.message || "Failed to save file metadata",
          variant: "destructive",
        });
      },
    });

  const submitTicketWithAttachment = (uploadResponse: {
    url?: string;
    id?: string | number;
  }) => {
    const ticketData = {
      message,
      attachment: uploadResponse.url || uploadResponse.id, // Use the response from /upload
    };

    mutate(ticketData);
  };

  const handleSubmit = async () => {
    if (!message.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    if (file) {
      try {
        // Step 1: Upload to Cloudinary
        const cloudinaryUrl = await uploadToCloudinary(file);

        // Step 2: Send metadata to your backend
        const uploadPayload = {
          id: Date.now(), // Generate unique ID
          file_name: file.name,
          url: cloudinaryUrl, // The URL from Cloudinary
        };

        uploadMetadata(uploadPayload);
      } catch (error: any) {
        toast({
          title: "Upload Error",
          description: error.message || "Failed to upload file",
          variant: "destructive",
        });
      }
    } else {
      // No file, submit ticket directly
      mutate({ message, attachment: null });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 50 * 1024 * 1024) {
        // 50MB limit
        toast({
          title: "File Error",
          description: "File size exceeds 50MB limit",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      if (droppedFile.size > 50 * 1024 * 1024) {
        // 50MB limit
        toast({
          title: "File Error",
          description: "File size exceeds 50MB limit",
          variant: "destructive",
        });
        return;
      }
      setFile(droppedFile);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleOpenNewTicket: () => void = () => {
    setIsOpen(true);
  };

  const isVendor = pathname?.startsWith("/vendor");
  const isCustomer = pathname?.startsWith("/customer");
  const navItems = isVendor ? vendorNavItems : customerNavItems;

  const currentPage = navItems.find((item) => pathname === item.href);
  const pageTitle = currentPage?.name || "Dashboard";

  const children = currentPage?.children;
  const toggleMenu = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-kv-bg-slate h-16">
      <div className="mx-auto px-6 h-full">
        <div className="flex md:hidden items-center justify-between h-full w-full">
          <div className="flex items-center">
            <button
              className="text-kv-primary hover:text-custom-brown transition-colors duration-300"
              aria-label="Toggle Menu"
              onClick={toggleMenu}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <h1 className="text-base font-gabaritoHeading font-medium text-kv-semi-black mx-auto">
            {pageTitle}
          </h1>

          <div className="w-6"></div>
        </div>

        <div className="hidden md:flex items-center h-full">
          <Link href="/" className="mr-6">
            <Image
              src={logo}
              className="w-[82.05px] h-[30.57px] lg:w-[94.41px] lg:h-[37.77px]"
              alt="Logo"
              priority
            />
          </Link>

          <div className="flex items-center justify-between w-full">
            <h1 className="text-base lg:text-xl ml-14 font-gabaritoHeading font-semibold text-kv-semi-black">
              {pageTitle}
            </h1>

            {pathname?.startsWith("/customer/support") && (
              <CustomButton children={children} onClick={handleOpenNewTicket} />
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          {/* Modal Container */}
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md relative">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                New Support Ticket
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Message Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your issue or question..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-3xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-kv-primary focus:border-kv-primary resize-none"
                  rows={6}
                />
              </div>

              {/* Attachment Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attachment (Optional)
                </label>

                {/* Hidden file input */}
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.doc,.docx,.txt"
                />

                {/* Drop zone */}
                <div
                  className="border-2 border-dashed border-gray-300 rounded-3xl p-8 text-center transition-colors"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  {file ? (
                    <div className="text-sm">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-green-600">✓ {file.name}</span>
                        <button
                          onClick={removeFile}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-600">
                      <span className="text-gray-500">
                        Drag and drop a file or{" "}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          document.getElementById("file-upload")?.click()
                        }
                        className="text-kv-primary hover:underline font-medium"
                      >
                        browse
                      </button>
                      <div className="text-xs text-gray-400 mt-1">
                        Maximum size: 50MB
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <CustomButton
                onClick={() => setIsOpen(false)}
                disabled={
                  isLoading || isUploadingMetadata || isUploadingToCloudinary
                }
                className=" text-gray-600 hover:text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                children="Cancel"
              />
              <CustomButton
                onClick={handleSubmit}
                disabled={
                  isLoading || isUploadingMetadata || isUploadingToCloudinary
                }
                children={
                  isUploadingToCloudinary
                    ? "Uploading to Cloudinary..."
                    : isUploadingMetadata
                    ? "Saving file info..."
                    : isLoading
                    ? "Submitting ticket..."
                    : "Submit"
                }
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
