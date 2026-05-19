import PageHeader from "@/components/panel/PageHeader";
import { getPanelSystemStatus } from "@/src/lib/panel/systemStatus";

export default async function PanelHealthPage() {
  const status = getPanelSystemStatus();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Health check tecnico"
        description="Diagnostico interno para validar estado de API, fuente de datos y configuracion critica."
      />

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-base font-semibold text-slate-900">Resumen</h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          <li>API configurada: {status.apiConfigured ? "Si" : "No"}</li>
          <li>Fuente de datos disponible: {status.dataSourceAvailable ? "Si" : "No"}</li>
          <li>Modo mantenimiento: {status.maintenanceMode ? "Activo" : "Inactivo"}</li>
          <li>Version del sistema: {status.version}</li>
        </ul>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-base font-semibold text-slate-900">Variables criticas (sin valores)</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600">
                <th className="px-2 py-2">Variable</th>
                <th className="px-2 py-2">Configurada</th>
              </tr>
            </thead>
            <tbody>
              {status.criticalEnv.map((item) => (
                <tr key={item.key} className="border-b border-slate-100">
                  <td className="px-2 py-2 text-slate-900">{item.key}</td>
                  <td className="px-2 py-2 text-slate-700">{item.configured ? "Si" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-base font-semibold text-slate-900">Endpoint tecnico disponible</h3>
        <p className="mt-2 text-sm text-slate-700">
          El endpoint interno <span className="font-mono">/api/health</span> expone estado de API, conexion de datos,
          ultima sincronizacion y variables criticas sin revelar valores sensibles.
        </p>
      </section>
    </div>
  );
}
