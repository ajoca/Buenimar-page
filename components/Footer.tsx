"use client";
import Link from "next/link";
import CertificationBadge from "./CertificationBadge";
import { FaMapMarkerAlt, FaPhone, FaWhatsapp, FaEnvelope } from "react-icons/fa";

export default function Footer({ hideCertification = false }: { hideCertification?: boolean }) {
  return (
    <footer className="relative overflow-hidden">
      {/* Separador diagonal suave */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-red-600/20 -translate-y-full" />
      
      {/* Fondo con degradé y textura */}
      <div className="relative bg-gradient-to-br from-red-700 via-red-800 to-red-900 text-white py-16 md:py-20">
        {/* Textura grain sutil */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          }}
        />
        
        {/* Glow effect detrás del logo */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />
      
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Grid 12 columnas mejorado */}
          <div className={`grid grid-cols-1 gap-8 md:gap-6 mb-12 items-start ${hideCertification ? 'md:grid-cols-10' : 'md:grid-cols-12'}`}>
            {/* Columna 1: Marca (4 cols) */}
            <div className="md:col-span-4 text-center md:text-left space-y-3">
              {/* Glow detrás del logo */}
              <div className="relative inline-block">
                <div className="absolute inset-0 blur-2xl bg-white/20 scale-110" />
                <h2 className="relative text-4xl md:text-5xl font-black tracking-tight" style={{ fontFamily: "var(--font-raleway, system-ui)" }}>
                  BUENIMAR
                </h2>
              </div>
              <p className="text-xs uppercase tracking-widest font-medium opacity-70" style={{ letterSpacing: '0.15em' }}>
                Vamos que vamos
              </p>
              <p className="text-sm opacity-75 leading-relaxed max-w-xs mx-auto md:mx-0 pt-1">
                Más de 30 años distribuyendo calidad y confianza en Colonia y el resto del país
              </p>
            </div>

            {/* Columna 2: Contacto (3 cols) */}
            <div className="md:col-span-3 text-center md:text-left">
              <h3 className="text-lg font-bold mb-4 tracking-tight">Contacto</h3>
              <div className="space-y-3 text-sm">
                <a 
                  href="https://maps.app.goo.gl/yqpgdfnVyrvCvtzL9" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 opacity-80 md:hover:opacity-100 transition-all md:hover:translate-x-1 justify-center md:justify-start group py-1"
                >
                  <FaMapMarkerAlt className="text-[18px] mt-0.5 shrink-0 md:group-hover:scale-110 transition-transform" />
                  <span className="leading-snug">Pablo Zufriategui 374<br />Colonia del Sacramento</span>
                </a>
                <a 
                  href="tel:+59845224091" 
                  className="flex items-center gap-3 opacity-80 md:hover:opacity-100 transition-all md:hover:translate-x-1 justify-center md:justify-start group py-1"
                >
                  <FaPhone className="text-[18px] shrink-0 md:group-hover:scale-110 transition-transform" />
                  <span>+598 4522 4091</span>
                </a>
                <a 
                  href="https://wa.me/59897557366" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 opacity-80 md:hover:opacity-100 transition-all md:hover:translate-x-1 justify-center md:justify-start group py-1"
                >
                  <FaWhatsapp className="text-[18px] shrink-0 md:group-hover:scale-110 transition-transform" />
                  <span>+598 97 557 366</span>
                </a>
                <a 
                  href="mailto:pedidos@buenimar.com" 
                  className="flex items-center gap-3 opacity-80 md:hover:opacity-100 transition-all md:hover:translate-x-1 justify-center md:justify-start group py-1"
                >
                  <FaEnvelope className="text-[18px] shrink-0 md:group-hover:scale-110 transition-transform" />
                  <span>pedidos@buenimar.com</span>
                </a>
              </div>
            </div>

            {/* Columna 3: Enlaces (3 cols) */}
            <div className="md:col-span-3 text-center md:text-left">
              <h3 className="text-lg font-bold mb-4 tracking-tight">Enlaces</h3>
              <nav className="flex flex-col space-y-2.5 text-sm">
                <Link href="/empresa" className="opacity-80 md:hover:opacity-100 transition-all md:hover:translate-x-1 inline-block py-1">
                  → Nuestra Empresa
                </Link>
                <Link href="/marcas" className="opacity-80 md:hover:opacity-100 transition-all md:hover:translate-x-1 inline-block py-1">
                  → Marcas
                </Link>
                <Link href="/contacto" className="opacity-80 md:hover:opacity-100 transition-all md:hover:translate-x-1 inline-block py-1">
                  → Contacto
                </Link>
                <Link href="/politica-privacidad" className="opacity-80 md:hover:opacity-100 transition-all md:hover:translate-x-1 inline-block py-1">
                  → Política de Privacidad
                </Link>
              </nav>
            </div>

            {/* Columna 4: ISO con efecto glass (2 cols) - stack abajo en mobile */}
            {!hideCertification && (
              <div className="md:col-span-2 flex justify-center md:justify-end order-last md:order-none">
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4 shadow-2xl md:hover:bg-white/15 transition-all md:hover:scale-105 w-fit mx-auto md:mx-0 md:mr-4">
                  <CertificationBadge />
                </div>
              </div>
            )}
          </div>

          {/* Mapa a full width con separador mejorado */}
          <div className="relative -mx-4 md:mx-0">
            {/* Separador diagonal suave con sombra */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <div className="absolute -top-px left-0 right-0 h-12 bg-gradient-to-b from-black/30 via-black/10 to-transparent" />
            
            {/* Contenedor del mapa con altura fija */}
            <div className="mt-12 overflow-hidden shadow-2xl border-y border-white/10 md:rounded-2xl md:border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3286.721!2d-57.84!3d-34.463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDI3JzQ3LjIiUyA1N8KwNTAnMjQuMCJX!5e0!3m2!1ses!2s!4v1736698800000!5m2!1ses!2s&q=Buenimar+SA,+Pablo+Zufriategui+374,+Colonia+del+Sacramento,+Uruguay"
                width="100%"
                height="280"
                style={{ border: 0, height: '280px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Buenimar en Google Maps"
                className="grayscale-[0.15] md:hover:grayscale-0 transition-all duration-500 w-full md:h-[400px]"
              />
            </div>
          </div>

          {/* Copyright con separador */}
          <div className="relative mt-12 pt-8">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="text-center space-y-2">
              <p className="text-sm opacity-80 font-medium tracking-wide">
                Copyright © 2026 Buenimar SA. All rights reserved.
              </p>
              <p className="text-xs opacity-50">
                Desarrollado por{' '}
                <a 
                  href="https://www.acanto.com.uy" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="md:hover:opacity-100 transition-opacity underline decoration-dotted underline-offset-2"
                >
                  Alan Canto
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
