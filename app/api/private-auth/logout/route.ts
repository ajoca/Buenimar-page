import { NextResponse } from "next/server";

import { PRIVATE_AUTH_COOKIE, PRIVATE_AUTH_SCOPE_COOKIE, PRIVATE_AUTH_USER_COOKIE } from "@/lib/privateAuth";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/precios/login", request.url));
  const expiredCookie = {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  } as const;
  response.cookies.set(PRIVATE_AUTH_COOKIE, "", expiredCookie);
  response.cookies.set(PRIVATE_AUTH_USER_COOKIE, "", expiredCookie);
  response.cookies.set(PRIVATE_AUTH_SCOPE_COOKIE, "", expiredCookie);
  return response;
}
