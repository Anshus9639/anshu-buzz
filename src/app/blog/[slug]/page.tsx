import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import {
  formatPostDate,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog";
import { getRenderedPost } from "@/lib/blog-mdx";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const instant = false;

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return {};

  const url = `/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
      types: { "application/rss+xml": "/feed.xml" },
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      authors: [profile.url],
      tags: post.tags,
      ...(post.coverImage
        ? { images: [{ url: post.coverImage, alt: post.title }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      ...(post.coverImage ? { images: [post.coverImage] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const rendered = await getRenderedPost(slug);

  if (!rendered) notFound();

  const { post, content, headings } = rendered;
  const related = getRelatedPosts(post);
  const showToc = headings.length >= 3;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: `${profile.url}/blog/${post.slug}`,
    author: {
      "@type": "Person",
      name: profile.name,
      url: profile.url,
    },
    publisher: {
      "@type": "Person",
      name: profile.name,
      url: profile.url,
    },
    ...(post.tags.length > 0 ? { keywords: post.tags.join(", ") } : {}),
    ...(post.coverImage
      ? { image: `${profile.url}${post.coverImage}` }
      : {}),
  };

  return (
    <article className="container-edge pb-24 pt-28 sm:pt-32 lg:pt-40">
      <Link
        href="/blog"
        className="mono-micro inline-flex min-h-8 items-center gap-2 text-ash transition-colors hover:text-chalk"
      >
        <ArrowLeft aria-hidden="true" className="size-3" strokeWidth={1.5} />
        All writing
      </Link>

      <header className="mt-8 border-t border-hairline pt-8">
        {post.tags.length > 0 ? (
          <p className="mono-micro text-dust">{post.tags.join(" · ")}</p>
        ) : null}

        <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.3rem,5.4vw,4.4rem)] font-medium leading-[0.95] tracking-[-0.04em] text-chalk">
          {post.title}
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ash md:text-lg">
          {post.description}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <div className="flex items-center gap-3">
            <Image
              src="/images/anshu-avatar.webp"
              alt=""
              width={80}
              height={80}
              sizes="40px"
              className="size-10 rounded-full border border-white/15 object-cover"
            />
            <span className="mono-micro text-chalk">{profile.name}</span>
          </div>

          <p className="mono-micro text-ash">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            {" · "}
            {post.readingTime} min read
          </p>
        </div>
      </header>

      {post.coverImage ? (
        <div className="mt-10 overflow-hidden border border-hairline">
          <Image
            src={post.coverImage}
            alt={post.title}
            width={1600}
            height={900}
            sizes="(min-width: 1024px) 960px, 100vw"
            className="h-auto w-full"
            priority
          />
        </div>
      ) : null}

      <div
        className={
          showToc
            ? "mt-12 grid gap-12 lg:grid-cols-12 lg:gap-8"
            : "mt-12 max-w-[44rem]"
        }
      >
        <div
          className={
            showToc
              ? "min-w-0 lg:col-span-8 xl:col-span-7"
              : undefined
          }
        >
          <div className="post-body">{content}</div>
        </div>

        {showToc ? (
          <nav
            aria-labelledby="toc-title"
            className="hidden lg:col-span-3 lg:col-start-10 lg:block"
          >
            <div className="lg:sticky lg:top-28">
              <p id="toc-title" className="mono-micro text-ash">
                On this page
              </p>
              <ul className="mt-4 space-y-2 border-l border-hairline pl-4">
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      className="link-underline block text-xs leading-relaxed text-ash transition-colors hover:text-chalk"
                      style={
                        heading.depth === 3
                          ? { paddingLeft: "0.75rem" }
                          : undefined
                      }
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        ) : null}
      </div>

      <footer className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-hairline pt-8">
        <div className="flex items-center gap-3">
          <Image
            src="/images/anshu-avatar.webp"
            alt=""
            width={80}
            height={80}
            sizes="40px"
            className="size-10 rounded-full border border-white/15 object-cover"
          />
          <div>
            <p className="text-sm text-chalk">{profile.name}</p>
            <p className="mono-micro mt-1 text-ash">{profile.role}</p>
          </div>
        </div>

        <Link
          href="/blog"
          className="mono-micro inline-flex min-h-8 items-center gap-2 text-ash transition-colors hover:text-chalk"
        >
          Back to writing
          <ArrowUpRight aria-hidden="true" className="size-3" strokeWidth={1.5} />
        </Link>
      </footer>

      {related.length > 0 ? (
        <section
          aria-labelledby="related-title"
          className="mt-16 border-t border-hairline pt-8"
        >
          <h2 id="related-title" className="mono-label text-ash">
            Related writing
          </h2>
          <ul className="mt-6 border-t border-hairline">
            {related.map((entry) => (
              <li key={entry.slug} className="border-b border-hairline">
                <Link
                  href={`/blog/${entry.slug}`}
                  className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 py-5"
                >
                  <span className="text-base text-chalk transition-colors group-hover:text-ash">
                    {entry.title}
                  </span>
                  <time dateTime={entry.date} className="mono-micro text-ash">
                    {formatPostDate(entry.date)}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        </section>
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