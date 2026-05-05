type DateRangeFilterProps = {
  fromName?: string;
  toName?: string;
};

export default function DateRangeFilter({ fromName = "from", toName = "to" }: DateRangeFilterProps) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Desde
        <input
          type="date"
          name={fromName}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700"
        />
      </label>
      <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Hasta
        <input
          type="date"
          name={toName}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700"
        />
      </label>
    </div>
  );
}
