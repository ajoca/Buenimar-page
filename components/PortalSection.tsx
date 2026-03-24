export default function PortalSection({
  title,
  buttonText,
  href,
}: {
  title: string;
  buttonText: string;
  href: string;
}) {
  const external = href.startsWith("http");
  return (
    <section className="pb-[var(--section-gap)]">
      <div className="container-x">
        <h2 className="section-title">{title}</h2>
        <p className="mt-2 text-sm md:text-base max-w-2xl" style={{ color: "rgb(var(--muted))" }}>
          Accedé al portal para gestionar consultas y operaciones comerciales de forma rápida y ordenada.
        </p>

        <div className="mt-5 md:mt-6 rounded-2xl border border-red-200/20 bg-gradient-to-br from-red-600/10 to-orange-500/10 p-4 md:p-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-start md:items-center gap-4 md:gap-6">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.16em] font-semibold" style={{ color: "rgb(var(--accent))" }}>
                Portal comercial
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm" style={{ color: "rgb(var(--muted))" }}>
                <p>• Consultas centralizadas</p>
                <p>• Respuesta comercial ágil</p>
                <p>• Seguimiento de solicitudes</p>
              </div>
            </div>

          <a
            className="btn btn-accent inline-flex items-center justify-center text-sm md:text-base font-semibold px-6 py-3 transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-100"
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
          >
            {buttonText}
          </a>
          </div>
        </div>
      </div>
    </section>
  );
}
