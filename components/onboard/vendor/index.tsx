/** @format */

"use client";

import { useRouter } from "next/navigation";
import { useOnboarding } from "../../../context/OnboardingContext";
import VendorBasicBusinessInfo from "./VendorBasicBusinessInfo";
import ContactPersonInfo from "./ContactPersonInfo";
import Subscription from "./Subscription";
// import UploadDocuments from "./UploadDocuments";

const VendorOnboarding = () => {
  const router = useRouter();
  const { currentStep, goToNextStep, goToPreviousStep } = useOnboarding();

  // const { data, isLoading, error, isError} = useFetch({
  //   url: "/",
  //   key: ["fechplans"]
  // })

  // const handleSubscriptionSelect = (planId: string) => {
  //   console.log(`Selected plan: ${planId}`);
  //   router.push("/onboarding-completed");
  // };
  return (
    <div className="min-h-screen bg-white">
      {currentStep === 1 && (
        <VendorBasicBusinessInfo
          onBack={goToNextStep}
          onContinue={goToNextStep}
        />
      )}

      {currentStep === 2 && (
        <ContactPersonInfo
          onContinue={goToNextStep}
          onBack={goToPreviousStep}
        />
      )}

      {/* {currentStep === 3 && (
        <VenueDetails onContinue={goToNextStep} onBack={goToPreviousStep} />
      )}
       {/* {currentStep === 3 && (
        <UploadDocuments onContinue={goToNextStep} onBack={goToPreviousStep} />
      )}  */}

      {currentStep === 3 && <Subscription />}
    </div>
  );
};

export default VendorOnboarding;
