import { getPendingResponse } from "@/src/lib/database/response";
import type { DataProviderAdapter } from "@/src/lib/database/types";

export function createMySqlAdapter(): DataProviderAdapter {
  return {
    provider: "mysql",
    async getHealth() {
      return getPendingResponse(
        {
          provider: "mysql",
          configured: false,
          connected: false,
          message: "Adaptador MySQL pendiente de implementación",
        },
        "Fuente de datos pendiente de configuración"
      );
    },
    async getDashboardSummary() {
      return getPendingResponse({ metrics: [], alerts: [], generatedAt: null });
    },
    async getAlerts() {
      return getPendingResponse([]);
    },
    async getReports() {
      return getPendingResponse([]);
    },
    async getUsers() {
      return getPendingResponse([]);
    },
  };
}
