import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { getAllPosts } from "@/data/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

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
      url: `${profile.url}/writing`,
      lastModified: posts[0]
        ? new Date(`${posts[0].date}T00:00:00Z`)
        : undefined,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${profile.url}/writing/${post.slug}`,
      lastModified: new Date(`${post.date}T00:00:00Z`),
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
