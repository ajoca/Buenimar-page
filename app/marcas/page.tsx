import Navbar from "@/components/Navbar";
import CatalogsSection from "@/components/CatalogsSection";
import BrandsGrid from "@/components/BrandsGrid";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE } from "@/lib/siteContent";

export const metadata = {
  title: "Marcas y Catálogos - Buenimar Distribuciones Colonia",
  description: "Trabajamos con más de 100 marcas líderes del mercado uruguayo. Descarga nuestros catálogos de Conaprole, La Especialista, Pagnifique, Almena y muchas más. Distribución en Colonia del Sacramento.",
  keywords: "marcas buenimar, catálogos productos uruguay, conaprole, la especialista, pagnifique, marcas distribuidora colonia",
  openGraph: {
    title: "Más de 100 Marcas Líderes - Buenimar Colonia",
    description: "Catálogos completos de las mejores marcas del mercado uruguayo. Descarga y consulta nuestros productos.",
    url: "https://www.buenimar.com/marcas",
    siteName: "Buenimar Distribuciones",
    images: [
      {
        url: "/img/marcas/001.png",
        width: 1200,
        height: 630,
        alt: "Marcas Buenimar Distribuciones",
      },
    ],
    locale: "es_UY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcas y Catálogos - Buenimar",
    description: "Más de 100 marcas líderes disponibles",
    images: ["/img/marcas/001.png"],
  },
};

export default function MarcasPage() {
  return (
    <div className="min-h-screen" style={{ background: "rgb(var(--bg))", color: "rgb(var(--text))" }}>
      <Navbar />
      <Breadcrumbs items={[{ label: "Marcas" }]} />
      <main className="py-6 md:py-[var(--section-gap)]">
        <div className="container-x">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center drop-shadow-lg leading-tight mb-6 md:mb-8"
            style={{ color: "rgb(var(--text))" }}
          >
            {SITE.brandsTitle}
          </h1>
        </div>

        <CatalogsSection catalogs={SITE.catalogs} />
        <BrandsGrid brands={SITE.brands} />
      </main>
      <Footer />
    </div>
  );
}
