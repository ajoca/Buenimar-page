import type { Brand } from "@/lib/types";

export default function BrandsGrid({ brands }: { brands: Brand[] }) {
  return (
    <section className="pb-[var(--section-gap)]">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-3 md:gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {brands.map((b) => (
            <div
              key={b.id}
              className="panel flex items-center justify-center overflow-hidden hover:scale-105 hover:shadow-xl active:scale-100 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-red-500 active:border-red-500 bg-white aspect-square"
              style={{ minHeight: "140px" }}
            >
              {b.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={b.image}
                  alt={b.name}
                  className="h-full w-full object-contain p-4 sm:p-6 md:p-8"
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
