import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { products } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/catalog", "/about", "/contact", "/faq", "/privacy", "/terms"];
  const productPages = products.map((product) => {
    const id = product._id || product.id || product.name.toLowerCase().replace(/\s+/g, "-");
    return `/catalog/${id}`;
  });

  return [...pages, ...productPages].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" || path === "/catalog" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/catalog" ? 0.9 : 0.6
  }));
}
