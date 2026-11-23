import Link from "next/link";
import { formatPostDate, getPublishedPosts } from "@/lib/blog";

export function LatestWriting() {
  const posts = getPublishedPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section
      aria-labelledby="latest-writing-title"
      className="border-t border-hairline"
    >
      <div className="container-edge py-12 lg:py-14">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-hairline pb-5">
          <h2 id="latest-writing-title" className="mono-label text-ash">
            Latest writing
          </h2>
          <Link
            href="/blog"
            className="mono-micro link-underline text-ash transition-colors hover:text-chalk"
          >
            View all writing
          </Link>
        </div>

        <ol>
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-hairline">
              <Link
                href={`/blog/${post.slug}`}
                className="group grid gap-2 py-6 sm:grid-cols-[9rem_1fr] sm:items-baseline sm:gap-8"
              >
                <time dateTime={post.date} className="mono-micro text-ash">
                  {formatPostDate(post.date)}
                </time>
                <div>
                  <h3 className="font-display text-xl font-medium leading-snug tracking-[-0.02em] text-chalk transition-colors group-hover:text-ash">
                    {post.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ash">
                    {post.description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}