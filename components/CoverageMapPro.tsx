"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import along from "@turf/along";
import length from "@turf/length";
import { localities, departmentPolygons, mapCenter, mapZoom, buenimarLocation, type Locality } from "@/lib/coverageData";

export default function CoverageMapPro() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const truckMarker = useRef<maplibregl.Marker | null>(null);
  const animationFrame = useRef<number | null>(null);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedLocality, setSelectedLocality] = useState<Locality | null>(null);
  const [sortBy, setSortBy] = useState<"distance" | "name">("distance");
  const [showMobileList, setShowMobileList] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Mapa con estilo dark suave y profesional
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
        sources: {
          "carto-dark": {
            type: "raster",
            tiles: ["https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"],
            tileSize: 256,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        },
        layers: [
          {
            id: "carto-dark",
            type: "raster",
            source: "carto-dark",
            minzoom: 0,
            maxzoom: 22,
          },
        ],
      },
      center: mapCenter,
      zoom: isMobile ? mapZoom - 0.5 : mapZoom,
      attributionControl: false,
      touchZoomRotate: false,
      touchPitch: false,
      dragRotate: false,
      dragPan: !isMobile,
      scrollZoom: !isMobile,
      doubleClickZoom: !isMobile,
      interactive: !isMobile,
      pitchWithRotate: false,
      boxZoom: false,
    });

    map.current.addControl(new maplibregl.NavigationControl(), "top-right");

    map.current.on("load", () => {
      if (!map.current) return;
      setMapLoaded(true);

      // Polígono de Colonia - fill suave + borde elegante
      map.current.addSource("colonia", {
        type: "geojson",
        data: departmentPolygons.Colonia,
      });

      map.current.addLayer({
        id: "colonia-fill",
        type: "fill",
        source: "colonia",
        paint: {
          "fill-color": "#E11D48",
          "fill-opacity": 0.08,
        },
      });

      map.current.addLayer({
        id: "colonia-outline",
        type: "line",
        source: "colonia",
        paint: {
          "line-color": "#E11D48",
          "line-width": 1.5,
          "line-opacity": 0.4,
        },
      });

      // Source para localidades con clustering
      map.current.addSource("localidades", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: localities.map((loc) => ({
            type: "Feature" as const,
            properties: {
              name: loc.name,
              population: loc.population,
              id: loc.id,
            },
            geometry: {
              type: "Point" as const,
              coordinates: loc.coordinates,
            },
          })),
        },
        cluster: true,
        clusterRadius: 35,
        clusterMaxZoom: 10,
      });

      // Clusters - burbujas rojas con número (más pequeñas y sutiles)
      map.current.addLayer({
        id: "clusters",
        type: "circle",
        source: "localidades",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": "#E11D48",
          "circle-opacity": 0.65,
          "circle-radius": ["step", ["get", "point_count"], 12, 5, 16, 10, 20],
          "circle-stroke-width": 1.5,
          "circle-stroke-color": "#FFFFFF",
        },
      });

      map.current.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "localidades",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["Open Sans Semibold"],
          "text-size": 13,
        },
        paint: { "text-color": "#FFFFFF" },
      });

      // Puntos individuales - círculos minimal
      map.current.addLayer({
        id: "unclustered",
        type: "circle",
        source: "localidades",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": "#E11D48",
          "circle-radius": 6,
          "circle-stroke-color": "#FFFFFF",
          "circle-stroke-width": 1.5,
          "circle-opacity": 0.75,
        },
      });

      // Marcador de Buenimar (hub central)
      const buenimarEl = document.createElement("div");
      buenimarEl.style.width = "48px";
      buenimarEl.style.height = "48px";
      buenimarEl.className = "animate-bounce-in";
      buenimarEl.innerHTML = `
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" class="drop-shadow-lg">
          <circle cx="24" cy="24" r="22" fill="#E11D48" opacity="0.2">
            <animate attributeName="r" values="22;25;22" dur="3s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.2;0.3;0.2" dur="3s" repeatCount="indefinite"/>
          </circle>
          <circle cx="24" cy="24" r="16" fill="#E11D48" stroke="#FFFFFF" stroke-width="3"/>
          <circle cx="24" cy="24" r="6" fill="#FFFFFF">
            <animate attributeName="r" values="6;7;6" dur="2s" repeatCount="indefinite"/>
          </circle>
        </svg>
      `;

      new maplibregl.Marker({ element: buenimarEl, anchor: "center" })
        .setLngLat(buenimarLocation)
        .addTo(map.current);

      // Click en localidades
      map.current.on("click", "unclustered", (e) => {
        if (!e.features || !e.features[0].properties) return;
        const props = e.features[0].properties;
        const locality = localities.find((l) => l.id === props.id);
        if (locality) {
          selectLocality(locality);
        }
      });

      // Cursor pointer
      map.current.on("mouseenter", "unclustered", () => {
        if (map.current) map.current.getCanvas().style.cursor = "pointer";
      });
      map.current.on("mouseleave", "unclustered", () => {
        if (map.current) map.current.getCanvas().style.cursor = "";
      });
    });

    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
      if (truckMarker.current) truckMarker.current.remove();
      map.current?.remove();
      map.current = null;
    };
  }, [isMobile]);

  // Calcular distancia con factor de ruta (distancia real por carretera)
  const calculateDistance = (from: [number, number], to: [number, number]): number => {
    const R = 6371;
    const dLat = ((to[1] - from[1]) * Math.PI) / 180;
    const dLon = ((to[0] - from[0]) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((from[1] * Math.PI) / 180) *
        Math.cos((to[1] * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const straightDistance = R * c;
    
    // Factor de ruta: carreteras no son líneas rectas (típicamente 1.3-1.4x)
    return straightDistance * 1.35;
  };

  // Seleccionar localidad y mostrar ruta
  const selectLocality = (locality: Locality) => {
    if (!map.current || !mapLoaded) return;

    setSelectedLocality(locality);
    
    // Cerrar panel en mobile automáticamente
    if (isMobile) {
      setShowMobileList(false);
    }

    // Limpiar ruta anterior
    if (map.current.getSource("route")) {
      if (map.current.getLayer("route-line-bg")) map.current.removeLayer("route-line-bg");
      if (map.current.getLayer("route-line")) map.current.removeLayer("route-line");
      map.current.removeSource("route");
    }
    if (truckMarker.current) {
      truckMarker.current.remove();
      truckMarker.current = null;
    }
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }

    // Crear ruta (línea directa)
    const routeLine = {
      type: "Feature" as const,
      properties: {},
      geometry: {
        type: "LineString" as const,
        coordinates: [buenimarLocation, locality.coordinates],
      },
    };

    map.current.addSource("route", {
      type: "geojson",
      data: routeLine,
    });

    // Línea de fondo (glow con pulsación)
    map.current.addLayer({
      id: "route-line-bg",
      type: "line",
      source: "route",
      paint: {
        "line-color": "#3B82F6",
        "line-width": 10,
        "line-blur": 8,
        "line-opacity": 0.5,
      },
    });

    // Línea principal con animación dash
    map.current.addLayer({
      id: "route-line",
      type: "line",
      source: "route",
      paint: {
        "line-color": "#60A5FA",
        "line-width": 4,
        "line-opacity": 1,
        "line-dasharray": [0, 4, 3],
      },
    });

    // Animar el dash pattern
    const dashArraySequence = [
      [0, 4, 3],
      [0.5, 4, 2.5],
      [1, 4, 2],
      [1.5, 4, 1.5],
      [2, 4, 1],
      [2.5, 4, 0.5],
      [3, 4, 0],
    ];
    let step = 0;
    const animateDash = () => {
      if (!map.current || !map.current.getLayer("route-line")) return;
      step = (step + 1) % dashArraySequence.length;
      map.current.setPaintProperty("route-line", "line-dasharray", dashArraySequence[step]);
      setTimeout(animateDash, 100);
    };
    animateDash();

    // Ajustar vista con padding adaptativo
    const bounds = new maplibregl.LngLatBounds();
    bounds.extend(buenimarLocation);
    bounds.extend(locality.coordinates);
    const padding = isMobile ? { top: 140, bottom: 250, left: 80, right: 80 } : 120;
    map.current.fitBounds(bounds, { 
      padding, 
      duration: 1000,
      maxZoom: isMobile ? 9.5 : 10
    });

    // Animar camión después de un delay
    setTimeout(() => animateTruck(routeLine), 500);
  };

  // Animar camión a lo largo de la ruta
  const animateTruck = (routeLine: any) => {
    if (!map.current) return;

    const routeLength = length(routeLine, { units: "kilometers" });
    const duration = Math.max(3000, routeLength * 300); // Más lento en rutas largas
    const startTime = Date.now();

    // Crear marcador de camión
    const truckEl = document.createElement("div");
    truckEl.style.width = "40px";
    truckEl.style.height = "40px";
    truckEl.className = "animate-bounce-in";
    truckEl.innerHTML = `
      <div class="relative">
        <div class="absolute inset-0 bg-blue-500 rounded-full opacity-30 animate-pulse-glow"></div>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" class="relative drop-shadow-lg">
          <path d="M17 8h3l2 3v4h-2" fill="#3B82F6" stroke="white" stroke-width="1.5"/>
          <rect x="1" y="8" width="15" height="8" rx="1" fill="#3B82F6" stroke="white" stroke-width="1.5"/>
          <circle cx="6" cy="18" r="2" fill="white" stroke="#3B82F6" stroke-width="1.5">
            <animate attributeName="r" values="2;2.3;2" dur="1s" repeatCount="indefinite"/>
          </circle>
          <circle cx="18" cy="18" r="2" fill="white" stroke="#3B82F6" stroke-width="1.5">
            <animate attributeName="r" values="2;2.3;2" dur="1s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>
    `;

    truckMarker.current = new maplibregl.Marker({ element: truckEl, anchor: "center" })
      .setLngLat(buenimarLocation)
      .addTo(map.current);

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const distance = progress * routeLength;
      const point = along(routeLine, distance, { units: "kilometers" });

      if (truckMarker.current && point.geometry.coordinates) {
        truckMarker.current.setLngLat(point.geometry.coordinates as [number, number]);
      }

      if (progress < 1) {
        animationFrame.current = requestAnimationFrame(animate);
      } else {
        // Pulso múltiple al llegar con colores
        if (map.current && selectedLocality) {
          const pulseEl = document.createElement("div");
          pulseEl.style.width = "80px";
          pulseEl.style.height = "80px";
          pulseEl.innerHTML = `
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="20" fill="none" stroke="#60A5FA" stroke-width="4" opacity="0.9">
                <animate attributeName="r" from="12" to="38" dur="1.8s" repeatCount="3"/>
                <animate attributeName="opacity" from="0.9" to="0" dur="1.8s" repeatCount="3"/>
                <animate attributeName="stroke-width" from="4" to="1" dur="1.8s" repeatCount="3"/>
              </circle>
              <circle cx="40" cy="40" r="20" fill="none" stroke="#3B82F6" stroke-width="3" opacity="0.7">
                <animate attributeName="r" from="8" to="32" dur="1.5s" begin="0.3s" repeatCount="3"/>
                <animate attributeName="opacity" from="0.7" to="0" dur="1.5s" begin="0.3s" repeatCount="3"/>
              </circle>
              <circle cx="40" cy="40" r="8" fill="#60A5FA" opacity="0.6">
                <animate attributeName="r" from="8" to="12" dur="1s" repeatCount="indefinite"/>
                <animate attributeName="opacity" from="0.6" to="0.3" dur="1s" repeatCount="indefinite"/>
              </circle>
            </svg>
          `;
          const pulseMarker = new maplibregl.Marker({ element: pulseEl, anchor: "center" })
            .setLngLat(selectedLocality.coordinates)
            .addTo(map.current);
          setTimeout(() => pulseMarker.remove(), 5500);
        }
      }
    };

    animate();
  };

  // Limpiar selección
  const clearSelection = () => {
    if (!map.current) return;

    if (map.current.getSource("route")) {
      if (map.current.getLayer("route-line-bg")) map.current.removeLayer("route-line-bg");
      if (map.current.getLayer("route-line")) map.current.removeLayer("route-line");
      map.current.removeSource("route");
    }
    if (truckMarker.current) {
      truckMarker.current.remove();
      truckMarker.current = null;
    }
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }

    setSelectedLocality(null);

    map.current.flyTo({
      center: mapCenter,
      zoom: mapZoom,
      duration: 1000,
    });
  };

  // Filtrar y ordenar localidades
  const filteredLocalities = localities
    .filter((loc) => loc.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .map((loc) => ({ ...loc, distance: calculateDistance(buenimarLocation, loc.coordinates) }))
    .sort((a, b) => {
      if (sortBy === "distance") return a.distance - b.distance;
      return a.name.localeCompare(b.name);
    });

  const flyToLocality = (locality: Locality) => {
    if (!map.current) return;
    map.current.flyTo({
      center: locality.coordinates,
      zoom: 12,
      duration: 1000,
    });
  };

  return (
    <div className="space-y-4 md:space-y-6" style={{touchAction: 'pan-y'}}>
      {/* Panel de información de ruta activa */}
      {selectedLocality && (
        <div className="animate-bounce-in bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700/50 rounded-2xl p-4 md:p-6 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 animate-pulse-glow hover:scale-110 transition-transform duration-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="animate-float">
                    <path d="M17 8h3l2 3v4h-2M1 8h15v8H1zM6 18a2 2 0 100-4 2 2 0 000 4zM18 18a2 2 0 100-4 2 2 0 000 4z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-gray-100">
                    Ruta a {selectedLocality.name}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Animación en curso</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 md:gap-3 text-xs md:text-sm">
                <span className="px-2 md:px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 font-medium animate-slide-in-left hover:scale-105 transition-transform duration-200" style={{animationDelay: '0.1s'}}>
                  📏 {calculateDistance(buenimarLocation, selectedLocality.coordinates).toFixed(1)} km
                </span>
                {selectedLocality.population && (
                  <span className="px-2 md:px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 font-medium animate-slide-in-left hover:scale-105 transition-transform duration-200" style={{animationDelay: '0.2s'}}>
                    👥 {selectedLocality.population.toLocaleString()} hab.
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={clearSelection}
              className="px-3 md:px-4 py-2 bg-gray-600 hover:bg-gray-700 hover:scale-105 active:scale-95 text-white text-sm md:text-base rounded-lg font-semibold transition-all duration-200 whitespace-nowrap shadow-md hover:shadow-lg"
            >
              ✕ Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Controles mejorados */}
      <div className="animate-fade-in-scale bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 md:p-6 hover:shadow-2xl transition-shadow duration-300">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Buscador */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar localidad..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:border-red-500 focus:ring-4 focus:ring-red-500/20 focus:scale-[1.02] hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 outline-none animate-fade-in"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-transform duration-300 hover:scale-110 hover:text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Ordenar */}
          <div className="flex gap-2 w-full md:w-auto">
            <button
              onClick={() => setSortBy("distance")}
              className={`flex-1 md:flex-none px-3 md:px-4 py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105 active:scale-95 ${
                sortBy === "distance"
                  ? "bg-red-600 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              📍 Cercanía
            </button>
            <button
              onClick={() => setSortBy("name")}
              className={`flex-1 md:flex-none px-3 md:px-4 py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105 active:scale-95 ${
                sortBy === "name"
                  ? "bg-red-600 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              A-Z
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
        {/* Mapa - ocupa toda la altura en mobile */}
        <div className="lg:col-span-2">
          <div 
            ref={mapContainer} 
            className="w-full h-[50vh] md:h-[650px] rounded-2xl shadow-2xl overflow-hidden relative animate-fade-in-scale hover:shadow-3xl transition-all duration-500 md:hover:scale-[1.01]"
            style={{touchAction: isMobile ? 'none' : 'auto', pointerEvents: isMobile ? 'none' : 'auto'}}
          />
        </div>

        {/* Lista - Desktop: sidebar normal, Mobile: drawer desde abajo */}
        <div className="lg:col-span-1">
          {/* Desktop: Panel normal */}
          <div className="hidden lg:block animate-slide-in-right bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 h-[650px] overflow-y-auto hover:shadow-2xl transition-shadow duration-300">
            <div className="sticky top-0 bg-white dark:bg-gray-800 pb-3 mb-3 border-b border-gray-200 dark:border-gray-700 z-10">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Localidades ({filteredLocalities.length})
              </h3>
            </div>
            <div className="space-y-2">
              {filteredLocalities.map((locality, index) => (
                <button
                  key={locality.id}
                  onClick={() => selectLocality(locality)}
                  style={{ animationDelay: `${index * 0.03}s` }}
                        className={`w-full text-left p-4 rounded-xl transition-all duration-200 active:scale-[0.98] animate-fade-in touch-manipulation ${
                    selectedLocality?.id === locality.id
                      ? "bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500 shadow-lg"
                      : "bg-gray-50 dark:bg-gray-900 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-gray-900 dark:text-gray-100">{locality.name}</h4>
                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                      {locality.distance.toFixed(0)} km
                    </span>
                  </div>
                  {locality.population && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {locality.population.toLocaleString()} habitantes
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile: Botón flotante para abrir lista */}
          <button
            onClick={() => setShowMobileList(true)}
            className="lg:hidden fixed bottom-6 right-4 z-30 bg-red-600 text-white px-5 py-3 rounded-full shadow-2xl font-bold flex items-center gap-2 transition-all duration-200 active:scale-90 animate-pulse-glow animate-bounce-in touch-manipulation"
            style={{touchAction: 'manipulation'}}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <span className="text-sm">Ver Localidades</span>
          </button>

          {/* Mobile: Drawer desde abajo */}
          {showMobileList && (
            <>
              {/* Overlay oscuro */}
              <div 
                className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm animate-fade-in"
                onClick={() => setShowMobileList(false)}
                style={{touchAction: 'none'}}
              />
              
              {/* Panel drawer */}
              <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 rounded-t-3xl shadow-2xl max-h-[70vh] flex flex-col animate-slide-up" style={{touchAction: 'pan-y'}}>
                {/* Header con handle */}
                <div className="flex-shrink-0 p-4 pb-3 border-b border-gray-200 dark:border-gray-700">
                  <div 
                    onClick={() => setShowMobileList(false)}
                    className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-3 cursor-pointer active:scale-110 transition-transform duration-300"
                  ></div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                      Localidades ({filteredLocalities.length})
                    </h3>
                    <button
                      onClick={() => setShowMobileList(false)}
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-base active:bg-gray-200 dark:active:bg-gray-600 transition-all duration-200 active:scale-90 touch-manipulation"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                
                {/* Lista scrolleable */}
                <div className="flex-1 overflow-y-auto px-4 pt-2 pb-4 overscroll-contain" style={{WebkitOverflowScrolling: 'touch', touchAction: 'pan-y'}}>
                  <div className="space-y-2 pb-6">
                    {filteredLocalities.map((locality, index) => (
                      <button
                        key={locality.id}
                        onClick={() => selectLocality(locality)}
                        style={{ animationDelay: `${index * 0.03}s` }}
                        className={`w-full text-left p-4 rounded-xl transition-all duration-200 active:scale-[0.98] animate-fade-in touch-manipulation ${
                          selectedLocality?.id === locality.id
                            ? "bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500 shadow-lg"
                            : "bg-gray-50 dark:bg-gray-900 border-2 border-transparent active:border-gray-300 dark:active:border-gray-700"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-gray-900 dark:text-gray-100">{locality.name}</h4>
                          <span className="text-xs font-bold px-2 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                            {locality.distance.toFixed(0)} km
                          </span>
                        </div>
                        {locality.population && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {locality.population.toLocaleString()} habitantes
                          </p>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
