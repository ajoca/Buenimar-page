import type { NextRequest } from "next/server";

import type { PanelSession, UserRole } from "@/src/lib/panel/types";

export const PANEL_AUTH_COOKIE = "bm_panel_auth";
export const PANEL_ROLE_COOKIE = "bm_panel_role";
export const PANEL_USER_COOKIE = "bm_panel_user";

const ONE_DAY_SECONDS = 60 * 60 * 24;
const ALLOWED_ROLES: UserRole[] = ["admin", "gerencia", "ventas", "deposito", "contabilidad"];

function getAuthSecret() {
  // TODO: Reemplazar por un secreto robusto de producción.
  return process.env.AUTH_SECRET || "panel-auth-dev-secret";
}

function normalizeRole(rawRole: string | null | undefined): UserRole {
  const role = (rawRole || "").trim().toLowerCase() as UserRole;
  return ALLOWED_ROLES.includes(role) ? role : "ventas";
}

export function getPanelRoleOptions(): UserRole[] {
  return ALLOWED_ROLES;
}

export function createPanelAuthToken(role: UserRole): string {
  return `${role}.${getAuthSecret()}`;
}

export function isValidPanelAuthToken(token?: string | null, role?: string | null): boolean {
  if (!token || !role) {
    return false;
  }

  return token === createPanelAuthToken(normalizeRole(role));
}

export function isPanelAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get(PANEL_AUTH_COOKIE)?.value;
  const role = request.cookies.get(PANEL_ROLE_COOKIE)?.value;
  return isValidPanelAuthToken(token, role);
}

export function getPanelSession(request: NextRequest): PanelSession | null {
  const username = request.cookies.get(PANEL_USER_COOKIE)?.value || "";
  const role = request.cookies.get(PANEL_ROLE_COOKIE)?.value || "";

  if (!isValidPanelAuthToken(request.cookies.get(PANEL_AUTH_COOKIE)?.value, role)) {
    return null;
  }

  return {
    username,
    role: normalizeRole(role),
  };
}

export function getPanelAuthCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ONE_DAY_SECONDS,
  };
}

export function clearPanelAuthCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  };
}

export function normalizePanelRole(value: string | null | undefined): UserRole {
  return normalizeRole(value);
}
