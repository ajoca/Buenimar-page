"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';

// Nuevos productos (imagen en public/img new/)
const products = [
  { code: 'SCH5090', image: 'SCH5090.png', name: 'Morcilla Salada' },
  { code: 'SCH5094', image: 'SCH5094.png', name: 'Morcilla Dulce' },
  { code: 'SCH5096', image: 'SCH5096.png', name: 'Morcilla Queso + Aceitunas' },
  { code: 'SCH5100', image: 'SCH5100.png', name: 'Chorizo Provolone + Albahaca' },
  { code: 'SCH5102', image: 'SCH5102.png', name: 'Chorizo Cheddar + Morrón' },
  { code: 'SCH9264', image: 'SCH9264.png', name: 'Hamburguesas Parrilleras' },
];

export default function NewProductsCarousel() {
  const [current, setCurrent] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const total = products.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 3000); // más lento para que se vea bien
    return () => clearInterval(interval);
  }, [total]);

  if (total === 0) return <div>No hay productos nuevos.</div>;

  const openModal = (index: number) => {
    setModalIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalIndex(null);
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <h2 className="text-2xl font-bold mb-4">Nuevos Productos</h2>
      <div className="w-full flex flex-col items-center">
        <div className="flex gap-4 justify-center items-end w-full overflow-x-auto pb-4">
          {products.map((product, idx) => (
            <div
              key={product.code}
              className={`transition-transform duration-700 ${idx === current ? 'scale-105 shadow-xl z-10' : 'scale-95 opacity-70'} flex flex-col items-center cursor-pointer`}
              style={{ minWidth: 160 }}
              onClick={() => openModal(idx)}
            >
              <div className="w-36 h-36 md:w-40 md:h-40 bg-white rounded-2xl flex items-center justify-center overflow-hidden">
                <Image
                  src={`/img new/${product.image}`}
                  alt={product.name}
                  width={180}
                  height={180}
                  className="object-contain"
                />
              </div>
              <div className="mt-1 text-xs font-semibold text-center max-w-[180px] leading-snug">
                {product.name}
              </div>
              <div className="text-[11px] text-gray-500">Código: {product.code}</div>
            </div>
          ))}
        </div>
        <div className="mt-2 text-sm text-gray-500">{current + 1} de {total}</div>
      </div>

      {/* Modal tipo lightbox */}
      {showModal && modalIndex !== null && (
        (() => {
          const product = products[modalIndex];
          if (!product) return null;
          return (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-4xl w-full rounded-lg overflow-hidden shadow-2xl"
            style={{ background: "rgb(var(--panel))" }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Cerrar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid md:grid-cols-2 gap-6 p-6 md:p-8">
              {/* Image */}
              <div className="flex items-center justify-center bg-white rounded-lg p-6">
                <Image
                  src={`/img new/${product.image}`}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="max-h-[400px] w-full object-contain"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col justify-center space-y-6">
                <h3 className="text-3xl md:text-4xl font-bold" style={{ color: "rgb(var(--text))" }}>
                  {product.name}
                </h3>
                {product.code && (
                  <div className="text-lg md:text-xl" style={{ color: "rgb(var(--text))" }}>
                    <span style={{ color: "rgb(var(--muted))" }}>Código:</span>{" "}
                    <span className="font-bold text-2xl md:text-3xl text-red-600">
                      {product.code}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
          );
        })()
      )}
    </div>
  );
}
