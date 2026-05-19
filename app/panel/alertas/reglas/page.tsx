import PageHeader from "@/components/panel/PageHeader";
import type { AlertRuleDraft } from "@/types/alerts";

const draftRules: AlertRuleDraft[] = [
  {
    id: "rule-001",
    name: "Caida de ventas diaria",
    description: "Detecta desviacion negativa sobre promedio movil.",
    query: "SELECT ...",
    threshold: "< -15%",
    severity: "critical",
    frequency: "cada 15 minutos",
    channel: "email",
    active: true,
  },
  {
    id: "rule-002",
    name: "Stock critico por deposito",
    description: "Controla faltantes en productos de alta rotacion.",
    query: "SELECT ...",
    threshold: "< stock_minimo",
    severity: "medium",
    frequency: "cada 30 minutos",
    channel: "teams",
    active: false,
  },
];

export default function PanelAlertRulesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reglas de alertas"
        description="Estructura preparada para gestionar reglas de alerta configurables sin activar logica real aun."
      />

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-base font-semibold text-slate-900">Campos de configuracion futura</h3>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <label className="text-sm font-medium text-slate-700">
            Nombre de alerta
            <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" disabled value="" placeholder="Ej: Ventas fuera de umbral" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Severidad
            <select className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" disabled>
              <option>critical</option>
              <option>medium</option>
              <option>low</option>
            </select>
          </label>
          <label className="text-sm font-medium text-slate-700 md:col-span-2">
            Descripcion
            <textarea className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" rows={3} disabled placeholder="Descripcion operativa de la alerta" />
          </label>
          <label className="text-sm font-medium text-slate-700 md:col-span-2">
            Consulta asociada
            <textarea className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm" rows={3} disabled placeholder="SELECT ..." />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Umbral
            <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" disabled placeholder="Ej: > 90" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Frecuencia
            <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" disabled placeholder="cada 15 minutos" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Canal de notificacion
            <select className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" disabled>
              <option>Email</option>
              <option>Microsoft Teams</option>
              <option>WhatsApp/API externa</option>
              <option>Notificacion interna</option>
            </select>
          </label>
          <label className="text-sm font-medium text-slate-700">
            Estado
            <select className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" disabled>
              <option>Activa</option>
              <option>Inactiva</option>
            </select>
          </label>
        </div>
        <p className="mt-3 text-xs text-slate-500">TODO: conectar CRUD real de reglas con backend cuando se habilite la base definitiva.</p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-base font-semibold text-slate-900">Borradores de ejemplo (solo estructura)</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600">
                <th className="px-2 py-2">Nombre</th>
                <th className="px-2 py-2">Severidad</th>
                <th className="px-2 py-2">Frecuencia</th>
                <th className="px-2 py-2">Canal</th>
                <th className="px-2 py-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {draftRules.map((rule) => (
                <tr key={rule.id} className="border-b border-slate-100">
                  <td className="px-2 py-2 text-slate-900">{rule.name}</td>
                  <td className="px-2 py-2 text-slate-700">{rule.severity}</td>
                  <td className="px-2 py-2 text-slate-700">{rule.frequency}</td>
                  <td className="px-2 py-2 text-slate-700">{rule.channel}</td>
                  <td className="px-2 py-2 text-slate-700">{rule.active ? "Activa" : "Inactiva"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
