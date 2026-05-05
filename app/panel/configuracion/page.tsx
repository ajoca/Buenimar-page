import EmptyState from "@/components/panel/EmptyState";
import PageHeader from "@/components/panel/PageHeader";

function ConfigSection({ title, text }: { title: string; text: string }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{text}</p>
    </article>
  );
}

export default function PanelConfiguracionPage() {
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

      <EmptyState
        title="Configuracion aun no persistida"
        message="Cuando exista backend definitivo, estas secciones guardaran datos en una capa segura."
      />
    </div>
  );
}
