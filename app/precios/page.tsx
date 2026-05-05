import Link from "next/link";
import { cookies } from "next/headers";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { PRIVATE_CATALOG_FOLDERS } from "@/lib/privateCatalogs";
import { getPrivateAuthSessionFromCookieStore } from "@/lib/privateAuth";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Precios Clientes",
  description: "Área privada para vendedores de Buenimar.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PreciosDashboardPage() {
  const cookieStore = await cookies();
  const session = getPrivateAuthSessionFromCookieStore(cookieStore);
  const visibleFolders = session
    ? PRIVATE_CATALOG_FOLDERS.filter((folder) => session.allowedFolders.includes(folder.slug))
    : [];

  return (
    <div className="min-h-screen" style={{ background: "rgb(var(--bg))", color: "rgb(var(--text))" }}>
      <Navbar />
      <Breadcrumbs items={[{ label: "Precios clientes" }]} />

      <main className="py-10 md:py-24">
        <section className="container-x">
          <div className="max-w-3xl">
            <p className="section-eyebrow mb-3">Acceso privado</p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold sm:text-4xl" style={{ color: "rgb(var(--text))" }}>
                  Precios y catálogos para vendedores
                </h1>
                <p className="mt-3 text-base" style={{ color: "rgb(var(--muted))" }}>
                  Entrá a cada carpeta privada para ver PDFs de clientes, descargarlos o subir nuevas versiones.
                </p>
              </div>

              <form action="/api/private-auth/logout" method="post">
                <button
                  type="submit"
                  className="w-full rounded-xl px-4 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto"
                  style={{ background: "rgb(var(--accent))" }}
                >
                  Cerrar sesión
                </button>
              </form>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleFolders.map((folder) => (
              <Link
                key={folder.slug}
                href={`/precios/${folder.slug}`}
                className="rounded-3xl border p-5 transition-all hover:-translate-y-1 hover:shadow-xl sm:p-6"
                style={{ background: "rgb(var(--panel))", borderColor: "rgb(var(--line))" }}
              >
                <div className="w-20 h-20 rounded-2xl bg-white p-3 flex items-center justify-center shadow-lg">
                  <img src={folder.icon} alt={`Logo ${folder.name}`} className="max-w-full max-h-full object-contain" />
                </div>
                <h2 className="mt-5 text-2xl font-bold" style={{ color: "rgb(var(--text))" }}>
                  {folder.name}
                </h2>
                <p className="mt-2 text-sm" style={{ color: "rgb(var(--muted))" }}>
                  {folder.description}
                </p>
                <div className="mt-5 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold" style={{ color: "rgb(var(--accent))", background: "rgba(var(--accent), 0.1)" }}>
                  Abrir carpeta
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
