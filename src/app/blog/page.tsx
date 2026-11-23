import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatPostDate, getPublishedPosts } from "@/lib/blog";

const description =
  "Notes on building software, applied AI, and things I'm learning.";

export const metadata: Metadata = {
  title: "Writing",
  description,
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: {
    type: "website",
    title: "Writing — Anshu",
    description,
    url: "/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing — Anshu",
    description,
  },
};

export default function BlogPage() {
  const posts = getPublishedPosts();

  return (
    <section
      aria-labelledby="writing-title"
      className="container-edge pb-20 pt-28 sm:pt-32 lg:pb-28 lg:pt-40"
    >
      <SectionHeading
        title="Writing."
        titleId="writing-title"
        description={description}
        level={1}
      />

      {posts.length === 0 ? (
        <div className="mt-14 max-w-xl border-t border-hairline pt-8">
          <p className="mono-micro text-ash">No published notes yet.</p>
          <p className="mt-4 text-sm leading-relaxed text-ash">
            The first one is in progress. For now, the{" "}
            <Link
              href="/#work"
              className="link-underline text-chalk transition-colors hover:text-ash"
            >
              selected work
            </Link>{" "}
            is the clearest picture of what I’m building.
          </p>
        </div>
      ) : (
        <ol className="mt-12 border-t border-hairline">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-hairline">
              <Link
                href={`/blog/${post.slug}`}
                className="group block py-9 md:py-11"
              >
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <time dateTime={post.date} className="mono-micro text-ash">
                    {formatPostDate(post.date)}
                  </time>
                  <span aria-hidden="true" className="mono-micro text-dust">
                    ·
                  </span>
                  <span className="mono-micro text-ash">
                    {post.readingTime} min read
                  </span>
                  {post.tags.length > 0 ? (
                    <span className="mono-micro text-dust">
                      {post.tags.join(" · ")}
                    </span>
                  ) : null}
                </div>

                <h2 className="mt-4 max-w-3xl font-display text-[clamp(1.55rem,3vw,2.3rem)] font-medium leading-[1.1] tracking-[-0.03em] text-chalk">
                  {post.title}
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ash">
                  {post.description}
                </p>

                <span className="mono-micro mt-5 inline-flex items-center gap-2 text-ash transition-colors group-hover:text-chalk">
                  Read
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.5}
                  />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}