import { NextRequest, NextResponse } from "next/server";

import { deletePrivateCatalogFile, getPrivateCatalogFolder } from "@/lib/privateCatalogs";
import { isPrivateAuthenticated } from "@/lib/privateAuth";

export async function POST(request: NextRequest) {
  if (!isPrivateAuthenticated(request)) {
    return NextResponse.redirect(new URL("/precios/login", request.url));
  }

  const formData = await request.formData();
  const folder = String(formData.get("folder") || "").trim().toLowerCase();
  const fileName = String(formData.get("fileName") || "").trim();
  const redirectTo = String(formData.get("redirectTo") || `/precios/${folder || "conaprole"}`);

  const safeRedirect = redirectTo.startsWith("/") ? redirectTo : "/precios/conaprole";
  const redirectUrl = new URL(safeRedirect, request.url);

  if (!getPrivateCatalogFolder(folder) || !fileName) {
    redirectUrl.searchParams.set("delete", "invalid");
    return NextResponse.redirect(redirectUrl);
  }

  try {
    await deletePrivateCatalogFile(folder, fileName);
    redirectUrl.searchParams.set("delete", "ok");
    return NextResponse.redirect(redirectUrl);
  } catch {
    redirectUrl.searchParams.set("delete", "error");
    return NextResponse.redirect(redirectUrl);
  }
}
