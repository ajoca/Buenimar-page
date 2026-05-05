import type { NextRequest } from "next/server";

export const PRIVATE_AUTH_COOKIE = "bm_private_auth";
export const PRIVATE_AUTH_USER_COOKIE = "bm_private_user";
export const PRIVATE_AUTH_SCOPE_COOKIE = "bm_private_scope";
const ONE_DAY_SECONDS = 60 * 60 * 24;

export type PrivateAuthAccount = {
  username: string;
  password: string;
  allowedFolders: string[];
};

export type PrivateAuthSession = {
  username: string;
  allowedFolders: string[];
};

function getSessionToken() {
  return process.env.PRIVATE_PRICES_SESSION_SECRET || process.env.PRIVATE_AUTH_SECRET || "bm-private-session";
}

export function getPrivateAuthAccounts(): PrivateAuthAccount[] {
  return [
    {
      username: process.env.PRIVATE_PRICES_USERNAME || "distribuidores",
      password: process.env.PRIVATE_PRICES_PASSWORD || "Buenimar2026!",
      allowedFolders: ["conaprole"],
    },
    {
      username: process.env.PRIVATE_GENERAL_USERNAME || "buenimar_general",
      password: process.env.PRIVATE_GENERAL_PASSWORD || "BuenimarGeneral2026!",
      allowedFolders: ["buenimar-general"],
    },
  ];
}

export function findPrivateAuthAccount(username: string, password: string) {
  return getPrivateAuthAccounts().find((account) => account.username === username && account.password === password) || null;
}

export function createPrivateAuthToken(username: string) {
  return `${username}.${getSessionToken()}`;
}

export function isValidPrivateAuthToken(token?: string | null, username?: string | null) {
  return !!token && !!username && token === createPrivateAuthToken(username);
}

function parseAllowedFolders(rawScope?: string | null) {
  return (rawScope || "")
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
}

export function getPrivateAuthSessionFromCookieStore(cookieStore: {
  get(name: string): { value: string } | undefined;
}): PrivateAuthSession | null {
  const token = cookieStore.get(PRIVATE_AUTH_COOKIE)?.value;
  const username = cookieStore.get(PRIVATE_AUTH_USER_COOKIE)?.value;
  const rawScope = cookieStore.get(PRIVATE_AUTH_SCOPE_COOKIE)?.value;

  if (!isValidPrivateAuthToken(token, username)) {
    return null;
  }

  return {
    username: username || "",
    allowedFolders: parseAllowedFolders(rawScope),
  };
}

export function isPrivateAuthenticated(request: NextRequest) {
  return !!getPrivateAuthSession(request);
}

export function getPrivateAuthSession(request: NextRequest): PrivateAuthSession | null {
  return getPrivateAuthSessionFromCookieStore(request.cookies);
}

export function canAccessPrivateFolder(request: NextRequest, folderSlug: string) {
  const session = getPrivateAuthSession(request);
  return !!session && session.allowedFolders.includes(folderSlug.toLowerCase());
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
