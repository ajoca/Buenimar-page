import type { Product } from "@/lib/types";

export default function ProductsSection({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) {
  return (
    <section
      className="pb-[var(--section-gap)]"
      aria-labelledby="nuevos"
    >
      <div className="container-x">
        <h2 id="nuevos" className="section-title">
          {title}
        </h2>

        <div className="mt-4 grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <article
              key={p.id}
              className="panel overflow-hidden hover:scale-105 hover:shadow-xl active:scale-100 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-red-500 flex flex-col"
            >
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  height: "clamp(120px, 165px, 200px)",
                  borderBottom: "1px solid rgb(var(--line))",
                  background: "rgba(0,0,0,.02)",
                }}
              >
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-contain p-2"
                  />
                ) : (
                  <span
                    className="text-[12px]"
                    style={{ color: "rgb(var(--muted))" }}
                  >
                    Image
                  </span>
                )}
              </div>

              <div className="p-2 md:p-3 flex-grow">
                <h3 className="text-xs md:text-sm font-semibold leading-snug line-clamp-2">
                  {p.name}
                </h3>
                {!!p.subtitle && (
                  <div
                    className="text-[11px] md:text-xs mt-1 line-clamp-1"
                    style={{ color: "rgb(var(--muted))" }}
                  >
                    {p.subtitle}
                  </div>
                )}
                {!!p.code && (
                  <div
                    className="mt-1 md:mt-2 text-[11px] md:text-xs"
                    style={{ color: "rgb(var(--muted))" }}
                  >
                    Código:{" "}
                    <span
                      className="font-semibold"
                      style={{ color: "rgb(var(--text))" }}
                    >
                      {p.code}
                    </span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
