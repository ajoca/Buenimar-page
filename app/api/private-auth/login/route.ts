import { NextResponse } from "next/server";

import {
  PRIVATE_AUTH_COOKIE,
  PRIVATE_AUTH_SCOPE_COOKIE,
  PRIVATE_AUTH_USER_COOKIE,
  createPrivateAuthToken,
  findPrivateAuthAccount,
  getPrivateAuthCookieOptions,
} from "@/lib/privateAuth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/precios");

  const loginUrl = new URL("/precios/login", request.url);
  const account = findPrivateAuthAccount(username, password);

  if (!account) {
    loginUrl.searchParams.set("error", "1");
    if (next.startsWith("/")) {
      loginUrl.searchParams.set("next", next);
    }
    return NextResponse.redirect(loginUrl);
  }

  const requestedDestination = next.startsWith("/") ? next : "/precios";
  const defaultDestination = `/precios/${account.allowedFolders[0] || "conaprole"}`;
  const destination = account.allowedFolders.some((folder) => requestedDestination.startsWith(`/precios/${folder}`))
    ? requestedDestination
    : defaultDestination;
  const response = NextResponse.redirect(new URL(destination, request.url));
  const cookieOptions = getPrivateAuthCookieOptions();

  response.cookies.set(
    PRIVATE_AUTH_COOKIE,
    createPrivateAuthToken(account.username),
    cookieOptions
  );
  response.cookies.set(PRIVATE_AUTH_USER_COOKIE, account.username, cookieOptions);
  response.cookies.set(PRIVATE_AUTH_SCOPE_COOKIE, account.allowedFolders.join(","), cookieOptions);
  return response;
}
