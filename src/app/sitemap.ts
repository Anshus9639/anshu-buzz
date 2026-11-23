import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { getPublishedPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: profile.url,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${profile.url}/projects/${project.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    {
      url: `${profile.url}/blog`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...getPublishedPosts().map((post) => ({
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