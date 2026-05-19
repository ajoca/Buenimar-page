import { NextResponse } from "next/server";

import {
  PANEL_AUTH_COOKIE,
  PANEL_ROLE_COOKIE,
  PANEL_USER_COOKIE,
  clearPanelAuthCookieOptions,
} from "@/lib/panelAuth";
import { registerAuditEvent } from "@/services/auditService";
import { logTechnicalError } from "@/src/lib/panel/errorHandling";

export async function POST(request: Request) {
  try {
    const response = NextResponse.redirect(new URL("/login", request.url));
    const options = clearPanelAuthCookieOptions();

    response.cookies.set(PANEL_AUTH_COOKIE, "", options);
    response.cookies.set(PANEL_ROLE_COOKIE, "", options);
    response.cookies.set(PANEL_USER_COOKIE, "", options);

    registerAuditEvent({
      user: "authenticated_user",
      action: "logout",
      module: "auth",
      success: true,
      message: "Cierre de sesion",
    });

    return response;
  } catch (error) {
    logTechnicalError({
      error,
      module: "auth",
      user: "authenticated_user",
      fallbackCode: "LOGOUT_ROUTE_ERROR",
    });

    return NextResponse.redirect(new URL("/login", request.url));
  }
}
