import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://trasladodemotos.com.ar",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // Add more pages here as you create them
    // Example:
    // {
    //   url: 'https://trasladodemotos.com.ar/about',
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ];
}
