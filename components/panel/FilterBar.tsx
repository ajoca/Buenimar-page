export default function FilterBar({ children }: { children: React.ReactNode }) {
  return (
    <section className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-3">{children}</div>
    </section>
  );
}
