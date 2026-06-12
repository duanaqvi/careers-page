import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // All crawlers welcome — including AI bots
      { userAgent: "*",            allow: "/" },
      { userAgent: "GPTBot",       allow: "/" },
      { userAgent: "ClaudeBot",    allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Googlebot",    allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "cohere-ai",    allow: "/" },
    ],
    sitemap: "https://imagine.art/sitemap.xml",
  };
}
