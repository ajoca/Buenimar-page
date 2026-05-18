import { dailySalesData, productCategories, regionalSales } from "@/lib/mockData";
import PageHeader from "@/components/panel/PageHeader";
import { SalesLineChart, CategoryPieChart, RegionalBarChart } from "@/components/panel/Charts";

export default function AnalisisPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Análisis de Ventas"
        description="Visualización de tendencias, categorías y datos regionales. Datos ficticios para POC."
      />

      <div className="grid gap-6">
        <SalesLineChart
          data={dailySalesData}
          title="Ventas Diarias (Últimos 30 días)"
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <CategoryPieChart
            data={productCategories}
            title="Distribución por Categoría de Producto"
          />
          <RegionalBarChart
            data={regionalSales}
            title="Ventas por Región"
          />
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Resumen de Métricas</h3>
          <div className="grid gap-4 md:grid-cols-5">
            <div className="rounded-lg bg-red-50 p-4">
              <p className="text-xs uppercase tracking-wide text-red-600">Total Mayo</p>
              <p className="mt-2 text-2xl font-bold text-red-700">$1.29M</p>
            </div>
            <div className="rounded-lg bg-blue-50 p-4">
              <p className="text-xs uppercase tracking-wide text-blue-600">Órdenes Mayo</p>
              <p className="mt-2 text-2xl font-bold text-blue-700">2050</p>
            </div>
            <div className="rounded-lg bg-green-50 p-4">
              <p className="text-xs uppercase tracking-wide text-green-600">Valor Promedio</p>
              <p className="mt-2 text-2xl font-bold text-green-700">$627</p>
            </div>
            <div className="rounded-lg bg-orange-50 p-4">
              <p className="text-xs uppercase tracking-wide text-orange-600">Conversión</p>
              <p className="mt-2 text-2xl font-bold text-orange-700">87.5%</p>
            </div>
            <div className="rounded-lg bg-purple-50 p-4">
              <p className="text-xs uppercase tracking-wide text-purple-600">Tasa Churn</p>
              <p className="mt-2 text-2xl font-bold text-purple-700">4.2%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
