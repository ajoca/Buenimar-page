import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/siteContent";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata = {
  title: "Contacto",
  description: "Pablo Zufriategui 374, Colonia del Sacramento. Tel: +598 4522 4091 | WhatsApp: +598 97 557 366 | Email: pedidos@buenimar.com",
  keywords: "contacto buenimar, distribuidora colonia dirección, teléfono buenimar, pedidos buenimar",
  openGraph: {
    title: "Contacto",
    description: "Pablo Zufriategui 374, Colonia del Sacramento. Tel: +598 4522 4091 | WhatsApp: +598 97 557 366",
    url: "https://www.buenimarcolonia.com/contacto",
    siteName: "Buenimar Colonia",
    images: [
      {
        url: "/img/Logo.png",
        width: 1200,
        height: 630,
        alt: "Contacto Buenimar Colonia",
      },
    ],
    locale: "es_UY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto",
    description: "Pablo Zufriategui 374, Colonia del Sacramento. Tel: +598 4522 4091",
    images: ["/img/Logo.png"],
  },
};

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-pattern" style={{ background: "rgb(var(--bg))", color: "rgb(var(--text))" }}>
      <Navbar />
      <div className="relative z-20">
        <Breadcrumbs items={[{ label: "Contacto" }]} />
      </div>
      <main className="py-[var(--section-gap)] relative">

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
