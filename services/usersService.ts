import type { ApiResponse, PanelUser } from "@/src/lib/panel/types";

export async function getPanelUsers(): Promise<ApiResponse<PanelUser[]>> {
  try {
    const response = await fetch("/api/users", {
      method: "GET",
      cache: "no-store",
    });

    return (await response.json()) as ApiResponse<PanelUser[]>;
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

  // TODO: Implementar ABM real de usuarios contra fuente autorizada.
}
