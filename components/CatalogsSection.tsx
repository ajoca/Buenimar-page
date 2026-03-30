"use client";

import type { Catalog } from "@/lib/types";
import { FaFilePdf, FaDownload, FaEye } from "react-icons/fa";

// Brand accent colors for card headers
const BRAND_COLORS: Record<string, { bg: string; accent: string }> = {
  c1: { bg: "#003087", accent: "#0044bb" },
  c2: { bg: "#8B1A1A", accent: "#a52020" },
  c3: { bg: "#3d1345", accent: "#5a1e68" },
  c4: { bg: "#1a3c5e", accent: "#1e4d78" },
  c5: { bg: "#0f4c81", accent: "#1d6fb0" },
};

export default function CatalogsSection({ catalogs }: { catalogs: Catalog[] }) {
  return (
    <section
      id="catalogos"
      className="py-14 md:py-20"
      style={{ background: "rgb(var(--panel))" }}
    >
      <div className="container-x">
        <div className="text-center mb-10 md:mb-14">
          <p className="section-eyebrow mb-2">Material comercial</p>
          <h2 className="section-title mb-3">Catálogos</h2>
          <p className="section-subtitle max-w-xl mx-auto">
            Descargá o visualizá nuestros catálogos de productos actualizados
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {catalogs.map((c) => {
            const href = c.href ?? (c.file ? `/archivos/${c.file}` : "#");
            const isExternal = href.startsWith("http");
            const brandName = c.title.replace("Catálogo ", "");
            const colors = BRAND_COLORS[c.id] ?? { bg: "#dc2626", accent: "#ef4444" };

            return (
              <div
                key={c.id}
                className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border group"
                style={{ background: "rgb(var(--bg))", borderColor: "rgb(var(--line))" }}
              >
                {/* Card header — brand visual banner */}
                <div
                  className="relative h-44 flex flex-col items-center justify-center gap-2 overflow-hidden"
                  style={{ background: colors.bg }}
                >
                  {/* Decorative circles */}
                  <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full opacity-10 bg-white pointer-events-none" />
                  <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full opacity-10 bg-white pointer-events-none" />

                  {/* Icon + Brand name */}
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                      style={{ background: colors.accent }}
                    >
                      <FaFilePdf className="text-white text-2xl" />
                    </div>
                    <span className="text-white font-bold text-lg text-center px-4 leading-tight drop-shadow">
                      {brandName}
                    </span>
                  </div>

                  {/* Date badge */}
                  <span
                    className="absolute bottom-2.5 right-3 text-[11px] font-medium px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)" }}
                  >
                    02/2026
                  </span>
                </div>

                {/* Card body */}
                <div className="p-5 flex flex-col gap-4">
                  <div>
                    <h3 className="font-bold text-base leading-snug" style={{ color: "rgb(var(--text))" }}>
                      {c.title}
                    </h3>
                    <p className="text-xs mt-1" style={{ color: "rgb(var(--muted))" }}>
                      Actualizado · 02/2026 · PDF
                    </p>
                  </div>

                  {/* CTAs */}
                  <div className="flex gap-2">
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold border transition-all hover:opacity-80"
                      style={{ borderColor: "rgb(var(--accent))", color: "rgb(var(--accent))" }}
                    >
                      <FaEye className="text-xs" />
                      Ver catálogo
                    </a>
                    <a
                      href={href}
                      download={!isExternal && !!c.file}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                      style={{ background: "rgb(var(--accent))" }}
                    >
                      <FaDownload className="text-xs" />
                      Descargar
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

