import { NextResponse } from "next/server";

import {
  PANEL_AUTH_COOKIE,
  PANEL_ROLE_COOKIE,
  PANEL_USER_COOKIE,
  clearPanelAuthCookieOptions,
} from "@/lib/panelAuth";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/login", request.url));
  const options = clearPanelAuthCookieOptions();

  response.cookies.set(PANEL_AUTH_COOKIE, "", options);
  response.cookies.set(PANEL_ROLE_COOKIE, "", options);
  response.cookies.set(PANEL_USER_COOKIE, "", options);

  return response;
}
