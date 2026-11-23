"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type PostListItem = {
  slug: string;
  title: string;
  summary: string;
  dateLabel: string;
  minutes: number;
  tags: string[];
};

const ALL = "All";

export function PostList({
  posts,
  tags,
}: {
  posts: PostListItem[];
  tags: string[];
}) {
  const [activeTag, setActiveTag] = useState(ALL);
  const filters = [ALL, ...tags];
  const visible =
    activeTag === ALL
      ? posts
      : posts.filter((post) => post.tags.includes(activeTag));

  return (
    <div>
      {tags.length > 1 ? (
        <div
          role="group"
          aria-label="Filter posts by topic"
          className="flex flex-wrap gap-2 border-b border-hairline pb-5"
        >
          {filters.map((tag) => {
            const selected = tag === activeTag;
            return (
              <button
                key={tag}
                type="button"
                aria-pressed={selected}
                onClick={() => setActiveTag(tag)}
                className={cn(
                  "flex min-h-9 items-center rounded-full border px-4 font-mono text-[9px] uppercase tracking-[0.14em] transition-colors duration-300",
                  selected
                    ? "border-chalk bg-chalk text-ink"
                    : "border-hairline text-ash hover:border-dust hover:text-chalk",
                )}
              >
                {tag}
              </button>
            );
          })}
        </div>
      ) : null}

      <ol aria-live="polite" className={cn(tags.length > 1 ? "" : "border-t border-hairline")}>
        {visible.map((post, index) => (
          <li key={post.slug} className="border-b border-hairline">
            <Link
              href={`/writing/${post.slug}`}
              className="group grid gap-4 py-8 md:grid-cols-[8rem_1fr_auto] md:gap-8"
            >
              <div className="flex items-center gap-3 md:block">
                <span className="mono-micro text-ash">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mono-micro text-ash md:mt-3">{post.dateLabel}</p>
              </div>

              <div className="min-w-0">
                <h2 className="font-display text-[clamp(1.5rem,2.6vw,2.15rem)] font-medium leading-[1.1] tracking-[-0.035em] text-chalk">
                  {post.title}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ash">
                  {post.summary}
                </p>
                <p className="mono-micro mt-5 text-ash">
                  {post.tags.join(" / ")} · {post.minutes} min read
                </p>
              </div>

              <ArrowUpRight
                aria-hidden="true"
                className="hidden size-5 self-start text-ash transition-transform duration-500 ease-editorial group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-chalk md:block"
                strokeWidth={1.25}
              />
            </Link>
          </li>
        ))}
      </ol>

      {visible.length === 0 ? (
        <p className="py-10 text-sm text-ash">No posts under this topic yet.</p>
      ) : null}
    </div>
  );
}
