"use client";
import Image from 'next/image';
import { useState } from 'react';

// Lista de imágenes en public/img new/
const productImages = [
  'SCH5090.png',
  'SCH5094.png',
  'SCH5096.png',
  'SCH5100.png',
  'SCH5102.png',
  'SCH9264.png',
];

export default function NewProductsCarousel() {
  const [current, setCurrent] = useState(0);
  const total = productImages.length;

  const prev = () => setCurrent((current - 1 + total) % total);
  const next = () => setCurrent((current + 1) % total);

  if (total === 0) return <div>No hay productos nuevos.</div>;

  const imageName = productImages[current];
  const productCode = imageName.split('.')[0];

  return (
    <div className="w-full flex flex-col items-center py-8">
      <h2 className="text-2xl font-bold mb-4">Nuevos Productos</h2>
      <div className="relative w-80 h-80 flex items-center justify-center">
        <Image
          src={`/img new/${imageName}`}
          alt={productCode}
          width={320}
          height={320}
          className="object-contain rounded shadow-lg"
        />
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow"
          onClick={prev}
        >
          &#8592;
        </button>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow"
          onClick={next}
        >
          &#8594;
        </button>
      </div>
      <div className="mt-4 text-lg font-semibold">Código: {productCode}</div>
      <div className="mt-2 text-sm text-gray-500">{current + 1} de {total}</div>
    </div>
  );
}
