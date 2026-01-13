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
          </div>

          {/* Mapa interactivo */}
          <CoverageSection />
        </div>
      </main>
      <Footer hideCertification={false} />
    </div>
  );
}
