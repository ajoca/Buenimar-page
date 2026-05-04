import { NextRequest, NextResponse } from "next/server";

import { savePrivateCatalogFile, getPrivateCatalogFolder } from "@/lib/privateCatalogs";
import { isPrivateAuthenticated } from "@/lib/privateAuth";

export async function POST(request: NextRequest) {
  if (!isPrivateAuthenticated(request)) {
    return NextResponse.redirect(new URL("/precios/login", request.url));
  }

  const formData = await request.formData();
  const folder = String(formData.get("folder") || "").trim().toLowerCase();
  const redirectTo = String(formData.get("redirectTo") || `/precios/${folder || "conaprole"}`);
  const file = formData.get("file");

  const safeRedirect = redirectTo.startsWith("/") ? redirectTo : "/precios/conaprole";
  const redirectUrl = new URL(safeRedirect, request.url);

  if (!getPrivateCatalogFolder(folder)) {
    redirectUrl.searchParams.set("upload", "folder-error");
    return NextResponse.redirect(redirectUrl);
  }

  if (!(file instanceof File) || file.size === 0) {
    redirectUrl.searchParams.set("upload", "empty");
    return NextResponse.redirect(redirectUrl);
  }

  if (!file.name.toLowerCase().endsWith(".pdf")) {
    redirectUrl.searchParams.set("upload", "type-error");
    return NextResponse.redirect(redirectUrl);
  }

  try {
    await savePrivateCatalogFile(folder, file);
    redirectUrl.searchParams.set("upload", "ok");
    return NextResponse.redirect(redirectUrl);
  } catch {
    redirectUrl.searchParams.set("upload", "error");
    return NextResponse.redirect(redirectUrl);
  }
}
