/** @format */

// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      firstName?: string;
      lastName?: string;
      email?: string;
      image?: string;
      profileSetup: boolean;
      auth: string;
      userType: "VENDOR" | "VENUE" | "CUSTOMER";
    };
  }

  interface User extends DefaultUser {
    id: string;
    auth: string;
    firstName: string;
    email: string;
    lastName: string;
    userType: "VENDOR" | "VENUE" | "CUSTOMER";
    profileSetup: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      id: string;
      userType: "VENDOR" | "VENUE" | "CUSTOMER";
      auth: string;
      firstName?: string;
      lastName?: string;
      email?: string;
      image?: string;
      profileSetup: boolean;
      auth: string;
      profileSetup: boolean;
    };
  }
}
