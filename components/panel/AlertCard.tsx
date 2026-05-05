import StatusBadge from "@/components/panel/StatusBadge";
import type { AlertSeverity } from "@/src/lib/panel/types";

type AlertCardProps = {
  title: string;
  message: string;
  severity: AlertSeverity;
  forceRed?: boolean;
};

export default function AlertCard({ title, message, severity, forceRed = false }: AlertCardProps) {
  const containerClass = forceRed
    ? "rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-white p-4 shadow-sm"
    : "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm";

  const titleClass = forceRed ? "text-sm font-semibold text-red-900" : "text-sm font-semibold text-slate-900";
  const messageClass = forceRed ? "mt-2 text-sm text-red-700" : "mt-2 text-sm text-slate-600";

  return (
    <article className={containerClass}>
      <div className="flex items-start justify-between gap-3">
        <h3 className={titleClass}>{title}</h3>
        <StatusBadge label={severity.toUpperCase()} severity={severity} />
      </div>
      <p className={messageClass}>{message}</p>
    </article>
  );
}
