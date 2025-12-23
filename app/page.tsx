import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import ProductsSection from "@/components/ProductsSection";
import PortalSection from "@/components/PortalSection";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/siteContent";

export const metadata = {
  title: "Buenimar Distribuciones - Calidad, Servicio y Confianza en Colonia",
  description: "Distribuidora líder en Colonia del Sacramento. Ofrecemos productos de primeras marcas con calidad, servicio, vocación, logística, rapidez y confianza. Catálogos Conaprole, La Especialista, Pagnifique y más.",
  keywords: "distribuidora colonia, buenimar, productos alimenticios uruguay, conaprole colonia, distribución mayorista",
  openGraph: {
    title: "Buenimar Distribuciones - Tu distribuidor de confianza",
    description: "Distribuidora líder en Colonia del Sacramento con más de 100 marcas reconocidas. Calidad y servicio garantizado.",
    url: "https://www.buenimar.com",
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
    <div className="min-h-screen" style={{ background: "rgb(var(--bg))", color: "rgb(var(--text))" }}>
      <div id="inicio" />
      <Navbar />

      <HeroSlider slides={SITE.heroSlides} />

      <ProductsSection title={SITE.productsTitle} products={SITE.products} />

      <PortalSection
        title={SITE.portal.title}
        buttonText={SITE.portal.buttonText}
        href={SITE.portal.href}
      />

      <Footer />
    </div>
  );
}
