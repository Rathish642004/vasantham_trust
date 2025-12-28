import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://vasantham-trust.vercel.app"

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/auth/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
