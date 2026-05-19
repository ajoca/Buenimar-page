type CriticalEnvStatus = {
  key: string;
  configured: boolean;
};

export type PanelSystemStatus = {
  maintenanceMode: boolean;
  apiConfigured: boolean;
  dataSourceAvailable: boolean;
  criticalEnv: CriticalEnvStatus[];
  version: string;
};

const CRITICAL_ENV_KEYS = [
  "PANEL_AUTH_USERNAME",
  "PANEL_AUTH_PASSWORD",
  "AUTH_SECRET",
  "DATA_PROVIDER",
];

export function getPanelSystemStatus(): PanelSystemStatus {
  const criticalEnv = CRITICAL_ENV_KEYS.map((key) => ({
    key,
    configured: Boolean(process.env[key]?.trim()),
  }));

  const maintenanceMode = (process.env.PANEL_MAINTENANCE_MODE || "false").toLowerCase() === "true";
  const apiConfigured = Boolean(process.env.DATA_PROVIDER?.trim());
  const dataSourceAvailable = apiConfigured && !maintenanceMode;

  return {
    maintenanceMode,
    apiConfigured,
    dataSourceAvailable,
    criticalEnv,
    version: process.env.npm_package_version || process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
  };
}
