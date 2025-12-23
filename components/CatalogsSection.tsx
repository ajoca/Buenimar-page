import type { Catalog } from "@/lib/types";

export default function CatalogsSection({ catalogs }: { catalogs: Catalog[] }) {
  return (
    <section
      id="catalogos"
      className="py-12"
      style={{ background: "rgb(var(--bg))", color: "rgb(var(--text))" }}
    >
      <div className="space-y-4 max-w-3xl mx-auto px-4">
        {catalogs.map((c) => {
          const href = c.href ?? (c.file ? `/marcas/docs/${c.file}` : "#");
          const isExternal = href.startsWith("http");
          return (
            <div
              key={c.id}
              className="flex justify-between items-center panel p-4 rounded-lg"
            >
              <h3
                className="text-xl font-semibold"
                style={{ color: "rgb(var(--text))" }}
              >
                {c.title}
              </h3>

              <a
                href={href}
                download={!isExternal && !!c.file}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                className="px-4 py-2 rounded-lg transition-all duration-300 hover:scale-110 hover:-translate-y-[2px] hover:rotate-2 hover:shadow-2xl active:scale-105 active:-translate-y-[1px] border-2 border-transparent"
                style={{
                  background: "rgb(var(--accent))",
                  color: "white",
                  borderColor: "rgba(var(--accent), 0.35)",
                }}
              >
                📄 Descargar
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
