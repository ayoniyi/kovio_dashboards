/** @format */

"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface OnboardingContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  maxSteps: number;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

interface OnboardingProviderProps {
  children: ReactNode;
  initialStep?: number;
  maxSteps?: number;
}

export const OnboardingProvider: FC<OnboardingProviderProps> = ({
  children,
  initialStep = 1,
  maxSteps = 5,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const getInitialStep = () => {
    const stepParam = searchParams?.get("step");
    const step = stepParam ? parseInt(stepParam) : initialStep;
    return step >= 1 && step <= maxSteps ? step : initialStep;
  };

  const [currentStep, setCurrentStep] = useState<number>(getInitialStep);
  const isUpdatingUrl = useRef(false);

  useEffect(() => {
    const stepParam = searchParams?.get("step");
    const urlStep = stepParam ? parseInt(stepParam) : initialStep;

    if (
      urlStep >= 1 &&
      urlStep <= maxSteps &&
      urlStep !== currentStep &&
      !isUpdatingUrl.current
    ) {
      setCurrentStep(urlStep);
    }
  }, [searchParams, maxSteps, initialStep]);

  const updateUrl = useCallback(
    (step: number) => {
      isUpdatingUrl.current = true;
      const params = new URLSearchParams(searchParams?.toString() || "");
      params.set("step", step.toString());
      router.replace(`?${params.toString()}`, { scroll: false });

      setTimeout(() => {
        isUpdatingUrl.current = false;
      }, 0);
    },
    [router, searchParams]
  );

  const goToNextStep = useCallback(() => {
    if (currentStep < maxSteps) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      updateUrl(nextStep);
    }
  }, [currentStep, maxSteps, updateUrl]);

  const goToPreviousStep = useCallback(() => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      updateUrl(prevStep);
    }
  }, [currentStep, updateUrl]);

  const setCurrentStepHandler = useCallback(
    (step: number) => {
      if (step >= 1 && step <= maxSteps && step !== currentStep) {
        setCurrentStep(step);
        updateUrl(step);
      }
    },
    [maxSteps, currentStep, updateUrl]
  );

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        setCurrentStep: setCurrentStepHandler,
        goToNextStep,
        goToPreviousStep,
        maxSteps,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};
