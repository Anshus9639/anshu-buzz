import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { getPublishedPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPublishedPosts();

  return [
    {
      url: profile.url,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...(posts.length > 0
      ? [
          {
            url: `${profile.url}/blog`,
            changeFrequency: "weekly" as const,
            priority: 0.7,
          },
        ]
      : []),
    ...posts.map((post) => ({
      url: `${profile.url}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    {
      url: `${profile.url}/resume`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}