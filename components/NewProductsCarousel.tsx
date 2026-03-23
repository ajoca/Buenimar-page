"use client";
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

// Nuevos productos (imagen en public/img new/)
const products = [
  { code: 'ALM12263', image: 'ALM12263.png', name: 'Aceite de oliva O-LIVE 450 ml' },
  { code: 'ALM12264', image: 'ALM12264.png', name: 'Aceite de oliva O-LIVE 1 Litro' },
  { code: 'ALM12265', image: 'ALM12265.png', name: 'Aceite de oliva Santiago Premium 250 ml' },
  { code: 'ALM12266', image: 'ALM12266.png', name: 'Aceite de oliva Santiago Premium 5 Litros' },
  { code: 'SCH5090', image: 'SCH5090.png', name: 'Morcilla Salada' },
  { code: 'SCH5094', image: 'SCH5094.png', name: 'Morcilla Dulce' },
  { code: 'SCH5096', image: 'SCH5096.png', name: 'Morcilla Queso + Aceitunas' },
  { code: 'SCH5100', image: 'SCH5100.png', name: 'Chorizo Provolone + Albahaca' },
  { code: 'SCH5102', image: 'SCH5102.png', name: 'Chorizo Cheddar + Morrón' },
  { code: 'SCH9264', image: 'SCH9264.png', name: 'Hamburguesas Parrilleras' },
];

export default function NewProductsCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAutoPaused, setIsAutoPaused] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const total = products.length;
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const resumeTimeoutRef = useRef<number | null>(null);

  const pauseAutoScroll = () => {
    setIsAutoPaused(true);
    if (resumeTimeoutRef.current) {
      window.clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = window.setTimeout(() => {
      setIsAutoPaused(false);
    }, 4000);
  };

  useEffect(() => {
    if (isAutoPaused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 3000);
    return () => clearInterval(interval);
  }, [total, isAutoPaused]);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        window.clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  // Move only the horizontal track to avoid scrolling the whole page
  useEffect(() => {
    const track = trackRef.current;
    const card = cardRefs.current[current];
    if (!track || !card) return;

    const targetLeft = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
    const maxLeft = Math.max(0, track.scrollWidth - track.clientWidth);
    const clampedLeft = Math.max(0, Math.min(targetLeft, maxLeft));

    track.scrollTo({ left: clampedLeft, behavior: 'smooth' });
  }, [current]);

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
    <div className="w-full flex flex-col items-center py-6 sm:py-8 px-3 sm:px-4 overflow-hidden">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5 text-center">Nuevos Productos</h2>
      <div className="w-full flex flex-col items-center max-w-7xl">
        <div
          ref={trackRef}
          onWheel={pauseAutoScroll}
          onTouchStart={pauseAutoScroll}
          onMouseDown={pauseAutoScroll}
          className="flex gap-3 sm:gap-4 justify-start items-stretch w-full overflow-x-auto pb-4 px-1 sm:px-2 snap-x snap-mandatory scroll-smooth"
        >
          {products.map((product, idx) => (
            <div
              key={product.code}
              ref={(el) => { cardRefs.current[idx] = el; }}
              className={`shrink-0 snap-center w-[74vw] sm:w-[220px] md:w-[240px] h-[340px] sm:h-[360px] transition-transform duration-700 ${idx === current ? 'scale-[1.02] sm:scale-105 shadow-xl z-10' : 'scale-100 sm:scale-95 opacity-85 sm:opacity-70'} flex flex-col items-center cursor-pointer`}
              onClick={() => openModal(idx)}
            >
              <div className="w-full h-52 sm:h-56 md:h-60 bg-white rounded-2xl flex items-center justify-center overflow-hidden p-3 sm:p-4">
                <Image
                  src={`/img new/${product.image}`}
                  alt={product.name}
                  width={480}
                  height={480}
                  sizes="(max-width: 640px) 74vw, (max-width: 768px) 220px, 240px"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="mt-2 h-14 sm:h-16 text-sm sm:text-base font-semibold text-center w-full leading-snug px-1 overflow-hidden flex items-start justify-center">
                <span
                  className="overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {product.name}
                </span>
              </div>
              <div className="h-6 text-xs sm:text-sm text-gray-500">Código: {product.code}</div>
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

            <div className="grid md:grid-cols-2 gap-4 md:gap-6 p-4 sm:p-6 md:p-8">
              {/* Image */}
              <div className="flex items-center justify-center bg-white rounded-lg p-4 sm:p-6 min-h-[300px] sm:min-h-[380px]">
                <Image
                  src={`/img new/${product.image}`}
                  alt={product.name}
                  width={700}
                  height={700}
                  sizes="(max-width: 768px) 90vw, 50vw"
                  className="max-h-[420px] w-full object-contain"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col justify-center space-y-4 sm:space-y-6">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: "rgb(var(--text))" }}>
                  {product.name}
                </h3>
                {product.code && (
                  <div className="text-base sm:text-lg md:text-xl" style={{ color: "rgb(var(--text))" }}>
                    <span style={{ color: "rgb(var(--muted))" }}>Código:</span>{" "}
                    <span className="font-bold text-xl sm:text-2xl md:text-3xl text-red-600">
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
