"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Profile, Project, TimelineEntry } from "@/lib/content";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

interface PageProps {
  profile: Profile;
  projects: Project[];
  timeline: TimelineEntry[];
}

export default function HomeClient({ profile, projects, timeline }: PageProps) {
  const uniqueProjects = useMemo(() => {
    const seen = new Set<string>();
    return projects.filter((project) => {
      const key = project.href ?? project.title;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }, [projects]);

  const featuredProjects = uniqueProjects.slice(0, 6);
  const recentTimeline = timeline.slice(0, 3);

  return (
    <div className="flex flex-col gap-24">
      <motion.section
        id="hero"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="grid gap-10 text-center md:grid-cols-2 md:items-center md:text-left"
      >
        <div className="space-y-6">
          <Badge variant="secondary" className="mx-auto w-fit md:mx-0">
            {profile.location}
          </Badge>
          <div className="space-y-4">
            <div className="space-y-1 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">{profile.name}</p>
              <p>{profile.tagline}</p>
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
              Engineer resilient, security-first workflows
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground md:text-xl">
              I help public-sector teams ship faster while protecting data: 160+ officers rely on the dashboards and automations I deploy. From Power BI governance to UiPath/FormSG orchestration, I turn manual bottlenecks into audited, secure workflows.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <Button asChild size="lg">
              <Link href="/projects">Explore Projects</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/resume">View Resume</Link>
            </Button>
          </div>
        </div>
        <div className="mx-auto flex max-w-md flex-col gap-4 text-sm text-muted-foreground md:mx-0">
          <p>
            Recent wins: delivered workforce analytics that inform 160+ officers, automated survey operations with UiPath and FormSG, and codified security guardrails consumed across agencies.
          </p>
          <p>
            I&apos;m actively deepening CCNA/CEH lab practice and Azure security automation so zero-trust controls are validated before production rollout.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:justify-start">
            {Object.entries(profile.socials ?? {}).map(([key, value]) =>
              value ? (
                <Link key={key} href={value} className="transition hover:text-foreground" target="_blank">
                  {key.replace(/^[a-z]/, (char) => char.toUpperCase())}
                </Link>
              ) : null,
            )}
          </div>
        </div>
      </motion.section>

      <motion.section
        id="how-i-can-help"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="border-border/70 bg-card/85">
          <CardHeader className="space-y-3 text-center md:text-left">
            <Badge variant="secondary" className="mx-auto w-fit md:mx-0">
              How I Can Help You
            </Badge>
            <CardTitle className="text-2xl md:text-3xl">
              Blend automation, cyber, and analytics into secure delivery
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground md:text-base">
              These are the outcomes I bring when partnering with teams on transformation initiatives.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-3 pl-5 text-left text-sm text-muted-foreground marker:text-primary md:text-base">
              <li>Automate manual intake and survey workflows with UiPath and FormSG while enforcing least-privilege access.</li>
              <li>Govern analytics platforms (Power BI, Power Query/M) so 100+ stakeholders consume the right data securely.</li>
              <li>Design and document network/security labs (CCNA, CEH) to validate controls before they ship to production.</li>
              <li>Deliver actionable reporting with clear SOPs, making cross-functional teams self-sufficient after handover.</li>
            </ul>
          </CardContent>
        </Card>
      </motion.section>

      <motion.section
        id="timeline-preview"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-6"
      >
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <Badge variant="secondary">Recent Timeline</Badge>
            <h2 className="text-3xl font-semibold tracking-tight">Latest Roles & Impact</h2>
            <p className="text-sm text-muted-foreground md:text-base">
              Highlights pulled from the full timeline showcasing automation, data, and security initiatives.
            </p>
          </div>
          <Button asChild variant="ghost" className="w-fit self-start">
            <Link href="/timeline">View full timeline</Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {recentTimeline.map((entry) => (
            <Card key={`${entry.date}-${entry.title}`} className="border-border/70 bg-card/85">
              <CardHeader className="space-y-2">
                <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{entry.date}</span>
                <CardTitle className="text-xl">{entry.title}</CardTitle>
                {entry.org ? <CardDescription>{entry.org}</CardDescription> : null}
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                {entry.bullets?.slice(0, 2).map((bullet) => (
                  <p key={bullet}>{bullet}</p>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="featured-projects"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-6"
      >
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <Badge variant="secondary">Featured Projects</Badge>
            <h2 className="text-3xl font-semibold tracking-tight">Automation, Security & Insights</h2>
            <p className="text-sm text-muted-foreground md:text-base">
              A curated sample of platforms and pipelines I&apos;ve delivered or led recently.
            </p>
          </div>
          <Button asChild variant="ghost" className="w-fit self-start">
            <Link href="/projects">Browse all projects</Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <Card key={project.title} className="border-border/70 bg-card/85">
              <CardHeader className="space-y-3">
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-border/60 text-xs font-medium">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button asChild size="sm">
                    <Link href={project.href} target="_blank" rel="noopener noreferrer">
                      View case study
                    </Link>
                  </Button>
                  {project.repo ? (
                    <Button asChild size="sm" variant="outline">
                      <Link href={project.repo} target="_blank" rel="noopener noreferrer">
                        Source
                      </Link>
                    </Button>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="contact-strip"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="border-border/70 bg-surface-gradient/80 backdrop-blur">
          <CardHeader className="flex flex-col gap-3 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <div className="space-y-1">
              <CardTitle className="text-2xl">Need a collaborator?</CardTitle>
              <CardDescription className="text-sm text-muted-foreground md:text-base">
                Let&apos;s discuss how I can help drive your next initiative forward.
              </CardDescription>
            </div>
            <Button asChild size="lg" className="mt-2 md:mt-0">
              <Link href={`mailto:${profile.email}`}>Email {profile.email}</Link>
            </Button>
          </CardHeader>
        </Card>
      </motion.section>
    </div>
  );
}
