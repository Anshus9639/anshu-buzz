import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { ProjectDetail } from "@/components/projects/ProjectDetail";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  const url = `/projects/${project.slug}`;

  return {
    title: project.title,
    description: project.shortDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: `${project.title} — Anshu`,
      description: project.shortDescription,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Anshu`,
      description: project.shortDescription,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.shortDescription,
    url: `${profile.url}/projects/${project.slug}`,
    author: {
      "@type": "Person",
      name: profile.name,
      url: profile.url,
    },
    keywords: project.technologies.join(", "),
    ...(project.links.github
      ? { codeRepository: project.links.github }
      : {}),
  };

  return (
    <>
      <ProjectDetail project={project} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
