type MetricCardProps = {
  title: string;
  detail: string;
};

export default function MetricCard({ title, detail }: MetricCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p className="mt-2 text-sm text-slate-600">{detail}</p>
      <p className="mt-4 text-xs font-medium text-red-700">Indicador pendiente de conexión</p>
    </article>
  );
}
