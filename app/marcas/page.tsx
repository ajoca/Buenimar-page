import Navbar from "@/components/Navbar";
import CatalogsSection from "@/components/CatalogsSection";
import BrandsGrid from "@/components/BrandsGrid";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE } from "@/lib/siteContent";

export const metadata = {
  title: "Marcas",
  description: "Conocé las marcas que forman parte de Buenimar: alimentos, bebidas y productos de consumo de las principales compañías del mercado.",
  keywords: "marcas buenimar, catálogos productos uruguay, conaprole, la especialista, pagnifique, marcas distribuidora colonia",
  alternates: {
    canonical: "https://www.buenimarcolonia.com/marcas",
  },
  openGraph: {
    title: "Marcas",
    description: "Conocé las marcas que forman parte de Buenimar: alimentos, bebidas y productos de consumo de las principales compañías del mercado.",
    url: "https://www.buenimarcolonia.com/marcas",
    siteName: "Buenimar Colonia",
    images: [
      {
        url: "https://www.buenimarcolonia.com/img/marcas/001.png",
        width: 1200,
        height: 630,
        alt: "Marcas Buenimar Colonia",
      },
    ],
    locale: "es_UY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcas",
    description: "Conocé las marcas que forman parte de Buenimar: alimentos, bebidas y productos de consumo.",
    images: ["https://www.buenimarcolonia.com/img/marcas/001.png"],
  },
};

export default function MarcasPage() {
  return (
    <div className="min-h-screen bg-pattern" style={{ background: "rgb(var(--bg))", color: "rgb(var(--text))" }}>
      <Navbar />
      <Breadcrumbs items={[{ label: "Marcas" }]} />
      <main className="py-4 md:py-6">
        <div className="container-x">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center drop-shadow-lg leading-tight mb-4 md:mb-6"
            style={{ color: "rgb(var(--text))" }}
          >
            {SITE.brandsTitle}
          </h1>
        </div>

        {/* Catálogos */}
        <CatalogsSection catalogs={SITE.catalogs} />
        
        {/* Separador visual entre secciones */}
        <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
          <div className="relative">
            <div 
              className="absolute inset-0 flex items-center" 
              aria-hidden="true"
            >
              <div 
                className="w-full border-t"
                style={{ borderColor: "rgb(var(--line))" }}
              />
            </div>
            <div className="relative flex justify-center">
              <span 
                className="px-4 md:px-6 text-lg md:text-xl font-semibold"
                style={{ 
                  background: "rgb(var(--bg))",
                  color: "rgb(var(--text))"
                }}
              >
                Nuestras Marcas
              </span>
            </div>
          </div>
          <p 
            className="text-center mt-3 text-sm md:text-base"
            style={{ color: "rgb(var(--muted))" }}
          >
            Trabajamos con más de 100 marcas líderes del mercado
          </p>
        </div>

        {/* Grid de marcas */}
        <BrandsGrid brands={SITE.brands} />
      </main>
      <Footer />
    </div>
  );
}
