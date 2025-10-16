/** @format */
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import axios from "axios";

interface UserResponse {
  description: string;
  responseBody: {
    firstName: string;
    lastName: string;
    email: string;
    userType: string;
    userId: number;
    auth: string;
    profileSetup: boolean;
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {},
      async authorize(credentials): Promise<any> {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

      
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/user-service/onboarding/login-account`,
            {
              email,
              password,
            }
          );

       
          const data = res.data as UserResponse;
          // console.log("Login successful:", data);

          return {
            id: data.responseBody.userId.toString(),
            firstName: data.responseBody.firstName,
            lastName: data.responseBody.lastName,
            email: data.responseBody.email,
            userType: data.responseBody.userType,
            auth: data.responseBody.auth,
            profileSetup: data.responseBody.profileSetup,
          };
        } catch (error: any) {
          // console.log("Login error:", error.response?.data.response_message);

          throw new Error(
            error.response?.data.response_message ||
              "An error occurred during login"
          );
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          userType: user.userType,
          auth: user.auth,
          profileSetup: user.profileSetup,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = {
          ...session.user,
          id: token.user.id,
          firstName: token.user.firstName,
          lastName: token.user.lastName,
          userType: token.user.userType,
          auth: token.user.auth,
          profileSetup: token.user.profileSetup,
        };
      }
      return session;
    },
  },
};
