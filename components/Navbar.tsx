
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LuSunMedium, LuMoon } from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const saved = (typeof window !== "undefined" && (localStorage.getItem("theme") as "dark" | "light" | null)) || "dark";
    const initial = saved === "light" ? "light" : "dark";
    setTheme(initial);
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = initial === "light" ? "light" : "dark";
    }

    // Scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = next;
      localStorage.setItem("theme", next);
    }
  };

  const isActive = (path: string) => pathname === path;
  
  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-red-600/95 backdrop-blur-lg' 
          : 'bg-red-600 md:relative'
      }`} 
      style={{
        boxShadow: scrolled 
          ? '0 4px 20px rgba(0,0,0,0.15)' 
          : '0 1px 3px rgba(0,0,0,0.08)'
      }}
      role="banner"
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3 md:py-4">
        <Link href="/" className="block" aria-label="Buenimar Distribuciones - Ir a inicio">
          <img
            src="/img/Logo.png"
            alt="Logo Buenimar Distribuciones"
            className="h-7 md:h-9 transition-transform duration-200 hover:scale-105"
          />
        </Link>
        
        {/* Mobile: Solo hamburguesa y CTA */}
        <div className="md:hidden flex items-center gap-3">
          <a
            href="https://wa.me/59897557366"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-white text-red-600 px-3 py-1.5 text-sm font-semibold shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
          >
            <FaWhatsapp className="text-base" />
            <span className="text-xs">Chat</span>
          </a>
          <button 
            className="text-white text-2xl p-1" 
            onClick={()=>setOpen(!open)}
            aria-label={open ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-white font-medium text-sm" role="navigation" aria-label="Navegación principal">
          <Link
            href="/"
            className={`relative px-2 py-1 tracking-wide transition-all duration-200 hover:opacity-100 group ${
              isActive('/') ? 'opacity-100' : 'opacity-80'
            }`}
          >
            INICIO
            <span className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ${
              isActive('/') ? 'w-full' : 'w-0 group-hover:w-full'
            }`} />
          </Link>
          <Link
            href="/marcas"
            className={`relative px-2 py-1 tracking-wide transition-all duration-200 hover:opacity-100 group ${
              isActive('/marcas') ? 'opacity-100' : 'opacity-80'
            }`}
          >
            MARCAS
            <span className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ${
              isActive('/marcas') ? 'w-full' : 'w-0 group-hover:w-full'
            }`} />
          </Link>
          <Link
            href="/empresa"
            className={`relative px-2 py-1 tracking-wide transition-all duration-200 hover:opacity-100 group ${
              isActive('/empresa') ? 'opacity-100' : 'opacity-80'
            }`}
          >
            EMPRESA
            <span className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ${
              isActive('/empresa') ? 'w-full' : 'w-0 group-hover:w-full'
            }`} />
          </Link>
          <Link
            href="/cobertura"
            className={`relative px-2 py-1 tracking-wide transition-all duration-200 hover:opacity-100 group ${
              isActive('/cobertura') ? 'opacity-100' : 'opacity-80'
            }`}
          >
            COBERTURA
            <span className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ${
              isActive('/cobertura') ? 'w-full' : 'w-0 group-hover:w-full'
            }`} />
          </Link>
          <Link
            href="/contacto"
            className={`relative px-2 py-1 tracking-wide transition-all duration-200 hover:opacity-100 group ${
              isActive('/contacto') ? 'opacity-100' : 'opacity-80'
            }`}
          >
            CONTACTO
            <span className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ${
              isActive('/contacto') ? 'w-full' : 'w-0 group-hover:w-full'
            }`} />
          </Link>
          <Link
            href="/abrir-cuenta"
            className={`relative px-2 py-1 tracking-wide transition-all duration-200 hover:opacity-100 group font-bold ${
              isActive('/abrir-cuenta') ? 'opacity-100' : 'opacity-80'
            }`}
          >
            ABRIR CUENTA
            <span className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ${
              isActive('/abrir-cuenta') ? 'w-full' : 'w-0 group-hover:w-full'
            }`} />
          </Link>
          
          {/* Separador */}
          <div className="h-6 w-px bg-white/20" />
          
          {/* CTA Button con glass effect */}
          <a
            href="https://wa.me/59897557366"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white px-4 py-1.5 font-semibold shadow-lg transition-all duration-200 hover:bg-white/20 hover:border-white/50 hover:shadow-xl hover:scale-105 group"
          >
            <FaWhatsapp className="text-lg group-hover:rotate-12 transition-transform" />
            HABLEMOS
          </a>
          
          {/* Theme toggle pill */}
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm w-9 h-9 transition-all duration-200 hover:bg-white/20 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label="Cambiar tema"
            title={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            {theme === "dark" ? (
              <LuSunMedium className="text-lg" aria-hidden />
            ) : (
              <LuMoon className="text-lg" aria-hidden />
            )}
          </button>
        </nav>
      </div>
      
      {/* Mobile Menu Drawer */}
      {open && (
        <div 
          id="mobile-menu"
          className="md:hidden bg-red-700/98 backdrop-blur-lg text-white flex flex-col space-y-1 p-4 border-t border-white/10 shadow-2xl"
        >
          <Link
            href="/"
            onClick={()=>setOpen(false)}
            className={`rounded-lg px-4 py-3 transition-all duration-200 hover:bg-white/10 ${
              isActive('/') ? 'bg-white/15 font-semibold' : ''
            }`}
          >
            INICIO
          </Link>
          <Link
            href="/marcas"
            onClick={()=>setOpen(false)}
            className={`rounded-lg px-4 py-3 transition-all duration-200 hover:bg-white/10 ${
              isActive('/marcas') ? 'bg-white/15 font-semibold' : ''
            }`}
          >
            MARCAS
          </Link>
          <Link
            href="/empresa"
            onClick={()=>setOpen(false)}
            className={`rounded-lg px-4 py-3 transition-all duration-200 hover:bg-white/10 ${
              isActive('/empresa') ? 'bg-white/15 font-semibold' : ''
            }`}
          >
            EMPRESA
          </Link>
          <Link
            href="/contacto"
            onClick={()=>setOpen(false)}
            className={`rounded-lg px-4 py-3 transition-all duration-200 hover:bg-white/10 ${
              isActive('/contacto') ? 'bg-white/15 font-semibold' : ''
            }`}
          >
            CONTACTO
          </Link>
          <Link
            href="/abrir-cuenta"
            onClick={()=>setOpen(false)}
            className={`rounded-lg px-4 py-3 transition-all duration-200 hover:bg-white/10 font-bold ${
              isActive('/abrir-cuenta') ? 'bg-white/15 font-semibold' : ''
            }`}
          >
            ABRIR CUENTA
          </Link>
          <Link
            href="/cobertura"
            onClick={()=>setOpen(false)}
            className={`rounded-lg px-4 py-3 transition-all duration-200 hover:bg-white/10 ${
              isActive('/cobertura') ? 'bg-white/15 font-semibold' : ''
            }`}
          >
            COBERTURA
          </Link>
          
          <div className="h-px bg-white/10 my-2" />
          
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-3 font-semibold transition-all duration-200 hover:bg-white/20 hover:scale-[1.02]"
            aria-label="Cambiar tema"
          >
            {theme === "dark" ? (
              <>
                <LuSunMedium className="text-lg" aria-hidden />
                <span>Modo claro</span>
              </>
            ) : (
              <>
                <LuMoon className="text-lg" aria-hidden />
                <span>Modo oscuro</span>
              </>
            )}
          </button>
        </div>
      )}
    </header>
  );
}
