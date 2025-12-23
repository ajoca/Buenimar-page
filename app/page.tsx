import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import ProductsSection from "@/components/ProductsSection";
import PortalSection from "@/components/PortalSection";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/siteContent";

export const metadata = {
  title: "Inicio - Buenimar Colonia",
  description: "Distribuidora Buenimar - Productos líderes en Colonia del Sacramento",
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
