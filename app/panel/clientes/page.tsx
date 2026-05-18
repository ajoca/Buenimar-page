import { topClients } from "@/lib/mockData";
import PageHeader from "@/components/panel/PageHeader";
import TopClientsTable from "@/components/panel/TopClientsTable";

export default function ClientesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Top 50 Clientes"
        description="Ranking de clientes ordenados por ventas acumuladas. Datos ficticios para POC."
      />

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow">
          <p className="text-sm font-medium text-gray-600">Total Ventas Top 50</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">${(topClients.reduce((sum, c) => sum + c.totalSales, 0) / 1000000).toFixed(2)}M</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <p className="text-sm font-medium text-gray-600">Clientes Activos</p>
          <p className="mt-2 text-2xl font-bold text-green-600">{topClients.filter((c) => c.status === "active").length}</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <p className="text-sm font-medium text-gray-600">Clientes Inactivos</p>
          <p className="mt-2 text-2xl font-bold text-gray-600">{topClients.filter((c) => c.status === "inactive").length}</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <p className="text-sm font-medium text-gray-600">Promedio de Ventas</p>
          <p className="mt-2 text-2xl font-bold text-blue-600">${(topClients.reduce((sum, c) => sum + c.totalSales, 0) / topClients.length / 1000).toFixed(0)}K</p>
        </div>
      </div>

      <TopClientsTable clients={topClients} />
    </div>
  );
}
