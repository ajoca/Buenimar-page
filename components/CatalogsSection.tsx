import type { Catalog } from "@/lib/types";

export default function CatalogsSection({ catalogs }: { catalogs: Catalog[] }) {
  return (
    <section
      id="catalogos"
      className="py-12"
      style={{ background: "rgb(var(--bg))", color: "rgb(var(--text))" }}
    >
      <div className="space-y-3 md:space-y-4 max-w-3xl mx-auto px-4">
        {catalogs.map((c) => {
          const href = c.href ?? (c.file ? `/archivos/${c.file}` : "#");
          const isExternal = href.startsWith("http");
          return (
            <div
              key={c.id}
              className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center panel p-3 md:p-4 rounded-lg gap-3"
            >
              <h3
                className="text-base md:text-lg lg:text-xl font-semibold"
                style={{ color: "rgb(var(--text))" }}
              >
                {c.title}
              </h3>

              <a
                href={href}
                download={!isExternal && !!c.file}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm md:text-base font-semibold whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-100 flex-shrink-0"
                style={{
                  background: "rgb(var(--accent))",
                  color: "white",
                }}
              >
                <span className="text-lg">📄</span>
                <span>Descargar</span>
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
