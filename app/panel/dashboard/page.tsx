import Link from "next/link";
import { kpiSummary, alerts, topClients } from "@/lib/mockData";
import AlertCard from "@/components/panel/AlertCard";
import MetricCard from "@/components/panel/MetricCard";
import PanelDataControls from "@/components/panel/PanelDataControls";
import PageHeader from "@/components/panel/PageHeader";

export default function PanelDashboardPage() {
  const activeAlerts = alerts.filter((a) => !a.resolved);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="POC con datos ficticios de Buenimar. Navegá por clientes, análisis y alertas."
      />

      <PanelDataControls module="dashboard" />

      {/* KPI Summary */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard title="Ventas Mayo" detail={`$${(kpiSummary.totalRevenueMay / 1000000).toFixed(2)}M`} />
        <MetricCard title="Órdenes Mayo" detail={`${kpiSummary.totalOrdersMay.toLocaleString("es-UY")}`} />
        <MetricCard title="Valor Promedio" detail={`$${kpiSummary.averageOrderValue.toFixed(0)}`} />
        <MetricCard title="Clientes Activos" detail={`${kpiSummary.activeClients}`} />
        <MetricCard title="Conversión" detail={`${kpiSummary.conversionRate}%`} />
      </section>

      {/* Navigation Cards */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/panel/clientes">
          <div className="group rounded-lg bg-gradient-to-br from-red-50 to-red-100 p-6 shadow transition-transform hover:scale-105 hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-red-900">Top 50 Clientes</h3>
                <p className="mt-2 text-sm text-red-700">
                  Ranking por ventas acumuladas, búsqueda interactiva
                </p>
              </div>
              <span className="text-3xl">📊</span>
            </div>
            <p className="mt-4 inline-block rounded-lg bg-red-200 px-3 py-1 text-xs font-semibold text-red-900">
              {topClients.length} clientes
            </p>
          </div>
        </Link>

        <Link href="/panel/analisis">
          <div className="group rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-6 shadow transition-transform hover:scale-105 hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-blue-900">Análisis de Ventas</h3>
                <p className="mt-2 text-sm text-blue-700">
                  Gráficos interactivos, tendencias regionales
                </p>
              </div>
              <span className="text-3xl">📈</span>
            </div>
            <p className="mt-4 inline-block rounded-lg bg-blue-200 px-3 py-1 text-xs font-semibold text-blue-900">
              30 días
            </p>
          </div>
        </Link>

        <Link href="/panel/alertas">
          <div className="group rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 p-6 shadow transition-transform hover:scale-105 hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-orange-900">Alertas Operativas</h3>
                <p className="mt-2 text-sm text-orange-700">
                  Notificaciones críticas y de seguimiento
                </p>
              </div>
              <span className="text-3xl">🔔</span>
            </div>
            <p className="mt-4 inline-block rounded-lg bg-orange-200 px-3 py-1 text-xs font-semibold text-orange-900">
              {activeAlerts.length} activas
            </p>
          </div>
        </Link>
      </section>

      {/* Quick Alerts Preview */}
      <section className="grid gap-4 xl:grid-cols-2">
        {activeAlerts.slice(0, 2).map((alert) => (
          <AlertCard
            key={alert.id}
            title={alert.title}
            message={alert.message}
            severity={alert.severity}
            forceRed={alert.severity === "critical"}
          />
        ))}
      </section>

      {/* Información POC */}
      <section className="rounded-lg bg-blue-50 p-6 shadow">
        <h3 className="font-bold text-blue-900">ℹ️ Proof of Concept</h3>
        <p className="mt-2 text-sm text-blue-800">
          Este dashboard utiliza datos ficticios para demostración. Los números, clientes y regiones son simulados con datos reales de Buenimar.
          Cuando proporciones el esquema de la base de datos ID Retail, reemplazaremos estos datos por consultas en vivo.
        </p>
      </section>
    </div>
  );
}
