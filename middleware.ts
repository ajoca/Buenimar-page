import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { isPrivateAuthenticated } from "@/lib/privateAuth";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (!pathname.startsWith("/precios")) {
    return NextResponse.next();
  }

  if (pathname === "/precios/login") {
    return NextResponse.next();
  }

  if (isPrivateAuthenticated(request)) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/precios/login", request.url);
  const returnTo = `${pathname}${search}`;
  loginUrl.searchParams.set("next", returnTo);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/precios/:path*"],
};
