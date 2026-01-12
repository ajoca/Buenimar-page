// Script para extraer el polígono real de Colonia desde el GeoJSON de Uruguay
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const URL = "https://raw.githubusercontent.com/alotropico/uruguay.geo/master/uruguay.geojson";

console.log("📥 Descargando GeoJSON de Uruguay...");

const res = await fetch(URL);
if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
const uruguayGeoJSON = await res.json();

console.log("✅ GeoJSON descargado");

// Buscar Colonia
const coloniaFeature = uruguayGeoJSON.features.find((f) =>
  Object.values(f.properties || {}).some(
    (v) => String(v).trim().toLowerCase() === "colonia"
  )
);

if (!coloniaFeature) {
  throw new Error("No se encontró el departamento de Colonia en el GeoJSON.");
}

console.log("✅ Departamento Colonia encontrado");
console.log("   Tipo de geometría:", coloniaFeature.geometry.type);

// Crear el GeoJSON solo con Colonia
const coloniaGeoJSON = {
  type: "FeatureCollection",
  features: [coloniaFeature],
};

// Guardar
const outPath = path.join(__dirname, "..", "lib", "geo", "colonia.json");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(coloniaGeoJSON, null, 2));

console.log("🎉 GeoJSON de Colonia guardado:", outPath);
