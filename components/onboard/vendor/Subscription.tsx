// /** @format */

import { FC, useState } from "react";
import CustomButton from "../../ui/custom/button";
import { FaCheck } from "react-icons/fa";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/ui/custom/loader";
import { useOnboarding } from "@/context/OnboardingContext";
import { post } from "@/utilities/apiclient";
import { toast } from "@/hooks/use-toast";
interface ApiPlan {
  id: number;
  name: string;
  description: string;
  amount: number;
  period: string;
  popularPlan: boolean;
  features: string[];
}

interface ApiResponse {
  description: string;
  responseBody: ApiPlan[];
}

interface ApiError {
  message: string;
}

interface SubscriptionProps {
  onSelect?: (planId: number) => void;
}

const Subscription: FC<SubscriptionProps> = ({ onSelect }) => {
  const { goToNextStep } = useOnboarding();
  const [isPaymentLoading, setPaymentLoading] = useState<Record<number, boolean>>({});
  const { data, isLoading, error, isError } = useFetch<ApiResponse, ApiError>({
    url: "/user-service/subscription/fetch-subscription-plans",
    key: ["fechplans"],
  });

  console.log(data);

  const handlePlanSelect = async (planId: number) => {
    try {
      setPaymentLoading((prev) => ({ ...prev, [planId]: true }));
      const res = await post(
        `/user-service/subscription/add-subscription?subscriptionId=${planId}`
      );
      console.log(res);
    } catch (e: any) {
      toast({
        title: "Failed",
        description: e.message,
      });
    } finally {
      setPaymentLoading((prev) => ({ ...prev, [planId]: false }));
    }
  };
 console.log(handlePlanSelect);
 
  const handleSkip = () => {
    goToNextStep();
  };

  const formatPrice = (amount: number) => {
    return `₦${(amount / 100).toLocaleString()}`;
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p>{error?.message}</p>;
  }

  const plans: ApiPlan[] = data?.responseBody || [];

  return (
    <div className="container mx-auto py-6 lg:py-12">
      <div className="lg:flex justify-between mb-8">
        <h2 className="text-xl lg:text-3xl font-bold leading-9 text-kv-venue-header">
          Choose a Plan that fits
        </h2>
        <span
          onClick={handleSkip}
          className="hidden lg:flex font-semibold text-base text-black relative mt-10 border-b border-black cursor-pointer hover:opacity-70"
        >
          Skip
        </span>
        <p className="lg:hidden pt-2 font-normal text-sm leading-5 text-[#444B59]">
          Enjoy a 1-Month FREE Trial to experience all features before
          committing!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {plans.map((plan) => (
          <div key={plan.id} className="border rounded-3xl p-4 shadow-md">
            <div className="flex justify-between items-center mb-4 gap-4">
              <h3 className="text-lg tracking-extra-wide text-kv-primary font-semibold">
                {plan.name}
              </h3>
              {plan.popularPlan && (
                <span className="bg-kv-secondary text-kv-primary text-sm px-2 py-1 rounded-2xl">
                  Popular Plan
                </span>
              )}
            </div>

            <div className="flex">
              <p className="text-4xl font-semibold tracking-extra-wide mb-2 text-kv-semi-black">
                {formatPrice(plan.amount)}
              </p>
              <span className="text-kv-text-gray">/mon</span>
            </div>

            <p className="border-b text-kv-text-gray font-normal text-base leading-6 tracking-extra-wide mb-6 pt-2 pb-6">
              {plan.description}
            </p>

            <ul className="mb-4">
              {plan.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex  items-center text-sm leading-6 tracking-extra-wide mb-2 text-kv-text-gray"
                >
                  <span className="mr-2 bg-kv-semi-black rounded-full p-1">
                    <FaCheck className="h-2 w-2 text-white" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <CustomButton
              isLoading={isPaymentLoading[plan.id]}
              onClick={() => handlePlanSelect(plan.id)}
              className="w-full"
              children="Select"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
