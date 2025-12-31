import Navbar from "@/components/Navbar";
import CompanySection from "@/components/CompanySection";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/siteContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import CertificationBadge from "@/components/CertificationBadge";
import ParallaxSection from "@/components/ParallaxSection";

export const metadata = {
  title: "Nuestra Empresa - Historia y Valores | Buenimar Colonia",
  description: "Conocé la historia de Buenimar Distribuciones en Colonia del Sacramento. Más de años de experiencia brindando calidad, servicio, vocación, logística, rapidez y confianza a nuestros clientes.",
  keywords: "buenimar historia, empresa distribuidora colonia, cultura calidad, logística uruguay",
  openGraph: {
    title: "Nuestra Historia - Buenimar Distribuciones",
    description: "Empresa líder en distribución con años de trayectoria en Colonia del Sacramento. Conocé nuestra historia y valores.",
    url: "https://www.buenimar.com/empresa",
    siteName: "Buenimar Distribuciones",
    images: [
      {
        url: "/img/BUENIMAR-2.avif",
        width: 1200,
        height: 630,
        alt: "Buenimar Distribuciones - Nuestra Empresa",
      },
    ],
    locale: "es_UY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nuestra Empresa - Buenimar",
    description: "Historia y valores de Buenimar Distribuciones",
    images: ["/img/BUENIMAR-2.avif"],
  },
};

export default function EmpresaPage() {
  return (
    <div className="min-h-screen bg-pattern" style={{ background: "rgb(var(--bg))", color: "rgb(var(--text))" }}>
      <Navbar />
      <Breadcrumbs items={[{ label: "Empresa" }]} />
      <main className="pt-0 pb-0">

        <CompanySection
          title={SITE.companyTitle}
          slides={SITE.companySlides}
          paragraphs={SITE.companyParagraphs}
        />

        <ParallaxSection speed={0.3} className="relative pt-0 pb-12 md:pb-16" backgroundImage="/img/2070a6_8e37e4c151464366bcebb084f5bfc667~mv2.avif">
          {/* Gradient overlay for better readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60 z-[1]" />
          
          {/* Banda con título de sección */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 md:py-10">
            <div className="flex items-center justify-center gap-4">
              <span className="text-white/90 text-lg md:text-xl font-semibold tracking-wide">
                Conocé Buenimar
              </span>
              <div className="w-16 h-0.5 bg-red-600"></div>
              <span className="text-white/80 text-2xl">↓</span>
            </div>
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            
            {/* Nuestra Historia Card */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-5 md:p-8 shadow-2xl mb-6 animate-fade-in">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-10 bg-red-500 rounded-full" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">Nuestra Historia</h2>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-white/90 text-base md:text-lg leading-relaxed mb-5" style={{ lineHeight: '1.7' }}>
                  Desde <strong className="text-white">1996</strong>, Buenimar ha sido pionera en la distribución de productos de calidad en Colonia del Sacramento, comenzando con la fabricación de "HIELOS COOL" y expandiéndose estratégicamente al incorporar la innovadora línea de panes y bizcochos ultracongelados <strong className="text-white">"PAGNIFIQUE"</strong>.
                </p>
                
                {/* Timeline con hitos clave */}
                <div className="space-y-3 my-6">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">1996</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-base mb-0.5">Fundación</h3>
                      <p className="text-white/80 text-sm">Inicio de operaciones con fabricación y distribución de productos congelados</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">2012</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-base mb-0.5">Proceso de Certificación</h3>
                      <p className="text-white/80 text-sm">Inicio del camino hacia la certificación ISO 9001</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">2013</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-base mb-0.5">ISO 9001:2008</h3>
                      <p className="text-white/80 text-sm">Certificación lograda en octubre, consolidando nuestro compromiso con la calidad</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">2025</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-base mb-0.5">30 Años de Servicio</h3>
                      <p className="text-white/80 text-sm">Líder en distribución en el Departamento de Colonia</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-red-600/20 border-l-4 border-red-500 rounded-r-xl">
                  <p className="text-white text-lg md:text-xl font-bold italic">
                    "30 años entregando servicio"
                  </p>
                </div>
              </div>
            </div>

            {/* Grid: Certificación ISO + Cultura */}
            <div className="grid md:grid-cols-3 gap-5">
              
              {/* Certificación ISO - Sidebar */}
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-5 shadow-2xl animate-fade-in md:col-span-1">
                <h3 className="text-lg md:text-xl font-bold text-white mb-3 text-center">Certificación</h3>
                <div className="flex justify-center mb-3">
                  <CertificationBadge />
                </div>
                <p className="text-white/80 text-sm text-center leading-relaxed">
                  Sistema de Gestión de Calidad certificado bajo norma ISO 9001
                </p>
                <div className="mt-3 text-center">
                  <span className="inline-block px-3 py-1.5 bg-green-500/20 border border-green-500 rounded-full text-green-300 text-xs font-semibold">
                    ✓ Certificado Vigente
                  </span>
                </div>
              </div>

              {/* Cultura de Calidad - Main content */}
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-5 md:p-6 shadow-2xl animate-fade-in md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-10 bg-red-500 rounded-full" />
                  <h2 className="text-xl md:text-2xl font-bold text-white">Cultura de Calidad</h2>
                </div>
                
                <div className="space-y-4">
                  <p className="text-white/90 text-sm md:text-base leading-relaxed" style={{ lineHeight: '1.7' }}>
                    Empresa líder en venta y distribución de productos de calidad, posicionada como representante exclusivo de las mejores marcas del mercado uruguayo.
                  </p>
                  
                  {/* Valores clave */}
                  <div className="grid sm:grid-cols-2 gap-2">
                    {[
                      "Confianza",
                      "Enfoque en el cliente",
                      "Trabajo en equipo",
                      "Compromiso y entrega",
                      "Mejora continua",
                      "Desarrollo profesional"
                    ].map((valor, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-white/90">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0" />
                        <span className="text-sm">{valor}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-white/80 text-sm leading-relaxed pt-3 border-t border-white/20">
                    Nuestro éxito se basa en la unidad de esfuerzos, personal competente y valiosos proveedores que comparten nuestros valores, asegurando prosperidad a todas las partes interesadas.
                  </p>
                </div>
              </div>
              
            </div>

          </div>
        </ParallaxSection>
      </main>
      <Footer hideCertification={true} />
    </div>
  );
}
