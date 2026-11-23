import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  formatPostDate,
  getAllPosts,
  getAllTags,
  getReadingMinutes,
} from "@/data/posts";
import { PostList } from "@/components/writing/PostList";

const description =
  "Notes on building AI systems and software: retrieval-grounded LLM apps, backend engineering and the decisions behind the projects.";

export const metadata: Metadata = {
  title: "Writing",
  description,
  alternates: {
    canonical: "/writing",
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: {
    type: "website",
    title: "Writing — Anshu",
    description,
    url: "/writing",
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing — Anshu",
    description,
  },
};

export default function WritingPage() {
  const posts = getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    summary: post.summary,
    dateLabel: formatPostDate(post.date),
    minutes: getReadingMinutes(post),
    tags: post.tags,
  }));

  return (
    <div className="container-edge pb-24 pt-28 sm:pt-32 lg:pb-32 lg:pt-40">
      <Link
        href="/"
        className="inline-flex min-h-11 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ash transition-colors hover:text-chalk"
      >
        <ArrowLeft aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
        Back to portfolio
      </Link>

      <header className="mt-8 border-t border-hairline pt-6">
        <h1 className="section-title">Writing.</h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-ash">
          {description}
        </p>
        <p className="mono-micro mt-6 text-ash">
          <a
            href="/feed.xml"
            className="link-underline text-ash transition-colors hover:text-chalk"
          >
            RSS feed
          </a>
        </p>
      </header>

      <div className="mt-14">
        <PostList posts={posts} tags={getAllTags()} />
      </div>
    </div>
  );
}
