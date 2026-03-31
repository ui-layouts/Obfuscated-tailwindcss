import type { MetadataRoute } from "next";
import { getAllDocs } from "@/lib/docs";
import { siteConfig } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const docs = await getAllDocs();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/docs`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/example`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const docsRoutes: MetadataRoute.Sitemap = docs
    .filter((doc) => doc.slug !== "index")
    .map((doc) => ({
      url: `${siteConfig.url}/docs/${doc.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  return [...staticRoutes, ...docsRoutes];
}
