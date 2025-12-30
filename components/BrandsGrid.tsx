"use client";

import { useState, useEffect } from "react";
import type { Brand } from "@/lib/types";
import ScrollReveal from "./ScrollReveal";

export default function BrandsGrid({ brands }: { brands: Brand[] }) {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  // Cerrar modal con Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedBrand) {
        setSelectedBrand(null);
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedBrand]);

  if (!brands || brands.length === 0) {
    return null;
  }

  return (
    <section className="pb-[var(--section-gap)]">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-3 md:gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {brands.map((b, index) => (
            <ScrollReveal key={b.id} animation="zoom" delay={index * 30}>
              <div
                onClick={() => setSelectedBrand(b)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedBrand(b);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Ver detalles de ${b.name}`}
              className="panel flex items-center justify-center overflow-hidden hover:scale-105 hover:shadow-xl active:scale-100 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-red-500 active:border-red-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white aspect-square"
              style={{ minHeight: "140px" }}
            >
              {b.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={b.image}
                  alt={b.name}
                  className="h-full w-full object-contain p-4 sm:p-6 md:p-8"
                />
              ) : (
                <span
                  className="text-[12px]"
                  style={{ color: "rgb(var(--muted))" }}
                >
                  Marcas
                </span>
              )}
            </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedBrand && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedBrand(null)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setSelectedBrand(null);
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="brand-modal-title"
        >
          <div
            className="relative max-w-3xl w-full rounded-lg overflow-hidden shadow-2xl"
            style={{ background: "rgb(var(--panel))" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedBrand(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-full transition-all font-bold focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Cerrar vista detallada de la marca"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="flex flex-col items-center justify-center p-8 md:p-12">
              {/* Image */}
              <div className="w-full max-w-md bg-white rounded-lg p-8 mb-6">
                {selectedBrand.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={selectedBrand.image}
                    alt={`Logo de ${selectedBrand.name}`}
                    className="w-full h-auto object-contain"
                  />
                ) : (
                  <span className="text-gray-400">Sin imagen</span>
                )}
              </div>
              
              {/* Info */}
              <div className="text-center">
                <h3 id="brand-modal-title" className="text-3xl md:text-4xl font-bold" style={{ color: "rgb(var(--text))" }}>
                  {selectedBrand.name}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
