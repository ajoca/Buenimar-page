import DateRangeFilter from "@/components/panel/DateRangeFilter";
import EmptyState from "@/components/panel/EmptyState";
import FilterBar from "@/components/panel/FilterBar";
import PageHeader from "@/components/panel/PageHeader";

export default function PanelReportesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reportes"
        description="Estructura preparada para reportes operativos cuando la fuente de datos este conectada."
        actions={
          <button
            type="button"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
          >
            Exportar a Excel
          </button>
        }
      />

      <FilterBar>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Tipo de reporte
          <select className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700">
            <option value="">Seleccionar</option>
          </select>
        </label>
        <DateRangeFilter />
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Estado
          <select className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700">
            <option value="">Todos</option>
          </select>
        </label>
      </FilterBar>

      <EmptyState
        title="Reportes pendientes de conexion"
        message="Los datasets se activaran cuando se defina el proveedor de datos y el modelo de reporte final."
      />
    </div>
  );
}
