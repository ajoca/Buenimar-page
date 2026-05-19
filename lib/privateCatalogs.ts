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
const CURRENT_CONAPROLE_DIR = "catalogos pdfs conaprole/catalogos pdfs 11 mayo";
const SCHEDULED_CONAPROLE_DIR = "catalogos pdfs conaprole/catalogos pdfs 11 mayo";
const SCHEDULED_CONAPROLE_SWITCH_AT = "2026-05-11T00:00:00.000Z";
const CONAPROLE_PRICE_LIST_DIR = "precios";
const GENERAL_PRICE_LIST_DIR = "lista precios general";
const LEGACY_GENERAL_PRICE_LIST_DIR = "buenimar-general";
const CONAPROLE_PRICE_LIST_UPDATED_AT = "11/05/2026";
const GENERAL_PRICE_FILES = [
  "Lista Precios  Auriculares y Parlantes (57).pdf",
  "Lista Precios  Olisur (56).pdf",
  "Lista Precios 5 Estrellas y Augusta (1).pdf",
  "Lista Precios Aceites (2).pdf",
  "Lista Precios Ades (3).pdf",
  "Lista Precios Almena (vinos, whisky y más) (4).pdf",
  "Lista Precios Altos del Plata, Terrazas y otros (5).pdf",
  "Lista Precios Articulos Varios (6).pdf",
  "Lista Precios Balance (48).pdf",
  "Lista Precios Cervezas 1 (7).pdf",
  "Lista Precios Cervezas 2 (8).pdf",
  "Lista Precios Chandon y otros (9).pdf",
  "Lista Precios Coca Cola 1 (10).pdf",
  "Lista Precios Coca Cola 2 (11).pdf",
  "Lista Precios Discarvi (12).pdf",
  "Lista Precios El Faro (13).pdf",
  "Lista Precios Familia Deicas (14).pdf",
  "Lista Precios Fritas (15).pdf",
  "Lista Precios Galletitas Cañuelas (16).pdf",
  "Lista Precios Gin Sur (54).pdf",
  "Lista Precios Glace (17).pdf",
  "Lista Precios Haagen Dazs y Framore(18).pdf",
  "Lista Precios Harinas (19).pdf",
  "Lista Precios Iguacu (20).pdf",
  "Lista Precios La Bordona (21).pdf",
  "Lista Precios La Especialista Pizzas (54).pdf",
  "Lista Precios La Paila (23) (3).pdf",
  "Lista Precios La Paila (23).pdf",
  "Lista Precios Limpieza Unilever (24).pdf",
  "Lista Precios Listo para Comer (46).pdf",
  "Lista Precios Macru (41).pdf",
  "Lista Precios Macru Power Bank (53).pdf",
  "Lista Precios Macru Smartwatch (52).pdf",
  "Lista Precios Manducas (25).pdf",
  "Lista Precios Olaso (45).pdf",
  "Lista Precios Pagnifique (26).pdf",
  "Lista Precios Pescados y Mariscos (27).pdf",
  "Lista Precios Primocao (28).pdf",
  "Lista Precios Sadia (29).pdf",
  "Lista Precios Schneck Comercios y Super (30).pdf",
  "Lista Precios Schneck Comercios y Super (55) 2.pdf",
  "Lista Precios Shampoo Procao (31).pdf",
  "Lista Precios SIN TAC CAÑUELAS (54).pdf",
  "Lista Precios Stack (32).pdf",
  "Lista Precios Unilever (33).pdf",
  "Lista Precios Vegetales Ensaladas (34).pdf",
  "Lista Precios Vinos Bianchi (35).pdf",
  "Lista Precios Vinos Concha y Toro (36).pdf",
  "Lista Precios Vinos Don Pascual (37).pdf",
  "Lista Precios Vinos Felíx Solís y Caviccioli(38).pdf",
  "Lista Precios Vinos Norton (39).pdf",
  "Lista Precios WINSO (55).pdf",
];
const CONAPROLE_CATALOG_FILES = [
  "01_Leches_con_precios.pdf",
  "02_Leches_UHT_con_precios.pdf",
  "03_Leche_en_Polvo_con_precios.pdf",
  "04_Leches_Saborizadas_con_precios.pdf",
  "05_Mantecas_con_precios.pdf",
  "06_Yogures_con_precios.pdf",
  "07_Viva_con_precios.pdf",
  "08_Yogures_Biotransit_con_precios.pdf",
  "09_Postres_con_precios.pdf",
  "10_Deleite_con_precios.pdf",
  "11_Viva_Postres_con_precios.pdf",
  "12_Jugos_con_precios.pdf",
  "13_Jugos_Light_con_precios.pdf",
  "14_Dulce_de_Leche_con_precios.pdf",
  "15_Crema_de_Leche_con_precios.pdf",
  "16_Pulpa_de_Tomate_con_precios.pdf",
  "17_Queso_Rallado_con_precios.pdf",
  "18_Alpa_con_precios.pdf",
  "19_Queso_Procesado_con_precios.pdf",
  "20_Queso_Pasta_Blanda_con_precios.pdf",
  "21_Queso_Pasta_Semidura_con_precios.pdf",
  "22_Queso_Pasta_Dura_con_precios.pdf",
  "23_Helados_Impulsivos_con_precios.pdf",
  "24_Helados_Familiares_con_precios.pdf",
  "25_Helados_Granel_con_precios.pdf",
  "26_Congelados_con_precios.pdf",
  "27_Polar_Food_con_precios.pdf",
];
const CONAPROLE_CATALOG_UPDATED_AT = "11/05/2026";
const CONAPROLE_PRICE_FILES = [
  "Lista Precios Conaprole (40).pdf",
  "Lista Precios Conaprole 2 (41).pdf",
  "Lista Precios Conaprole 3 (42).pdf",
  "Lista Precios Conaprole 4 (43).pdf",
  "Lista Precios Conaprole 5 (44).pdf",
  "Lista Precios Conaprole Congelados (47).pdf",
  "Lista Precios Conaprole Congelados (48).pdf",
  "Lista Precios Conaprole Congelados (49).pdf",
  "Lista Precios Conaprole Congelados (50).pdf",
  "Lista Precios Conaprole Congelados (51).pdf",
];
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
    for (const fileName of GENERAL_PRICE_FILES) {
      if (!isSupportedPrivateFile(fileName)) {
        continue;
      }

      const primaryUrl = encodeURI(`/archivos/${GENERAL_PRICE_LIST_DIR}/${fileName}`);

      files.push({
        name: fileName,
        displayName: getGeneralPriceDisplayName(fileName),
        url: primaryUrl,
        viewUrl: getViewUrl(primaryUrl, fileName),
        sizeLabel: "-",
        updatedAt: todayLabel,
        canManage: false,
        kind: getPrivateFileKind(fileName),
      });
    }

    // Backward compatibility for legacy static path while users migrate assets.
    if (files.length === 0) {
      for (const fileName of GENERAL_PRICE_FILES) {
        if (!isSupportedPrivateFile(fileName)) {
          continue;
        }

        const legacyUrl = encodeURI(`/archivos/${LEGACY_GENERAL_PRICE_LIST_DIR}/${fileName}`);

        files.push({
          name: fileName,
          displayName: getGeneralPriceDisplayName(fileName),
          url: legacyUrl,
          viewUrl: getViewUrl(legacyUrl, fileName),
          sizeLabel: "-",
          updatedAt: todayLabel,
          canManage: false,
          kind: getPrivateFileKind(fileName),
        });
      }
    }

    return files;
  }

  // Keep legacy Conaprole PDFs visible from the repository's public folder.
  if (slug === "conaprole") {
    const activeDirName = getActiveConaproleDirName();
    for (const fileName of CONAPROLE_CATALOG_FILES) {
      if (!isSupportedPrivateFile(fileName)) {
        continue;
      }

      const assetUrl = encodeURI(`/archivos/${activeDirName}/${fileName}`);
      files.push({
        name: fileName,
        displayName: fileName,
        url: assetUrl,
        viewUrl: getViewUrl(assetUrl, fileName),
        sizeLabel: "-",
        updatedAt: CONAPROLE_CATALOG_UPDATED_AT || todayLabel,
        canManage: false,
        kind: getPrivateFileKind(fileName),
      });
    }
  }

  return files;
}

export async function listPrivatePriceFiles(slug: string): Promise<PrivateCatalogFile[]> {
  if (slug !== "conaprole") {
    return [];
  }

  const files: PrivateCatalogFile[] = [];
  for (const fileName of CONAPROLE_PRICE_FILES) {
    if (!isSupportedPrivateFile(fileName)) {
      continue;
    }

    const assetUrl = encodeURI(`/archivos/${CONAPROLE_PRICE_LIST_DIR}/${fileName}`);
    files.push({
      name: fileName,
      displayName: getConaprolePriceDisplayName(fileName),
      url: assetUrl,
      viewUrl: getViewUrl(assetUrl, fileName),
      sizeLabel: "-",
      updatedAt: CONAPROLE_PRICE_LIST_UPDATED_AT,
      canManage: false,
      kind: getPrivateFileKind(fileName),
    });
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
