import { getDatabaseConfig } from "@/src/lib/database/config";
import type { ApiResponse } from "@/src/lib/panel/types";

export function getPendingResponse<T>(data: T, message = "Fuente de datos pendiente de configuración"): ApiResponse<T> {
  const config = getDatabaseConfig();

  return {
    success: false,
    message,
    data,
    meta: {
      provider: config.provider ?? "not_configured",
      pendingConnection: true,
      timestamp: new Date().toISOString(),
    },
    errorCode: "DATA_SOURCE_PENDING",
  };
}
