"use client";

import { useState } from "react";
import type { Catalog } from "@/lib/types";
import { FaFilePdf, FaDownload, FaExternalLinkAlt, FaSearch } from "react-icons/fa";

export default function CatalogsSection({ catalogs }: { catalogs: Catalog[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar catálogos según búsqueda
  const filteredCatalogs = catalogs.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para obtener tamaño de archivo (mock - en producción podrías obtenerlo del servidor)
  const getFileSize = (filename: string) => {
    const sizes: Record<string, string> = {
      "Catalogo-Conaprole_Buenimar-Colonia_v2.pdf": "8.4 MB",
      "Catalogo-La-Especialista_Buenimar-Colonia_v2.pdf": "5.2 MB",
      "Catalogo-Pagnifique_Buenimar-Colonia_v2.pdf": "3.8 MB",
      "Catalogo-Almena_Buenimar-Colonia_v2.pdf": "4.1 MB",
    };
    return sizes[filename] || "~5 MB";
  };

  // Función para obtener la marca del título
  const getBrandName = (title: string) => {
    return title.replace("Catálogo ", "");
  };

  return (
    <section
      id="catalogos"
      className="py-6 md:py-10"
      style={{ background: "rgb(var(--bg))", color: "rgb(var(--text))" }}
    >
      <div className="max-w-4xl mx-auto px-4">
        {/* Header con buscador */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2" style={{ color: "rgb(var(--text))" }}>
            Catálogos
          </h2>
          <p className="text-center text-sm md:text-base mb-6" style={{ color: "rgb(var(--muted))" }}>
            Descarga o visualiza nuestros catálogos de productos
          </p>
          
          {/* Buscador */}
          <div className="max-w-md mx-auto relative">
            <FaSearch 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" 
              style={{ color: "rgb(var(--muted))" }}
            />
            <input
              type="text"
              placeholder="Buscar catálogo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm md:text-base transition-all focus:outline-none focus:ring-2"
              style={{
                background: "rgb(var(--panel))",
                borderColor: "rgb(var(--line))",
                color: "rgb(var(--text))",
              }}
            />
          </div>
        </div>

        {/* Lista de catálogos */}
        <div className="space-y-3">
          {filteredCatalogs.length === 0 ? (
            <div className="text-center py-8" style={{ color: "rgb(var(--muted))" }}>
              No se encontraron catálogos
            </div>
          ) : (
            filteredCatalogs.map((c) => {
              const href = c.href ?? (c.file ? `/archivos/${c.file}` : "#");
              const isExternal = href.startsWith("http");
              const brandName = getBrandName(c.title);
              const fileSize = c.file ? getFileSize(c.file) : "~5 MB";

              return (
                <div
                  key={c.id}
                  className="panel p-4 rounded-xl border transition-all hover:shadow-lg group"
                  style={{
                    background: "rgb(var(--panel))",
                    borderColor: "rgb(var(--line))",
                  }}
                >
                  <div className="flex items-start gap-4">
                    {/* Icono PDF */}
                    <div 
                      className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-lg shrink-0 transition-transform group-hover:scale-110"
                      style={{ background: "rgba(220, 38, 38, 0.1)" }}
                    >
                      <FaFilePdf className="text-2xl md:text-3xl text-red-600" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-base md:text-lg font-bold mb-1 truncate"
                        style={{ color: "rgb(var(--text))" }}
                      >
                        {brandName}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm" style={{ color: "rgb(var(--muted))" }}>
                        <span className="font-medium">PDF</span>
                        <span>·</span>
                        <span>{fileSize}</span>
                        <span>·</span>
                        <span>Actualizado 12/2024</span>
                      </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                      {/* Ver online */}
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold border transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                        style={{
                          background: "rgb(var(--panel))",
                          borderColor: "rgb(var(--line))",
                          color: "rgb(var(--text))",
                        }}
                      >
                        <FaExternalLinkAlt className="text-xs" />
                        <span>Ver</span>
                      </a>

                      {/* Descargar */}
                      <a
                        href={href}
                        download={!isExternal && !!c.file}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105 hover:shadow-lg active:scale-95 whitespace-nowrap"
                        style={{
                          background: "rgb(var(--accent))",
                          color: "white",
                        }}
                      >
                        <FaDownload className="text-sm" />
                        <span>Descargar</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Info adicional */}
        {filteredCatalogs.length > 0 && (
          <div className="mt-6 text-center text-xs md:text-sm" style={{ color: "rgb(var(--muted))" }}>
            Mostrando {filteredCatalogs.length} de {catalogs.length} catálogo{catalogs.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </section>
  );
}
