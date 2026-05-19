type MaintenanceNoticeProps = {
  title: string;
  message: string;
};

export default function MaintenanceNotice({ title, message }: MaintenanceNoticeProps) {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-12 text-slate-100">
      <div className="mx-auto max-w-3xl rounded-3xl border border-amber-400/40 bg-slate-900/80 p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-amber-300">Panel interno</p>
        <h1 className="mt-3 text-3xl font-black text-amber-200">{title}</h1>
        <p className="mt-4 text-sm leading-6 text-slate-200">{message}</p>
        <p className="mt-6 text-xs text-slate-400">Si el problema persiste, contacta al equipo tecnico interno.</p>
      </div>
    </div>
  );
}
