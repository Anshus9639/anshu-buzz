import { cacheLife } from "next/cache";
import { profile } from "@/data/profile";
import { getPublishedPosts } from "@/lib/blog";

const FEED_DESCRIPTION =
  "Notes on building software, applied AI, and things I'm learning.";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function renderFeed() {
  "use cache";
  cacheLife({ stale: 3600, revalidate: 3600, expire: 86_400 });

  const posts = getPublishedPosts();
  const latest = posts[0];
  const lastBuildDate = latest
    ? `    <lastBuildDate>${new Date(`${latest.date}T00:00:00Z`).toUTCString()}</lastBuildDate>\n`
    : "";

  const items = posts
    .map((post) => {
      const url = `${profile.url}/blog/${post.slug}`;
      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>`,
        `      <description>${escapeXml(post.description)}</description>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml("Anshu — Writing")}</title>
    <link>${profile.url}/blog</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>en</language>
    <atom:link href="${profile.url}/feed.xml" rel="self" type="application/rss+xml" />
${lastBuildDate}${items}
  </channel>
</rss>
`;
}

export async function GET() {
  return new Response(await renderFeed(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}