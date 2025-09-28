"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { TimelineEntry } from "@/lib/content";

interface ResumeTimelineProps {
  timeline: TimelineEntry[];
  viewAllHref?: string;
}

export function ResumeTimeline({ timeline, viewAllHref }: ResumeTimelineProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start center", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Career timeline highlights</h2>
          <p className="text-sm text-muted-foreground md:text-base">
            Snapshot of pivotal roles and initiatives. Visit the full timeline for the complete journey.
          </p>
        </div>
        <Badge variant="outline" className="w-fit border-primary/40 text-xs uppercase tracking-[0.3em]">
          Live progress
        </Badge>
      </div>

      <div className="relative grid gap-8 md:grid-cols-[minmax(0,1fr)]" ref={containerRef}>
        <motion.span
          aria-hidden
          className="pointer-events-none absolute left-[14px] top-0 hidden h-full w-px origin-top bg-primary md:block"
          style={{ scaleY: progress }}
        />

        <div className="md:space-y-8">
          {timeline.map((entry, index) => (
            <motion.article
              key={`${entry.date}-${entry.title}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.03 }}
              className="relative md:pl-12"
            >
              <span
                aria-hidden
                className="absolute left-[10px] top-10 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-background bg-primary shadow-soft md:block"
              />
              <Card className="border-border/70 bg-card/90">
                <CardHeader className="space-y-2">
                  <CardDescription className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {entry.date}
                  </CardDescription>
                  <CardTitle className="text-lg md:text-xl">{entry.title}</CardTitle>
                  {entry.org ? <CardDescription>{entry.org}</CardDescription> : null}
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground md:text-base">
                  <ul className="space-y-2">
                    {entry.bullets?.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  {entry.links?.length ? (
                    <div className="flex flex-wrap gap-2">
                      {entry.links.map((link) => (
                        <Badge key={link.href} variant="outline" className="border-border/60 text-xs font-medium">
                          <a href={link.href} target="_blank" rel="noopener noreferrer">
                            {link.label}
                          </a>
                        </Badge>
                      ))}
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </div>
      </div>
      {viewAllHref ? (
        <div className="flex justify-end">
          <Button asChild variant="ghost" size="sm" className="gap-2">
            <Link href={viewAllHref}>
              View complete timeline
            </Link>
          </Button>
        </div>
      ) : null}
    </section>
  );
}
