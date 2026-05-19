import EmptyState from "@/components/panel/EmptyState";
import PageHeader from "@/components/panel/PageHeader";
import { panelRolePermissionMatrix } from "@/src/lib/panel/permissions";

function ConfigSection({ title, text }: { title: string; text: string }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{text}</p>
    </article>
  );
}

export default function PanelConfiguracionPage() {
  const roleRows = Object.entries(panelRolePermissionMatrix);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Configuracion"
        description="Secciones visuales preparadas para parametrizar fuente de datos, alertas y permisos."
      />

      <section className="grid gap-4 md:grid-cols-2">
        <ConfigSection
          title="Fuente de datos"
          text="Selector de proveedor, credenciales tecnicas y conectividad segura pendiente de implementacion."
        />
        <ConfigSection
          title="Alertas"
          text="Reglas por severidad, canales de notificacion y umbrales pendientes de conexion."
        />
        <ConfigSection
          title="Permisos"
          text="Control de accesos por rol (admin, gerencia, ventas, deposito, contabilidad)."
        />
        <ConfigSection
          title="Preferencias del panel"
          text="Opciones de idioma, formato de fechas y personalizacion de vistas futuras."
        />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-base font-semibold text-slate-900">Matriz inicial de permisos por rol</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600">
                <th className="px-2 py-2 font-semibold">Rol</th>
                <th className="px-2 py-2 font-semibold">Permisos</th>
              </tr>
            </thead>
            <tbody>
              {roleRows.map(([role, permissions]) => (
                <tr key={role} className="border-b border-slate-100 align-top">
                  <td className="px-2 py-2 font-semibold text-slate-900">{role}</td>
                  <td className="px-2 py-2 text-slate-600">{permissions.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-base font-semibold text-slate-900">Canales de notificacion</h3>
        <ul className="mt-2 space-y-1 text-sm text-slate-600">
          <li>- Email</li>
          <li>- Microsoft Teams</li>
          <li>- WhatsApp/API externa</li>
          <li>- Notificacion interna del panel</li>
        </ul>
        <p className="mt-2 text-xs text-slate-500">TODO: habilitar conexion real de canales en la siguiente fase.</p>
      </section>

      <EmptyState
        title="Configuracion aun no persistida"
        message="Cuando exista backend definitivo, estas secciones guardaran datos en una capa segura."
      />
    </div>
  );
}
