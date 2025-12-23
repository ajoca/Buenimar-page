"use client";

import { useState, useEffect } from "react";
import type { Slide } from "@/lib/types";

export default function CompanySection({
  title,
  slides,
  paragraphs,
}: {
  title: string;
  slides: Slide[];
  paragraphs: string[];
}) {
  const [idx, setIdx] = useState(0);
  const safeSlides = slides?.length ? slides : [{ image: "" }];

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((i) => (i + 1) % safeSlides.length);
    }, 4000); // Change every 4 seconds
    return () => clearInterval(interval);
  }, [safeSlides.length]);

  return (
    <section className="pb-0" id="empresa">
      <div className="w-full">
        <div className="relative overflow-hidden" style={{ height: 'clamp(300px, 70vh, 700px)' }}>
          {safeSlides.map((slide, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-1000 ${i === idx ? 'opacity-100' : 'opacity-0'}`}
            >
              {slide.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={slide.image}
                  alt="Empresa"
                  className="w-full h-full object-contain md:object-cover bg-black"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-[24px]" style={{ color: "rgb(var(--muted))" }}>
                    Imagen (placeholder)
                  </span>
                </div>
              )}
            </div>
          ))}
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/30" />
          
          {/* Title overlay */}
          <div className="absolute top-0 left-0 right-0 flex items-start justify-center pt-4 md:pt-8 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white text-center drop-shadow-2xl">
              {title}
            </h2>
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {safeSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`w-3 h-3 rounded-full ${i === idx ? 'bg-white' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
