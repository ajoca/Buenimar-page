export type AlertRuleSeverity = "critical" | "medium" | "low";

export type AlertNotificationChannel = "email" | "teams" | "whatsapp" | "in_app";

export type AlertRuleDraft = {
  id: string;
  name: string;
  description: string;
  query: string;
  threshold: string;
  severity: AlertRuleSeverity;
  frequency: string;
  channel: AlertNotificationChannel;
  active: boolean;
};
