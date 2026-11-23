import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatPostDate, getAllPosts, getReadingMinutes } from "@/data/posts";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";

export function LatestWriting() {
  const latest = getAllPosts().slice(0, 3);

  if (latest.length === 0) return null;

  return (
    <section
      id="latest-writing"
      aria-labelledby="latest-writing-title"
      className="section-pad border-t border-hairline"
    >
      <div className="container-edge">
        <SectionHeading
          title="Writing."
          titleId="latest-writing-title"
          description="Notes on how the projects were built and the decisions behind them."
        />

        <Reveal className="mt-14">
          <ol className="border-t border-hairline">
            {latest.map((post) => (
              <li key={post.slug} className="border-b border-hairline">
                <Link
                  href={`/writing/${post.slug}`}
                  className="group grid gap-3 py-6 md:grid-cols-[9rem_1fr_auto] md:items-baseline md:gap-8"
                >
                  <span className="mono-micro text-ash">
                    {formatPostDate(post.date)}
                  </span>
                  <span className="font-display text-xl leading-snug tracking-[-0.03em] text-chalk md:text-2xl">
                    {post.title}
                  </span>
                  <span className="mono-micro flex items-center gap-3 text-ash">
                    {getReadingMinutes(post)} min
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3.5 transition-transform duration-500 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-chalk"
                      strokeWidth={1.5}
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </Reveal>

        <p className="mono-micro mt-8 text-ash">
          <Link
            href="/writing"
            className="link-underline text-ash transition-colors hover:text-chalk"
          >
            All writing
          </Link>
        </p>
      </div>
    </section>
  );
}
