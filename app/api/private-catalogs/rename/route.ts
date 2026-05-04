import { NextRequest, NextResponse } from "next/server";

import { getPrivateCatalogFolder, renamePrivateCatalogFile } from "@/lib/privateCatalogs";
import { isPrivateAuthenticated } from "@/lib/privateAuth";

export async function POST(request: NextRequest) {
  if (!isPrivateAuthenticated(request)) {
    return NextResponse.redirect(new URL("/precios/login", request.url));
  }

  const formData = await request.formData();
  const folder = String(formData.get("folder") || "").trim().toLowerCase();
  const currentName = String(formData.get("currentName") || "").trim();
  const nextName = String(formData.get("nextName") || "").trim();
  const redirectTo = String(formData.get("redirectTo") || `/precios/${folder || "conaprole"}`);

  const safeRedirect = redirectTo.startsWith("/") ? redirectTo : "/precios/conaprole";
  const redirectUrl = new URL(safeRedirect, request.url);

  if (!getPrivateCatalogFolder(folder) || !currentName || !nextName) {
    redirectUrl.searchParams.set("rename", "invalid");
    return NextResponse.redirect(redirectUrl);
  }

  try {
    await renamePrivateCatalogFile(folder, currentName, nextName);
    redirectUrl.searchParams.set("rename", "ok");
    return NextResponse.redirect(redirectUrl);
  } catch {
    redirectUrl.searchParams.set("rename", "error");
    return NextResponse.redirect(redirectUrl);
  }
}
