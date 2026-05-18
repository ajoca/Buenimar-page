import { copy, del, list, put } from "@vercel/blob";
import { readdir, stat } from "fs/promises";
import path from "path";

export type PrivateCatalogFile = {
  name: string;
  displayName: string;
  url: string;
  viewUrl: string;
  sizeLabel: string;
  updatedAt: string;
  canManage: boolean;
  kind: "pdf" | "spreadsheet" | "image" | "other";
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
    slug: "lista-precios-general",
    name: "Lista de Precios General",
    icon: "/og-buenimar.png",
    description: "Listas de precios generales de Buenimar.",
  },
];

const BLOB_PREFIX = "private-catalogs";
const CURRENT_CONAPROLE_DIR = "catalogos pdfs conaprole";
const SCHEDULED_CONAPROLE_DIR = "catalogos pdfs conaprole/catalogos pdfs 11 mayo";
const SCHEDULED_CONAPROLE_SWITCH_AT = "2026-05-11T00:00:00.000Z";
const CONAPROLE_PRICE_LIST_DIR = "precios";
const GENERAL_PRICE_LIST_DIR = "lista precios general";
const LEGACY_GENERAL_PRICE_LIST_DIR = "buenimar-general";
const CONAPROLE_PRICE_LIST_UPDATED_AT = "11/05/2026";
const SUPPORTED_PRIVATE_FILE_EXTENSIONS = [
  ".pdf",
  ".xlsx",
  ".xls",
  ".csv",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".avif",
];

const CONAPROLE_PRICE_DISPLAY_NAMES: Record<string, string> = {
  "lista precios conaprole (40).pdf": "Lista de precios Conaprole - Yogures y frutados",
  "lista precios conaprole 2 (41).pdf": "Lista de precios Conaprole - Mantecas",
  "lista precios conaprole 3 (42).pdf": "Lista de precios Conaprole - Quesos pasta dura y semidura",
  "lista precios conaprole 4 (43).pdf": "Lista de precios Conaprole - Bebidas lacteas y Biotop",
  "lista precios conaprole 5 (44).pdf": "Lista de precios Conaprole - Dulce de leche y dulce crema",
  "lista precios conaprole congelados (47).pdf": "Lista de precios Conaprole Congelados - Empanadas y bastones",
  "lista precios conaprole congelados (48).pdf": "Lista de precios Conaprole Congelados - Papas Simplot",
  "lista precios conaprole congelados (49).pdf": "Lista de precios Conaprole Congelados - Helado crema granel y familiar",
  "lista precios conaprole congelados (50).pdf": "Lista de precios Conaprole Congelados - Helado crema individual",
  "lista precios conaprole congelados (51).pdf": "Lista de precios Conaprole Congelados - Alfajores, salchichon y triffles",
};

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

function getFileExtension(fileName: string) {
  const extension = path.extname(fileName).toLowerCase();
  return extension;
}

function isSupportedPrivateFile(fileName: string) {
  return SUPPORTED_PRIVATE_FILE_EXTENSIONS.includes(getFileExtension(fileName));
}

function getPrivateFileKind(fileName: string): PrivateCatalogFile["kind"] {
  const extension = getFileExtension(fileName);

  if (extension === ".pdf") {
    return "pdf";
  }

  if ([".xlsx", ".xls", ".csv"].includes(extension)) {
    return "spreadsheet";
  }

  if ([".png", ".jpg", ".jpeg", ".webp", ".avif"].includes(extension)) {
    return "image";
  }

  return "other";
}

function getViewUrl(url: string, fileName: string) {
  const kind = getPrivateFileKind(fileName);
  if (kind === "spreadsheet") {
    const extension = getFileExtension(fileName);
    if (extension === ".csv") {
      return url;
    }

    return `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(url)}`;
  }

  return url;
}

function getConaprolePriceDisplayName(fileName: string) {
  return CONAPROLE_PRICE_DISPLAY_NAMES[fileName.toLowerCase()] || fileName;
}

function getGeneralPriceDisplayName(fileName: string) {
  const extension = path.extname(fileName);
  let baseName = path.basename(fileName, extension);

  baseName = baseName.replace(/\s+/g, " ").trim();
  baseName = baseName.replace(/^lista\s+precios?/i, "Lista de precios");
  baseName = baseName.replace(/\s*\(\d+\)(?:\s*\(\d+\))?/gi, "");
  baseName = baseName.replace(/\s+\d+$/g, "");
  baseName = baseName.replace(/\(\s*\)/g, "").replace(/\s+/g, " ").trim();

  return baseName || fileName;
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

  if (slug === "lista-precios-general") {
    const generalDir = path.join(process.cwd(), "public", "archivos", GENERAL_PRICE_LIST_DIR);
    try {
      const entries = await readdir(generalDir, { withFileTypes: true });
      for (const entry of entries) {
        if (!entry.isFile() || !isSupportedPrivateFile(entry.name)) {
          continue;
        }

        const absoluteFile = path.join(generalDir, entry.name);
        const meta = await stat(absoluteFile);
        const assetUrl = encodeURI(`/archivos/buenimar-general/${entry.name}`);

        files.push({
          name: entry.name,
          displayName: getGeneralPriceDisplayName(entry.name),
          url: assetUrl,
          viewUrl: getViewUrl(assetUrl, entry.name),
          sizeLabel: formatFileSize(meta.size),
          updatedAt: todayLabel,
          canManage: false,
          kind: getPrivateFileKind(entry.name),
        });
      }
    } catch {
      try {
        const legacyDir = path.join(process.cwd(), "public", "archivos", LEGACY_GENERAL_PRICE_LIST_DIR);
        const legacyEntries = await readdir(legacyDir, { withFileTypes: true });
        for (const entry of legacyEntries) {
          if (!entry.isFile() || !isSupportedPrivateFile(entry.name)) {
            continue;
          }

          const absoluteFile = path.join(legacyDir, entry.name);
          const meta = await stat(absoluteFile);
          const assetUrl = encodeURI(`/archivos/${LEGACY_GENERAL_PRICE_LIST_DIR}/${entry.name}`);

          files.push({
            name: entry.name,
            displayName: getGeneralPriceDisplayName(entry.name),
            url: assetUrl,
            viewUrl: getViewUrl(assetUrl, entry.name),
            sizeLabel: formatFileSize(meta.size),
            updatedAt: todayLabel,
            canManage: false,
            kind: getPrivateFileKind(entry.name),
          });
        }
      } catch {
        return [];
      }
    }

    return files;
  }

  // Keep legacy Conaprole PDFs visible from the repository's public folder.
  if (slug === "conaprole") {
    const activeDirName = getActiveConaproleDirName();
    const conaproleDir = path.join(process.cwd(), "public", "archivos", activeDirName);
    try {
      const entries = await readdir(conaproleDir, { withFileTypes: true });
      for (const entry of entries) {
        if (!entry.isFile() || !isSupportedPrivateFile(entry.name)) {
          continue;
        }
        const absoluteFile = path.join(conaproleDir, entry.name);
        const meta = await stat(absoluteFile);
        const assetUrl = encodeURI(`/archivos/${activeDirName}/${entry.name}`);
        files.push({
          name: entry.name,
          displayName: entry.name,
          url: assetUrl,
          viewUrl: getViewUrl(assetUrl, entry.name),
          sizeLabel: formatFileSize(meta.size),
          updatedAt: todayLabel,
          canManage: false,
          kind: getPrivateFileKind(entry.name),
        });
      }
    } catch {
      // If the scheduled folder is not present yet, fall back to the current folder.
      if (activeDirName !== CURRENT_CONAPROLE_DIR) {
        try {
          const fallbackDir = path.join(process.cwd(), "public", "archivos", CURRENT_CONAPROLE_DIR);
          const fallbackEntries = await readdir(fallbackDir, { withFileTypes: true });
          for (const entry of fallbackEntries) {
            if (!entry.isFile() || !isSupportedPrivateFile(entry.name)) {
              continue;
            }
            const absoluteFile = path.join(fallbackDir, entry.name);
            const meta = await stat(absoluteFile);
            const assetUrl = encodeURI(`/archivos/${CURRENT_CONAPROLE_DIR}/${entry.name}`);
            files.push({
              name: entry.name,
              displayName: entry.name,
              url: assetUrl,
              viewUrl: getViewUrl(assetUrl, entry.name),
              sizeLabel: formatFileSize(meta.size),
              updatedAt: todayLabel,
              canManage: false,
              kind: getPrivateFileKind(entry.name),
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

export async function listPrivatePriceFiles(slug: string): Promise<PrivateCatalogFile[]> {
  if (slug !== "conaprole") {
    return [];
  }

  const todayLabel = getTodayLabel();
  const files: PrivateCatalogFile[] = [];
  const pricesDir = path.join(process.cwd(), "public", "archivos", CONAPROLE_PRICE_LIST_DIR);

  try {
    const entries = await readdir(pricesDir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isFile() || !isSupportedPrivateFile(entry.name)) {
        continue;
      }

      const absoluteFile = path.join(pricesDir, entry.name);
      const meta = await stat(absoluteFile);
      const assetUrl = encodeURI(`/archivos/${CONAPROLE_PRICE_LIST_DIR}/${entry.name}`);

      files.push({
        name: entry.name,
        displayName: getConaprolePriceDisplayName(entry.name),
        url: assetUrl,
        viewUrl: getViewUrl(assetUrl, entry.name),
        sizeLabel: formatFileSize(meta.size),
        updatedAt: CONAPROLE_PRICE_LIST_UPDATED_AT,
        canManage: false,
        kind: getPrivateFileKind(entry.name),
      });
    }
  } catch {
    return [];
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
      .filter((blob) => isSupportedPrivateFile(blob.pathname))
      .map((blob) => {
        const fileName = blob.pathname.replace(prefix, "");
        const fileUrl = blob.downloadUrl || blob.url;
        return {
          name: fileName,
          displayName: fileName,
          url: fileUrl,
          viewUrl: getViewUrl(fileUrl, fileName),
          sizeLabel: formatFileSize(blob.size),
          updatedAt: todayLabel,
          canManage: true,
          kind: getPrivateFileKind(fileName),
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

  const originalName = sanitizeFileName(file.name || "archivo");
  const extension = getFileExtension(originalName);

  if (!isSupportedPrivateFile(originalName) || !extension) {
    throw new Error("Tipo de archivo no soportado");
  }

  const finalName = originalName;
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
  const currentExtension = getFileExtension(safeCurrent);
  const nextExtension = getFileExtension(sanitizedNext);
  const withExtension = nextExtension ? sanitizedNext : `${sanitizedNext}${currentExtension || ".pdf"}`;
  const safeNext = assertSafeFileName(withExtension);

  if (!isSupportedPrivateFile(safeNext)) {
    throw new Error("Tipo de archivo no soportado");
  }

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
