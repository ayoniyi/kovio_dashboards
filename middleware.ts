import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const userType = req.cookies.get("userType")?.value;
  const pathname = req.nextUrl.pathname;

  const isCustomerRoute = pathname.startsWith("/customer");
  const isVendorRoute = pathname.startsWith("/vendor");

  if (!token) {
    if (isCustomerRoute || isVendorRoute) {
      return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
    }
    return NextResponse.next();
  }

  if (userType === "CUSTOMER") {
    if (isVendorRoute) {
      return NextResponse.redirect(new URL("/customer", req.nextUrl.origin));
    }
  }

  if (userType === "VENDOR") {
    if (isCustomerRoute) {
      return NextResponse.redirect(new URL("/vendor", req.nextUrl.origin));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/customer/:path*", "/vendor/:path*"],
};
