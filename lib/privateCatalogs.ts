import { copy, del, list, put } from "@vercel/blob";
import { readdir, stat } from "fs/promises";
import path from "path";

export type PrivateCatalogFile = {
  name: string;
  url: string;
  sizeLabel: string;
  updatedAt: string;
  canManage: boolean;
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
];

const BLOB_PREFIX = "private-catalogs";
const CURRENT_CONAPROLE_DIR = "catalogos pdfs conaprole";
const SCHEDULED_CONAPROLE_DIR = "catalogos pdfs conaprole/catalogos pdfs 11 mayo";
const SCHEDULED_CONAPROLE_SWITCH_AT = "2026-05-11T00:00:00.000Z";

export function getPrivateCatalogFolder(slug: string) {
  return PRIVATE_CATALOG_FOLDERS.find((folder) => folder.slug === slug) || null;
}

function formatFileSize(size: number) {
  if (size < 1024 * 1024) {
    return `${Math.max(1, Math.round(size / 1024))} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function getTodayLabel() {
  return new Intl.DateTimeFormat("es-UY", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date());
}

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[\\/:*?"<>|]/g, "-").replace(/\s+/g, " ").trim();
}

function assertSafeFileName(fileName: string) {
  const normalized = fileName.trim();
  if (!normalized) {
    throw new Error("Nombre de archivo inválido");
  }

  if (normalized.includes("/") || normalized.includes("\\") || normalized.includes("..")) {
    throw new Error("Nombre de archivo inválido");
  }

  return normalized;
}

function getBlobPrefix(slug: string): string {
  return `${BLOB_PREFIX}/${slug}/`;
}

function getActiveConaproleDirName() {
  const switchAt = new Date(SCHEDULED_CONAPROLE_SWITCH_AT);
  return new Date() >= switchAt ? SCHEDULED_CONAPROLE_DIR : CURRENT_CONAPROLE_DIR;
}

async function listStaticCatalogFiles(slug: string): Promise<PrivateCatalogFile[]> {
  const files: PrivateCatalogFile[] = [];
  const todayLabel = getTodayLabel();

  // Keep legacy Conaprole PDFs visible from the repository's public folder.
  if (slug === "conaprole") {
    const activeDirName = getActiveConaproleDirName();
    const conaproleDir = path.join(process.cwd(), "public", "archivos", activeDirName);
    try {
      const entries = await readdir(conaproleDir, { withFileTypes: true });
      for (const entry of entries) {
        if (!entry.isFile() || !entry.name.toLowerCase().endsWith(".pdf")) {
          continue;
        }
        const absoluteFile = path.join(conaproleDir, entry.name);
        const meta = await stat(absoluteFile);
        files.push({
          name: entry.name,
          url: encodeURI(`/archivos/${activeDirName}/${entry.name}`),
          sizeLabel: formatFileSize(meta.size),
          updatedAt: todayLabel,
          canManage: false,
        });
      }
    } catch {
      // If the scheduled folder is not present yet, fall back to the current folder.
      if (activeDirName !== CURRENT_CONAPROLE_DIR) {
        try {
          const fallbackDir = path.join(process.cwd(), "public", "archivos", CURRENT_CONAPROLE_DIR);
          const fallbackEntries = await readdir(fallbackDir, { withFileTypes: true });
          for (const entry of fallbackEntries) {
            if (!entry.isFile() || !entry.name.toLowerCase().endsWith(".pdf")) {
              continue;
            }
            const absoluteFile = path.join(fallbackDir, entry.name);
            const meta = await stat(absoluteFile);
            files.push({
              name: entry.name,
              url: encodeURI(`/archivos/${CURRENT_CONAPROLE_DIR}/${entry.name}`),
              sizeLabel: formatFileSize(meta.size),
              updatedAt: todayLabel,
              canManage: false,
            });
          }
        } catch {
          // If read-only assets are unavailable in the current environment, skip gracefully.
        }
      }
    }
  }

  return files;
}

export async function listPrivateCatalogFiles(slug: string): Promise<PrivateCatalogFile[]> {
  const folder = getPrivateCatalogFolder(slug);
  if (!folder) {
    throw new Error("Carpeta privada no válida");
  }
  const todayLabel = getTodayLabel();

  const staticFiles = await listStaticCatalogFiles(slug);

  try {
    const prefix = getBlobPrefix(slug);
    const blobs = await list({ prefix });
    
    const files = blobs.blobs
      .filter((blob) => blob.pathname.toLowerCase().endsWith(".pdf"))
      .map((blob) => {
        const fileName = blob.pathname.replace(prefix, "");
        return {
          name: fileName,
          url: blob.downloadUrl || blob.url,
          sizeLabel: formatFileSize(blob.size),
          updatedAt: todayLabel,
          canManage: true,
          timestamp: new Date(blob.uploadedAt).getTime(),
        };
      });

    const blobFiles = files.sort((a, b) => b.timestamp - a.timestamp).map(({ timestamp, ...entry }) => entry);
    const mergedByName = new Map<string, PrivateCatalogFile>();

    for (const staticFile of staticFiles) {
      mergedByName.set(staticFile.name.toLowerCase(), staticFile);
    }

    // Blob files override static duplicates because they are the newest managed source.
    for (const blobFile of blobFiles) {
      mergedByName.set(blobFile.name.toLowerCase(), blobFile);
    }

    return Array.from(mergedByName.values());
  } catch (error) {
    console.error("Error listing files from Blob Storage:", error);
    return staticFiles;
  }
}

export async function savePrivateCatalogFile(slug: string, file: File): Promise<string> {
  const folder = getPrivateCatalogFolder(slug);
  if (!folder) {
    throw new Error("Carpeta privada no válida");
  }

  const originalName = sanitizeFileName(file.name || "catalogo.pdf");
  const hasPdfExtension = originalName.toLowerCase().endsWith(".pdf");
  const finalName = hasPdfExtension ? originalName : `${originalName}.pdf`;
  const prefix = getBlobPrefix(slug);
  const pathToSave = `${prefix}${finalName}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  await put(pathToSave, buffer, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  return finalName;
}

export async function deletePrivateCatalogFile(slug: string, fileName: string): Promise<void> {
  const folder = getPrivateCatalogFolder(slug);
  if (!folder) {
    throw new Error("Carpeta privada no válida");
  }

  const safeName = assertSafeFileName(fileName);
  const blobPath = `${getBlobPrefix(slug)}${safeName}`;
  await del(blobPath);
}

export async function renamePrivateCatalogFile(slug: string, currentName: string, nextName: string): Promise<string> {
  const folder = getPrivateCatalogFolder(slug);
  if (!folder) {
    throw new Error("Carpeta privada no válida");
  }

  const safeCurrent = assertSafeFileName(currentName);
  const sanitizedNext = sanitizeFileName(nextName || "");
  const withExtension = sanitizedNext.toLowerCase().endsWith(".pdf") ? sanitizedNext : `${sanitizedNext}.pdf`;
  const safeNext = assertSafeFileName(withExtension);

  if (safeCurrent.toLowerCase() === safeNext.toLowerCase()) {
    return safeCurrent;
  }

  const fromPath = `${getBlobPrefix(slug)}${safeCurrent}`;
  const toPath = `${getBlobPrefix(slug)}${safeNext}`;

  await copy(fromPath, toPath, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  await del(fromPath);

  return safeNext;
}
