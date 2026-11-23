import { getAllPosts } from "@/data/posts";
import { profile } from "@/data/profile";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getAllPosts();
  const channelDate = posts[0]
    ? new Date(`${posts[0].date}T00:00:00Z`).toUTCString()
    : undefined;

  const items = posts
    .map((post) => {
      const url = `${profile.url}/writing/${post.slug}`;
      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>`,
        `      <description>${escapeXml(post.summary)}</description>`,
        ...post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`),
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(`${profile.name} — Writing`)}</title>`,
    `    <link>${profile.url}/writing</link>`,
    `    <description>${escapeXml(
      "Notes on building AI systems and software.",
    )}</description>`,
    "    <language>en</language>",
    `    <atom:link href="${profile.url}/feed.xml" rel="self" type="application/rss+xml" />`,
    channelDate ? `    <lastBuildDate>${channelDate}</lastBuildDate>` : "",
    items,
    "  </channel>",
    "</rss>",
  ]
    .filter(Boolean)
    .join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
