import { registerAuditEvent } from "@/services/auditService";

type NotificationPayload = {
  title: string;
  message: string;
  severity: "critical" | "medium" | "low";
};

export async function sendEmailNotificationStub(payload: NotificationPayload) {
  registerAuditEvent({
    user: "system",
    action: "view_module",
    module: "alerts",
    success: true,
    message: `Canal Email preparado para alerta: ${payload.title}`,
    metadata: { severity: payload.severity },
  });
  // TODO: Conectar con proveedor SMTP/servicio transaccional.
}

export async function sendTeamsNotificationStub(payload: NotificationPayload) {
  registerAuditEvent({
    user: "system",
    action: "view_module",
    module: "alerts",
    success: true,
    message: `Canal Microsoft Teams preparado para alerta: ${payload.title}`,
    metadata: { severity: payload.severity },
  });
  // TODO: Conectar webhook de Microsoft Teams.
}

export async function sendWhatsAppNotificationStub(payload: NotificationPayload) {
  registerAuditEvent({
    user: "system",
    action: "view_module",
    module: "alerts",
    success: true,
    message: `Canal WhatsApp/API externa preparado para alerta: ${payload.title}`,
    metadata: { severity: payload.severity },
  });
  // TODO: Conectar API externa (Meta/Twilio/proveedor corporativo).
}

export async function sendInAppNotificationStub(payload: NotificationPayload) {
  registerAuditEvent({
    user: "system",
    action: "view_module",
    module: "alerts",
    success: true,
    message: `Canal interno preparado para alerta: ${payload.title}`,
    metadata: { severity: payload.severity },
  });
  // TODO: Persistir notificacion interna y mostrar en panel en tiempo real.
}
