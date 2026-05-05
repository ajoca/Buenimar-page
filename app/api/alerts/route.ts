import { NextResponse } from "next/server";

import { getDataPendingResponse, getDataProviderAdapter } from "@/src/lib/database";

export async function GET() {
  const adapter = getDataProviderAdapter();

  if (!adapter) {
    return NextResponse.json(getDataPendingResponse([], "Proveedor de datos no configurado"));
  }

  const payload = await adapter.getAlerts();
  return NextResponse.json(payload);
}
