import TimelineClient from "./timeline-client";
import { getTimeline } from "@/lib/content";

export default function TimelinePage() {
  const timeline = getTimeline();
  return <TimelineClient timeline={timeline} />;
}