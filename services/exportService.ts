import { registerAuditEvent } from "@/services/auditService";
import type { UserRole } from "@/src/lib/panel/types";

export type ExportFormat = "excel" | "pdf" | "csv";

export async function requestExportStub(params: {
  format: ExportFormat;
  module: "dashboard" | "reports" | "alerts";
  requestedBy: string;
  role?: UserRole;
}) {
  registerAuditEvent({
    user: params.requestedBy,
    role: params.role,
    action: "export_requested",
    module: params.module,
    success: true,
    message: `Solicitud de exportacion ${params.format.toUpperCase()} registrada`,
    metadata: {
      format: params.format,
    },
  });

  // TODO: Implementar pipeline real de exportacion cuando existan datos definitivos y almacenamiento temporal.
  return {
    success: true,
    message: `Exportacion ${params.format.toUpperCase()} preparada (stub).`,
  };
}
