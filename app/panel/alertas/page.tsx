import AlertCard from "@/components/panel/AlertCard";
import EmptyState from "@/components/panel/EmptyState";
import FilterBar from "@/components/panel/FilterBar";
import DateRangeFilter from "@/components/panel/DateRangeFilter";
import PageHeader from "@/components/panel/PageHeader";

export default function PanelAlertasPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Alertas"
        description="Modulo preparado para monitorear eventos criticos, medios y bajos."
      />

      <FilterBar>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Severidad
          <select className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700">
            <option value="all">Todas</option>
            <option value="critical">Critica</option>
            <option value="medium">Media</option>
            <option value="low">Baja</option>
          </select>
        </label>
        <DateRangeFilter />
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Estado
          <select className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700">
            <option value="all">Todas</option>
          </select>
        </label>
      </FilterBar>

      <section className="grid gap-4 lg:grid-cols-3">
        <AlertCard
          title="Conexion de datos pendiente"
          message="No hay datasource productivo configurado. Validar DATA_PROVIDER y variables de conexion antes de habilitar alertas reales."
          severity="critical"
          forceRed
        />
        <AlertCard
          title="Reglas de umbral sin activar"
          message="Las reglas de negocio para alertas aun no estan conectadas a consultas reales del sistema ID Retail."
          severity="critical"
          forceRed
        />
        <AlertCard
          title="Canales de notificacion pendientes"
          message="No se configuraron aun envios por email, WhatsApp o integraciones para alertas operativas."
          severity="critical"
          forceRed
        />
      </section>

      <EmptyState
        title="Alertas listas para conexion"
        message="La vista ya esta preparada en rojo para destacar eventos. Falta conectar consultas reales y umbrales operativos."
      />
    </div>
  );
}
