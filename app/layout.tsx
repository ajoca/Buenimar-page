import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { FaWhatsapp } from "react-icons/fa";
import ScrollToTop from "@/components/ScrollToTop";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Buenimar Colonia",
  description: "Plantilla",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${montserrat.className} min-h-screen antialiased`}>
        {children}

        <ScrollToTop />

        <div className="fixed bottom-6 right-6 z-50">
          <a
            href="https://wa.me/59897557366"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:bg-[#128C7E] transition-all duration-300 flex items-center justify-center hover:scale-110 hover:-translate-y-1 hover:shadow-2xl active:scale-105 active:-translate-y-0.5"
            aria-label="Abrir WhatsApp"
          >
            <FaWhatsapp className="text-3xl" />
          </a>
        </div>
      </body>
    </html>
  );
}
