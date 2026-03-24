import Navbar from "@/components/Navbar";
import CompanySection from "@/components/CompanySection";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/siteContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import CertificationBadge from "@/components/CertificationBadge";
import ParallaxSection from "@/components/ParallaxSection";
import { FaRocket, FaClipboardList, FaAward, FaStar, FaHandshake, FaUsers, FaUserFriends, FaClipboardCheck, FaSyncAlt, FaChartLine } from "react-icons/fa";

export const metadata = {
  title: "Empresa",
  description: "Distribuidora líder en Colonia del Sacramento. Más de 30 años brindando calidad, servicio, vocación, logística, rapidez y confianza.",
  keywords: "buenimar historia, empresa distribuidora colonia, cultura calidad, logística uruguay",
  alternates: {
    canonical: "https://www.buenimarcolonia.com/empresa",
  },
  openGraph: {
    title: "Nuestra Empresa | Buenimar Colonia",
    description: "Más de 30 años siendo la distribuidora líder en Colonia del Sacramento. Calidad, servicio, vocación, logística y confianza.",
    url: "https://www.buenimarcolonia.com/empresa",
    siteName: "Buenimar Colonia",
    images: [
      {
        url: "https://www.buenimarcolonia.com/og-buenimar.png",
        width: 1200,
        height: 630,
        alt: "Buenimar Colonia - Empresa",
      },
    ],
    locale: "es_UY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Empresa",
    description: "Distribuidora líder en Colonia del Sacramento. Más de 30 años brindando calidad, servicio, vocación, logística, rapidez y confianza.",
    images: ["https://www.buenimarcolonia.com/img/BUENIMAR-2.avif"],
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
                <div className="relative my-8">
                  {/* Vertical connecting line */}
                  <div className="absolute top-5 bottom-5 w-0.5 bg-red-500/30" style={{ left: "19px" }} />

                  <div className="space-y-6">
                    {([
                      { year: "1996", title: "Fundación", desc: "Inicio de operaciones con fabricación y distribución de productos congelados", Icon: FaRocket },
                      { year: "2012", title: "Proceso de Certificación", desc: "Inicio del camino hacia ISO 9001, con documentación y auditorías internas de procesos", Icon: FaClipboardList },
                      { year: "2013", title: "ISO 9001:2008", desc: "Certificación lograda en octubre, consolidando nuestro compromiso con la calidad", Icon: FaAward },
                      { year: "2026", title: "30 Años de Servicio", desc: "Tres décadas como líder en distribución en el Departamento de Colonia", Icon: FaStar },
                    ] as const).map(({ year, title, desc, Icon }) => (
                      <div key={year} className="flex items-start gap-4 relative">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600 border-2 border-red-400 flex items-center justify-center z-10 relative shadow-lg">
                          <Icon className="text-white text-sm" />
                        </div>
                        <div className="flex-1 bg-white/5 rounded-xl p-3 border border-white/10">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-red-400 font-mono font-bold text-xs tracking-wider">{year}</span>
                            <h3 className="text-white font-bold text-sm md:text-base">{title}</h3>
                          </div>
                          <p className="text-white/70 text-xs md:text-sm leading-relaxed">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 p-4 bg-red-600/20 border-l-4 border-red-500 rounded-r-xl">
                  <p className="text-white text-lg md:text-xl font-bold italic">
                    "30 años entregando servicio"
                  </p>
                </div>
              </div>
            </div>

            {/* Certificación ISO — Featured Full-Width */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl mb-6 animate-fade-in">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                {/* Left: Badge visual */}
                <div className="flex flex-col items-center gap-3 text-center md:w-44 shrink-0">
                  <div className="w-20 h-20 rounded-full bg-red-600/20 border-2 border-red-500 flex items-center justify-center shadow-xl">
                    <FaAward className="text-red-400 text-4xl" />
                  </div>
                  <div>
                    <div className="text-white font-black text-2xl tracking-tight">ISO 9001</div>
                    <div className="text-white/60 text-xs mt-0.5">Sistema de Gestión de Calidad</div>
                  </div>
                  <CertificationBadge />
                  <span className="inline-block px-3 py-1.5 bg-green-500/20 border border-green-500 rounded-full text-green-300 text-xs font-semibold">
                    ✓ Certificado Vigente
                  </span>
                </div>

                {/* Right: Description + benefit cards */}
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">¿Qué significa para tu negocio?</h3>
                  <p className="text-white/75 text-sm md:text-base leading-relaxed mb-5">
                    La certificación ISO 9001 garantiza que nuestros procesos están auditados, estandarizados y orientados a la mejora continua. No es un trámite — es un compromiso real con la calidad de cada entrega.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {([
                      { Icon: FaClipboardCheck, title: "Procesos auditados", desc: "Cada operación está documentada y verificada externamente" },
                      { Icon: FaSyncAlt, title: "Mejora continua", desc: "Revisamos y optimizamos constantemente nuestro servicio" },
                      { Icon: FaHandshake, title: "Calidad garantizada", desc: "Cada entrega respalda un sistema de gestión certificado" },
                    ] as const).map(({ Icon, title, desc }) => (
                      <div key={title} className="bg-white/10 rounded-xl p-3 border border-white/10">
                        <Icon className="text-red-400 text-lg mb-1.5" />
                        <p className="text-white text-sm font-semibold">{title}</p>
                        <p className="text-white/60 text-xs mt-0.5 leading-relaxed">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Cultura de Calidad — Icon Cards Grid */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl animate-fade-in">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-10 bg-red-500 rounded-full" />
                <h2 className="text-xl md:text-2xl font-bold text-white">Cultura de Calidad</h2>
              </div>
              <p className="text-white/75 text-sm md:text-base leading-relaxed mb-6">
                Empresa líder en venta y distribución de productos de calidad, posicionada como representante exclusivo de las mejores marcas del mercado uruguayo.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {([
                  { Icon: FaHandshake, title: "Confianza", desc: "Relaciones duraderas basadas en la transparencia" },
                  { Icon: FaUsers, title: "Enfoque en el cliente", desc: "Cada decisión parte de las necesidades del comercio" },
                  { Icon: FaUserFriends, title: "Trabajo en equipo", desc: "Equipos comprometidos que logran más juntos" },
                  { Icon: FaClipboardCheck, title: "Compromiso y entrega", desc: "Cumplimos con lo prometido, siempre" },
                  { Icon: FaSyncAlt, title: "Mejora continua", desc: "Buscamos ser mejores en cada ciclo" },
                  { Icon: FaChartLine, title: "Desarrollo profesional", desc: "Invertimos en las personas de nuestra empresa" },
                ] as const).map(({ Icon, title, desc }) => (
                  <div key={title} className="rounded-xl p-3 md:p-4 bg-white/10 border border-white/10 hover:bg-white/15 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-red-600/30 border border-red-500/40 flex items-center justify-center mb-2.5">
                      <Icon className="text-red-300 text-sm" />
                    </div>
                    <h4 className="text-white font-semibold text-sm mb-0.5">{title}</h4>
                    <p className="text-white/60 text-xs leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-white/50 text-xs leading-relaxed pt-5 border-t border-white/20 mt-5">
                Nuestro éxito se basa en la unidad de esfuerzos, personal competente y valiosos proveedores que comparten nuestros valores, asegurando prosperidad a todas las partes interesadas.
              </p>
            </div>

          </div>
        </ParallaxSection>
      </main>
      <Footer hideCertification={true} />
    </div>
  );
}
