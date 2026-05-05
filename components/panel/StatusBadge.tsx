import type { AlertSeverity } from "@/src/lib/panel/types";

type StatusBadgeProps = {
  label: string;
  severity?: AlertSeverity;
};

export default function StatusBadge({ label, severity = "low" }: StatusBadgeProps) {
  const colorBySeverity = {
    critical: "bg-red-100 text-red-800 border-red-200",
    medium: "bg-amber-100 text-amber-800 border-amber-200",
    low: "bg-slate-100 text-slate-700 border-slate-200",
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${colorBySeverity[severity]}`}>
      {label}
    </span>
  );
}
