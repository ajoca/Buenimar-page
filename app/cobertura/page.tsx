import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CoverageSection from "@/components/CoverageSection";

export const metadata: Metadata = {
  title: "Zona de Cobertura",
  description: "Cobertura de entregas en Colonia del Sacramento y todas las localidades del departamento. Más de 16 localidades atendidas con logística rápida y confiable.",
  keywords: "cobertura buenimar, entregas colonia, distribución colonia uruguay, logística colonia, zona de cobertura",
  alternates: {
    canonical: "https://www.buenimarcolonia.com/cobertura"
  },
  openGraph: {
    title: "Zona de Cobertura | Buenimar Colonia",
    description: "Entregas en Colonia del Sacramento y más de 16 localidades del departamento. Logística rápida y confiable.",
    url: "https://www.buenimarcolonia.com/cobertura",
    siteName: "Buenimar Colonia",
    images: [
      {
        url: "https://www.buenimarcolonia.com/og-buenimar.png",
        width: 1200,
        height: 630,
        alt: "Zona de Cobertura Buenimar Colonia",
      },
    ],
    locale: "es_UY",
    type: "website",
  },
};

export default function CoberturaPage() {
  return (
    <div className="min-h-screen bg-pattern" style={{ background: "rgb(var(--bg))", color: "rgb(var(--text))" }}>
      <Navbar />
      <Breadcrumbs items={[{ label: "Zona de Cobertura" }]} />
      <main className="py-4 md:py-6 animate-fade-in pb-24 md:pb-6">
        <div className="container-x">
          {/* Encabezado */}
          <div className="text-center mb-6 md:mb-12 animate-fade-in-scale">
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-center drop-shadow-lg leading-tight mb-3 md:mb-4"
              style={{ color: "rgb(var(--text))" }}
            >
              Zona de Cobertura
            </h1>
            <p className="text-base md:text-xl opacity-80 max-w-3xl mx-auto px-4">
              Servicio de distribución en todo el departamento de Colonia
            </p>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-3">
              Si tu localidad no aparece, consultanos igual
            </p>
            <a 
              href="/contacto"
              className="inline-flex items-center gap-2 mt-3 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              Contactar
            </a>
          </div>

          {/* Mapa interactivo */}
          <CoverageSection />
        </div>
      </main>
      <Footer hideCertification={false} />
    </div>
  );
}
