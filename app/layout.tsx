import "./globals.css";
import type { Metadata } from "next";
import { Montserrat, Raleway } from "next/font/google";
import { FaWhatsapp } from "react-icons/fa";
import ScrollToTop from "@/components/ScrollToTop";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.buenimarcolonia.com"),
  title: {
    default: "BUENIMAR COLONIA",
    template: "%s | BUENIMAR COLONIA",
  },
  description:
    "Distribución y logística con confianza. Más de 100 marcas líderes. Atención ágil, stock completo y entregas rápidas para tu comercio en Colonia del Sacramento.",
  keywords: "distribuidora colonia, buenimar, productos alimenticios uruguay, distribución mayorista, logística colonia, catálogos productos",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_UY",
    url: "https://www.buenimarcolonia.com",
    siteName: "BUENIMAR COLONIA",
    title: "Buenimar Colonia | Distribución mayorista en Colonia del Sacramento",
    description:
      "Distribuidora mayorista líder en Colonia del Sacramento. Más de 100 marcas, logística rápida y atención personalizada. 30 años de confianza.",
    images: [
      { 
        url: "https://www.buenimarcolonia.com/og-buenimar.png", 
        width: 1200, 
        height: 630, 
        alt: "Buenimar Colonia - Distribución mayorista" 
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buenimar Colonia | Distribución mayorista",
    description: "Más de 100 marcas líderes, catálogos y pedidos por WhatsApp.",
    images: ["https://www.buenimarcolonia.com/og-buenimar.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "BUENIMAR COLONIA",
  alternateName: ["Buenimar Colonia", "Buenimar Distribuciones", "Buenimar Colonia del Sacramento"],
  url: "https://www.buenimarcolonia.com/"
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.buenimarcolonia.com/#organization",
  name: "BUENIMAR COLONIA",
  alternateName: "Buenimar Distribuciones",
  description: "Distribuidora líder en Colonia del Sacramento. Ofrecemos productos de primeras marcas con calidad, servicio, vocación, logística, rapidez y confianza.",
  url: "https://www.buenimarcolonia.com",
  logo: "https://www.buenimarcolonia.com/img/Buenimar.png",
  image: "https://www.buenimarcolonia.com/img/BUENIMAR-2.avif",
  telephone: "+59845224091",
  email: "pedidos@buenimar.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Pablo Zufriategui 374",
    addressLocality: "Colonia del Sacramento",
    addressRegion: "Colonia",
    postalCode: "70000",
    addressCountry: "UY",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "-34.4631",
    longitude: "-57.8400"
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "13:00"
    }
  ],
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: "-34.4631",
      longitude: "-57.8400"
    },
    geoRadius: "300000"
  },
  slogan: "Calidad, Servicio y Confianza",
  foundingDate: "1996",
  knowsAbout: [
    "Distribución mayorista",
    "Productos alimenticios",
    "Logística",
    "Servicio al cliente"
  ],
  sameAs: [
    "https://wa.me/59897557366"
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+59897557366",
    contactType: "customer service",
    availableLanguage: "Spanish",
    areaServed: "UY"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <head>
        <meta property="og:site_name" content="BUENIMAR COLONIA" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${montserrat.variable} ${raleway.variable} ${montserrat.className} min-h-screen antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}

        <ScrollToTop />

        <div className="fixed bottom-4 right-4 z-50">
          <a
            href="https://wa.me/59897557366"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-xl hover:bg-[#128C7E] transition-all duration-300 flex items-center justify-center hover:scale-110 hover:-translate-y-1 hover:shadow-2xl active:scale-105 active:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            aria-label="Contactar por WhatsApp al +598 97 557 366"
          >
            <FaWhatsapp className="text-2xl md:text-3xl" aria-hidden="true" />
            <span className="sr-only">Abrir chat de WhatsApp</span>
          </a>
        </div>
      </body>
    </html>
  );
}
