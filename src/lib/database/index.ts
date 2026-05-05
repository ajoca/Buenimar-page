import { getDatabaseConfig, getProviderStatusMessage } from "@/src/lib/database/config";
import type { DataProviderAdapter } from "@/src/lib/database/types";
import { getPendingResponse } from "@/src/lib/database/response";
import type { ApiResponse, DataProvider } from "@/src/lib/panel/types";
import { createExternalApiAdapter } from "@/src/lib/database/adapters/externalApi";
import { createMongoDbAdapter } from "@/src/lib/database/adapters/mongodb";
import { createMySqlAdapter } from "@/src/lib/database/adapters/mysql";
import { createOracleAdapter } from "@/src/lib/database/adapters/oracle";
import { createPostgresAdapter } from "@/src/lib/database/adapters/postgres";
import { createSqlServerAdapter } from "@/src/lib/database/adapters/sqlserver";

function createAdapterByProvider(provider: DataProvider): DataProviderAdapter {
  switch (provider) {
    case "sqlserver":
      return createSqlServerAdapter();
    case "postgres":
      return createPostgresAdapter();
    case "mysql":
      return createMySqlAdapter();
    case "oracle":
      return createOracleAdapter();
    case "mongodb":
      return createMongoDbAdapter();
    case "external_api":
      return createExternalApiAdapter();
    default:
      return createExternalApiAdapter();
  }
}

export function getDataProviderAdapter(): DataProviderAdapter | null {
  const config = getDatabaseConfig();
  if (!config.provider) {
    return null;
  }

  return createAdapterByProvider(config.provider);
}

export function getDataPendingResponse<T>(data: T, message?: string): ApiResponse<T> {
  const config = getDatabaseConfig();
  return getPendingResponse<T>(data, message || getProviderStatusMessage(config));
}
