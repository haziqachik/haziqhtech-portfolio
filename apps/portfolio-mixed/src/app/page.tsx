import HomeClient from "./home-client";
import { getProfile, getProjects, getTimeline } from "@/lib/content";

export default function Page() {
  const profile = getProfile();
  const projects = getProjects();
  const timeline = getTimeline();

  return <HomeClient profile={profile} projects={projects} timeline={timeline} />;
}