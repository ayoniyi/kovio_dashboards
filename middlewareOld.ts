// /** @format */

// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";

// export async function middleware(req: NextRequest) {
//   const token = await getToken({
//     req,
//     secret: process.env.NEXTAUTH_SECRET,
//   });

//   console.log("token?", token);

//   if (!token) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/vendor/:path*",
//     "/customer/:path*",
//     "/onboarding/:path*",
//     "/admin:path*",
//   ],
// };

// "use client";

// //import { isAuthenticated } from "./app/utils/auth";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// const protectedCustomerRoutes = ["/customer/:path*"];
// const protectedVendorRoutes = ["/vendor/:path*"];

// export default function middleware(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;
//   const userType = req.cookies.get("userType")?.value;

//   if (
//     token !== "" &&
//     protectedCustomerRoutes.includes(req.nextUrl.pathname)
//   ) {
//     const absoluteURL = new URL("/", req.nextUrl.origin);
//     return NextResponse.redirect(absoluteURL.toString());
//   }
// }
