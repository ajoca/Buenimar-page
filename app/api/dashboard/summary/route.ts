import { NextResponse } from "next/server";

import { getDataPendingResponse, getDataProviderAdapter } from "@/src/lib/database";

export async function GET() {
  const adapter = getDataProviderAdapter();

  if (!adapter) {
    return NextResponse.json(getDataPendingResponse({ metrics: [], alerts: [], generatedAt: null }, "Proveedor de datos no configurado"));
  }

  const payload = await adapter.getDashboardSummary();
  return NextResponse.json(payload);
}
