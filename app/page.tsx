import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import ProductsSection from "@/components/ProductsSection";
import PortalSection from "@/components/PortalSection";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/siteContent";

export const metadata = {
  title: "Buenimar Colonia | Distribuciones en Colonia del Sacramento",
  description: "Buenimar Colonia. Distribución y logística con confianza. Más de 100 marcas líderes. Atención ágil, stock completo y entregas rápidas para tu comercio.",
  keywords: "buenimar colonia, distribuidora colonia sacramento, productos alimenticios uruguay, conaprole colonia, distribución mayorista",
  openGraph: {
    title: "Buenimar Colonia | Distribuciones en Colonia del Sacramento",
    description: "Distribución y logística con confianza. Más de 100 marcas líderes. Atención ágil, stock completo y entregas rápidas para tu comercio.",
    url: "https://www.buenimarcolonia.com",
    siteName: "Buenimar Colonia",
    images: [
      {
        url: "https://www.buenimarcolonia.com/og-buenimar.png",
        width: 1200,
        height: 630,
        alt: "Buenimar Colonia - Distribución mayorista",
      },
    ],
    locale: "es_UY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buenimar Colonia | Distribuciones en Colonia del Sacramento",
    description: "Distribución y logística con confianza. Más de 100 marcas líderes. Atención ágil, stock completo y entregas rápidas.",
    images: ["https://www.buenimarcolonia.com/og-buenimar.png"],
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-pattern" style={{ background: "rgb(var(--bg))", color: "rgb(var(--text))" }}>
      {/* Skip to main content link for keyboard/screen reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-red-600 focus:text-white focus:rounded"
      >
        Saltar al contenido principal
      </a>
      
      <div id="inicio" />
      <Navbar />

      <main id="main-content" role="main" aria-label="Contenido principal">
        <HeroSlider slides={SITE.heroSlides} />

        <ProductsSection title={SITE.productsTitle} products={SITE.products} />

        <PortalSection
          title={SITE.portal.title}
          buttonText={SITE.portal.buttonText}
          href={SITE.portal.href}
        />
      </main>

      <Footer />
    </div>
  );
}
