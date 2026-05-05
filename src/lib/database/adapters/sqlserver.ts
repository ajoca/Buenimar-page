import { getPendingResponse } from "@/src/lib/database/response";
import type { DataProviderAdapter } from "@/src/lib/database/types";

export function createSqlServerAdapter(): DataProviderAdapter {
  return {
    provider: "sqlserver",
    async getHealth() {
      return getPendingResponse(
        {
          provider: "sqlserver",
          configured: false,
          connected: false,
          message: "Adaptador SQL Server pendiente de implementación",
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
