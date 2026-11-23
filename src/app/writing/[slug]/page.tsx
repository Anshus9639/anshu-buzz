import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import {
  formatPostDate,
  getAdjacentPosts,
  getPost,
  getReadingMinutes,
  posts,
} from "@/data/posts";
import { profile } from "@/data/profile";
import { PostBody } from "@/components/writing/PostBody";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) return {};

  const url = `/writing/${post.slug}`;

  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: url },
    keywords: post.tags,
    openGraph: {
      type: "article",
      title: `${post.title} — Anshu`,
      description: post.summary,
      url,
      publishedTime: post.date,
      authors: [profile.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} — Anshu`,
      description: post.summary,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  const { newer, older } = getAdjacentPosts(post.slug);
  const minutes = getReadingMinutes(post);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    url: `${profile.url}/writing/${post.slug}`,
    mainEntityOfPage: `${profile.url}/writing/${post.slug}`,
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags.join(", "),
    inLanguage: "en",
    author: { "@id": `${profile.url}/#person` },
    publisher: { "@id": `${profile.url}/#person` },
  };

  return (
    <article className="container-edge pb-24 pt-28 sm:pt-32 lg:pb-32 lg:pt-40">
      <nav aria-label="Breadcrumb">
        <Link
          href="/writing"
          className="inline-flex min-h-11 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ash transition-colors hover:text-chalk"
        >
          <ArrowLeft aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
          All writing
        </Link>
      </nav>

      <header className="mt-8 max-w-4xl border-t border-hairline pt-8">
        <p className="mono-micro text-ash">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time> ·{" "}
          {minutes} min read · {post.tags.join(" / ")}
        </p>
        <h1 className="mt-6 font-display text-[clamp(2.3rem,5.4vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.05em] text-chalk">
          {post.title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ash md:text-lg">
          {post.summary}
        </p>
      </header>

      <div className="mt-14 border-t border-hairline pt-12">
        <PostBody blocks={post.blocks} />

        {post.related && post.related.length > 0 ? (
          <aside
            aria-labelledby="related-title"
            className="mt-16 max-w-2xl border-t border-hairline pt-8"
          >
            <h2 id="related-title" className="mono-micro text-ash">
              Related
            </h2>
            <ul className="mt-4 space-y-2">
              {post.related.map((link) => {
                const external = link.href.startsWith("http");
                return (
                  <li key={link.href}>
                    {external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group inline-flex min-h-8 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ash transition-colors hover:text-chalk"
                      >
                        {link.label}
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          strokeWidth={1.5}
                        />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="link-underline inline-flex min-h-8 items-center font-mono text-[10px] uppercase tracking-[0.14em] text-ash transition-colors hover:text-chalk"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </aside>
        ) : null}
      </div>

      {newer || older ? (
        <nav
          aria-label="More writing"
          className="mt-20 grid gap-px border border-hairline bg-hairline sm:grid-cols-2"
        >
          {older ? (
            <Link
              href={`/writing/${older.slug}`}
              className="group bg-ink p-6 transition-colors hover:bg-raised"
            >
              <span className="mono-micro text-ash">Older</span>
              <span className="mt-3 block font-display text-lg leading-snug tracking-[-0.02em] text-chalk">
                {older.title}
              </span>
            </Link>
          ) : (
            <span className="hidden bg-ink sm:block" />
          )}
          {newer ? (
            <Link
              href={`/writing/${newer.slug}`}
              className="group bg-ink p-6 transition-colors hover:bg-raised sm:text-right"
            >
              <span className="mono-micro text-ash">Newer</span>
              <span className="mt-3 block font-display text-lg leading-snug tracking-[-0.02em] text-chalk">
                {newer.title}
              </span>
            </Link>
          ) : (
            <span className="hidden bg-ink sm:block" />
          )}
        </nav>
      ) : null}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </article>
  );
}
