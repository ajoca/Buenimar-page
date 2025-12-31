"use client";

import { useEffect, useMemo, useState } from "react";
import type { Slide } from "@/lib/types";

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  return (
    <section className="pt-6 md:pt-12 mb-8 md:mb-16">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
        {/* Hero Card */}
        <div className="relative overflow-hidden rounded-3xl shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition-all duration-500 hover:shadow-[0_24px_60px_rgba(0,0,0,0.25)] group">
          {/* Borde premium con gradiente */}
          <div className="absolute inset-0 rounded-3xl ring-1 ring-white/20 pointer-events-none z-10" />
          <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-red-500/50 to-orange-400/50 blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-500" />

          {/* Desktop: Imagen con overlay y texto encima */}
          <div className="hidden md:block relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/BUENIMAR-2.avif"
              alt="Centro logístico Buenimar Colonia"
              className="h-[400px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              style={{ objectPosition: 'center 45%' }}
            />
            
            {/* Overlay con gradiente de marca */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/20" />

            {/* Contenido encima de la imagen */}
            <div className="absolute inset-0 flex flex-col justify-center left-12 max-w-xl text-white z-20 p-4">
              <p className="text-sm font-bold tracking-widest opacity-90 mb-2" style={{ fontFamily: "var(--font-raleway, system-ui)" }}>BUENIMAR COLONIA</p>
              <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-3" style={{ fontFamily: "var(--font-raleway, system-ui)" }}>
                Distribución y logística con confianza
              </h2>
              <p className="text-base opacity-90 mb-6 leading-relaxed">
                Más de 100 marcas líderes. Atención ágil, stock completo y entregas rápidas para tu comercio.
              </p>

              {/* Botones CTA */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="#productos"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="rounded-full bg-white/95 px-5 py-2.5 text-sm font-bold text-gray-900 hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                >
                  Ver productos destacados
                </a>
                <a
                  href="/marcas"
                  className="rounded-full bg-red-600/95 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Catálogos
                </a>
              </div>
            </div>
          </div>

          {/* Mobile: Imagen arriba, texto abajo (sin overlay) */}
          <div className="md:hidden">
            {/* Imagen completa sin recorte */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/BUENIMAR-2.avif"
              alt="Centro logístico Buenimar Colonia"
              className="w-full h-auto object-contain"
            />
            
            {/* Contenido debajo de la imagen */}
            <div className="p-6 bg-gradient-to-b from-gray-900 to-black text-white">
              <p className="text-xs font-bold tracking-widest opacity-90 mb-2" style={{ fontFamily: "var(--font-raleway, system-ui)" }}>BUENIMAR COLONIA</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight mb-3" style={{ fontFamily: "var(--font-raleway, system-ui)" }}>
                Distribución y logística con confianza
              </h2>
              <p className="text-sm opacity-90 mb-5 leading-relaxed">
                Más de 100 marcas líderes. Atención ágil, stock completo y entregas rápidas para tu comercio.
              </p>

              {/* Botones en columna para mobile */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="rounded-full bg-white/95 px-5 py-3 text-sm font-bold text-gray-900 hover:bg-white transition-all duration-300 active:scale-95 shadow-lg text-center cursor-pointer"
                >
                  Ver productos destacados
                </button>
                <a
                  href="/marcas"
                  className="rounded-full bg-red-600/95 px-5 py-3 text-sm font-bold text-white hover:bg-red-600 transition-all duration-300 active:scale-95 shadow-lg text-center"
                >
                  Catálogos
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Valores como chips elegantes debajo */}
        <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-2 md:gap-3">
          {[
            "Calidad",
            "Rapidez",
            "Confianza",
            "Logística",
            "Servicio",
            "Vocación"
          ].map((item) => (
            <div
              key={item}
              className="inline-flex items-center bg-red-600 text-white font-semibold py-2 px-3 md:px-4 rounded-full text-xs md:text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-red-700 cursor-pointer"
            >
              <span>{item.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
