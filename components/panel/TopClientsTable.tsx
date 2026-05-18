"use client";

import { useEffect, useState } from "react";
import { Client } from "@/lib/mockData";

interface TopClientsTableProps {
  clients: Client[];
}

export default function TopClientsTable({ clients }: TopClientsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClients, setFilteredClients] = useState<Client[]>(clients);
  const [sortBy, setSortBy] = useState<"sales" | "frequency">("sales");

  useEffect(() => {
    let filtered = clients.filter((client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.region.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === "frequency") {
      filtered = filtered.sort((a, b) => b.purchaseFrequency - a.purchaseFrequency);
    } else {
      filtered = filtered.sort((a, b) => b.totalSales - a.totalSales);
    }

    setFilteredClients(filtered);
  }, [searchTerm, sortBy, clients]);

  const statusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">Activo</span>;
      case "inactive":
        return <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-800">Inactivo</span>;
      case "pending":
        return <span className="inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">Pendiente</span>;
      default:
        return null;
    }
  };

  return (
    <div className="rounded-lg bg-white shadow">
      <div className="border-b border-gray-200 px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-900">Top 50 Clientes - Ventas Acumuladas</h3>
      </div>

      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar por nombre, ciudad o región..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "sales" | "frequency")}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
          >
            <option value="sales">Ordenar por: Ventas</option>
            <option value="frequency">Ordenar por: Frecuencia</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Posición</th>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Ciudad</th>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Región</th>
              <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider text-gray-700">Ventas Acum.</th>
              <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider text-gray-700">Promedio Mes</th>
              <th className="px-6 py-3 text-center text-xs font-bold uppercase tracking-wider text-gray-700">Frecuencia</th>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredClients.map((client, index) => (
              <tr key={client.id} className="transition-colors hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-700">
                    {clients.indexOf(client) + 1}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{client.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{client.city}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{client.region}</td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  ${client.totalSales.toLocaleString("es-UY")}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-600">
                  ${client.monthlyAvg.toLocaleString("es-UY")}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-center">
                  <span className="inline-block rounded-lg bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                    {client.purchaseFrequency} comp/mes
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{statusBadge(client.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 text-sm text-gray-600">
        Mostrando {filteredClients.length} de {clients.length} clientes
      </div>
    </div>
  );
}
