
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { LuSunMedium, LuMoon } from "react-icons/lu";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && (localStorage.getItem("theme") as "dark" | "light" | null)) || "dark";
    const initial = saved === "light" ? "light" : "dark";
    setTheme(initial);
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = initial === "light" ? "light" : "dark";
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = next;
      localStorage.setItem("theme", next);
    }
  };
  return (
    <header className="bg-red-600 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4 md:p-6">
        <Link href="/" className="block">
          <img
            src="/img/Logo.png"
            alt="Logo"
            className="h-8 md:h-10 transition-transform duration-200 hover:scale-105"
          />
        </Link>
        <button className="md:hidden text-white text-2xl" onClick={()=>setOpen(!open)}>☰</button>
        <nav className="hidden md:flex space-x-8 text-white font-medium">
          <Link
            href="/"
            className="inline-block px-2 py-1 rounded-md border-b-2 border-transparent transition-all duration-200 hover:bg-white/10 hover:scale-105 hover:-rotate-1 hover:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            INICIO
          </Link>
          <Link
            href="/marcas"
            className="inline-block px-2 py-1 rounded-md border-b-2 border-transparent transition-all duration-200 hover:bg-white/10 hover:scale-105 hover:-rotate-1 hover:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            MARCAS
          </Link>
          <Link
            href="/empresa"
            className="inline-block px-2 py-1 rounded-md border-b-2 border-transparent transition-all duration-200 hover:bg-white/10 hover:scale-105 hover:-rotate-1 hover:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            EMPRESA
          </Link>
          <Link
            href="/contacto"
            className="inline-block px-2 py-1 rounded-md border-b-2 border-transparent transition-all duration-200 hover:bg-white/10 hover:scale-105 hover:-rotate-1 hover:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            CONTACTO
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 rounded-full bg-white text-red-600 px-4 py-2 font-semibold shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            HABLEMOS
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-3 py-2 text-sm font-semibold transition-all duration-200 hover:bg-white/10 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label="Cambiar tema"
          >
            {theme === "dark" ? (
              <>
                <LuSunMedium className="text-lg" aria-hidden />
                <span className="sr-only">Cambiar a modo claro</span>
              </>
            ) : (
              <>
                <LuMoon className="text-lg" aria-hidden />
                <span className="sr-only">Cambiar a modo oscuro</span>
              </>
            )}
          </button>
        </nav>
      </div>
      {open && (
        <div className="md:hidden bg-red-700 text-white flex flex-col space-y-4 p-4">
          <Link
            href="/"
            onClick={()=>setOpen(false)}
            className="rounded-md px-2 py-1 transition-transform duration-200 hover:scale-105 hover:-rotate-1 hover:bg-white/10"
          >
            INICIO
          </Link>
          <Link
            href="/marcas"
            onClick={()=>setOpen(false)}
            className="rounded-md px-2 py-1 transition-transform duration-200 hover:scale-105 hover:-rotate-1 hover:bg-white/10"
          >
            MARCAS
          </Link>
          <Link
            href="/empresa"
            onClick={()=>setOpen(false)}
            className="rounded-md px-2 py-1 transition-transform duration-200 hover:scale-105 hover:-rotate-1 hover:bg-white/10"
          >
            EMPRESA
          </Link>
          <Link
            href="/contacto"
            onClick={()=>setOpen(false)}
            className="rounded-md px-2 py-1 transition-transform duration-200 hover:scale-105 hover:-rotate-1 hover:bg-white/10"
          >
            CONTACTO
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-4 py-2 text-sm font-semibold transition-all duration-200 hover:bg-white/10 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/40"
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
