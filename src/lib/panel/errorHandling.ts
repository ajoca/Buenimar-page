import { trackTechnicalError } from "@/services/auditService";

export class SafePanelError extends Error {
  public readonly userMessage: string;
  public readonly code: string;

  constructor(params: { userMessage: string; technicalMessage: string; code: string }) {
    super(params.technicalMessage);
    this.userMessage = params.userMessage;
    this.code = params.code;
  }
}

export function toUserSafeMessage(error: unknown, fallback = "No pudimos completar la operacion."): string {
  if (error instanceof SafePanelError) {
    return error.userMessage;
  }

  return fallback;
}

export function logTechnicalError(params: {
  error: unknown;
  module: "auth" | "dashboard" | "reports" | "alerts" | "users" | "settings" | "health" | "system";
  user?: string;
  role?: string;
  fallbackCode?: string;
}) {
  const technicalMessage = params.error instanceof Error ? params.error.message : "unknown_error";

  trackTechnicalError({
    user: params.user || "anonymous",
    role: params.role,
    module: params.module,
    errorCode: params.fallbackCode || "UNHANDLED_ERROR",
    message: technicalMessage,
  });
}
