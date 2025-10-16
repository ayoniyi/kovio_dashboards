/** @format */

"use client";
import useMutateData from "@/hooks/useMutateData";
import React, { useRef, useState } from "react";
import CustomButton from "../ui/custom/button";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

import CustomInput from "../ui/custom/custominput";
interface UserVerificationProps {
  email: string;
}

interface Response {
  responseBody?: {
    email: string;
  };
}

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 5, onComplete }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    if (value.length > 1) {
      return;
    }

    if (value && !/^[0-9]$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every((digit) => digit !== "")) {
      onComplete(newOtp.join(""));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center space-x-2">
      {Array.from({ length }).map((_, index) => (
        <CustomInput
          key={index}
          type="text"
          maxLength={1}
          value={otp[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => {
            if (el) {
              inputRefs.current[index] = el;
            }
          }}
          className="w-16 h-16 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          inputMode="numeric"
          pattern="[0-9]*"
        />
      ))}
    </div>
  );
};

export default function VerifyPasswordReset({ email }: UserVerificationProps) {
  const router = useRouter();
  const [token, setToken] = useState("");
  const { mutate, isLoading } = useMutateData({
    url: "/user-service/onboarding/verify-email",
    method: "POST",
    onSuccess: (d: Response) => {
      console.log(d);

      router.push(`/reset-password?email=${d?.responseBody?.email}`);
    },
    onError: (error) => {
      toast({
        title: "Verification failed",
        description: error.message || "Invalid verification code",
        variant: "destructive",
      });
    },
  });
  const handleOTPComplete = (otp: string) => {
    setToken(otp);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // console.log(token);

    if (token.length < 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid OTP",
        variant: "destructive",
      });
      return;
    }
    mutate({ email, token });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <OTPInput onComplete={handleOTPComplete} length={6} />

          {/* <input
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter 6-digit code"
              required
            /> */}
        </div>

        <CustomButton
          type="submit"
          disabled={isLoading || token.length < 6}
          isLoading={isLoading}
          className="w-full"
        >
          Proceed
        </CustomButton>
      </form>
    </div>
  );
}
