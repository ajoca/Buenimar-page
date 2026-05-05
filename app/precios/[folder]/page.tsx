import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getPrivateCatalogFolder, listPrivateCatalogFiles, listPrivatePriceFiles } from "@/lib/privateCatalogs";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Carpeta privada",
  robots: {
    index: false,
    follow: false,
  },
};

function getUploadMessage(status?: string) {
  if (status === "ok") return { text: "Archivo subido correctamente.", tone: "ok" as const };
  if (status === "type-error") return { text: "Solo se permiten PDF, Excel e imagenes.", tone: "error" as const };
  if (status === "empty") return { text: "Seleccioná un archivo antes de subir.", tone: "error" as const };
  if (status === "folder-error") return { text: "La carpeta indicada no es válida.", tone: "error" as const };
  if (status === "error") return { text: "No se pudo guardar el archivo.", tone: "error" as const };
  return null;
}

function getDeleteMessage(status?: string) {
  if (status === "ok") return { text: "PDF eliminado correctamente.", tone: "ok" as const };
  if (status === "invalid") return { text: "No se pudo identificar el PDF a eliminar.", tone: "error" as const };
  if (status === "error") return { text: "No se pudo eliminar el PDF.", tone: "error" as const };
  return null;
}

function getRenameMessage(status?: string) {
  if (status === "ok") return { text: "Nombre actualizado correctamente.", tone: "ok" as const };
  if (status === "invalid") return { text: "Completá el nombre nuevo para continuar.", tone: "error" as const };
  if (status === "error") return { text: "No se pudo cambiar el nombre del PDF.", tone: "error" as const };
  return null;
}

function getFileKindLabel(kind: "pdf" | "spreadsheet" | "image" | "other") {
  if (kind === "pdf") return "PDF";
  if (kind === "spreadsheet") return "Excel";
  if (kind === "image") return "Imagen";
  return "Archivo";
}

function FileListSection({
  title,
  emptyMessage,
  files,
}: {
  title: string;
  emptyMessage: string;
  files: Awaited<ReturnType<typeof listPrivateCatalogFiles>>;
}) {
  return (
    <div className="rounded-3xl border overflow-hidden" style={{ background: "rgb(var(--panel))", borderColor: "rgb(var(--line))" }}>
      <div className="px-5 py-4 border-b" style={{ borderColor: "rgb(var(--line))" }}>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>

      {files.length === 0 ? (
        <div className="px-5 py-8 text-sm" style={{ color: "rgb(var(--muted))" }}>
          {emptyMessage}
        </div>
      ) : (
        <div className="divide-y" style={{ borderColor: "rgb(var(--line))" }}>
          {files.map((file) => (
            <div key={file.name} className="px-5 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-semibold break-all">{file.displayName}</h3>
                <p className="mt-1 text-xs sm:text-sm" style={{ color: "rgb(var(--muted))" }}>
                  {getFileKindLabel(file.kind)} · Actualizado: {file.updatedAt} · {file.sizeLabel}
                </p>
              </div>
              <div className="grid w-full gap-2 sm:flex sm:w-auto sm:flex-wrap">
                <a
                  href={file.viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border px-4 py-2.5 text-sm font-semibold"
                  style={{ borderColor: "rgba(var(--accent), 0.4)", color: "rgb(var(--accent))" }}
                >
                  Ver
                </a>
                <a
                  href={file.url}
                  download
                  className="inline-flex min-h-11 items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-white"
                  style={{ background: "rgb(var(--accent))" }}
                >
                  Descargar
                </a>
              </div>

              {file.canManage && (
                <div className="mt-3 grid gap-2 sm:flex sm:items-center sm:justify-end">
                  <form action="/api/private-catalogs/rename" method="post" className="grid gap-2 sm:flex sm:items-center">
                    <input type="hidden" name="folder" value="conaprole" />
                    <input type="hidden" name="currentName" value={file.name} />
                    <input type="hidden" name="redirectTo" value="/precios/conaprole" />
                    <input
                      name="nextName"
                      type="text"
                      required
                      defaultValue={file.name}
                      className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none sm:w-64"
                      style={{ background: "rgb(var(--bg))", borderColor: "rgb(var(--line))", color: "rgb(var(--text))" }}
                      aria-label={`Renombrar ${file.displayName}`}
                    />
                    <button
                      type="submit"
                      className="inline-flex min-h-11 items-center justify-center rounded-xl border px-4 py-2.5 text-sm font-semibold"
                      style={{ borderColor: "rgba(var(--accent), 0.4)", color: "rgb(var(--accent))" }}
                    >
                      Guardar nombre
                    </button>
                  </form>

                  <form action="/api/private-catalogs/delete" method="post">
                    <input type="hidden" name="folder" value="conaprole" />
                    <input type="hidden" name="fileName" value={file.name} />
                    <input type="hidden" name="redirectTo" value="/precios/conaprole" />
                    <button
                      type="submit"
                      className="inline-flex min-h-11 items-center justify-center rounded-xl border px-4 py-2.5 text-sm font-semibold"
                      style={{ borderColor: "rgba(220, 38, 38, 0.45)", color: "#fca5a5" }}
                    >
                      Eliminar
                    </button>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default async function PrivateFolderPage({
  params,
  searchParams,
}: {
  params: Promise<{ folder: string }>;
  searchParams: Promise<{ upload?: string; delete?: string; rename?: string }>;
}) {
  const { folder: folderSlug } = await params;
  const query = await searchParams;
  const folder = getPrivateCatalogFolder(folderSlug);

  if (!folder) {
    notFound();
  }

  const files = await listPrivateCatalogFiles(folder.slug);
  const priceFiles = await listPrivatePriceFiles(folder.slug);
  const uploadMessage = getUploadMessage(query?.upload);
  const deleteMessage = getDeleteMessage(query?.delete);
  const renameMessage = getRenameMessage(query?.rename);
  const actionMessage = uploadMessage || deleteMessage || renameMessage;

  return (
    <div className="min-h-screen" style={{ background: "rgb(var(--bg))", color: "rgb(var(--text))" }}>
      <Navbar />
      <Breadcrumbs items={[{ label: "Precios clientes", href: "/precios" }, { label: folder.name }]} />

      <main className="py-10 md:py-24">
        <section className="container-x">
          <div className="grid gap-6 sm:gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <div className="h-16 w-16 rounded-2xl bg-white p-2.5 flex items-center justify-center shadow-lg sm:h-20 sm:w-20 sm:p-3">
                  <img src={folder.icon} alt={`Logo ${folder.name}`} className="max-w-full max-h-full object-contain" />
                </div>
                <div>
                  <p className="section-eyebrow mb-2">Carpeta privada</p>
                  <h1 className="text-2xl font-bold sm:text-4xl">{folder.name}</h1>
                  <p className="mt-2 text-base" style={{ color: "rgb(var(--muted))" }}>
                    Archivos internos disponibles para ver o descargar.
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-6">
                <FileListSection
                  title="Catalogos y archivos"
                  emptyMessage="Todavía no hay archivos cargados en esta carpeta."
                  files={files}
                />

                <FileListSection
                  title="Lista de precios"
                  emptyMessage="Todavía no hay listas de precios cargadas."
                  files={priceFiles}
                />
              </div>
            </div>

            <aside className="rounded-3xl border p-5 sm:p-6 h-fit" style={{ background: "rgb(var(--panel))", borderColor: "rgb(var(--line))" }}>
              <h2 className="text-xl font-bold">Subir nuevo archivo</h2>
              <p className="mt-2 text-sm" style={{ color: "rgb(var(--muted))" }}>
                Podés subir PDFs, Excel o imagenes dentro de la carpeta privada de {folder.name}.
              </p>

              {actionMessage && (
                <div
                  className="mt-4 rounded-2xl border px-4 py-3 text-sm"
                  style={{
                    borderColor: actionMessage.tone === "ok" ? "rgba(34, 197, 94, 0.35)" : "rgba(220, 38, 38, 0.35)",
                    background: actionMessage.tone === "ok" ? "rgba(34, 197, 94, 0.08)" : "rgba(220, 38, 38, 0.08)",
                    color: actionMessage.tone === "ok" ? "#86efac" : "#fca5a5",
                  }}
                >
                  {actionMessage.text}
                </div>
              )}

              <form action="/api/private-catalogs/upload" method="post" encType="multipart/form-data" className="mt-5 space-y-4">
                <input type="hidden" name="folder" value={folder.slug} />
                <input type="hidden" name="redirectTo" value={`/precios/${folder.slug}`} />

                <div>
                  <label htmlFor="file" className="block text-sm font-semibold mb-2">
                    Archivo
                  </label>
                  <input
                    id="file"
                    name="file"
                    type="file"
                    accept="application/pdf,.pdf,.xlsx,.xls,.csv,image/png,image/jpeg,image/webp,image/avif,.png,.jpg,.jpeg,.webp,.avif"
                    required
                    className="block w-full rounded-xl border px-3 py-3.5 text-base file:mr-3 file:rounded-lg file:border-0 file:bg-red-600 file:px-3 file:py-2 file:font-semibold file:text-white"
                    style={{ background: "rgb(var(--bg))", borderColor: "rgb(var(--line))", color: "rgb(var(--text))" }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl px-4 py-3.5 text-base font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: "rgb(var(--accent))" }}
                >
                  Subir archivo
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
