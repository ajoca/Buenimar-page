import { NextResponse } from "next/server";

import { logTechnicalError, toUserSafeMessage } from "@/src/lib/panel/errorHandling";
import { getPanelSystemStatus } from "@/src/lib/panel/systemStatus";
import { getDatabaseConfig, validateDatabaseConfig } from "@/src/lib/database/config";
import { getDataPendingResponse, getDataProviderAdapter } from "@/src/lib/database";

export async function GET() {
  try {
    const adapter = getDataProviderAdapter();
    const systemStatus = getPanelSystemStatus();

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
            apiStatus: "degraded",
            dataSourceStatus: "disconnected",
            lastSyncAt: null,
            criticalVariables: systemStatus.criticalEnv,
            version: systemStatus.version,
            maintenanceMode: systemStatus.maintenanceMode,
          },
          "Proveedor de datos no configurado"
        )
      );
    }

    const payload = await adapter.getHealth();
    return NextResponse.json({
      ...payload,
      diagnostics: {
        apiStatus: payload.success ? "ok" : "degraded",
        dataSourceStatus: payload.data.connected ? "connected" : "disconnected",
        lastSyncAt: payload.meta?.timestamp || null,
        criticalVariables: systemStatus.criticalEnv,
        version: systemStatus.version,
        maintenanceMode: systemStatus.maintenanceMode,
      },
    });
  } catch (error) {
    logTechnicalError({
      error,
      module: "health",
      user: "system",
      fallbackCode: "HEALTH_ENDPOINT_FAILURE",
    });

    return NextResponse.json(
      {
        success: false,
        message: toUserSafeMessage(error, "No fue posible completar el health check."),
        data: {
          apiStatus: "error",
          dataSourceStatus: "unknown",
          lastSyncAt: null,
          criticalVariables: getPanelSystemStatus().criticalEnv,
          version: getPanelSystemStatus().version,
          maintenanceMode: getPanelSystemStatus().maintenanceMode,
        },
        errorCode: "HEALTH_CHECK_ERROR",
      },
      { status: 500 }
    );
  }
}
