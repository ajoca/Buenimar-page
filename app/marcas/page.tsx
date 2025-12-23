import Navbar from "@/components/Navbar";
import CatalogsSection from "@/components/CatalogsSection";
import BrandsGrid from "@/components/BrandsGrid";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/siteContent";

export const metadata = {
  title: "Marcas - Buenimar Colonia",
  description: "Marcas con las que trabajamos - Catálogos y productos",
};

export default function MarcasPage() {
  return (
    <div className="min-h-screen" style={{ background: "rgb(var(--bg))", color: "rgb(var(--text))" }}>
      <Navbar />
      <main className="py-[var(--section-gap)]">
        <div className="container-x">
          <h1
            className="text-5xl font-bold text-center drop-shadow-lg leading-tight"
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
