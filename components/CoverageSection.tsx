"use client";

import { useMemo, useState } from "react";
import CoverageShapeMap from "@/components/CoverageShapeMap";
import { localities, buenimarLocation } from "@/lib/coverageData";
import coloniaGeoJSON from "@/lib/geo/colonia.json";

export default function CoverageSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>("col-1");

  const filtered = useMemo(() => {
    return localities
      .filter((l) => l.department === "Colonia")
      .filter((l) => l.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  const calculateDistance = (from: [number, number], to: [number, number]): number => {
    const R = 6371; // Radio de la Tierra en km
    const dLat = ((to[1] - from[1]) * Math.PI) / 180;
    const dLon = ((to[0] - from[0]) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((from[1] * Math.PI) / 180) *
        Math.cos((to[1] * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  return (
    <div className="space-y-6">
      {/* Buscador */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6">
        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
          Buscar localidad
        </label>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Ej: Carmelo, Rosario..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Mapa SVG */}
        <div className="lg:col-span-2">
          <CoverageShapeMap
            coloniaFeature={coloniaGeoJSON.features[0] as any}
            localities={filtered}
            hub={{ name: "Buenimar", coordinates: buenimarLocation }}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>

        {/* Lista de localidades */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 h-[400px] md:h-[600px] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100 sticky top-0 bg-white dark:bg-gray-800 pb-2 z-10">
              Localidades ({filtered.length})
            </h3>

            <div className="space-y-2">
              {filtered.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setSelectedId(l.id)}
                  className={`w-full text-left p-3 md:p-4 rounded-lg border transition-colors active:scale-98 ${
                    selectedId === l.id
                      ? "border-red-500 bg-red-50 dark:bg-gray-700"
                      : "border-gray-200 dark:border-gray-700 hover:bg-red-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-base">{l.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{l.department}</p>
                      {l.population && (
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          {l.population.toLocaleString()} hab.
                        </p>
                      )}
                    </div>
                    <div className="text-sm md:text-xs text-red-600 dark:text-red-400 font-semibold">
                      {calculateDistance(buenimarLocation, l.coordinates).toFixed(0)} km
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
