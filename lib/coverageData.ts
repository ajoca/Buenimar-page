export type Locality = {
  id: string;
  name: string;
  department: "Colonia" | "Soriano";
  coordinates: [number, number]; // [lng, lat]
  population?: number;
  description?: string;
};

// Ubicación de Buenimar - Pablo Zufriategui 374, Colonia del Sacramento
export const buenimarLocation: [number, number] = [-57.8400, -34.4631];

// Localidades principales de la zona de cobertura
export const localities: Locality[] = [
  // Departamento de Colonia
  { id: "col-1", name: "Colonia del Sacramento", department: "Colonia", coordinates: [-57.8400, -34.4631], population: 26231, description: "Capital departamental" },
  { id: "col-2", name: "Carmelo", department: "Colonia", coordinates: [-58.28402, -34.00023], population: 17248, description: "Puerto sobre el Río Uruguay" },
  { id: "col-3", name: "Juan Lacaze", department: "Colonia", coordinates: [-57.45285, -34.41888], population: 12907, description: "Ciudad industrial" },
  { id: "col-4", name: "Rosario", department: "Colonia", coordinates: [-57.3461, -34.3142], population: 8679, description: "Centro agrícola-ganadero" },
  { id: "col-5", name: "Nueva Helvecia", department: "Colonia", coordinates: [-57.233333, -34.288889], population: 10360, description: "Colonia suiza" },
  { id: "col-6", name: "Tarariras", department: "Colonia", coordinates: [-57.6072, -34.2492], population: 3654, description: "Zona vitivinícola" },
  { id: "col-7", name: "Nueva Palmira", department: "Colonia", coordinates: [-58.4128, -33.8767], population: 9210, description: "Puerto fluvial" },
  { id: "col-8", name: "Ombúes de Lavalle", department: "Colonia", coordinates: [-57.8233, -34.1625], population: 2836, description: "Zona rural" },
  { id: "col-9", name: "Conchillas", department: "Colonia", coordinates: [-58.0314, -34.1614], population: 989, description: "Pueblo histórico" },
  { id: "col-10", name: "Colonia Valdense", department: "Colonia", coordinates: [-57.194038, -34.390671], population: 3878, description: "Colonia valdense" },
  { id: "col-11", name: "Miguelete", department: "Colonia", coordinates: [-57.647282, -34.006851], population: 2412, description: "Zona agrícola" },
  { id: "col-12", name: "La Paz", department: "Colonia", coordinates: [-57.309231, -34.347157], population: 1845, description: "Localidad costera" },
  { id: "col-13", name: "Britópolis", department: "Colonia", coordinates: [-57.271175, -34.431866], population: 687, description: "Localidad rural" },
  { id: "col-14", name: "Artilleros", department: "Colonia", coordinates: [-57.5300, -34.4300], population: 1156, description: "Pueblo costero" },
  { id: "col-15", name: "Playa Fomento", department: "Colonia", coordinates: [-57.25177, -34.433743], population: 456, description: "Balneario" },
  { id: "col-16", name: "Santa Ana", department: "Colonia", coordinates: [-57.593449, -34.421413], population: 378, description: "Localidad costera" },
];

// Polígonos simplificados de los departamentos (coordenadas aproximadas)
export const departmentPolygons = {
  Colonia: {
    type: "Feature" as const,
    properties: { name: "Colonia", color: "#dc2626" },
    geometry: {
      type: "Polygon" as const,
      coordinates: [[
        [-58.5, -34.5],
        [-58.5, -33.8],
        [-57.0, -33.8],
        [-57.0, -34.5],
        [-58.5, -34.5]
      ]]
    }
  },
  Soriano: {
    type: "Feature" as const,
    properties: { name: "Soriano", color: "#E11D48" },
    geometry: {
      type: "Polygon" as const,
      coordinates: [[
        [-58.5, -34.1],
        [-58.5, -33.0],
        [-56.8, -33.0],
        [-56.8, -34.1],
        [-58.5, -34.1]
      ]]
    }
  }
};

// Centro inicial del mapa (Departamento de Colonia)
export const mapCenter: [number, number] = [-57.8, -34.2];
export const mapZoom = 9;
