import type {
  ApiResponse,
  DashboardAlert,
  DashboardSummary,
  DataProvider,
  ReportConfig,
  PanelUser,
} from "@/src/lib/panel/types";

export type DataAdapterHealth = {
  provider: DataProvider;
  configured: boolean;
  connected: boolean;
  message: string;
};

export interface DataProviderAdapter {
  provider: DataProvider;
  getHealth(): Promise<ApiResponse<DataAdapterHealth>>;
  getDashboardSummary(): Promise<ApiResponse<DashboardSummary>>;
  getAlerts(): Promise<ApiResponse<DashboardAlert[]>>;
  getReports(): Promise<ApiResponse<ReportConfig[]>>;
  getUsers(): Promise<ApiResponse<PanelUser[]>>;
}
