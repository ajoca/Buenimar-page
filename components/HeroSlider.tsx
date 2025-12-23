"use client";

import { useEffect, useMemo, useState } from "react";
import type { Slide } from "@/lib/types";

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const safeSlides = useMemo(
    () => (slides?.length ? slides : [{ title: " ", text: " " }]),
    [slides]
  );
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => setIdx((i) => (i + 1) % safeSlides.length), 4500);
    return () => window.clearInterval(t);
  }, [safeSlides.length]);

  const prev = () => setIdx((i) => (i - 1 + safeSlides.length) % safeSlides.length);
  const next = () => setIdx((i) => (i + 1) % safeSlides.length);

  return (
    <section className="py-[var(--section-gap)]">
      <div className="container-x">
        <div className="panel overflow-hidden">
          <div className="grid grid-cols-[36px_1fr_36px] md:grid-cols-[44px_1fr_44px]">
            <button
              aria-label="Anterior"
              onClick={prev}
              className="border-r text-lg md:text-[22px] transition-all duration-200 hover:scale-105 hover:bg-white/10 active:scale-95"
              style={{ borderColor: "rgb(var(--line))" }}
            >
              ❮
            </button>

            <div className="relative">
              <div className="h-[clamp(220px, var(--slider-h), 320px)] overflow-hidden">
                <div
                  className="flex h-full transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(-${idx * 100}%)` }}
                >
                  {safeSlides.map((s, i) => (
                    <div key={i} className="min-w-full p-3 md:p-5 lg:p-7">
                      <div className="text-base md:text-lg font-semibold">{s.title ?? " "}</div>
                      {!!s.text && (
                        <div
                          className="mt-1 md:mt-2 text-xs md:text-sm"
                          style={{ color: "rgb(var(--muted))" }}
                        >
                          {s.text}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                {safeSlides.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Ir al slide ${i + 1}`}
                    onClick={() => setIdx(i)}
                    className="h-2 w-2 rounded-full border"
                    style={{
                      borderColor: "rgb(var(--line))",
                      background:
                        i === idx ? "rgba(var(--accent), .55)" : "rgba(var(--accent), .18)",
                    }}
                  />
                ))}
              </div>
            </div>

            <button
              aria-label="Siguiente"
              onClick={next}
              className="border-l text-lg md:text-[22px] transition-all duration-200 hover:scale-105 hover:bg-white/10 active:scale-95"
              style={{ borderColor: "rgb(var(--line))" }}
            >
              ❯
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
