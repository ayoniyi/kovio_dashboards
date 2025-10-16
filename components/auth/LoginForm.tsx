/** @format */
"use client";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CustomInput from "../ui/custom/custominput";
import CustomButton from "../ui/custom/button";
import { getSession, signIn } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { publicRequest } from "@/utilities/requestMethods";
import { AuthContext } from "@/context/AuthContext";
import Cookies from "js-cookie";
import { setTokenCookie, setTypeCookie } from "@/app/utils/cookieCutter";

interface LoadingStates {
  credentials: boolean;
  google: boolean;
  facebook: boolean;
}

export default function LoginForm() {
  const router = useRouter();
  const [authState, setAuthState] = useContext<any>(AuthContext);
  const [loadingStates, setLoadingStates] = useState<LoadingStates>({
    credentials: false,
    google: false,
    facebook: false,
  });
  const [enteredValue, setEnteredValue] = useState({
    email: "",
    password: "",
  });

  const isAnyLoading =
    loadingStates.credentials || loadingStates.google || loadingStates.facebook;

  const setLoading = (provider: keyof LoadingStates, loading: boolean) => {
    setLoadingStates((prev) => ({ ...prev, [provider]: loading }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading("credentials", true);

    try {
      const logRes: any = await publicRequest.post(
        `/user-service/onboarding/login-account`,
        {
          email: enteredValue.email,
          password: enteredValue.password,
        }
      );
      //setLoading("credentials", false);
      //console.log("REQ RESPONSE::: ", logRes?.data?.responseBody);

      toast({
        title: "Success",
        description: "Login successful! Redirecting...",
        variant: "default",
      });
      const { auth, ...userInfo } = logRes?.data?.responseBody;
      console.log("info", userInfo);
      setAuthState({
        user: userInfo,
      });
      await setTokenCookie(auth);
      await setTypeCookie(userInfo?.userType);

      if (userInfo?.userType === "CUSTOMER") {
        router.push(`/customer`);
      } else if (userInfo?.userType === "VENDOR") {
        if (userInfo?.profileSetup) {
          router.push(`/vendor`);
        } else {
          //onboarding
        }
      }
    } catch (err: any) {
      const error = err?.response?.data?.response_message;
      console.log("here", err);
      if (error === "Account not verified") {
        toast({
          title: "Login failed",
          description: "Please verify your email address",
          variant: "destructive",
        });
        setTimeout(() => {
          router.push(`/email-verification?email=${enteredValue.email}`);
        }, 800);
      } else {
        toast({
          title: "Login failed",
          description: error || "Sorry an error occured.",
          variant: "destructive",
        });
      }

      setLoading("credentials", false);
    }
  };

  // try {
  //   const result = await signIn("credentials", {
  //     email: enteredValue.email,
  //     password: enteredValue.password,
  //     redirect: false,
  //   });

  //   console.log("Login result:", result);

  //   if (result?.error) {
  //     toast({
  //       title: "Login failed",
  //       description:
  //         result.error === "CredentialsSignin"
  //           ? "Invalid email or password. Please check your credentials and try again."
  //           : result.error,
  //       variant: "destructive",
  //     });
  //     setLoading("credentials", false);
  //     return;
  //   }

  //   if (result?.ok) {
  //     toast({
  //       title: "Success",
  //       description: "Login successful! Redirecting...",
  //       variant: "default",
  //     });

  //     // Small delay to ensure session is set before redirect
  //     await new Promise((resolve) => setTimeout(resolve, 200));
  //     await handleRedirect();

  //     // Keep loading state true during redirect
  //     // Don't set it to false here as we're navigating away
  //   }
  // } catch (error) {
  //   console.error("Login error:", error);
  //   toast({
  //     title: "Error",
  //     description:
  //       error instanceof Error
  //         ? error.message
  //         : "An unexpected error occurred. Please try again.",
  //     variant: "destructive",
  //   });
  //   setLoading("credentials", false);
  // }
  //};

  // const handleSocialLogin = async (provider: string) => {
  //   setLoading(provider as keyof LoadingStates, true);
  //   try {
  //     // For social login, let NextAuth handle the redirect
  //     await signIn(provider, {
  //       callbackUrl: "/dashboard",
  //       redirect: true, // Let NextAuth handle the redirect
  //     });
  //   } catch (error) {
  //     console.error(`${provider} login error:`, error);
  //     toast({
  //       title: "Error",
  //       description: `An error occurred during ${provider} login. Please try again.`,
  //       variant: "destructive",
  //     });
  //     setLoading(provider as keyof LoadingStates, false);
  //   }
  // };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          onChange={(e) =>
            setEnteredValue({ ...enteredValue, password: e.target.value })
          }
        />
      </div>

      <div className="flex justify-end">
        <Link
          href="/forgot-password"
          className="text-sm font-interTightText text-kv-primary hover:text-kv-primary/80 transition-colors hover:underline rounded"
          tabIndex={isAnyLoading ? -1 : 0}
        >
          Forgot your password?
        </Link>
      </div>

      <CustomButton
        type="submit"
        disabled={isAnyLoading}
        className="w-full h-12 font-interTightText bg-kv-primary hover:bg-kv-primary/90 text-white rounded-full transition-all duration-200 disabled:opacity-50"
        aria-label="Sign in to your account"
      >
        {loadingStates.credentials ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Signing in...
          </>
        ) : (
          "Sign In"
        )}
      </CustomButton>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500 font-interTightText">
            Or continue with
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <CustomButton
          type="button"
          variant="outline"
          className="w-full h-12 border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-700 flex items-center justify-center gap-3 rounded-full transition-all duration-200 disabled:opacity-50"
          //onClick={() => handleSocialLogin("google")}
          disabled={isAnyLoading}
          aria-label="Sign in with Google"
        >
          {loadingStates.google ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="font-interTightText">Connecting...</span>
            </>
          ) : (
            <>
              <FcGoogle className="h-5 w-5" />
              <span className="font-interTightText ">Continue with Google</span>
            </>
          )}
        </CustomButton>

        <CustomButton
          type="button"
          variant="outline"
          className="w-full h-12 border-2 border-[#1877F2] bg-[#1877F2] hover:bg-[#166FE5] text-white flex items-center justify-center gap-3 rounded-full transition-all duration-200 disabled:opacity-50"
          // onClick={() => handleSocialLogin("facebook")}
          disabled={isAnyLoading}
          aria-label="Sign in with Facebook"
        >
          {loadingStates.facebook ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="font-interTightText">Connecting...</span>
            </>
          ) : (
            <>
              <FaFacebook className="h-5 w-5" />
              <span className="font-interTightText">
                Continue with Facebook
              </span>
            </>
          )}
        </CustomButton>
      </div>

      <div className="text-center pt-4">
        <p className="text-sm text-gray-600 font-interTightText">
          Don't have an account?{" "}
          <Link
            href="/account-type"
            className="text-kv-primary font-interTightText hover:text-kv-primary/70 hover:underline transition-colors focus:outline-none  focus:ring-offset-2 rounded"
            tabIndex={isAnyLoading ? -1 : 0}
          >
            Sign up here
          </Link>
        </p>
      </div>
    </form>
  );
}
