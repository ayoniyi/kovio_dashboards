/** @format */

"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "@/public/assets/logo.svg";
import bg from "../../../public/newimages/authimg.png";
import CustomInput from "@/components/ui/custom/custominput";
import CustomButton from "@/components/ui/custom/button";
import { useForm } from "react-hook-form";
import useMutateData from "@/hooks/useMutateData";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { post } from "@/utilities/apiclient";
import Link from "next/link";

interface FormValues {
  email: string;
}
interface PasswordResetResponse {
  responseBody?: {
    email: string;
  };
}

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const router = useRouter();

  const submit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      const res = await post<PasswordResetResponse>(
        `/user-service/onboarding/request-password-reset?email=${data.email}`
      );
      // console.log(res);

      router.push(`/reset-password/verify?email=${res?.responseBody?.email}`);
    } catch (e: any) {
      toast({
        title: "Failed",
        description: e.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen">
      <div
        className="w-1/2 hidden  fill
          priority lg:block relative"
      >
        <Image src={bg} alt="bg" className="object-cover" fill priority />
      </div>

      <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
        <div className="max-w-md w-full">
          <div className="mb-10 text-center">
            <Link href="/">
              <Image
                className="mx-auto mb-6 w-[82.05px] h-[30.57px] lg:w-[94.41px] lg:h-[37.77px]"
                src={logo}
                alt="Kovio logo"
                width={94}
                height={38}
              />
            </Link>
            <h1 className="font-gabaritoHeading font-semibold sm:font-bold text-2xl sm:text-3xl mb-4">
              Forgot Password
            </h1>
            <p className="text-sm font-interTightText">
              Enter your registered email and we will send you a link to reset
              your password
            </p>
          </div>
          <form onSubmit={handleSubmit(submit)} action="" className="space-y-4">
            <CustomInput
              {...register("email", {
                required: "Your Regisrered Email is required",
              })}
              label="Your Email"
              error={errors.email?.message}
              placeholder="joe@gmail.com"
              className="rounded-full"
              type="email"
            />

            <CustomButton
              type="submit"
              disabled={isLoading}
              isLoading={isLoading}
              className="w-full"
            >
              {isLoading ? "Sending..." : "Send Code"}
            </CustomButton>
          </form>
        </div>
      </div>
    </div>
  );
}
