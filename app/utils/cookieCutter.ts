"use server";
import { cookies } from "next/headers";

export async function setTokenCookie(token: string) {
  const cookieStore = cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: true, // Only sent over HTTPS
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}
export async function setTypeCookie(token: string) {
  const cookieStore = cookies();

  cookieStore.set("userType", token, {
    httpOnly: true,
    secure: true, // Only sent over HTTPS
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function getTokenCookie() {
  const cookieStore = cookies();
  return cookieStore.get("token")?.value;
}
export async function getTypeCookie() {
  const cookieStore = cookies();
  return cookieStore.get("userType")?.value;
}

export async function deleteTokenCookie() {
  const cookieStore = cookies();
  cookieStore.delete("token");
}
export async function deleteTypeCookie() {
  const cookieStore = cookies();
  cookieStore.delete("userType");
}
