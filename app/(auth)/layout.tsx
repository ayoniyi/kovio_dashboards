/** @format */

import { Toaster } from "@/components/ui/shadcn/toaster";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow relative">{children}</main>
          <Toaster />
        </div>
  );
}
