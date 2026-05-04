import type { NextRequest } from "next/server";

export const PRIVATE_AUTH_COOKIE = "bm_private_auth";
const ONE_DAY_SECONDS = 60 * 60 * 24;

function getSessionToken() {
  return process.env.PRIVATE_PRICES_SESSION_SECRET || process.env.PRIVATE_AUTH_SECRET || "bm-private-session";
}

export function getPrivateAuthCredentials() {
  return {
    username: process.env.PRIVATE_PRICES_USERNAME || "distribuidores",
    password: process.env.PRIVATE_PRICES_PASSWORD || "Buenimar2026!",
  };
}

export function createPrivateAuthToken() {
  return getSessionToken();
}

export function isValidPrivateAuthToken(token?: string | null) {
  return !!token && token === getSessionToken();
}

export function isPrivateAuthenticated(request: NextRequest) {
  const token = request.cookies.get(PRIVATE_AUTH_COOKIE)?.value;
  return isValidPrivateAuthToken(token);
}

export function getPrivateAuthCookieOptions() {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: isProduction,
    path: "/",
    maxAge: ONE_DAY_SECONDS,
  };
}
