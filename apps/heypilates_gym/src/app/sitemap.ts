import type { MetadataRoute } from "next";
import { siteConfig } from "./seo";

const routes = [
  "",
  "/classes",
  "/private-training",
  "/teachers",
  "/contact",
  "/events",
  "/privacy",
  "/terms",
  "/cancellation",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((route) => ({
    url: `${siteConfig.domain}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
