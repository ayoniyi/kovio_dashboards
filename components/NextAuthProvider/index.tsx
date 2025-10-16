/** @format */

"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface NextAuthProviderProps {
  children: ReactNode;
}

export default function NextAuthProvider({ children }: NextAuthProviderProps) {
  return (
    <SessionProvider
      refetchInterval={0}
      refetchOnWindowFocus={false}
      refetchWhenOffline={false}
    >
      {children}
    </SessionProvider>
  );
}
