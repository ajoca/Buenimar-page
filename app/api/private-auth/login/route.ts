import { NextResponse } from "next/server";

import {
  PRIVATE_AUTH_COOKIE,
  createPrivateAuthToken,
  getPrivateAuthCookieOptions,
  getPrivateAuthCredentials,
} from "@/lib/privateAuth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/precios");

  const credentials = getPrivateAuthCredentials();
  const loginUrl = new URL("/precios/login", request.url);

  if (username !== credentials.username || password !== credentials.password) {
    loginUrl.searchParams.set("error", "1");
    if (next.startsWith("/")) {
      loginUrl.searchParams.set("next", next);
    }
    return NextResponse.redirect(loginUrl);
  }

  const destination = next.startsWith("/") ? next : "/precios";
  const response = NextResponse.redirect(new URL(destination, request.url));
  response.cookies.set(
    PRIVATE_AUTH_COOKIE,
    createPrivateAuthToken(),
    getPrivateAuthCookieOptions()
  );
  return response;
}
