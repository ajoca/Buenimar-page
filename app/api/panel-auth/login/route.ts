import { NextResponse } from "next/server";

import {
  PANEL_AUTH_COOKIE,
  PANEL_ROLE_COOKIE,
  PANEL_USER_COOKIE,
  createPanelAuthToken,
  getPanelAuthCookieOptions,
  normalizePanelRole,
} from "@/lib/panelAuth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "").trim();
  const role = normalizePanelRole(String(formData.get("role") || ""));

  const next = String(formData.get("next") || "/panel/dashboard");
  const loginUrl = new URL("/login", request.url);

  // TODO: Reemplazar validación por proveedor real (LDAP/SSO/API interna).
  const configuredUser = process.env.PANEL_AUTH_USERNAME?.trim() || "";
  const configuredPassword = process.env.PANEL_AUTH_PASSWORD?.trim() || "";

  if (!configuredUser || !configuredPassword) {
    loginUrl.searchParams.set("error", "not-configured");
    return NextResponse.redirect(loginUrl);
  }

  if (username !== configuredUser || password !== configuredPassword) {
    loginUrl.searchParams.set("error", "invalid-credentials");
    return NextResponse.redirect(loginUrl);
  }

  const destination = next.startsWith("/panel") ? next : "/panel/dashboard";
  const response = NextResponse.redirect(new URL(destination, request.url));

  response.cookies.set(PANEL_AUTH_COOKIE, createPanelAuthToken(role), getPanelAuthCookieOptions());
  response.cookies.set(PANEL_ROLE_COOKIE, role, getPanelAuthCookieOptions());
  response.cookies.set(PANEL_USER_COOKIE, username, getPanelAuthCookieOptions());

  return response;
}
