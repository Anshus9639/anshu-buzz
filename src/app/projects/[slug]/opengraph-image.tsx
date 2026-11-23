import { getProject } from "@/data/projects";
import { ogSize, renderOgCard } from "@/lib/og";

export const alt = "Anshu Saini — project case study";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  return renderOgCard({
    eyebrow: project ? `Case ${project.index}` : "Case study",
    title: project?.title ?? "Case study",
    subtitle: project?.category,
  });
}
