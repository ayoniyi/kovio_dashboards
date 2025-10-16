/** @format */
"use client";

import React from "react";
import Image from "next/image";
import logo from "@/public/assets/logo.svg";
import bg from "../../../public/newimages/authimg.png";
import CustomInput from "@/components/ui/custom/custominput";
import CustomButton from "@/components/ui/custom/button";
import useMutateData from "@/hooks/useMutateData";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

interface FormValues {
  password: string;
  confirmPassword: string;
}

export default function PasswordResetPage({
  searchParams,
}: {
  searchParams: { email?: string };
}) {
  const email = searchParams.email || "";

  const router = useRouter();

  useEffect(() => {
    if (!email) {
      toast({
        title: "Error",
        description:
          "Invalid access. Please start the password reset process again.",
        variant: "destructive",
      });
      router.push("/forgot-password");
    }
  }, [email, router]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const password = watch("password");

  const { mutate, isLoading } = useMutateData({
    url: "/user-service/onboarding/reset-password",
    method: "POST",
    onSuccess: (d) => {
      // console.log("Password reset success:", d);

      toast({
        title: "Sucess!",
        description: "Password Sucessfully changed",
        variant: "default",
      });

      router.push("/login");
    },
    onError: (error: any) => {
      // console.error("Password reset error:", error);

      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const submitForm = (data: FormValues) => {
    console.log("Submitting password reset for email:", email);
    mutate({
      email: email,
      password: data.password,
    });
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:block w-1/2 relative">
        <Image
          className="object-cover"
          src={bg}
          alt="Background"
          fill
          priority
          sizes="50vw"
        />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/">
              <Image
                src={logo}
                alt="Kovio Logo"
                className="mx-auto mb-6 w-[82.05px] h-[30.57px] lg:w-[94.41px] lg:h-[37.77px]"
                width={94}
                height={38}
              />
            </Link>
            <h2 className="text-2xl sm:text-3xl  font-semibold mb-3 text-gray-800">
              Set New Password
            </h2>
            <p className="text-sm text-gray-600 font-interTightText">
              Create a secure password for your account
            </p>
          </div>

          <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
            {/* <CustomInput
                      label="Password"
                      isPassword={true}
                      type="password"
                      id="password"
                      name="password"
                      required
                      className="rounded-full"
                      value={enteredValue.password}
                      onChange={(e) =>
                        setEnteredValue({ ...enteredValue, password: e.target.value })
                      }
                    /> */}
            <CustomInput
              type="password"
              isPassword={true}
              placeholder="Enter new password"
              label="New Password"
              className="rounded-full"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                pattern: {
                  // value:
                  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                  value: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/,

                  message:
                    "Password must contain uppercase, lowercase, number and special character",
                },
              })}
              error={errors.password?.message}
            />

            <CustomInput
              type="password"
              isPassword={true}
              label="Confirm New Password"
              placeholder="Confirm new password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              error={errors.confirmPassword?.message}
              className="rounded-full"
            />

            <CustomButton
              type="submit"
              className="w-full"
              disabled={isLoading}
              isLoading={isLoading}
            >
              Proceed
            </CustomButton>
          </form>
        </div>
      </div>
    </div>
  );
}
