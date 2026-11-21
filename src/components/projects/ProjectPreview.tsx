import type { Project } from "@/data/projects";
import { HomepageWalkthrough } from "@/components/projects/HomepageWalkthrough";
import { LiveSitePreview } from "@/components/projects/LiveSitePreview";
import { ProjectVisual } from "@/components/projects/ProjectVisual";

export function ProjectPreview({ project }: { project: Project }) {
  if (project.walkthrough) {
    return <HomepageWalkthrough walkthrough={project.walkthrough} />;
  }

  if (project.livePreview) {
    return <LiveSitePreview preview={project.livePreview} />;
  }

  return <ProjectVisual project={project} />;
}
