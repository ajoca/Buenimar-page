import Navbar from "@/components/Navbar";
import CompanySection from "@/components/CompanySection";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/siteContent";
import Breadcrumbs from "@/components/Breadcrumbs";

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
    <div className="min-h-screen" style={{ background: "rgb(var(--bg))", color: "rgb(var(--text))" }}>
      <Navbar />
      <Breadcrumbs items={[{ label: "Empresa" }]} />
      <main className="pt-0 pb-0">

        <CompanySection
          title={SITE.companyTitle}
          slides={SITE.companySlides}
          paragraphs={SITE.companyParagraphs}
        />

        <section className="relative pb-12 pt-0">
          {/* Background image layer with grayscale */}
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: "url('/img/2070a6_8e37e4c151464366bcebb084f5bfc667~mv2.avif')",
              filter: 'grayscale(100%)',
            }}
          />
          {/* Soft dark overlay for readability */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 max-w-5xl mx-auto px-4 text-white pt-6 md:pt-10 pb-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-6 md:mb-8 drop-shadow-2xl">NUESTRA HISTORIA</h2>
            <div className="bg-white/90 text-black p-4 md:p-8 rounded-lg shadow-lg">
              <p className="text-sm md:text-base lg:text-lg leading-relaxed mb-4 md:mb-6">
                Buenimar comienza su historia a mediados del año 1996, abocado a la fabricación y distribución de "HIELOS COOL". Es en sus comienzos que incorpora una innovadora línea de panes y bizcochos ultra congelados "PAGNIFIQUE", confiando en el producto y apostando a un trabajo a largo plazo, marcando así un método diferente de trabajo que lo llevaría a consolidarse como distribuidora líder en el Departamento de Colonia.
              </p>
              <p className="text-sm md:text-base lg:text-lg leading-relaxed mb-4 md:mb-6">
                A finales del 2002 a pesar del difícil momento económico que atravesaba nuestro país, Buenimar siguió apostando al futuro con la incorporación de marcas líderes tales como ALMENA S.A (Don Pascual, Terma, S. Teresa; entre tantas), FORT MASIS (lácteos Danone), UNILEVER FOOD SOLUTION (Hellmans, Knorr), SUC. CARLOS SCHNECK Y LA ESPECIALISTA.
              </p>
              <p className="text-sm md:text-base lg:text-lg leading-relaxed mb-4 md:mb-6">
                De ahí en más se han ido sumando a este ambicioso proyecto otras significativos proveedores como SAMU (arroz y derivados), MOLINO AMERICANO (harinas y derivados), LISLEY S.A (cervezas) y GRABA S.A(prod. Congelados), empresas que confiaron el compromiso que Buenimar tiene frente al cliente.
              </p>
              <p className="text-sm md:text-base lg:text-lg leading-relaxed mb-4 md:mb-6">
                Buenimar consciente de la importancia de sus Recursos Humanos se ha preocupado por desarrollar al personal, estimulando sus aportes y capacitándolos constantemente para la adecuada ejecución de su tarea. Siempre sosteniendo el fin de brindar a cada uno de los clientes el servicio que merecen, y agradecerles así la confianza depositada día a día en la empresa.
              </p>
              <p className="text-sm md:text-base lg:text-lg leading-relaxed mb-4 md:mb-6">
                En el año 2012, Buenimar comenzó a trabajar en busca de la Certificación de Calidad, asumiendo el compromiso del enfoque basado en procesos, la búsqueda constante de la satisfacción del cliente y la mejora continua. En Octubre de 2013 después de un arduo trabajo de todo su equipo y colaboradores se logró el objetivo promovido por la dirección de la empresa, la certificación en la norma ISO 9001:2008.
              </p>
              <p className="text-sm md:text-base lg:text-lg leading-relaxed mb-4 md:mb-6">
                Con este objetivo cumplido, el compromiso por el cliente, proveedores y sus colaboradores se acrecienta día a día. Buenimar, 18 años entregando servicio.
              </p>
            </div>
            <h3 className="mt-6 md:mt-10 text-2xl sm:text-3xl font-bold text-center mb-4 md:mb-6 text-white">CULTURA DE CALIDAD</h3>
            <div className="bg-white/90 text-black p-4 md:p-8 rounded-lg shadow-lg">
              <p className="text-sm md:text-base lg:text-lg leading-relaxed">
                Buenimar S.A. es una empresa de venta y distribución de productos líderes en el mercado, que busca posicionarse como representante exclusivo de las mejores marcas a través de un servicio eficiente y eficaz.
              </p>
              <p className="text-sm md:text-base lg:text-lg leading-relaxed mt-3 md:mt-4">
                Desde su inicio en 1996, Buenimar tiene la creencia que sólo a través de un nexo confiable, apoyados en una ética de servicios sumamente profesional, así como lo legalmente requerido, es posible lograr el éxito sostenido y la mejora contínua.
              </p>
              <p className="text-sm md:text-base lg:text-lg leading-relaxed mt-3 md:mt-4">
                Para satisfacer los requerimientos de nuestros clientes, dependemos de la unidad de esfuerzos de muchos, es por eso que el personal competente junto a nuestros valiosos proveedores compartimos valores en común; confianza, enfoque en el cliente, valor humano, trabajo en equipo, compromiso y entrega, relacionamiento personal, soluciones y desarrollo, asegurando prosperidad a todas las partes interesadas.
              </p>
              <p className="text-sm md:text-base lg:text-lg leading-relaxed mt-3 md:mt-4">
                Logramos el éxito cuando cada decisión se basa en una planificación previa de todos los elementos involucrados, incluyendo una sólida planificación financiera, humana y estratégica.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
