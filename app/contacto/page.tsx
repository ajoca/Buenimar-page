import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/siteContent";

export const metadata = {
  title: "Contacto - Buenimar Colonia",
  description: "Contáctanos - Pablo Zufriategui 374, Colonia del Sacramento",
};

export default function ContactoPage() {
  return (
    <div className="min-h-screen" style={{ background: "rgb(var(--bg))", color: "rgb(var(--text))" }}>
      <Navbar />
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
