/** @format */
"use client";

import { FC, ReactNode, Suspense } from "react";
import SideBar from "@/components/onboard/layout";
import { OnboardingProvider, useOnboarding } from "@/context/OnboardingContext";
import Loader from "@/components/ui/custom/loader";
import { Toaster } from "@/components/ui/shadcn/toaster";

interface OnboardLayoutProps {
  children: ReactNode;
}

const OnboardLayoutContent: FC<{ children: ReactNode }> = ({ children }) => {
  const { currentStep } = useOnboarding();  

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <SideBar currentStep={currentStep}  />
      <main className="flex-1 md:ml-[334px]">
        {children}
        <Toaster />
      </main>
    </div>
  );
};

const OnboardLayout: FC<OnboardLayoutProps> = ({ children }) => {
  return (
    <Suspense fallback={<Loader />}>
      <OnboardingProvider maxSteps={5}>
        <OnboardLayoutContent>{children}</OnboardLayoutContent>
      </OnboardingProvider>
    </Suspense>
  );
};

export default OnboardLayout;