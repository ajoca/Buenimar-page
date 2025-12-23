"use client";

import { useEffect, useMemo, useState } from "react";
import type { Slide } from "@/lib/types";

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  return (
    <section className="pt-6 md:pt-12 mb-8 md:mb-16">
      <div className="w-full">
        <div className="relative min-h-[400px] md:h-[clamp(400px, 70vh, 600px)] flex items-center justify-center overflow-hidden py-8 md:py-0" style={{ background: "rgb(var(--bg))" }}>
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-16 items-center h-full px-4 md:px-16 lg:px-20">
            {/* Left side - Values */}
            <div className="flex flex-col justify-center space-y-3 md:space-y-4">
              {["CALIDAD", "SERVICIO", "VOCACIÓN", "LOGÍSTICA", "RAPIDEZ", "CONFIANZA"].map((item) => (
                <div key={item} className="bg-red-600 text-white font-bold py-3 md:py-4 px-4 md:px-6 rounded-full text-center text-sm md:text-base lg:text-lg w-full">
                  {item}
                </div>
              ))}
            </div>
            
            {/* Right side - Image */}
            <div className="flex md:flex items-center justify-center mt-6 md:mt-0">
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/img/2070a6_303f0748f5fd4775a89fd681c4f8d080~mv2 (1).avif"
                  alt="Buenimar Camiones" 
                  className="rounded-full w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover border-4 border-orange-400 shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
