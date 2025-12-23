import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/siteContent";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata = {
  title: "Contacto - Buenimar Distribuciones | Colonia del Sacramento",
  description: "Contactá con Buenimar Distribuciones en Colonia del Sacramento. Dirección: Pablo Zufriategui 374. Tel: +598 4522 4091. WhatsApp: +598 97 557 366. Email: pedidos@buenimar.com",
  keywords: "contacto buenimar, distribuidora colonia dirección, teléfono buenimar, pedidos buenimar",
  openGraph: {
    title: "Contacto - Buenimar Distribuciones Colonia",
    description: "Encontranos en Pablo Zufriategui 374, Colonia del Sacramento. Teléfono: +598 4522 4091 | WhatsApp: +598 97 557 366",
    url: "https://www.buenimar.com/contacto",
    siteName: "Buenimar Distribuciones",
    images: [
      {
        url: "/img/Logo.png",
        width: 1200,
        height: 630,
        alt: "Contacto Buenimar Distribuciones",
      },
    ],
    locale: "es_UY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto - Buenimar",
    description: "Pablo Zufriategui 374, Colonia del Sacramento",
    images: ["/img/Logo.png"],
  },
};

export default function ContactoPage() {
  return (
    <div className="min-h-screen" style={{ background: "rgb(var(--bg))", color: "rgb(var(--text))" }}>
      <Navbar />
      <Breadcrumbs items={[{ label: "Contacto" }]} />
      <main className="py-[var(--section-gap)]">

        <ContactSection
          title={SITE.contactTitle}
          lines={SITE.contactLines}
          socials={SITE.socials}
        />
      </main>
      <Footer />
    </div>
  );
}
