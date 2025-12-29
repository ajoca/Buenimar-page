import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-red-600 to-red-700 text-white py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Columna 1: Marca y eslogan */}
          <div className="text-center md:text-left space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "var(--font-raleway, system-ui)" }}>BUENIMAR</h2>
            <p className="text-sm md:text-base font-semibold italic opacity-90">"Vamos que vamos"</p>
          </div>

          {/* Columna 2: Contacto */}
          <div className="text-center md:text-left space-y-2">
            <h3 className="text-lg font-bold mb-3">Contacto</h3>
            <p className="text-sm">📍 Pablo Zufriategui 374<br />Colonia del Sacramento, Uruguay</p>
            <p className="text-sm">📞 +598 4522 4091</p>
            <p className="text-sm">📱 +598 97 557 366</p>
            <p className="text-sm">📧 pedidos@buenimar.com</p>
          </div>

          {/* Columna 3: Links útiles */}
          <div className="text-center md:text-left space-y-2">
            <h3 className="text-lg font-bold mb-3">Enlaces</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="/empresa" className="hover:underline hover:text-orange-300 transition-colors">Nuestra Empresa</Link>
              <Link href="/marcas" className="hover:underline hover:text-orange-300 transition-colors">Marcas</Link>
              <Link href="/contacto" className="hover:underline hover:text-orange-300 transition-colors">Contacto</Link>
              <Link href="/politica-privacidad" className="hover:underline hover:text-orange-300 transition-colors">Política de Privacidad</Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p className="text-xs md:text-sm opacity-80">© 2025 Buenimar Distribuciones - Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  );
}
