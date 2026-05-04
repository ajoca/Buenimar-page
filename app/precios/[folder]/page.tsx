import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getPrivateCatalogFolder, listPrivateCatalogFiles } from "@/lib/privateCatalogs";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Carpeta privada",
  robots: {
    index: false,
    follow: false,
  },
};

function getUploadMessage(status?: string) {
  if (status === "ok") return { text: "PDF subido correctamente.", tone: "ok" as const };
  if (status === "type-error") return { text: "Solo se permiten archivos PDF.", tone: "error" as const };
  if (status === "empty") return { text: "Seleccioná un archivo antes de subir.", tone: "error" as const };
  if (status === "folder-error") return { text: "La carpeta indicada no es válida.", tone: "error" as const };
  if (status === "error") return { text: "No se pudo guardar el archivo.", tone: "error" as const };
  return null;
}

export default async function PrivateFolderPage({
  params,
  searchParams,
}: {
  params: Promise<{ folder: string }>;
  searchParams: Promise<{ upload?: string }>;
}) {
  const { folder: folderSlug } = await params;
  const query = await searchParams;
  const folder = getPrivateCatalogFolder(folderSlug);

  if (!folder) {
    notFound();
  }

  const files = await listPrivateCatalogFiles(folder.slug);
  const uploadMessage = getUploadMessage(query?.upload);

  return (
    <div className="min-h-screen" style={{ background: "rgb(var(--bg))", color: "rgb(var(--text))" }}>
      <Navbar />
      <Breadcrumbs items={[{ label: "Precios clientes", href: "/precios" }, { label: folder.name }]} />

      <main className="py-16 md:py-24">
        <section className="container-x">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-white p-3 flex items-center justify-center shadow-lg">
                  <img src={folder.icon} alt={`Logo ${folder.name}`} className="max-w-full max-h-full object-contain" />
                </div>
                <div>
                  <p className="section-eyebrow mb-2">Carpeta privada</p>
                  <h1 className="text-3xl sm:text-4xl font-bold">{folder.name}</h1>
                  <p className="mt-2 text-sm sm:text-base" style={{ color: "rgb(var(--muted))" }}>
                    PDFs internos disponibles para ver o descargar.
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-3xl border overflow-hidden" style={{ background: "rgb(var(--panel))", borderColor: "rgb(var(--line))" }}>
                <div className="px-5 py-4 border-b" style={{ borderColor: "rgb(var(--line))" }}>
                  <h2 className="text-xl font-bold">Archivos disponibles</h2>
                </div>

                {files.length === 0 ? (
                  <div className="px-5 py-8 text-sm" style={{ color: "rgb(var(--muted))" }}>
                    Todavía no hay PDFs cargados en esta carpeta.
                  </div>
                ) : (
                  <div className="divide-y" style={{ borderColor: "rgb(var(--line))" }}>
                    {files.map((file) => (
                      <div key={file.name} className="px-5 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="font-semibold break-all">{file.name}</h3>
                          <p className="mt-1 text-xs sm:text-sm" style={{ color: "rgb(var(--muted))" }}>
                            Actualizado: {file.updatedAt} · {file.sizeLabel}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-semibold"
                            style={{ borderColor: "rgba(var(--accent), 0.4)", color: "rgb(var(--accent))" }}
                          >
                            Ver
                          </a>
                          <a
                            href={file.url}
                            download
                            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-white"
                            style={{ background: "rgb(var(--accent))" }}
                          >
                            Descargar
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <aside className="rounded-3xl border p-5 sm:p-6 h-fit" style={{ background: "rgb(var(--panel))", borderColor: "rgb(var(--line))" }}>
              <h2 className="text-xl font-bold">Subir nuevo PDF</h2>
              <p className="mt-2 text-sm" style={{ color: "rgb(var(--muted))" }}>
                El archivo se guardará dentro de la carpeta privada de {folder.name}.
              </p>

              {uploadMessage && (
                <div
                  className="mt-4 rounded-2xl border px-4 py-3 text-sm"
                  style={{
                    borderColor: uploadMessage.tone === "ok" ? "rgba(34, 197, 94, 0.35)" : "rgba(220, 38, 38, 0.35)",
                    background: uploadMessage.tone === "ok" ? "rgba(34, 197, 94, 0.08)" : "rgba(220, 38, 38, 0.08)",
                    color: uploadMessage.tone === "ok" ? "#86efac" : "#fca5a5",
                  }}
                >
                  {uploadMessage.text}
                </div>
              )}

              <form action="/api/private-catalogs/upload" method="post" encType="multipart/form-data" className="mt-5 space-y-4">
                <input type="hidden" name="folder" value={folder.slug} />
                <input type="hidden" name="redirectTo" value={`/precios/${folder.slug}`} />

                <div>
                  <label htmlFor="file" className="block text-sm font-semibold mb-2">
                    Archivo PDF
                  </label>
                  <input
                    id="file"
                    name="file"
                    type="file"
                    accept="application/pdf,.pdf"
                    required
                    className="block w-full rounded-xl border px-3 py-3 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-red-600 file:px-3 file:py-2 file:font-semibold file:text-white"
                    style={{ background: "rgb(var(--bg))", borderColor: "rgb(var(--line))", color: "rgb(var(--text))" }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: "rgb(var(--accent))" }}
                >
                  Subir PDF
                </button>
              </form>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
