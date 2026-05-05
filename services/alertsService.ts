import type { AlertSeverity, ApiResponse, DashboardAlert } from "@/src/lib/panel/types";

export type AlertFilters = {
  severity?: AlertSeverity | "all";
  from?: string;
  to?: string;
};

export async function getAlerts(_filters?: AlertFilters): Promise<ApiResponse<DashboardAlert[]>> {
  try {
    const response = await fetch("/api/alerts", {
      method: "GET",
      cache: "no-store",
    });

    return (await response.json()) as ApiResponse<DashboardAlert[]>;
  } catch {
    return {
      success: false,
      message: "Fuente de datos pendiente de configuración",
      data: [],
      meta: {
        provider: "not_configured",
        pendingConnection: true,
        timestamp: new Date().toISOString(),
      },
      errorCode: "DATA_SOURCE_PENDING",
    };
  }

  // TODO: Integrar filtros reales al endpoint cuando el proveedor de datos esté definido.
}
