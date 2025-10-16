/** @format */

"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/shadcn/input";
import { Eye, EyeOff } from "lucide-react";
import { Card } from "@/components/ui/shadcn/card";
import Link from "next/link";
import CustomTable from "@/components/ui/custom/CustomTable";
import CustomTabs from "@/components/ui/custom/CustomTabs";

import { TableCell, TableRow,
} from "@/components/ui/shadcn/table";
import CustomButton from "@/components/ui/custom/button";
import { SearchInput } from "@/components/ui/shadcn/search";

export default function VendorSettings() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [addAdmin, setAddAdmin] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const administrators = [
    {
      id: 1,
      firstName: "Davidson",
      lastName: "Kolawole",
      email: "davidsonkol@gmail.com",
      role: "Super Admin",
    },
    {
      id: 2,
      firstName: "Fredrick",
      lastName: "John",
      email: "fredjohn@yahoo.com",
      role: "Admin",
    },
    {
      id: 3,
      firstName: "Chibuzor",
      lastName: "Lekan",
      email: "chibulek@yahoo.com",
      role: "Admin",
    },
  ];
  const handleSearch = (value: string) => {
    console.log("Search submitted:", value);
  };
  const handleAddAdmin = () => {
    setAddAdmin(true);
  };

  return (
    <div className="min-h-screen lg:container mx-auto">
      <CustomTabs
        className="mx-au to 3 lg:mx-6"
        tabs={["Profile", "Administrators"]}
        defaultActiveTab={activeTab}
        onChange={(tab) => setActiveTab(tab)}
      />
      <div className="rounded-3xl shadow-sm px-3 lg:px-0 py-6 lg:py-0 lg:container mx-auto">
        {activeTab === "Profile" && (
          <div>
            {/* Profile content */}
            <div className="mb-6">
              <h2 className="text-xl lg:text-3xl font-medium tracking-extra-wide text-kv-semi-black">
                Isaac John
              </h2>
              <p className="text-sm lg:text-base font-normal text-kv-text-gray">
                elementary221b@gmail.com
              </p>
            </div>

            {/* First section - Personal Info - Corrected to match the second section */}
            <div className="flex flex-col lg:flex-row justify-between items-start">
              <div className="mb-6">
                <h3 className="text-base font-medium lg:font-semibold leading-6 tracking-extra-wide text-kv-semi-black">
                  Personal Info
                </h3>
                <p className="text-sm text-gray-500 lg:max-w-72">
                  You can change your personal information settings here.
                </p>
              </div>

              <div className=" w-full lg:w-auto border rounded-3xl mb-6 text-sm font-normal leading-5 tracking-extra-wide text-kv-venue-header">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 p-6">
                  <div>
                    <label htmlFor="fullName" className="block mb-2">
                      Full Name
                    </label>
                    <Input
                      id="fullName"
                      defaultValue="Isaac John"
                      className="rounded-full p-3 h-12"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="elementary221b@gmail.com"
                      className="rounded-full p-3 h-12"
                    />
                  </div>

                  <div>
                    <label htmlFor="phoneNumber" className="block mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="phoneNumber"
                      defaultValue="+234 816 624 9033"
                      className="rounded-full pr-10 h-12"
                    />
                  </div>

                  <div>
                    <label htmlFor="role" className="block mb-2">
                      Role
                    </label>
                    <Input
                      id="role"
                      defaultValue="Super Admin"
                      readOnly
                      className="rounded-full p-3 h-12"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-start justify-between">
              <div className="mb-6">
                <h3 className="text-base font-medium lg:font-semibold leading-6 tracking-extra-wide text-kv-semi-black">
                  Change Password
                </h3>
                <p className="text-sm text-gray-500 lg:max-w-72">
                  You can change your password here.
                </p>
              </div>

              <div className="w-full lg:w-auto border rounded-3xl mb-6 text-sm font-normal leading-5 tracking-extra-wide text-kv-venue-header">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 p-6">
                  <div>
                    <label className="mb-2 block">Current Password</label>
                    <div className="relative">
                      <Input
                        type={showPasswords.current ? "text" : "password"}
                        defaultValue="password"
                        className="h-12 pr-10 rounded-full"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("current")}
                        className="absolute inset-y-0 right-3 flex items-center"
                      >
                        {showPasswords.current ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block">New Password</label>
                    <div className="relative">
                      <Input
                        type={showPasswords.new ? "text" : "password"}
                        defaultValue=""
                        className="h-12 pr-10 rounded-full"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("new")}
                        className="absolute inset-y-0 right-3 flex items-center"
                      >
                        {showPasswords.new ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phoneNumber" className="block mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="phoneNumber"
                      defaultValue="+234 816 624 9033"
                      className="rounded-full p-3 h-12"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showPasswords.confirm ? "text" : "password"}
                        defaultValue=""
                        className="h-12 pr-10 rounded-full"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("confirm")}
                        className="absolute inset-y-0 right-3 flex items-center"
                      >
                        {showPasswords.confirm ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Administrators" && (
          <Card className="rounded-3xl shadow-sm">
            {/* Administrators content */}
            <div className=" lg:flex gap-6 items-center p-4 border-b">
              <SearchInput onSubmit={handleSearch} />

              <Link
                href="/vendor/settings/add-admin"
                className="flex items-center gap-2"
              >
                <CustomButton children="Administrator" className="" />
              </Link>
            </div>
            <CustomTable
              data={administrators}
              headers={[
                { label: "First Name" },
                { label: "Last Name" },
                { label: "Email" },
                { label: "Role" },
                { label: "Action" }
              ]}
              renderRow={(admin) => (
                <TableRow key={admin.id}>
                  <TableCell>{admin.firstName}</TableCell>
                  <TableCell>{admin.lastName}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{admin.role}</TableCell>
                  <TableCell>
                    <Link
                      href={`/vendor/settings/${admin.id}`}
                      className="fotn-semibold text-sm flex gap-4 items-center"
                    >
                      <span className="text-kv-semiblack">Edit</span>
                      <span className="text-kv-primary">Deactivate</span>
                    </Link>
                  </TableCell>
                </TableRow>
              )}
            />
          </Card>
        )}

        <div className="flex justify-center lg:justify-end border-t py-6 gap-4">
          <CustomButton
            className="bg-[#F9FAFB] text-kv-venue-header border border-[#D1D5DB] hover:bg-[#D1D5DB]"
            children="Cancel"
          />
          <CustomButton children="Save Changes" />
        </div>
      </div>

      {/* Add Admin Modal */}
      {/* {addAdmin && (<div><p>{alert('jj')}</p></div>)} */}
    </div>
  );
}
