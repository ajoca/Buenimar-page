"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import type { Feature, Polygon, MultiPolygon } from "geojson";

export type Locality = {
  id: string;
  name: string;
  department: "Colonia" | "Soriano";
  coordinates: [number, number]; // [lng, lat]
  population?: number;
  description?: string;
};

type Props = {
  coloniaFeature: Feature<Polygon | MultiPolygon>;
  localities: Locality[];
  hub: { name: string; coordinates: [number, number] };
  selectedId?: string | null;
  onSelect?: (id: string) => void;
};

function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect;
      if (!cr) return;
      setSize({ w: Math.max(1, cr.width), h: Math.max(1, cr.height) });
    });
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  return { ref, size };
}

export default function CoverageShapeMap({
  coloniaFeature,
  localities,
  hub,
  selectedId,
  onSelect,
}: Props) {
  const { ref, size } = useElementSize<HTMLDivElement>();
  const padding = 18;

  const selected = useMemo(
    () => localities.find((l) => l.id === selectedId) ?? null,
    [localities, selectedId]
  );

  const { projection, pathGen } = useMemo(() => {
    const proj = geoMercator();

    // Fit al contenedor (silueta)
    if (size.w > 1 && size.h > 1) {
      proj.fitExtent(
        [
          [padding, padding],
          [size.w - padding, size.h - padding],
        ],
        coloniaFeature as any
      );
    }

    const p = geoPath(proj);
    return { projection: proj, pathGen: p };
  }, [coloniaFeature, size.w, size.h]);

  const coloniaPath = useMemo(() => {
    try {
      return pathGen(coloniaFeature as any) || "";
    } catch {
      return "";
    }
  }, [pathGen, coloniaFeature]);

  const project = (lngLat: [number, number]) => {
    const pt = projection(lngLat as any);
    return pt ? ([pt[0], pt[1]] as const) : null;
  };

  const hubXY = project(hub.coordinates);
  const selectedXY = selected ? project(selected.coordinates) : null;

  return (
    <div
      ref={ref}
      className="w-full h-[500px] md:h-[600px] rounded-xl relative shadow-2xl touch-none"
      style={{
        background:
          "radial-gradient(1200px 600px at 30% 25%, rgba(225,29,72,0.10), transparent 55%), linear-gradient(180deg, #0B1220, #070B13)",
      }}
    >
      {/* SVG con overflow visible para labels */}
      <svg width="100%" height="100%" viewBox={`0 0 ${size.w} ${size.h}`} style={{ overflow: "visible" }}>
        {/* Silueta Colonia */}
        <path
          d={coloniaPath}
          fill="rgba(255,255,255,0.06)"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth={1.2}
        />

        {/* "Glow" sutil del borde (pro) */}
        <path
          d={coloniaPath}
          fill="transparent"
          stroke="rgba(225,29,72,0.35)"
          strokeWidth={2.2}
          opacity={0.35}
        />

        {/* Ruta (solo cuando hay seleccionado) */}
        {hubXY && selectedXY && (
          <>
            {/* Base sutil */}
            <line
              x1={hubXY[0]}
              y1={hubXY[1]}
              x2={selectedXY[0]}
              y2={selectedXY[1]}
              stroke="rgba(255,255,255,0.20)"
              strokeWidth={2}
            />
            {/* Ruta principal */}
            <line
              x1={hubXY[0]}
              y1={hubXY[1]}
              x2={selectedXY[0]}
              y2={selectedXY[1]}
              stroke="rgba(225,29,72,0.95)"
              strokeWidth={2.5}
              strokeDasharray="6 6"
              opacity={0.9}
            />
          </>
        )}

        {/* Puntos Localidades */}
        {localities
          .filter((l) => l.department === "Colonia")
          .map((l) => {
            const xy = project(l.coordinates);
            if (!xy) return null;

            const isSel = l.id === selectedId;

            return (
              <g key={l.id} onClick={() => onSelect?.(l.id)} style={{ cursor: "pointer" }}>
                {/* Ring seleccionado */}
                {isSel && (
                  <circle
                    cx={xy[0]}
                    cy={xy[1]}
                    r={14}
                    fill="rgba(225,29,72,0.18)"
                    stroke="rgba(225,29,72,0.85)"
                    strokeWidth={2.5}
                  />
                )}

                {/* Punto minimal */}
                <circle
                  cx={xy[0]}
                  cy={xy[1]}
                  r={isSel ? 6.5 : 5}
                  fill="rgba(225,29,72,0.95)"
                  stroke="rgba(255,255,255,0.85)"
                  strokeWidth={2}
                />

                {/* Label solo para seleccionado (mejorado) */}
                {isSel && (
                  <text
                    x={xy[0]}
                    y={xy[1] - 20}
                    fontSize="14"
                    fontWeight="700"
                    fill="rgba(255,255,255,0.95)"
                    textAnchor="middle"
                    style={{ 
                      textShadow: "0 2px 12px rgba(0,0,0,0.8), 0 0 8px rgba(225,29,72,0.4)",
                      paintOrder: "stroke fill",
                      stroke: "rgba(0,0,0,0.5)",
                      strokeWidth: "3px"
                    }}
                  >
                    {l.name}
                  </text>
                )}
              </g>
            );
          })}

        {/* Hub Buenimar */}
        {hubXY && (
          <g>
            <circle
              cx={hubXY[0]}
              cy={hubXY[1]}
              r={14}
              fill="rgba(225,29,72,0.25)"
              stroke="rgba(225,29,72,0.95)"
              strokeWidth={2.5}
            />
            <circle cx={hubXY[0]} cy={hubXY[1]} r={6} fill="rgba(255,255,255,0.92)" />
            <text
              x={hubXY[0]}
              y={hubXY[1] - 20}
              fontSize="15"
              fontWeight="700"
              fill="rgba(255,255,255,0.95)"
              textAnchor="middle"
              style={{ 
                textShadow: "0 2px 12px rgba(0,0,0,0.8), 0 0 8px rgba(225,29,72,0.5)",
                paintOrder: "stroke fill",
                stroke: "rgba(0,0,0,0.5)",
                strokeWidth: "3px"
              }}
            >
              {hub.name}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
