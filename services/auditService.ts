import type { AuditLogEntry, AuditLogPayload } from "@/types/audit";

const MAX_AUDIT_LOGS = 500;
const inMemoryAuditLogs: AuditLogEntry[] = [];

function sanitizeMetadata(metadata?: AuditLogPayload["metadata"]) {
  if (!metadata) {
    return undefined;
  }

  const redactedKeys = ["password", "token", "secret", "authorization", "cookie"];
  const entries = Object.entries(metadata).filter(([key]) => {
    const normalized = key.toLowerCase();
    return !redactedKeys.some((sensitiveKey) => normalized.includes(sensitiveKey));
  });

  return Object.fromEntries(entries);
}

export function registerAuditEvent(payload: AuditLogPayload): AuditLogEntry {
  const entry: AuditLogEntry = {
    id: `audit_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    timestamp: new Date().toISOString(),
    ...payload,
    metadata: sanitizeMetadata(payload.metadata),
  };

  inMemoryAuditLogs.unshift(entry);
  if (inMemoryAuditLogs.length > MAX_AUDIT_LOGS) {
    inMemoryAuditLogs.length = MAX_AUDIT_LOGS;
  }

  return entry;
}

export function getRecentAuditEvents(limit = 100): AuditLogEntry[] {
  return inMemoryAuditLogs.slice(0, Math.max(1, Math.min(limit, MAX_AUDIT_LOGS)));
}

export function trackTechnicalError(params: {
  user: string;
  role?: string;
  module: AuditLogPayload["module"];
  errorCode: string;
  message: string;
  metadata?: AuditLogPayload["metadata"];
}) {
  return registerAuditEvent({
    user: params.user,
    role: params.role,
    action: "technical_error",
    module: params.module,
    success: false,
    message: params.message,
    errorCode: params.errorCode,
    metadata: params.metadata,
  });
}

// TODO: Persistir en almacenamiento durable (DB/log pipeline) cuando se habilite backend productivo.
