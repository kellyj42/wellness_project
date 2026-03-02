import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://greenbean.ug";

  const routes = [
    "",
    "/meal-plans",
    "/programs",
    "/programs/weight-loss",
    "/programs/muscle-gain",
    "/programs/wellness",
    "/coaching",
    "/menu",
    "/reviews",
    "/contact-page",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
