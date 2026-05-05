import { getPendingResponse } from "@/src/lib/database/response";
import type { DataProviderAdapter } from "@/src/lib/database/types";

export function createExternalApiAdapter(): DataProviderAdapter {
  return {
    provider: "external_api",
    async getHealth() {
      return getPendingResponse(
        {
          provider: "external_api",
          configured: false,
          connected: false,
          message: "Adaptador API externa pendiente de implementación",
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
