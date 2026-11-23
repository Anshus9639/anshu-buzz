import { formatPostDate, getPost, getReadingMinutes } from "@/data/posts";
import { ogSize, renderOgCard } from "@/lib/og";

export const alt = "Anshu Saini — writing";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  return renderOgCard({
    eyebrow: "Writing",
    title: post?.title ?? "Writing",
    subtitle: post
      ? `${formatPostDate(post.date)} / ${getReadingMinutes(post)} min read`
      : undefined,
  });
}
