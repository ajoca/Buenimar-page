"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";

export default function ProductsSection({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAll, setShowAll] = useState(false);
  
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const displayProducts = (isMobile && !showAll) ? products.slice(0, 6) : products;

  return (
    <section
      className="pb-[var(--section-gap)]"
      aria-labelledby="nuevos"
    >
      <div className="container-x">
        <h2 id="nuevos" className="section-title">
          {title}
        </h2>

        <div className="mt-4 grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {displayProducts.map((p) => (
            <article
              key={p.id}
              onClick={() => setSelectedProduct(p)}
              className="panel overflow-hidden hover:scale-105 hover:shadow-xl active:scale-100 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-red-500 flex flex-col"
            >
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  height: "clamp(120px, 165px, 200px)",
                  borderBottom: "1px solid rgb(var(--line))",
                  background: "rgba(0,0,0,.02)",
                }}
              >
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-contain p-2"
                  />
                ) : (
                  <span
                    className="text-[12px]"
                    style={{ color: "rgb(var(--muted))" }}
                  >
                    Image
                  </span>
                )}
              </div>

              <div className="p-2 md:p-3 flex-grow">
                <h3 className="text-xs md:text-sm font-semibold leading-snug line-clamp-2">
                  {p.name}
                </h3>
                {!!p.subtitle && (
                  <div
                    className="text-[11px] md:text-xs mt-1 line-clamp-1"
                    style={{ color: "rgb(var(--muted))" }}
                  >
                    {p.subtitle}
                  </div>
                )}
                {!!p.code && (
                  <div
                    className="mt-1 md:mt-2 text-[11px] md:text-xs"
                    style={{ color: "rgb(var(--muted))" }}
                  >
                    Código:{" "}
                    <span
                      className="font-semibold"
                      style={{ color: "rgb(var(--text))" }}
                    >
                      {p.code}
                    </span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Ver más button for mobile */}
        {products.length > 6 && (
          <div className="md:hidden flex justify-center mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {showAll ? "Ver menos" : `Ver más (${products.length - 6} más)`}
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-lg overflow-hidden shadow-2xl"
            style={{ background: "rgb(var(--panel))" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-full transition-all text-xl font-bold"
              aria-label="Cerrar"
            >
              ✕
            </button>
            
            <div className="grid md:grid-cols-2 gap-6 p-6 md:p-8">
              {/* Image */}
              <div className="flex items-center justify-center bg-white rounded-lg p-6">
                {selectedProduct.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="max-h-[400px] w-full object-contain"
                  />
                ) : (
                  <span className="text-gray-400">Sin imagen</span>
                )}
              </div>
              
              {/* Info */}
              <div className="flex flex-col justify-center space-y-6">
                <h3 className="text-3xl md:text-4xl font-bold" style={{ color: "rgb(var(--text))" }}>
                  {selectedProduct.name}
                </h3>
                {selectedProduct.subtitle && (
                  <p className="text-xl md:text-2xl" style={{ color: "rgb(var(--text))" }}>
                    {selectedProduct.subtitle}
                  </p>
                )}
                {selectedProduct.code && (
                  <div className="text-lg md:text-xl" style={{ color: "rgb(var(--text))" }}>
                    <span style={{ color: "rgb(var(--muted))" }}>Código:</span>{" "}
                    <span className="font-bold text-2xl md:text-3xl text-red-600">
                      {selectedProduct.code}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}