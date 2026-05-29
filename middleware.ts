import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { PANEL_ROLE_COOKIE, isPanelAuthenticated, normalizePanelRole } from "@/lib/panelAuth";
import { canAccessPrivateFolder, isPrivateAuthenticated } from "@/lib/privateAuth";
import { canAccess, type PanelPermission } from "@/src/lib/panel/permissions";

const PANEL_ROUTE_PERMISSIONS: Array<{ pattern: RegExp; permission: PanelPermission }> = [
  { pattern: /^\/panel\/alertas\/reglas(?:\/|$)/, permission: "configure_alerts" },
  { pattern: /^\/panel(?:\/dashboard|\/clientes|\/analisis)?(?:\/|$)/, permission: "view_dashboard" },
  { pattern: /^\/panel\/reportes(?:\/|$)/, permission: "view_reports" },
  { pattern: /^\/panel\/alertas(?:\/|$)/, permission: "view_alerts" },
  { pattern: /^\/panel\/usuarios(?:\/|$)/, permission: "manage_users" },
  { pattern: /^\/panel\/configuracion(?:\/|$)/, permission: "manage_settings" },
  { pattern: /^\/panel\/health(?:\/|$)/, permission: "manage_settings" },
];

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname.startsWith("/.env") || pathname.startsWith("/.git") || pathname.startsWith("/src")) {
    return new NextResponse(null, { status: 404 });
  }

  const isProtectedAsset =
    pathname.startsWith("/archivos/precios/") ||
    pathname.startsWith("/archivos/catalogos%20pdfs%20conaprole/") ||
    pathname.startsWith("/archivos/catalogos pdfs conaprole/") ||
    pathname.startsWith("/archivos/lista%20precios%20general/") ||
    pathname.startsWith("/archivos/lista precios general/");

  if (isProtectedAsset && !isPrivateAuthenticated(request)) {
    return new NextResponse(null, { status: 404 });
  }

  if (pathname.startsWith("/precios")) {
    if (pathname === "/precios/login") {
      return NextResponse.next();
    }

    if (isPrivateAuthenticated(request)) {
      const folderMatch = pathname.match(/^\/precios\/([^/?#]+)/);
      if (folderMatch && !canAccessPrivateFolder(request, folderMatch[1])) {
        return NextResponse.redirect(new URL("/precios", request.url));
      }

      return NextResponse.next();
    }

    const loginUrl = new URL("/precios/login", request.url);
    const returnTo = `${pathname}${search}`;
    loginUrl.searchParams.set("next", returnTo);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/panel")) {
    if (isPanelAuthenticated(request)) {
      const role = normalizePanelRole(request.cookies.get(PANEL_ROLE_COOKIE)?.value);
      const rule = PANEL_ROUTE_PERMISSIONS.find((item) => item.pattern.test(pathname));
      if (rule && !canAccess(role, rule.permission)) {
        return NextResponse.redirect(new URL("/panel", request.url));
      }

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
  matcher: [
    "/precios/:path*",
    "/panel/:path*",
    "/login",
    "/archivos/precios/:path*",
    "/archivos/catalogos pdfs conaprole/:path*",
    "/archivos/lista precios general/:path*",
  ],
};
