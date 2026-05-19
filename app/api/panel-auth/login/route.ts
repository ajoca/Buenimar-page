import { NextResponse } from "next/server";

import {
  PANEL_AUTH_COOKIE,
  PANEL_ROLE_COOKIE,
  PANEL_USER_COOKIE,
  createPanelAuthToken,
  getPanelAuthCookieOptions,
  normalizePanelRole,
} from "@/lib/panelAuth";
import { registerAuditEvent } from "@/services/auditService";
import { logTechnicalError } from "@/src/lib/panel/errorHandling";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const username = String(formData.get("username") || "").trim();
    const password = String(formData.get("password") || "").trim();
    const role = normalizePanelRole(String(formData.get("role") || ""));

    const requestUrl = new URL(request.url);
    const forwardedHost = request.headers.get("x-forwarded-host");
    const forwardedProto = request.headers.get("x-forwarded-proto") || requestUrl.protocol.replace(":", "");
    const origin = forwardedHost ? `${forwardedProto}://${forwardedHost}` : requestUrl.origin;

    const next = String(formData.get("next") || "/panel/dashboard");
    const loginUrl = new URL("/login", origin);

    // TODO: Reemplazar validacion por proveedor real (LDAP/SSO/API interna).
    const configuredUser = process.env.PANEL_AUTH_USERNAME?.trim() || "";
    const configuredPassword = process.env.PANEL_AUTH_PASSWORD?.trim() || "";

    if (!configuredUser || !configuredPassword) {
      registerAuditEvent({
        user: username || "anonymous",
        role,
        action: "login_failed",
        module: "auth",
        success: false,
        message: "Intento de acceso con autenticacion no configurada",
        errorCode: "AUTH_NOT_CONFIGURED",
      });
      loginUrl.searchParams.set("error", "not-configured");
      return NextResponse.redirect(loginUrl);
    }

    if (username !== configuredUser || password !== configuredPassword) {
      registerAuditEvent({
        user: username || "anonymous",
        role,
        action: "login_failed",
        module: "auth",
        success: false,
        message: "Intento de acceso fallido",
        errorCode: "INVALID_CREDENTIALS",
      });
      loginUrl.searchParams.set("error", "invalid-credentials");
      return NextResponse.redirect(loginUrl);
    }

    const destination = next.startsWith("/panel") ? next : "/panel/dashboard";
    const response = NextResponse.redirect(new URL(destination, origin));

    response.cookies.set(PANEL_AUTH_COOKIE, createPanelAuthToken(role), getPanelAuthCookieOptions());
    response.cookies.set(PANEL_ROLE_COOKIE, role, getPanelAuthCookieOptions());
    response.cookies.set(PANEL_USER_COOKIE, username, getPanelAuthCookieOptions());

    registerAuditEvent({
      user: username,
      role,
      action: "login_success",
      module: "auth",
      success: true,
      message: "Inicio de sesion exitoso",
    });

    return response;
  } catch (error) {
    logTechnicalError({
      error,
      module: "auth",
      user: "anonymous",
      fallbackCode: "LOGIN_ROUTE_ERROR",
    });

    return NextResponse.redirect(new URL("/login?error=invalid-credentials", request.url));
  }
}
