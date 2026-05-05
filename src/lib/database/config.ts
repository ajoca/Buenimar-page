import type { DataProvider, DatabaseConfig } from "@/src/lib/panel/types";

const VALID_PROVIDERS: DataProvider[] = [
  "sqlserver",
  "postgres",
  "mysql",
  "oracle",
  "mongodb",
  "external_api",
];

function parseProvider(rawProvider: string | undefined): DataProvider | null {
  if (!rawProvider) {
    return null;
  }

  const normalized = rawProvider.trim().toLowerCase() as DataProvider;
  return VALID_PROVIDERS.includes(normalized) ? normalized : null;
}

export function getDatabaseConfig(): DatabaseConfig {
  return {
    provider: parseProvider(process.env.DATA_PROVIDER),
    host: process.env.DATABASE_HOST?.trim() || "",
    port: process.env.DATABASE_PORT?.trim() || "",
    name: process.env.DATABASE_NAME?.trim() || "",
    user: process.env.DATABASE_USER?.trim() || "",
    password: process.env.DATABASE_PASSWORD?.trim() || "",
    ssl: (process.env.DATABASE_SSL || "").toLowerCase() === "true",
    apiBaseUrl: process.env.API_BASE_URL?.trim() || "",
  };
}

export function getProviderStatusMessage(config: DatabaseConfig): string {
  if (!config.provider) {
    return "Proveedor de datos no configurado";
  }

  return "Fuente de datos pendiente de configuración";
}

export function validateDatabaseConfig(config: DatabaseConfig): string[] {
  const warnings: string[] = [];

  if (!config.provider) {
    warnings.push("DATA_PROVIDER no está configurado");
  }

  if (config.provider === "external_api" && !config.apiBaseUrl) {
    warnings.push("API_BASE_URL no está configurado");
  }

  if (config.provider && config.provider !== "external_api") {
    if (!config.host) warnings.push("DATABASE_HOST no está configurado");
    if (!config.port) warnings.push("DATABASE_PORT no está configurado");
    if (!config.name) warnings.push("DATABASE_NAME no está configurado");
    if (!config.user) warnings.push("DATABASE_USER no está configurado");
    // Never log or expose the password value.
    if (!config.password) warnings.push("DATABASE_PASSWORD no está configurado");
  }

  return warnings;
}
