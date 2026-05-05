import type { ApiResponse, DashboardSummary } from "@/src/lib/panel/types";

export async function getDashboardSummary(): Promise<ApiResponse<DashboardSummary>> {
  try {
    const response = await fetch("/api/dashboard/summary", {
      method: "GET",
      cache: "no-store",
    });

    return (await response.json()) as ApiResponse<DashboardSummary>;
  } catch {
    return {
      success: false,
      message: "Fuente de datos pendiente de configuración",
      data: { metrics: [], alerts: [], generatedAt: null },
      meta: {
        provider: "not_configured",
        pendingConnection: true,
        timestamp: new Date().toISOString(),
      },
      errorCode: "DATA_SOURCE_PENDING",
    };
  }

  // TODO: Cuando exista backend real, mapear la respuesta definitiva del dashboard.
}
