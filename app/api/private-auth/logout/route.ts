import { NextResponse } from "next/server";

import { PRIVATE_AUTH_COOKIE } from "@/lib/privateAuth";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/precios/login", request.url));
  response.cookies.set(PRIVATE_AUTH_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });
  return response;
}
