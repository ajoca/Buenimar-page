import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CoverageSection from "@/components/CoverageSection";

export const metadata: Metadata = {
  title: "Zona de Cobertura",
  description: "Cobertura de Buenimar en el departamento de Colonia, Uruguay. Entregas en todas las localidades principales.",
  alternates: {
    canonical: "/cobertura"
  }
};

export default function CoberturaPage() {
  return (
    <div className="min-h-screen bg-pattern" style={{ background: "rgb(var(--bg))", color: "rgb(var(--text))" }}>
      <Navbar />
      <Breadcrumbs items={[{ label: "Zona de Cobertura" }]} />
      <main className="py-4 md:py-6 animate-fade-in">
        <div className="container-x">
          {/* Encabezado */}
          <div className="text-center mb-8 md:mb-12 animate-fade-in-scale">
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-center drop-shadow-lg leading-tight mb-4"
              style={{ color: "rgb(var(--text))" }}
            >
              Zona de Cobertura
            </h1>
            <p className="text-lg md:text-xl opacity-80 max-w-3xl mx-auto">
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
