import Navbar from "@/components/Navbar";
import CatalogsSection from "@/components/CatalogsSection";
import BrandsGrid from "@/components/BrandsGrid";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE } from "@/lib/siteContent";
import { FaWhatsapp } from "react-icons/fa";

export const metadata = {
  title: "Marcas",
  description: "Conocé las marcas que forman parte de Buenimar: alimentos, bebidas y productos de consumo de las principales compañías del mercado.",
  keywords: "marcas buenimar, catálogos productos uruguay, conaprole, la especialista, pagnifique, marcas distribuidora colonia",
  alternates: {
    canonical: "https://www.buenimarcolonia.com/marcas",
  },
  openGraph: {
    title: "Marcas | Buenimar Colonia",
    description: "Más de 100 marcas líderes en alimentos, bebidas y productos de consumo. Conaprole, La Especialista, Pagnifique y muchas más.",
    url: "https://www.buenimarcolonia.com/marcas",
    siteName: "Buenimar Colonia",
    images: [
      {
        url: "https://www.buenimarcolonia.com/og-buenimar.png",
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
    <div className="min-h-screen" style={{ background: "rgb(var(--bg))", color: "rgb(var(--text))" }}>
      <Navbar />
      <Breadcrumbs items={[{ label: "Marcas" }]} />

      {/* Hero */}
      <section className="py-16 md:py-24" style={{ background: "rgb(var(--bg))" }}>
        <div className="container-x">
          <div className="max-w-3xl mx-auto text-center">
            <p className="section-eyebrow mb-3">Distribución mayorista de alimentación</p>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 leading-tight"
              style={{ color: "rgb(var(--text))" }}
            >
              Marcas líderes para<br className="hidden sm:inline" /> abastecer tu comercio
            </h1>
            <p
              className="text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
              style={{ color: "rgb(var(--muted))" }}
            >
              Catálogos actualizados, variedad y respaldo comercial. Representamos más de 100 marcas del
              mercado uruguayo para que tengas todo en un solo proveedor.
            </p>

            {/* Stats bar */}
            <div
              className="inline-grid grid-cols-3 rounded-2xl overflow-hidden border w-full max-w-xs mx-auto sm:w-auto sm:max-w-none"
              style={{ borderColor: "rgb(var(--line))", background: "rgb(var(--panel))" }}
            >
              {[
                { value: "100+", label: "Marcas" },
                { value: "4", label: "Catálogos" },
                { value: "30+", label: "Años" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="px-6 py-4 text-center"
                  style={{ borderRight: i < 2 ? "1px solid rgb(var(--line))" : undefined }}
                >
                  <p className="text-2xl md:text-3xl font-black" style={{ color: "rgb(var(--accent))" }}>
                    {stat.value}
                  </p>
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-widest mt-0.5 font-medium" style={{ color: "rgb(var(--muted))" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main>
        {/* Catálogos */}
        <CatalogsSection catalogs={SITE.catalogs} />

        {/* Nuestras Marcas heading */}
        <section className="pt-14 pb-6" style={{ background: "rgb(var(--bg))" }}>
          <div className="container-x text-center">
            <p className="section-eyebrow mb-2">Proveedores seleccionados</p>
            <h2 className="section-title mb-3">Nuestras Marcas</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Trabajamos con más de 100 marcas líderes del mercado
            </p>
          </div>
        </section>

        {/* Grid de marcas */}
        <BrandsGrid brands={SITE.brands} />

        {/* CTA Final */}
        <section
          className="py-16 md:py-20"
          style={{ background: "rgb(var(--panel))", borderTop: "1px solid rgb(var(--line))" }}
        >
          <div className="container-x text-center">
            <p className="section-eyebrow mb-3">¿Buscás una marca en particular?</p>
            <h2
              className="text-2xl md:text-3xl font-bold mb-3"
              style={{ color: "rgb(var(--text))" }}
            >
              Hablemos directo
            </h2>
            <p className="section-subtitle max-w-lg mx-auto mb-8">
              Si buscás representación de una marca específica o necesitás información sobre disponibilidad, consultanos.
            </p>
            <a
              href="https://wa.me/59897557366"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white text-base transition-all hover:opacity-90 hover:scale-105 active:scale-95 shadow-lg"
              style={{ background: "#25D366" }}
            >
              <FaWhatsapp className="text-xl" />
              Consultar por WhatsApp
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
