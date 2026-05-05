import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata = {
  title: "Acceso Vendedores",
  description: "Acceso privado para vendedores de Buenimar.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PreciosLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;
  const next = params?.next?.startsWith("/") ? params.next : "/precios";
  const hasError = params?.error === "1";

  return (
    <div className="min-h-screen" style={{ background: "rgb(var(--bg))", color: "rgb(var(--text))" }}>
      <Navbar />
      <Breadcrumbs items={[{ label: "Acceso vendedores" }]} />

      <main className="px-4 py-10 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-md rounded-3xl border p-5 sm:p-8" style={{ background: "rgb(var(--panel))", borderColor: "rgb(var(--line))" }}>
          <p className="section-eyebrow mb-3 text-center">Área privada</p>
          <h1 className="text-2xl font-bold text-center sm:text-3xl" style={{ color: "rgb(var(--text))" }}>
            Acceso vendedores
          </h1>
          <p className="mt-3 text-base text-center" style={{ color: "rgb(var(--muted))" }}>
            Ingresá con tus credenciales para ver la carpeta privada que te corresponda, como Conaprole o Buenimar General.
          </p>

          {hasError && (
            <div className="mt-5 rounded-2xl border px-4 py-3 text-sm" style={{ borderColor: "rgba(220, 38, 38, 0.35)", background: "rgba(220, 38, 38, 0.08)", color: "#fca5a5" }}>
              Usuario o contraseña incorrectos.
            </div>
          )}

          <form action="/api/private-auth/login" method="post" className="mt-6 space-y-4">
            <input type="hidden" name="next" value={next} />

            <div>
              <label htmlFor="username" className="block text-sm font-semibold mb-2">
                Usuario
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="block w-full rounded-xl border px-4 py-3.5 text-base outline-none"
                style={{ background: "rgb(var(--bg))", borderColor: "rgb(var(--line))", color: "rgb(var(--text))" }}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold mb-2">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full rounded-xl border px-4 py-3.5 text-base outline-none"
                style={{ background: "rgb(var(--bg))", borderColor: "rgb(var(--line))", color: "rgb(var(--text))" }}
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl px-4 py-3.5 text-base font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "rgb(var(--accent))" }}
            >
              Ingresar
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
