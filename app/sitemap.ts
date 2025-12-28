import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.buenimar.com";
  const now = new Date();

  const routes = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${base}/empresa`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/marcas`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${base}/contacto`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/politica-privacidad`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
  ] as MetadataRoute.Sitemap;

  return routes;
}
