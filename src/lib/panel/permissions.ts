import type { UserRole } from "@/src/lib/panel/types";

export type PanelPermission =
  | "view_dashboard"
  | "view_reports"
  | "view_alerts"
  | "manage_users"
  | "manage_settings"
  | "export_reports"
  | "configure_alerts";

const rolePermissionMatrix: Record<UserRole, PanelPermission[]> = {
  admin: [
    "view_dashboard",
    "view_reports",
    "view_alerts",
    "manage_users",
    "manage_settings",
    "export_reports",
    "configure_alerts",
  ],
  gerencia: ["view_dashboard", "view_reports", "view_alerts", "export_reports", "configure_alerts"],
  ventas: ["view_dashboard", "view_reports", "export_reports"],
  deposito: ["view_dashboard", "view_reports"],
  contabilidad: ["view_reports", "export_reports"],
};

export function canAccess(userRole: UserRole | undefined, permission: PanelPermission): boolean {
  if (!userRole) {
    return false;
  }

  const permissions = rolePermissionMatrix[userRole] || [];
  return permissions.includes(permission);
}

export function getPermissionsForRole(userRole: UserRole | undefined): PanelPermission[] {
  if (!userRole) {
    return [];
  }

  return rolePermissionMatrix[userRole] || [];
}

export const panelRolePermissionMatrix = rolePermissionMatrix;
