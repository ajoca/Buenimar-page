import { list, put, del, head } from "@vercel/blob";

export type PrivateCatalogFile = {
  name: string;
  url: string;
  sizeLabel: string;
  updatedAt: string;
};

export type PrivateCatalogFolder = {
  slug: string;
  name: string;
  icon: string;
  description: string;
};

export const PRIVATE_CATALOG_FOLDERS: PrivateCatalogFolder[] = [
  {
    slug: "conaprole",
    name: "Conaprole",
    icon: "/archivos/img%20catalogos/conaprole.png",
    description: "Listas y catálogos privados.",
  },
  {
    slug: "schneck",
    name: "Schneck",
    icon: "/archivos/img%20catalogos/schneck.png",
    description: "Catálogos Schneck para distribuidores.",
  },
  {
    slug: "especialista",
    name: "La Especialista",
    icon: "/archivos/img%20catalogos/especialista.png",
    description: "Productos La Especialista privados.",
  },
  {
    slug: "pagnifique",
    name: "Pagnifique",
    icon: "/archivos/img%20catalogos/pagnifique.png",
    description: "Ofertas Pagnifique para vendedores.",
  },
  {
    slug: "almena",
    name: "Almena",
    icon: "/archivos/img%20catalogos/almena.png",
    description: "Catálogos Almena exclusivos.",
  },
];

const BLOB_PREFIX = "private-catalogs";

export function getPrivateCatalogFolder(slug: string) {
  return PRIVATE_CATALOG_FOLDERS.find((folder) => folder.slug === slug) || null;
}

function formatFileSize(size: number) {
  if (size < 1024 * 1024) {
    return `${Math.max(1, Math.round(size / 1024))} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[\\/:*?"<>|]/g, "-").replace(/\s+/g, " ").trim();
}

function getBlobPrefix(slug: string): string {
  return `${BLOB_PREFIX}/${slug}/`;
}

export async function listPrivateCatalogFiles(slug: string): Promise<PrivateCatalogFile[]> {
  const folder = getPrivateCatalogFolder(slug);
  if (!folder) {
    throw new Error("Carpeta privada no válida");
  }

  try {
    const prefix = getBlobPrefix(slug);
    const blobs = await list({ prefix });
    
    const files = blobs.blobs
      .filter((blob) => blob.pathname.toLowerCase().endsWith(".pdf"))
      .map((blob) => {
        const fileName = blob.pathname.replace(prefix, "");
        return {
          name: fileName,
          url: blob.url,
          sizeLabel: formatFileSize(blob.size),
          updatedAt: new Intl.DateTimeFormat("es-UY", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }).format(new Date(blob.uploadedAt)),
          timestamp: new Date(blob.uploadedAt).getTime(),
        };
      });

    return files.sort((a, b) => b.timestamp - a.timestamp).map(({ timestamp, ...entry }) => entry);
  } catch (error) {
    console.error("Error listing files from Blob Storage:", error);
    return [];
  }
}

export async function savePrivateCatalogFile(slug: string, file: File): Promise<string> {
  const folder = getPrivateCatalogFolder(slug);
  if (!folder) {
    throw new Error("Carpeta privada no válida");
  }

  const originalName = sanitizeFileName(file.name || "catalogo.pdf");
  const hasPdfExtension = originalName.toLowerCase().endsWith(".pdf");
  const baseName = hasPdfExtension ? originalName.slice(0, -4) : originalName;
  let finalName = hasPdfExtension ? originalName : `${originalName}.pdf`;

  // Check if file already exists
  const prefix = getBlobPrefix(slug);
  let pathToCheck = `${prefix}${finalName}`;
  
  try {
    await head(pathToCheck);
    // File exists, add timestamp to avoid collision
    finalName = `${baseName}-${Date.now()}.pdf`;
    pathToCheck = `${prefix}${finalName}`;
  } catch {
    // File does not exist, continue with original name
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  await put(pathToCheck, buffer, { access: "private" });
  return finalName;
}
