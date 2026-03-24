import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import ProductsSection from "@/components/ProductsSection";
import PortalSection from "@/components/PortalSection";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/siteContent";
import NewProductsCarousel from "@/components/NewProductsCarousel";

export const metadata = {
  title: "BUENIMAR COLONIA",
  description: "Buenimar Colonia. Distribución y logística con confianza. Más de 100 marcas líderes. Atención ágil, stock completo y entregas rápidas para tu comercio.",
  keywords: "buenimar colonia, distribuidora colonia sacramento, productos alimenticios uruguay, conaprole colonia, distribución mayorista",
  alternates: {
    canonical: "https://www.buenimarcolonia.com/",
  },
  openGraph: {
    title: "BUENIMAR COLONIA",
    description: "Distribución y logística con confianza. Más de 100 marcas líderes. Atención ágil, stock completo y entregas rápidas para tu comercio.",
    url: "https://www.buenimarcolonia.com",
    siteName: "BUENIMAR COLONIA",
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
    title: "BUENIMAR COLONIA",
    description: "Distribución y logística con confianza. Más de 100 marcas líderes. Atención ágil, stock completo y entregas rápidas.",
    images: ["https://www.buenimarcolonia.com/og-buenimar.png"],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Inicio",
      item: "https://www.buenimarcolonia.com/",
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Dónde está BUENIMAR COLONIA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Estamos en Pablo Zufriategui 374, Colonia del Sacramento, Uruguay.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cómo puedo hacer pedidos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Podés contactarnos por WhatsApp al +598 97 557 366, por teléfono al +598 4522 4091 o por email a pedidos@buenimar.com.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué tipo de productos distribuyen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Distribuimos productos alimenticios y de consumo masivo de más de 100 marcas, con logística y atención para comercios en Colonia y alrededores.",
      },
    },
  ],
};

const productsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Productos destacados de BUENIMAR COLONIA",
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  numberOfItems: SITE.products.length,
  itemListElement: SITE.products.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Product",
      "@id": `https://www.buenimarcolonia.com/#product-${product.code}`,
      name: product.name,
      description: `${product.name} ${product.subtitle}`,
      sku: product.code,
      image: `https://www.buenimarcolonia.com${product.image}`,
      brand: {
        "@type": "Brand",
        name: "BUENIMAR COLONIA",
      },
    },
  })),
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-pattern" style={{ background: "rgb(var(--bg))", color: "rgb(var(--text))" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsJsonLd) }}
      />

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

        {/* Carrusel de nuevos productos */}
        <NewProductsCarousel />

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
