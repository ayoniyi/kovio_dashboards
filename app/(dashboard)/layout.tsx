/** @format */
import React from "react";
import Header from "@/components/dashboards/layouts/header";
import SidebarNew from "@/components/dashboards/layouts/Sidebarnew";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div  className="h-full">
      <div className="h-full">
        <div className="flex flex-col min-h-screen bg-custom-black">
          <Header />
          <div className="flex flex-1 overflow-hidden pt-16">
            <aside className="hidden lg:block w-[220px] flex-shrink-0 border-r border-onyx">
              <SidebarNew />
            </aside>

            <div className="lg:hidden fixed inset-0 z-40">
              <SidebarNew />
            </div>

            <main className="flex-1 overflow-y-auto p-4 lg:p-6 lg:pl-8">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
