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

        <div className="mt-4 grid grid-cols-2 gap-[var(--card-gap)] md:grid-cols-4">
          {products.map((p) => (
            <article
              key={p.id}
              className="panel overflow-hidden hover:scale-105 hover:rotate-1 hover:shadow-2xl active:scale-105 active:rotate-1 active:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-red-500"
            >
              <div
                className="flex items-center justify-center"
                style={{
                  height: "var(--card-img-h)",
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

              <div className="p-3">
                <h3 className="text-[14px] font-semibold leading-snug">
                  {p.name}
                </h3>
                {!!p.subtitle && (
                  <div
                    className="text-[13px]"
                    style={{ color: "rgb(var(--muted))" }}
                  >
                    {p.subtitle}
                  </div>
                )}
                {!!p.code && (
                  <div
                    className="mt-2 text-[13px]"
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
