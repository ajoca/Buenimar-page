import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata = {
  title: "Política de Privacidad - Buenimar Distribuciones",
  description: "Política de privacidad y protección de datos de Buenimar Distribuciones en Colonia del Sacramento",
  alternates: {
    canonical: "https://www.buenimarcolonia.com/politica-privacidad",
  },
};

export default function PoliticaPrivacidadPage() {
  return (
    <div className="min-h-screen bg-pattern" style={{ background: "rgb(var(--bg))", color: "rgb(var(--text))" }}>
      <Navbar />
      <Breadcrumbs items={[{ label: "Política de Privacidad" }]} />
      
      <main className="py-8 md:py-12">
        <div className="container-x max-w-4xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center" style={{ color: "rgb(var(--text))" }}>
            Política de Privacidad
          </h1>

          <div className="space-y-8">
            {/* Introducción */}
            <section className="panel p-6 md:p-8">
              <p className="text-base md:text-lg leading-relaxed" style={{ color: "rgb(var(--text))" }}>
                En <strong>Buenimar Distribuciones</strong> nos comprometemos a proteger su privacidad. Esta política describe cómo recopilamos, usamos y protegemos su información personal.
              </p>
            </section>

            {/* Información que recopilamos */}
            <section className="panel p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "rgb(var(--text))" }}>
                1. Información que Recopilamos
              </h2>
              <div className="space-y-3 text-base md:text-lg leading-relaxed" style={{ color: "rgb(var(--text))" }}>
                <p>Podemos recopilar la siguiente información cuando utiliza nuestros servicios:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Nombre y apellido</li>
                  <li>Dirección de correo electrónico</li>
                  <li>Número de teléfono</li>
                  <li>Dirección de entrega</li>
                  <li>Información de contacto comercial</li>
                  <li>Datos de pedidos y consultas</li>
                </ul>
              </div>
            </section>

            {/* Uso de la información */}
            <section className="panel p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "rgb(var(--text))" }}>
                2. Uso de la Información
              </h2>
              <div className="space-y-3 text-base md:text-lg leading-relaxed" style={{ color: "rgb(var(--text))" }}>
                <p>Utilizamos su información para:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Procesar y gestionar sus pedidos</li>
                  <li>Responder a sus consultas y solicitudes</li>
                  <li>Enviar información sobre productos y servicios</li>
                  <li>Mejorar nuestros servicios y experiencia del cliente</li>
                  <li>Cumplir con obligaciones legales y comerciales</li>
                </ul>
              </div>
            </section>

            {/* Protección de datos */}
            <section className="panel p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "rgb(var(--text))" }}>
                3. Protección de Datos
              </h2>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: "rgb(var(--text))" }}>
                Implementamos medidas de seguridad apropiadas para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción. Su información está almacenada en servidores seguros y solo personal autorizado tiene acceso a ella.
              </p>
            </section>

            {/* Compartir información */}
            <section className="panel p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "rgb(var(--text))" }}>
                4. Compartir Información
              </h2>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: "rgb(var(--text))" }}>
                No vendemos, alquilamos ni compartimos su información personal con terceros, excepto cuando sea necesario para:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3 text-base md:text-lg" style={{ color: "rgb(var(--text))" }}>
                <li>Procesar y entregar sus pedidos</li>
                <li>Cumplir con requisitos legales</li>
                <li>Proteger nuestros derechos y propiedad</li>
              </ul>
            </section>

            {/* Cookies */}
            <section className="panel p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "rgb(var(--text))" }}>
                5. Cookies
              </h2>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: "rgb(var(--text))" }}>
                Nuestro sitio web puede utilizar cookies para mejorar su experiencia de navegación y recordar sus preferencias. Puede configurar su navegador para rechazar cookies, aunque esto puede afectar algunas funcionalidades del sitio.
              </p>
            </section>

            {/* Derechos del usuario */}
            <section className="panel p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "rgb(var(--text))" }}>
                6. Sus Derechos
              </h2>
              <div className="space-y-3 text-base md:text-lg leading-relaxed" style={{ color: "rgb(var(--text))" }}>
                <p>Usted tiene derecho a:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Acceder a su información personal</li>
                  <li>Solicitar corrección de datos inexactos</li>
                  <li>Solicitar la eliminación de sus datos</li>
                  <li>Oponerse al procesamiento de sus datos</li>
                  <li>Solicitar la portabilidad de sus datos</li>
                </ul>
              </div>
            </section>

            {/* Cambios en la política */}
            <section className="panel p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "rgb(var(--text))" }}>
                7. Cambios en esta Política
              </h2>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: "rgb(var(--text))" }}>
                Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento. Las actualizaciones se publicarán en esta página y la fecha de la última modificación se indicará al final del documento.
              </p>
            </section>

            {/* Contacto */}
            <section className="panel p-6 md:p-8 bg-red-50 dark:bg-red-950/20">
              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "rgb(var(--text))" }}>
                8. Contacto
              </h2>
              <div className="space-y-2 text-base md:text-lg leading-relaxed" style={{ color: "rgb(var(--text))" }}>
                <p>Si tiene preguntas sobre esta política de privacidad o desea ejercer sus derechos, puede contactarnos:</p>
                <div className="mt-4 space-y-1">
                  <p><strong>Buenimar Distribuciones</strong></p>
                  <p>📍 Pablo Zufriategui 374, Colonia del Sacramento</p>
                  <p>📞 Tel: <a href="tel:+59845224091" className="text-red-600 hover:underline">+598 4522 4091</a></p>
                  <p>📱 WhatsApp: <a href="https://wa.me/59897557366" className="text-red-600 hover:underline">+598 97 557 366</a></p>
                  <p>✉️ Email: <a href="mailto:pedidos@buenimar.com" className="text-red-600 hover:underline">pedidos@buenimar.com</a></p>
                </div>
              </div>
            </section>

            {/* Fecha actualización */}
            <div className="text-center text-sm md:text-base pt-4" style={{ color: "rgb(var(--muted))" }}>
              <p>Última actualización: Diciembre 2025</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
