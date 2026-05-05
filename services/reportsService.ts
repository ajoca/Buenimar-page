import type { ApiResponse, ReportConfig } from "@/src/lib/panel/types";

export async function getReports(): Promise<ApiResponse<ReportConfig[]>> {
  try {
    const response = await fetch("/api/reports", {
      method: "GET",
      cache: "no-store",
    });

    return (await response.json()) as ApiResponse<ReportConfig[]>;
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

  // TODO: Agregar exportación real y parámetros dinámicos cuando exista backend definitivo.
}
