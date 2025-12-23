import type { Brand } from "@/lib/types";

export default function BrandsGrid({ brands }: { brands: Brand[] }) {
  return (
    <section className="pb-[var(--section-gap)]">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-[var(--card-gap)] sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {brands.map((b) => (
            <div
              key={b.id}
              className="panel flex items-center justify-center overflow-hidden hover:scale-110 hover:rotate-2 hover:-translate-y-1 hover:shadow-2xl active:scale-110 active:rotate-2 active:-translate-y-1 active:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-red-500 active:border-red-500 bg-white"
              style={{ height: "var(--brand-tile-h)" }}
            >
              {b.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={b.image}
                  alt={b.name}
                  className="h-full w-full object-contain p-6 md:p-8"
                />
              ) : (
                <span
                  className="text-[12px]"
                  style={{ color: "rgb(var(--muted))" }}
                >
                  Marcas
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
