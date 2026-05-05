import AlertCard from "@/components/panel/AlertCard";
import EmptyState from "@/components/panel/EmptyState";
import MetricCard from "@/components/panel/MetricCard";
import PageHeader from "@/components/panel/PageHeader";

const metricBlocks = [
  "Ventas del dia",
  "Pedidos pendientes",
  "Cobranza en proceso",
  "Disponibilidad de deposito",
];

export default function PanelDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Vista ejecutiva lista para conectar indicadores reales de ID Retail."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metricBlocks.map((label) => (
          <MetricCard key={label} title={label} detail="Indicador pendiente de conexion" />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <AlertCard
          title="Alertas criticas"
          message="Sin datos conectados. Se mostraran eventos de severidad alta cuando se configure la fuente."
          severity="critical"
        />
        <AlertCard
          title="Alertas medias"
          message="Modulo listo para reglas operativas intermedias."
          severity="medium"
        />
        <AlertCard
          title="Alertas bajas"
          message="Espacio reservado para notificaciones informativas."
          severity="low"
        />
      </section>

      <EmptyState
        title="Panel listo para integracion"
        message="No se cargaron datos de negocio. Esperando conexion a fuente ID Retail."
      />
    </div>
  );
}
