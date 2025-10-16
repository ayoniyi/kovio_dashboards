/** @format */
"use client";
import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import CustomInput from "../ui/custom/custominput";
import CustomButton from "../ui/custom/button";
//import { getSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import useMutateData from "@/hooks/useMutateData";
import Link from "next/link";

interface SignupFormProps {
  accountType: string;
}

interface SignupResponse {
  description: string;
  responseBody: {
    firstName: string;
    lastName: string;
    email: string;
    userType: string;
    userId: number;
    auth: string;
  };
}

interface PasswordValidation {
  isValid: boolean;
  errors: string[];
  requirements: {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
  };
}

export default function SignupForm({ accountType }: SignupFormProps) {
  const router = useRouter();
  const [passwordValidation, setPasswordValidation] =
    useState<PasswordValidation>({
      isValid: false,
      errors: [],
      requirements: {
        minLength: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSpecialChar: false,
      },
    });

  const [enteredValue, setEnteredValue] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);

  const { mutate: signupMutate, isLoading } = useMutateData({
    url: "/user-service/onboarding/sign-up",
    method: "POST",
    onSuccess: (d: SignupResponse) => {
      // console.log(d);
      toast({
        title: "Signup successful",
        description: "Please check your email for verification.",
      });
      router.push(`/email-verification?email=${d?.responseBody?.email}`);
    },
    onError: (error) => {
      toast({
        title: "Signup failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Password validation function
  const validatePassword = useCallback(
    (password: string): PasswordValidation => {
      const requirements = {
        minLength: password.length >= 8,
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(
          password
        ),
      };

      const errors: string[] = [];
      if (!requirements.minLength) errors.push("At least 8 characters long");
      if (!requirements.hasUppercase)
        errors.push("At least one uppercase letter");
      if (!requirements.hasLowercase)
        errors.push("At least one lowercase letter");
      if (!requirements.hasNumber) errors.push("At least one number");
      if (!requirements.hasSpecialChar)
        errors.push("At least one special character");

      const isValid = Object.values(requirements).every(Boolean);

      return {
        isValid,
        errors,
        requirements,
      };
    },
    []
  );

  // Handle password input change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setEnteredValue({ ...enteredValue, password });

    const validation = validatePassword(password);
    setPasswordValidation(validation);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    if (!enteredValue.firstName.trim()) {
      toast({
        title: "Invalid Input",
        description: "First name is required.",
        variant: "destructive",
      });
      return;
    }

    if (!enteredValue.lastName.trim()) {
      toast({
        title: "Invalid Input",
        description: "Last name is required.",
        variant: "destructive",
      });
      return;
    }

    if (!enteredValue.email.trim()) {
      toast({
        title: "Invalid Input",
        description: "Email is required.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(enteredValue.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (!passwordValidation.isValid) {
      toast({
        title: "Invalid Password",
        description: "Please ensure your password meets all requirements.",
        variant: "destructive",
      });
      return;
    }

    // Submit the form
    signupMutate({
      email: enteredValue.email.trim(),
      password: enteredValue.password,
      first_name: enteredValue.firstName.trim(),
      last_name: enteredValue.lastName.trim(),
      user_type: accountType,
    });
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <CustomInput
            label="First Name"
            type="text"
            id="firstName"
            name="firstName"
            required
            className="rounded-full"
            value={enteredValue.firstName}
            onChange={(e) =>
              setEnteredValue({ ...enteredValue, firstName: e.target.value })
            }
          />
        </div>

        <div>
          <CustomInput
            label="Last Name"
            type="text"
            id="lastName"
            name="lastName"
            required
            className="rounded-full"
            value={enteredValue.lastName}
            onChange={(e) =>
              setEnteredValue({ ...enteredValue, lastName: e.target.value })
            }
          />
        </div>

        <div>
          <CustomInput
            label="Email"
            type="email"
            id="email"
            name="email"
            required
            className="rounded-full"
            value={enteredValue.email}
            onChange={(e) =>
              setEnteredValue({ ...enteredValue, email: e.target.value })
            }
          />
        </div>

        <div>
          <CustomInput
            label="Password"
            isPassword={true}
            type="password"
            id="password"
            name="password"
            required
            className="rounded-full"
            value={enteredValue.password}
            onChange={handlePasswordChange}
            onFocus={() => setShowPasswordRequirements(true)}
            onBlur={() => setShowPasswordRequirements(false)}
          />

          {showPasswordRequirements && enteredValue.password && (
            <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm">
              {/* <p className="font-medium text-gray-700 mb-2">
                Password Requirements:
              </p> */}
              <ul className="space-y-1">
                {Object.entries({
                  "At least 8 characters":
                    passwordValidation.requirements.minLength,
                  "One uppercase letter":
                    passwordValidation.requirements.hasUppercase,
                  "One lowercase letter":
                    passwordValidation.requirements.hasLowercase,
                  "One number": passwordValidation.requirements.hasNumber,
                  "One special character":
                    passwordValidation.requirements.hasSpecialChar,
                }).map(([requirement, met]) => (
                  <li
                    key={requirement}
                    className={`flex items-center text-xs ${
                      met ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <span className="mr-2 text-xs">{met ? "✓" : "✗"}</span>
                    {requirement}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Password Validation Error */}
          {enteredValue.password &&
            !passwordValidation.isValid &&
            !showPasswordRequirements && (
              <div className="mt-1 text-sm text-red-600">
                Password must meet all requirements
              </div>
            )}
        </div>

        <div className="">
          <CustomButton
            type="submit"
            disabled={
              isLoading ||
              !passwordValidation.isValid ||
              !enteredValue.firstName.trim() ||
              !enteredValue.lastName.trim() ||
              !enteredValue.email.trim()
            }
            className="w-full h-12"
            isLoading={isLoading}
          >
            Continue
          </CustomButton>
        </div>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-kv-primary hover:text-kv-primary/80 transition-colors"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
