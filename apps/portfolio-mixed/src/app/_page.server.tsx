import Page from "./page";
import { getProfile, getProjects, getTimeline } from "@/lib/content";

export default function ServerPage() {
  const profile = getProfile();
  const projects = getProjects();
  const timeline = getTimeline();

  return <Page profile={profile} projects={projects} timeline={timeline} />;
}
