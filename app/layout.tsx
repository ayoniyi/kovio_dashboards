import type { Metadata } from "next";
import { Gabarito, Inter_Tight } from "next/font/google";
import "./globals.css";
import { ContextProvider } from "@/context/allcontext";
import ReactQueryProvider from "@/components/QueryProvider";
import { Toaster } from "@/components/ui/shadcn/toaster";

import Footer from "@/components/main/layouts/footer";
import NavBar from "@/components/main/layouts/nav";

const inter_tight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter_tight",
});

const gabarito = Gabarito({
  subsets: ["latin"],
  variable: "--font-gabarito",
});

export const metadata: Metadata = {
  title:
    "Kovio - Event Planning Marketplace Platform | Discover Top Venues & Vendors Worldwide",
  description:
    "KOVIO is your all-in-one event planning marketplace connecting you with top venues and trusted vendors in Nigeria and around the world. Plan weddings, corporate events, birthdays, and more with ease on KOVIO.",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter_tight.variable} ${gabarito.variable}`}>
      <body>
        <ReactQueryProvider>
          <ContextProvider>
            <NavBar />
            {children}
            <Footer />
            <Toaster />
          </ContextProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
