// Script para obtener el polígono real de Colonia desde datos oficiales de Uruguay
import fs from "node:fs";
import path from "node:path";
import proj4 from "proj4";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const URL =
  "https://catalogodatos.gub.uy/dataset/9bfa6e97-f40f-437e-aa13-a3406c50f762/resource/3c1b430a-c010-4db1-880d-bdc0f11e4ce9/download/departamentos.geojson";

const utm32721 = "+proj=utm +zone=21 +south +datum=WGS84 +units=m +no_defs";
const wgs84 = "EPSG:4326";

const isLngLat = ([x, y]) => Math.abs(x) <= 180 && Math.abs(y) <= 90;

const walkCoords = (coords, fn) =>
  Array.isArray(coords[0]) ? coords.map((c) => walkCoords(c, fn)) : fn(coords);

const reprojectGeometry = (geom) => {
  const convertPoint = ([x, y]) => proj4(utm32721, wgs84, [x, y]);
  return {
    ...geom,
    coordinates: walkCoords(geom.coordinates, (pt) => convertPoint(pt)),
  };
};

console.log("📥 Descargando datos oficiales de Uruguay...");

const res = await fetch(URL);
if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
const fc = await res.json();

// Busca "Colonia" en cualquier propiedad
const colonia = fc.features.find((f) =>
  Object.values(f.properties || {}).some(
    (v) => String(v).trim().toLowerCase() === "colonia"
  )
);

if (!colonia) throw new Error("No encontré el departamento Colonia en el GeoJSON.");

console.log("✅ Departamento Colonia encontrado");
console.log("   Tipo de geometría:", colonia.geometry.type);

// Extraer una coordenada de muestra según el tipo
let sample;
if (colonia.geometry.type === "Polygon") {
  sample = colonia.geometry.coordinates[0][0];
} else if (colonia.geometry.type === "MultiPolygon") {
  sample = colonia.geometry.coordinates[0][0][0];
} else {
  throw new Error(`Tipo de geometría no soportado: ${colonia.geometry.type}`);
}

console.log("   Coordenada de muestra:", sample);

// Verificar si ya están en lng/lat (WGS84)
const isInWGS84 = Array.isArray(sample) && isLngLat(sample);
console.log("   ¿Ya está en WGS84?", isInWGS84);

const geometry = isInWGS84
  ? colonia.geometry
  : reprojectGeometry(colonia.geometry);

const out = {
  type: "FeatureCollection",
  features: [{ type: "Feature", properties: { name: "Colonia" }, geometry }],
};

const outPath = path.join(__dirname, "..", "lib", "geo", "colonia.geojson");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(out, null, 2));

console.log("🎉 GeoJSON generado:", outPath);
