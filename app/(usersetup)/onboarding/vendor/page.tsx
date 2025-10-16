"use client";

import VendorOnboarding from "@/components/onboard/vendor";
import Loader from "@/components/ui/custom/loader";
import { Suspense } from "react";
export default function Page() {
  return (
     <Suspense fallback={<Loader />}>
      <VendorOnboarding />
     </Suspense>
  );
}
