import { permanentRedirect } from "next/navigation";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default function ProjectPage(): never {
  permanentRedirect("/#work");
}
