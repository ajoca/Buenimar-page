// Mock data for Buenimar dashboard POC
// All data is fictional and for demonstration purposes

export interface Client {
  id: string;
  name: string;
  city: string;
  region: string;
  totalSales: number;
  monthlyAvg: number;
  lastPurchase: string;
  status: "active" | "inactive" | "pending";
  purchaseFrequency: number; // purchases per month
}

export interface DailySales {
  date: string;
  sales: number;
  orders: number;
}

export interface ProductCategory {
  category: string;
  sales: number;
  percentage: number;
}

export interface AlertData {
  id: string;
  title: string;
  message: string;
  severity: "critical" | "medium" | "low";
  timestamp: string;
  resolved: boolean;
}

// Top 50 clients (sorted by total sales)
export const topClients: Client[] = [
  { id: "C001", name: "Supermercado Fregosi", city: "Montevideo", region: "Sur", totalSales: 485230, monthlyAvg: 40435, lastPurchase: "2026-05-17", status: "active", purchaseFrequency: 12 },
  { id: "C002", name: "Distribuidora Gómez SA", city: "Canelones", region: "Litoral", totalSales: 425100, monthlyAvg: 35425, lastPurchase: "2026-05-16", status: "active", purchaseFrequency: 10 },
  { id: "C003", name: "Almacén Don Carlos", city: "Maldonado", region: "Este", totalSales: 395800, monthlyAvg: 32983, lastPurchase: "2026-05-15", status: "active", purchaseFrequency: 9 },
  { id: "C004", name: "La Tienda del Barrio", city: "Montevideo", region: "Centro", totalSales: 367500, monthlyAvg: 30625, lastPurchase: "2026-05-18", status: "active", purchaseFrequency: 11 },
  { id: "C005", name: "Comercial Flores", city: "Paysandú", region: "Litoral", totalSales: 342200, monthlyAvg: 28517, lastPurchase: "2026-05-14", status: "active", purchaseFrequency: 8 },
  { id: "C006", name: "Mega Distribuidora", city: "Rivera", region: "Norte", totalSales: 318900, monthlyAvg: 26575, lastPurchase: "2026-05-17", status: "active", purchaseFrequency: 9 },
  { id: "C007", name: "Tiendas Unidas Express", city: "Tacuarembó", region: "Norte", totalSales: 305600, monthlyAvg: 25467, lastPurchase: "2026-05-16", status: "active", purchaseFrequency: 8 },
  { id: "C008", name: "Distribuidor Regional", city: "Mercedes", region: "Litoral", totalSales: 287400, monthlyAvg: 23950, lastPurchase: "2026-05-18", status: "active", purchaseFrequency: 7 },
  { id: "C009", name: "Comercio Local SA", city: "Rocha", region: "Este", totalSales: 276800, monthlyAvg: 23067, lastPurchase: "2026-05-15", status: "active", purchaseFrequency: 7 },
  { id: "C010", name: "Supermercado Central", city: "Salto", region: "Norte", totalSales: 265300, monthlyAvg: 22108, lastPurchase: "2026-05-17", status: "active", purchaseFrequency: 6 },
  { id: "C011", name: "Almacenes del Este", city: "Maldonado", region: "Este", totalSales: 254100, monthlyAvg: 21175, lastPurchase: "2026-05-16", status: "active", purchaseFrequency: 6 },
  { id: "C012", name: "Distriby Plus", city: "Canelones", region: "Litoral", totalSales: 241800, monthlyAvg: 20150, lastPurchase: "2026-05-14", status: "active", purchaseFrequency: 6 },
  { id: "C013", name: "El Buen Comprador", city: "Montevideo", region: "Sur", totalSales: 238900, monthlyAvg: 19908, lastPurchase: "2026-05-13", status: "active", purchaseFrequency: 5 },
  { id: "C014", name: "Casa del Consumidor", city: "Paysandú", region: "Litoral", totalSales: 225600, monthlyAvg: 18800, lastPurchase: "2026-05-18", status: "active", purchaseFrequency: 5 },
  { id: "C015", name: "Tienda Mix", city: "Durazno", region: "Centro", totalSales: 212300, monthlyAvg: 17692, lastPurchase: "2026-05-17", status: "active", purchaseFrequency: 5 },
  { id: "C016", name: "Montino Distribuidora", city: "Montevideo", region: "Centro", totalSales: 201200, monthlyAvg: 16767, lastPurchase: "2026-05-16", status: "active", purchaseFrequency: 4 },
  { id: "C017", name: "Stock Seguro", city: "Soriano", region: "Litoral", totalSales: 195800, monthlyAvg: 16317, lastPurchase: "2026-05-15", status: "active", purchaseFrequency: 4 },
  { id: "C018", name: "Comercial Moderno", city: "Rivera", region: "Norte", totalSales: 188600, monthlyAvg: 15717, lastPurchase: "2026-05-18", status: "active", purchaseFrequency: 4 },
  { id: "C019", name: "Tiendas Confort", city: "Tacuarembó", region: "Norte", totalSales: 176400, monthlyAvg: 14700, lastPurchase: "2026-05-14", status: "active", purchaseFrequency: 4 },
  { id: "C020", name: "El Depósito", city: "Cerro Largo", region: "Centro", totalSales: 165200, monthlyAvg: 13767, lastPurchase: "2026-05-17", status: "active", purchaseFrequency: 3 },
  { id: "C021", name: "Supermercado Victoria", city: "Montevideo", region: "Sur", totalSales: 159800, monthlyAvg: 13317, lastPurchase: "2026-05-16", status: "active", purchaseFrequency: 3 },
  { id: "C022", name: "Almacén Patagonico", city: "Maldonado", region: "Este", totalSales: 154200, monthlyAvg: 12850, lastPurchase: "2026-05-18", status: "active", purchaseFrequency: 3 },
  { id: "C023", name: "Distribuidora Sur", city: "Canelones", region: "Litoral", totalSales: 147900, monthlyAvg: 12325, lastPurchase: "2026-05-15", status: "active", purchaseFrequency: 3 },
  { id: "C024", name: "Tienda Popular", city: "Salto", region: "Norte", totalSales: 142100, monthlyAvg: 11842, lastPurchase: "2026-05-17", status: "inactive", purchaseFrequency: 2 },
  { id: "C025", name: "Comercio Directo", city: "Paysandú", region: "Litoral", totalSales: 136800, monthlyAvg: 11400, lastPurchase: "2026-05-14", status: "active", purchaseFrequency: 2 },
  { id: "C026", name: "Almacén Regional", city: "Rivera", region: "Norte", totalSales: 131200, monthlyAvg: 10933, lastPurchase: "2026-05-16", status: "active", purchaseFrequency: 2 },
  { id: "C027", name: "La Bodega Premium", city: "Montevideo", region: "Centro", totalSales: 127600, monthlyAvg: 10633, lastPurchase: "2026-05-18", status: "active", purchaseFrequency: 2 },
  { id: "C028", name: "Tiendas del Paisano", city: "Durazno", region: "Centro", totalSales: 121900, monthlyAvg: 10158, lastPurchase: "2026-05-13", status: "pending", purchaseFrequency: 2 },
  { id: "C029", name: "Distribuidora Gratis", city: "Cerro Largo", region: "Centro", totalSales: 116400, monthlyAvg: 9700, lastPurchase: "2026-05-17", status: "active", purchaseFrequency: 2 },
  { id: "C030", name: "Comercio Cercano", city: "Rocha", region: "Este", totalSales: 111200, monthlyAvg: 9267, lastPurchase: "2026-05-15", status: "active", purchaseFrequency: 2 },
  { id: "C031", name: "Super Ahorro", city: "Tacuarembó", region: "Norte", totalSales: 105800, monthlyAvg: 8817, lastPurchase: "2026-05-18", status: "active", purchaseFrequency: 2 },
  { id: "C032", name: "Almacén Económico", city: "Soriano", region: "Litoral", totalSales: 100100, monthlyAvg: 8342, lastPurchase: "2026-05-16", status: "active", purchaseFrequency: 1 },
  { id: "C033", name: "Tienda Rápida", city: "Paysandú", region: "Litoral", totalSales: 95300, monthlyAvg: 7942, lastPurchase: "2026-05-14", status: "active", purchaseFrequency: 1 },
  { id: "C034", name: "Distribuidora Local", city: "Mercedes", region: "Litoral", totalSales: 89600, monthlyAvg: 7467, lastPurchase: "2026-05-17", status: "active", purchaseFrequency: 1 },
  { id: "C035", name: "El Negocio", city: "Maldonado", region: "Este", totalSales: 84200, monthlyAvg: 7017, lastPurchase: "2026-05-15", status: "inactive", purchaseFrequency: 1 },
  { id: "C036", name: "Tiendas del Metro", city: "Montevideo", region: "Sur", totalSales: 79500, monthlyAvg: 6625, lastPurchase: "2026-05-18", status: "active", purchaseFrequency: 1 },
  { id: "C037", name: "Almacén de la Zona", city: "Rivera", region: "Norte", totalSales: 74800, monthlyAvg: 6233, lastPurchase: "2026-05-13", status: "active", purchaseFrequency: 1 },
  { id: "C038", name: "Supermercadito Local", city: "Canelones", region: "Litoral", totalSales: 70100, monthlyAvg: 5842, lastPurchase: "2026-05-16", status: "active", purchaseFrequency: 1 },
  { id: "C039", name: "Comercial Export", city: "Salto", region: "Norte", totalSales: 65400, monthlyAvg: 5450, lastPurchase: "2026-05-14", status: "active", purchaseFrequency: 1 },
  { id: "C040", name: "Distribuidora Pequeña", city: "Rocha", region: "Este", totalSales: 61200, monthlyAvg: 5100, lastPurchase: "2026-05-17", status: "pending", purchaseFrequency: 1 },
  { id: "C041", name: "Tienda Sofia", city: "Durazno", region: "Centro", totalSales: 57800, monthlyAvg: 4817, lastPurchase: "2026-05-15", status: "active", purchaseFrequency: 1 },
  { id: "C042", name: "Almacén Martinez", city: "Fernando de la Mora", region: "Centro", totalSales: 53600, monthlyAvg: 4467, lastPurchase: "2026-05-18", status: "active", purchaseFrequency: 1 },
  { id: "C043", name: "El Quiosco Mayor", city: "Montevideo", region: "Centro", totalSales: 49200, monthlyAvg: 4100, lastPurchase: "2026-05-16", status: "inactive", purchaseFrequency: 1 },
  { id: "C044", name: "Tiendita Express", city: "Paysandú", region: "Litoral", totalSales: 45800, monthlyAvg: 3817, lastPurchase: "2026-05-13", status: "active", purchaseFrequency: 1 },
  { id: "C045", name: "Comercio Veloz", city: "Tacuarembó", region: "Norte", totalSales: 41600, monthlyAvg: 3467, lastPurchase: "2026-05-17", status: "active", purchaseFrequency: 1 },
  { id: "C046", name: "Almacén Turístico", city: "Maldonado", region: "Este", totalSales: 38200, monthlyAvg: 3183, lastPurchase: "2026-05-14", status: "active", purchaseFrequency: 1 },
  { id: "C047", name: "Distribuidora Nova", city: "Soriano", region: "Litoral", totalSales: 35400, monthlyAvg: 2950, lastPurchase: "2026-05-18", status: "pending", purchaseFrequency: 1 },
  { id: "C048", name: "Tienda del Cambio", city: "Rivera", region: "Norte", totalSales: 32100, monthlyAvg: 2675, lastPurchase: "2026-05-15", status: "active", purchaseFrequency: 1 },
  { id: "C049", name: "Comercial Piedra", city: "Cerro Largo", region: "Centro", totalSales: 29200, monthlyAvg: 2433, lastPurchase: "2026-05-16", status: "active", purchaseFrequency: 1 },
  { id: "C050", name: "Almacén Último", city: "Rocha", region: "Este", totalSales: 26800, monthlyAvg: 2233, lastPurchase: "2026-05-14", status: "active", purchaseFrequency: 1 },
];

// Daily sales data for the past 30 days
export const dailySalesData: DailySales[] = [
  { date: "18 Abr", sales: 28500, orders: 45 },
  { date: "19 Abr", sales: 31200, orders: 52 },
  { date: "20 Abr", sales: 35800, orders: 58 },
  { date: "21 Abr", sales: 29400, orders: 48 },
  { date: "22 Abr", sales: 42100, orders: 68 },
  { date: "23 Abr", sales: 38900, orders: 63 },
  { date: "24 Abr", sales: 45600, orders: 73 },
  { date: "25 Abr", sales: 33300, orders: 54 },
  { date: "26 Abr", sales: 40200, orders: 65 },
  { date: "27 Abr", sales: 37800, orders: 61 },
  { date: "28 Abr", sales: 44500, orders: 71 },
  { date: "29 Abr", sales: 39100, orders: 63 },
  { date: "30 Abr", sales: 41800, orders: 67 },
  { date: "01 May", sales: 35200, orders: 57 },
  { date: "02 May", sales: 42900, orders: 69 },
  { date: "03 May", sales: 38600, orders: 62 },
  { date: "04 May", sales: 46300, orders: 74 },
  { date: "05 May", sales: 40100, orders: 65 },
  { date: "06 May", sales: 43700, orders: 70 },
  { date: "07 May", sales: 37500, orders: 60 },
  { date: "08 May", sales: 45200, orders: 72 },
  { date: "09 May", sales: 39800, orders: 64 },
  { date: "10 May", sales: 44100, orders: 71 },
  { date: "11 May", sales: 36900, orders: 59 },
  { date: "12 May", sales: 47600, orders: 76 },
  { date: "13 May", sales: 41300, orders: 66 },
  { date: "14 May", sales: 45900, orders: 73 },
  { date: "15 May", sales: 38200, orders: 61 },
  { date: "16 May", sales: 46800, orders: 75 },
  { date: "17 May", sales: 42100, orders: 68 },
];

// Product categories distribution
export const productCategories: ProductCategory[] = [
  { category: "Congelados", sales: 1245600, percentage: 28 },
  { category: "Frescos", sales: 1089300, percentage: 25 },
  { category: "Bebidas", sales: 876400, percentage: 20 },
  { category: "Lácteos", sales: 654200, percentage: 15 },
  { category: "Otros", sales: 351500, percentage: 8 },
];

// Regional sales
export const regionalSales = [
  { region: "Sur", sales: 1250000 },
  { region: "Centro", sales: 920000 },
  { region: "Litoral", sales: 1680000 },
  { region: "Este", sales: 780000 },
  { region: "Norte", sales: 625000 },
];

// Alerts
export const alerts: AlertData[] = [
  {
    id: "A001",
    title: "Bajo stock - Congelados",
    message: "Inventario de productos congelados por debajo del 20% en el depósito central",
    severity: "medium",
    timestamp: "2026-05-18T14:30:00Z",
    resolved: false,
  },
  {
    id: "A002",
    title: "Cliente inactivo - Supermercado Fregosi",
    message: "Cliente top 5 sin compras en los últimos 7 días",
    severity: "critical",
    timestamp: "2026-05-17T10:15:00Z",
    resolved: false,
  },
  {
    id: "A003",
    title: "Cobranza pendiente",
    message: "$1.2M en facturas vencidas de hace 30+ días",
    severity: "critical",
    timestamp: "2026-05-16T09:00:00Z",
    resolved: false,
  },
  {
    id: "A004",
    title: "Orden de compra retrasada",
    message: "Envío especial desde Buenos Aires con 2 días de retraso",
    severity: "low",
    timestamp: "2026-05-15T16:45:00Z",
    resolved: true,
  },
];

// KPI Summary metrics
export const kpiSummary = {
  totalRevenueMay: 1285600,
  totalOrdersMay: 2050,
  activeClients: 48,
  averageOrderValue: 627.46,
  conversionRate: 87.5,
  churnRate: 4.2,
};
