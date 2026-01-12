"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { localities, departmentPolygons, mapCenter, mapZoom, buenimarLocation, type Locality } from "@/lib/coverageData";

export default function CoverageMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const animationFrame = useRef<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [showRoutes, setShowRoutes] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    console.log('Inicializando mapa...', { 
      mapCenter, 
      mapZoom,
      container: mapContainer.current,
      containerSize: {
        width: mapContainer.current.clientWidth,
        height: mapContainer.current.clientHeight
      }
    });

    // Inicializar mapa con tiles gratuitos de OpenStreetMap
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          },
        },
        layers: [
          {
            id: "osm",
            type: "raster",
            source: "osm",
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      },
      center: mapCenter,
      zoom: mapZoom,
      attributionControl: false,
    });

    map.current.on('error', (e) => {
      console.error('MapLibre error:', e);
    });

    map.current.addControl(new maplibregl.NavigationControl(), "top-right");
    map.current.addControl(new maplibregl.FullscreenControl(), "top-right");

    map.current.on("load", () => {
      if (!map.current) return;

      console.log('Mapa cargado correctamente');
      setMapLoaded(true);

      // Agregar polígono de Colonia
      map.current.addSource("departments", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [departmentPolygons.Colonia],
        },
      });

      map.current.addLayer({
        id: "departments-fill",
        type: "fill",
        source: "departments",
        paint: {
          "fill-color": "#dc2626",
          "fill-opacity": 0.15,
        },
      });

      map.current.addLayer({
        id: "departments-outline",
        type: "line",
        source: "departments",
        paint: {
          "line-color": "#dc2626",
          "line-width": 2,
          "line-dasharray": [2, 2],
        },
      });

      // Crear líneas desde Buenimar a todas las localidades
      const routeLines = localities.map((locality) => ({
        type: "Feature" as const,
        properties: {
          name: locality.name,
          distance: calculateDistance(buenimarLocation, locality.coordinates),
        },
        geometry: {
          type: "LineString" as const,
          coordinates: [buenimarLocation, locality.coordinates],
        },
      }));

      map.current.addSource("routes", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: routeLines,
        },
      });

      // Capa de líneas con efecto glow
      map.current.addLayer({
        id: "routes-glow",
        type: "line",
        source: "routes",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3b82f6",
          "line-width": 6,
          "line-blur": 4,
          "line-opacity": 0.4,
        },
      });

      map.current.addLayer({
        id: "routes-line",
        type: "line",
        source: "routes",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#2563eb",
          "line-width": 2,
          "line-opacity": 0.6,
          "line-dasharray": [0, 4, 3],
        },
      });

      // Puntos animados en las rutas
      map.current.addLayer({
        id: "routes-animation",
        type: "line",
        source: "routes",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#60a5fa",
          "line-width": 4,
          "line-opacity": 0.8,
          "line-dasharray": [0, 4, 3],
        },
      });

      // Agregar marcadores con icono de ubicación
      localities.forEach((locality) => {
        if (!map.current) return;

        const el = document.createElement("div");
        el.className = "custom-marker";
        el.style.width = "32px";
        el.style.height = "32px";
        el.style.cursor = "pointer";
        el.innerHTML = `
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#dc2626"/>
            <circle cx="12" cy="9" r="2" fill="white"/>
          </svg>
        `;

        const popup = new maplibregl.Popup({ offset: 25 }).setHTML(`
          <div style="padding: 8px;">
            <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1f2937;">${locality.name}</h3>
            <p style="margin: 0 0 4px 0; font-size: 13px; color: #6b7280;">📍 ${locality.department}</p>
            ${locality.population ? `<p style="margin: 0 0 4px 0; font-size: 13px; color: #6b7280;">👥 ${locality.population.toLocaleString()} habitantes</p>` : ''}
            ${locality.description ? `<p style="margin: 0; font-size: 12px; color: #9ca3af;">${locality.description}</p>` : ''}
            ${isMobile ? `<a href="https://www.google.com/maps/dir/?api=1&destination=${locality.coordinates[1]},${locality.coordinates[0]}" target="_blank" rel="noopener noreferrer" style="display: inline-block; margin-top: 8px; padding: 4px 12px; background: #dc2626; color: white; text-decoration: none; border-radius: 4px; font-size: 12px;">Cómo llegar</a>` : ''}
          </div>
        `);

        new maplibregl.Marker({ element: el })
          .setLngLat(locality.coordinates)
          .setPopup(popup)
          .addTo(map.current);
      });

      // Agregar marcador de Buenimar (almacén)
      const buenimarEl = document.createElement("div");
      buenimarEl.className = "buenimar-marker";
      buenimarEl.style.width = "40px";
      buenimarEl.style.height = "40px";
      buenimarEl.style.cursor = "pointer";
      buenimarEl.innerHTML = `
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="#dc2626" stroke="white" stroke-width="1.5"/>
        </svg>
      `;

      const buenimarPopup = new maplibregl.Popup({ offset: 25 }).setHTML(`
        <div style="padding: 8px;">
          <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1f2937;">🏢 BUENIMAR</h3>
          <p style="margin: 0 0 4px 0; font-size: 13px; color: #6b7280;">📍 Pablo Zufriategui 374</p>
          <p style="margin: 0; font-size: 12px; color: #9ca3af;">Centro de distribución</p>
        </div>
      `);

      new maplibregl.Marker({ element: buenimarEl })
        .setLngLat(buenimarLocation)
        .setPopup(buenimarPopup)
        .addTo(map.current);
      
      console.log('Marcadores agregados:', localities.length, 'localidades + Buenimar');
    });

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      map.current?.remove();
      map.current = null;
    };
  }, [isMobile]);

  // Animar líneas con efecto de pulso viajando
  useEffect(() => {
    if (!map.current || !showRoutes || !mapLoaded) return;

    let offset = 0;
    const animateRoutes = () => {
      if (!map.current || !mapLoaded) return;

      offset = (offset + 0.05) % 8;
      
      // Actualizar el dash offset para crear efecto de movimiento
      map.current.setPaintProperty("routes-line", "line-dasharray", [
        0,
        4 - (offset % 4),
        3,
      ]);

      // Pulso brillante que viaja
      map.current.setPaintProperty("routes-animation", "line-dasharray", [
        offset,
        8,
      ]);

      animationFrame.current = requestAnimationFrame(animateRoutes);
    };

    animateRoutes();

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [showRoutes, mapLoaded]);

  // Calcular distancia aproximada entre dos puntos
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

  // Toggle rutas
  const toggleRoutes = () => {
    if (!map.current) return;
    
    const newVisibility = !showRoutes;
    setShowRoutes(newVisibility);
    
    const visibility = newVisibility ? "visible" : "none";
    map.current.setLayoutProperty("routes-glow", "visibility", visibility);
    map.current.setLayoutProperty("routes-line", "visibility", visibility);
    map.current.setLayoutProperty("routes-animation", "visibility", visibility);
  };

  // Filtrar localidades
  const filteredLocalities = localities.filter((loc) => {
    return loc.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Hacer zoom a una localidad
  const flyToLocality = (locality: Locality) => {
    if (!map.current) return;
    map.current.flyTo({
      center: locality.coordinates,
      zoom: 12,
      duration: 1500,
    });
  };

  return (
    <div className="space-y-6">
      {/* Controles */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          {/* Buscador */}
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Buscar localidad
            </label>
            <input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ej: Carmelo, Rosario..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Toggle rutas */}
          <div className="flex items-end">
            <button
              onClick={toggleRoutes}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                showRoutes
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              {showRoutes ? "🗺️ Ocultar rutas" : "🗺️ Mostrar rutas"}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mapa */}
        <div className="lg:col-span-2">
          <div 
            ref={mapContainer} 
            className="w-full h-[400px] md:h-[600px] rounded-xl shadow-2xl overflow-hidden relative"
            style={{ background: "#e5e7eb", minHeight: "400px" }}
          />
        </div>

        {/* Lista de localidades */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 h-[400px] md:h-[600px] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100 sticky top-0 bg-white dark:bg-gray-800 pb-2">
              Localidades ({filteredLocalities.length})
            </h3>
            <div className="space-y-2">
              {filteredLocalities.map((locality) => (
                <button
                  key={locality.id}
                  onClick={() => flyToLocality(locality)}
                  className="w-full text-left p-3 rounded-lg hover:bg-red-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">{locality.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{locality.department}</p>
                      {locality.population && (
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          {locality.population.toLocaleString()} hab.
                        </p>
                      )}
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                      {calculateDistance(buenimarLocation, locality.coordinates).toFixed(0)} km
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
