import Navbar from "@/components/Navbar";
import OpenAccountSection from "@/components/OpenAccountSection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Abrir Cuenta o Registrar Proveedor | Buenimar Colonia",
  description: "¿Quieres ser cliente o proveedor de Buenimar Colonia? Regístrate y comienza a trabajar con nosotros.",
  keywords: "abrir cuenta, nuevo cliente, proveedor, buenimar colonia, distribuidora",
  openGraph: {
    title: "Abrir Cuenta o Registrar Proveedor | Buenimar Colonia",
    description: "¿Quieres ser cliente o proveedor de Buenimar Colonia? Regístrate y comienza a trabajar con nosotros.",
    url: "https://www.buenimarcolonia.com/abrir-cuenta",
    siteName: "Buenimar Colonia",
  },
};

export default function AbrirCuentaPage() {
  return (
    <div className="min-h-screen bg-pattern" style={{ background: "rgb(var(--bg))", color: "rgb(var(--text))" }}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-red-600 focus:text-white focus:rounded"
      >
        Saltar al contenido principal
      </a>

      <Navbar />

      <main id="main-content" role="main" aria-label="Abrir cuenta o registrarse como proveedor">
        <OpenAccountSection
          title="Únete a Buenimar"
          subtitle="Eres cliente o proveedor. Elige tu rol y únete a nuestra red de distribución."
        />
      </main>

      <Footer />
    </div>
  );
}
