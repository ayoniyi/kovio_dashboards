import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import { ContextProvider } from "@/context/allcontext";
import NextAuthProvider from "@/components/NextAuthProvider";
import ReactQueryProvider from "@/components/QueryProvider";
import { Toaster } from "@/components/ui/shadcn/toaster";
import { AuthContextProvider } from "@/context/AuthContext";

const inter_tight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter_tight",
});

// const gabarito = Gabarito({
//   subsets: ["latin"],
//   variable: "--font-gabarito",
// });

export const metadata: Metadata = {
  title: "Kovio",
  description: "Marketplace for event venues",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter_tight.variable} `}>
      <body>
        <ReactQueryProvider>
          <AuthContextProvider>
            <ContextProvider>
              <NextAuthProvider>
                {children}
                <Toaster />
              </NextAuthProvider>
            </ContextProvider>
          </AuthContextProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
