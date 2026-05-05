import { NextResponse } from "next/server";

import { getDatabaseConfig, validateDatabaseConfig } from "@/src/lib/database/config";
import { getDataPendingResponse, getDataProviderAdapter } from "@/src/lib/database";

export async function GET() {
  const adapter = getDataProviderAdapter();

  if (!adapter) {
    const config = getDatabaseConfig();
    const warnings = validateDatabaseConfig(config);

    return NextResponse.json(
      getDataPendingResponse(
        {
          provider: "not_configured",
          configured: false,
          connected: false,
          message: "Proveedor de datos no configurado",
          warnings,
        },
        "Proveedor de datos no configurado"
      )
    );
  }

  const payload = await adapter.getHealth();
  return NextResponse.json(payload);
}
