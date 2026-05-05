import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { isPanelAuthenticated } from "@/lib/panelAuth";
import { isPrivateAuthenticated } from "@/lib/privateAuth";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname.startsWith("/precios")) {
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

  if (pathname.startsWith("/panel")) {
    if (isPanelAuthenticated(request)) {
      return NextResponse.next();
    }

    const loginUrl = new URL("/login", request.url);
    const returnTo = `${pathname}${search}`;
    loginUrl.searchParams.set("next", returnTo);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/login" && isPanelAuthenticated(request)) {
    return NextResponse.redirect(new URL("/panel/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/precios/:path*", "/panel/:path*", "/login"],
};
