"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@/lib/content";

interface ProjectsClientProps {
  projects: Project[];
}

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [query, setQuery] = useState("");
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const [activeYear, setActiveYear] = useState<number | null>(null);

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

  const techOptions = useMemo(() => {
    const set = new Set<string>();
    uniqueProjects.forEach((project) => {
      project.tech.forEach((tech) => set.add(tech));
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [uniqueProjects]);

  const yearOptions = useMemo(() => {
    const set = new Set<number>();
    uniqueProjects.forEach((project) => set.add(project.year));
    return Array.from(set).sort((a, b) => b - a);
  }, [uniqueProjects]);

  const filtered = useMemo(() => {
    return uniqueProjects.filter((project) => {
      const matchesQuery =
        query.trim().length === 0 ||
        project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.description.toLowerCase().includes(query.toLowerCase());
      const matchesTech = !activeTech || project.tech.includes(activeTech);
      const matchesYear = activeYear === null || project.year === activeYear;
      return matchesQuery && matchesTech && matchesYear;
    });
  }, [uniqueProjects, query, activeTech, activeYear]);

  return (
    <div className="flex flex-col gap-12">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-6"
      >
        <div className="space-y-4 text-center md:text-left">
          <Badge variant="secondary" className="mx-auto w-fit md:mx-0">
            Projects
          </Badge>
          <div className="space-y-2">
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Initiatives & Deliverables</h1>
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground md:mx-0 md:text-base">
              Filter by year or stack to explore automation, security, and analytics workstreams. Each card includes a snapshot so you can see the deliverable at a glance.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6 rounded-2xl border border-border/60 bg-card/80 p-6 shadow-soft">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects..."
              className="w-full rounded-full border border-border bg-background px-12 py-3 text-sm shadow-soft-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                size="sm"
                variant={activeYear === null ? "default" : "ghost"}
                onClick={() => setActiveYear(null)}
              >
                All years
              </Button>
              {yearOptions.map((year) => (
                <Button
                  key={year}
                  type="button"
                  size="sm"
                  variant={activeYear === year ? "secondary" : "ghost"}
                  onClick={() =>
                    setActiveYear((current) => (current === year ? null : year))
                  }
                >
                  {year}
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                size="sm"
                variant={activeTech === null ? "default" : "ghost"}
                onClick={() => setActiveTech(null)}
              >
                All tech
              </Button>
              {techOptions.map((tech) => (
                <Button
                  key={tech}
                  type="button"
                  size="sm"
                  variant={activeTech === tech ? "secondary" : "ghost"}
                  onClick={() =>
                    setActiveTech((current) => (current === tech ? null : tech))
                  }
                >
                  {tech}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      >
        {filtered.length === 0 ? (
          <Card className="border-border/70 bg-card/80 text-center">
            <CardHeader>
              <CardTitle className="text-xl">No projects match your filters yet</CardTitle>
              <CardDescription>
                Try clearing the search or selecting a different filter to continue exploring the portfolio.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="group h-full"
              >
                <Card className="flex h-full flex-col overflow-hidden border-border/70 bg-card/90 transition-shadow duration-300 group-hover:shadow-xl">
                  <div className="relative overflow-hidden">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={`Screenshot of ${project.title}`}
                        width={640}
                        height={360}
                        className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-48 w-full items-center justify-center bg-[radial-gradient(circle_at_top,_theme(colors.primary/25),_transparent_60%)] text-sm font-medium text-primary">
                        {project.title}
                      </div>
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <Badge className="absolute bottom-3 left-3 bg-background/90 text-xs uppercase tracking-[0.2em]">
                      {project.year}
                    </Badge>
                  </div>
                  <CardHeader className="space-y-3">
                    <CardTitle className="text-lg font-semibold">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="border-border/60 text-xs font-medium transition group-hover:border-primary/60 group-hover:text-primary"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3">
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
              </motion.article>
            ))}
          </div>
        )}
      </motion.section>
    </div>
  );
}
