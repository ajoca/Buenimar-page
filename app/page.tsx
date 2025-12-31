import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import ProductsSection from "@/components/ProductsSection";
import PortalSection from "@/components/PortalSection";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/siteContent";

export const metadata = {
  title: "Buenimar Colonia",
  description: "Buenimar Colonia - Calidad, Servicio y Confianza en Colonia del Sacramento. Distribuidora líder con más de 100 marcas. Productos de primeras marcas: Conaprole, La Especialista, Pagnifique y más.",
  keywords: "buenimar colonia, distribuidora colonia sacramento, productos alimenticios uruguay, conaprole colonia, distribución mayorista",
  openGraph: {
    title: "Buenimar Distribuciones",
    description: "Distribuidora líder en Colonia del Sacramento con más de 100 marcas reconocidas. Calidad y servicio garantizado.",
    url: "https://www.buenimarcolonia.com",
    siteName: "Buenimar Distribuciones",
    images: [
      {
        url: "/img/Buenimar.png",
        width: 1200,
        height: 630,
        alt: "Buenimar Distribuciones - Colonia del Sacramento",
      },
    ],
    locale: "es_UY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buenimar Distribuciones",
    description: "Distribuidora líder en Colonia del Sacramento",
    images: ["/img/Buenimar.png"],
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
