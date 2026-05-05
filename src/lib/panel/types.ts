export type UserRole = "admin" | "gerencia" | "ventas" | "deposito" | "contabilidad";

export type DataProvider =
  | "sqlserver"
  | "postgres"
  | "mysql"
  | "oracle"
  | "mongodb"
  | "external_api";

export type AlertSeverity = "critical" | "medium" | "low";

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    provider: DataProvider | "not_configured";
    pendingConnection: boolean;
    timestamp: string;
  };
  errorCode?: string;
};

export type DatabaseConfig = {
  provider: DataProvider | null;
  host: string;
  port: string;
  name: string;
  user: string;
  password: string;
  ssl: boolean;
  apiBaseUrl: string;
};

export type DashboardMetric = {
  id: string;
  label: string;
  value: string | null;
  status: "pending" | "ready" | "error";
  note: string;
};

export type DashboardAlert = {
  id: string;
  title: string;
  message: string;
  severity: AlertSeverity;
  createdAt: string;
  source: string;
};

export type DashboardSummary = {
  metrics: DashboardMetric[];
  alerts: DashboardAlert[];
  generatedAt: string | null;
};

export type ReportConfig = {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
};

export type PanelUser = {
  id: string;
  displayName: string;
  email: string;
  role: UserRole;
  status: "active" | "inactive";
  lastAccessAt: string | null;
};

export type PanelSession = {
  username: string;
  role: UserRole;
};
