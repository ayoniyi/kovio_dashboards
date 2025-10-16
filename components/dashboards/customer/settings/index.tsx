"use client";

import { FC } from "react";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import CustomButton from "@/components/ui/custom/button";
import CustomInput from "@/components/ui/custom/custominput";
import useMutateData from "@/hooks/useMutateData";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/ui/custom/loader";

interface CustomerSettingsProps {
  onContinue: () => void;
}

interface ProfileFormValues {
  email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
}

interface PasswordFormValues {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

interface UserProfile {
  email: string;
  profileSetup: boolean;
}

interface ApiResponse {
  description: string;
  responseBody: UserProfile;
}

interface ApiError {
  message: string;
}

const CustomerSettings: FC<CustomerSettingsProps> = ({ onContinue }) => {
  // All hooks must be declared at the top
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const { data: session } = useSession();

  const {
    register: profileRegister,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm<ProfileFormValues>({
    mode: "onChange",
  });

  const {
    register: passwordRegister,
    handleSubmit: handlePasswordSubmit,
    watch,
    formState: { errors: passwordErrors },
  } = useForm<PasswordFormValues>({
    mode: "onChange",
  });

  // Watch new password to validate confirm password
  const newPassword = watch("new_password");

  const { mutate: updateProfile, isLoading: isUpdatingProfile } = useMutateData(
    {
      url: "/user-service/onboarding/update-profile",
      method: "POST",
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Profile updated successfully",
        });
      },
      onError: (e) => {
        toast({
          title: "Error",
          description: e.message,
          variant: "destructive",
        });
      },
    }
  );

  const { mutate: updatePassword, isLoading: isUpdatingPassword } =
    useMutateData({
      url: "/user-service/onboarding/settings-password-update",
      method: "POST",
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Password updated successfully",
        });
      },
      onError: (e) => {
        toast({
          title: "Error",
          description: e.message,
          variant: "destructive",
        });
      },
    });

  const {
    data,
    isLoading: isProfileLoading,
    error,
    isError,
  } = useFetch<ApiResponse, ApiError>({
    url: "/user-service/onboarding/fetch-user-profile",
    key: ["userProfile"],
  });

  if (isProfileLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div> {error.message}</div>;
  }

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const onProfileSubmit = (formData: ProfileFormValues) => {
    updateProfile(formData);
  };

  const onPasswordSubmit = (formData: PasswordFormValues) => {
    const { confirm_password, ...passwordData } = formData;
    updatePassword(passwordData);
  };

  const userEmail = data?.responseBody?.email || "Loading...";
  const isProfileComplete = data?.responseBody?.profileSetup || false;

  return (
    <div className="min-h-screen lg:container mx-auto">
      <div className="rounded-3xl shadow-sm px-3 lg:px-0 py-6 lg:py-0 lg:container mx-auto">
        <div>
          <div className="mb-10 lg:mb-6">
            <h2 className="text-xl lg:text-3xl font-semibold tracking-extra-wide text-kv-semi-black">
              Isaac John
            </h2>
            <p className="text-sm lg:text-base font-normal text-kv-text-gray">
              {userEmail}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start">
            <div className="mb-6">
              <h3 className="text-base font-medium lg:font-semibold leading-6 tracking-extra-wide text-kv-semi-black">
                Personal Info
              </h3>
              <p className="text-sm font-normal text-gray-500 lg:max-w-72">
                You can change your personal information settings here.
              </p>
            </div>

            <form
              onSubmit={handleProfileSubmit(onProfileSubmit)}
              className="w-full lg:w-auto border rounded-3xl mb-6 text-sm font-normal leading-5 tracking-extra-wide text-kv-venue-header"
            >
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 p-6">
                <CustomInput
                  label="First Name"
                  id="firstName"
                  defaultValue="Isaac"
                  className="rounded-full w-full"
                  error={profileErrors.first_name?.message}
                  {...profileRegister("first_name", {
                    required: "First name is required",
                  })}
                />

                <CustomInput
                  label="Last Name"
                  id="lastName"
                  defaultValue="John"
                  className="rounded-full w-full"
                  error={profileErrors.last_name?.message}
                  {...profileRegister("last_name", {
                    required: "Last name is required",
                  })}
                />

                <CustomInput
                  label="Email"
                  id="email"
                  type="email"
                  defaultValue={userEmail}
                  className="w-full rounded-full"
                  error={profileErrors.email?.message}
                  {...profileRegister("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />

                <CustomInput
                  label="Phone Number"
                  id="phoneNumber"
                  defaultValue="+234 816 624 9033"
                  className="rounded-full w-full"
                  error={profileErrors.phone_number?.message}
                  {...profileRegister("phone_number", {
                    required: "Phone number is required",
                  })}
                />

                <CustomInput
                  label="Role"
                  id="role"
                  defaultValue="Super Admin"
                  readOnly
                  className="rounded-full h-12 pr-10"
                />
              </div>

              <div className="p-6 pt-0">
                <CustomButton
                  type="submit"
                  disabled={isUpdatingProfile}
                  className="w-full md:w-auto"
                >
                  {isUpdatingProfile ? "Saving..." : "Save Profile"}
                </CustomButton>
              </div>
            </form>
          </div>

          <div className="flex flex-col lg:flex-row items-start justify-between border-t pt-6">
            <div className="mb-6">
              <h3 className="text-base font-medium lg:font-semibold leading-6 tracking-extra-wide text-kv-semi-black">
                Change Password
              </h3>
              <p className="text-sm font-medium text-gray-500 lg:max-w-72">
                You can change your password here.
              </p>
            </div>

            <form
              onSubmit={handlePasswordSubmit(onPasswordSubmit)}
              className="w-full border rounded-3xl lg:w-auto mb-6 text-sm font-normal leading-5 tracking-extra-wide text-kv-venue-header"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 p-6">
                <div>
                  <div className="relative">
                    <CustomInput
                      label="Current Password"
                      type={showPasswords.current ? "text" : "password"}
                      className="h-12 pr-10 rounded-full"
                      error={passwordErrors.old_password?.message}
                      {...passwordRegister("old_password", {
                        required: "Current password is required",
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("current")}
                      className="absolute inset-y-0 right-3 mt-6 flex items-center"
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
                  <div className="relative">
                    <CustomInput
                      label="New Password"
                      type={showPasswords.new ? "text" : "password"}
                      className="w-full rounded-full h-12 pr-10"
                      error={passwordErrors.new_password?.message}
                      {...passwordRegister("new_password", {
                        required: "New password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("new")}
                      className="absolute inset-y-0 right-3 mt-6 flex items-center"
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
                  <div className="relative">
                    <CustomInput
                      label="Confirm New Password"
                      type={showPasswords.confirm ? "text" : "password"}
                      className="h-12 pr-10 rounded-full"
                      error={passwordErrors.confirm_password?.message}
                      {...passwordRegister("confirm_password", {
                        required: "Please confirm your new password",
                        validate: (value) =>
                          value === newPassword || "Passwords do not match",
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("confirm")}
                      className="absolute inset-y-0 right-3 mt-6 flex items-center"
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

              <div className="p-6 pt-0">
                <CustomButton
                  type="submit"
                  disabled={isUpdatingPassword}
                  className="w-full md:w-auto"
                >
                  {isUpdatingPassword ? "Updating..." : "Update Password"}
                </CustomButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSettings;
