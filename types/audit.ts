export type AuditActionType =
  | "login_success"
  | "login_failed"
  | "logout"
  | "view_module"
  | "export_requested"
  | "refresh_requested"
  | "technical_error";

export type AuditModule =
  | "auth"
  | "dashboard"
  | "reports"
  | "alerts"
  | "users"
  | "settings"
  | "health"
  | "system";

export type AuditLogEntry = {
  id: string;
  user: string;
  role?: string;
  action: AuditActionType;
  module: AuditModule;
  timestamp: string;
  success: boolean;
  message: string;
  errorCode?: string;
  metadata?: Record<string, string | number | boolean | null | undefined>;
};

export type AuditLogPayload = {
  user: string;
  role?: string;
  action: AuditActionType;
  module: AuditModule;
  success: boolean;
  message: string;
  errorCode?: string;
  metadata?: Record<string, string | number | boolean | null | undefined>;
};
