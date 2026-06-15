import type { MetadataRoute } from "next";
import { cities } from "@/data/service-areas";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.greylynwayne.com";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/home-staging`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/interior-design`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/new-construction-staging`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/short-term-rental-design`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/street-of-dreams`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/alla-famiglia`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/portfolio`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/staged-homes`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/before-and-after`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/reviews`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/meet-jody-wallace`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/service-areas`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/furniture-request`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/careers`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/service-areas/${city.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...cityPages];
}
