import ProjectsClient from "./projects-client";
import { getProjects } from "@/lib/content";

export default function ProjectsPage() {
  const projects = getProjects();
  return <ProjectsClient projects={projects} />;
}