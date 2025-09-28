"use client";

import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { TimelineEntry } from "@/lib/content";

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

interface TimelineClientProps {
  timeline: TimelineEntry[];
}

export default function TimelineClient({ timeline }: TimelineClientProps) {
  return (
    <div className="flex flex-col gap-10">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-4 text-center md:text-left"
      >
        <Badge variant="secondary" className="mx-auto w-fit md:mx-0">
          Timeline
        </Badge>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Career Highlights</h1>
          <p className="text-sm text-muted-foreground md:text-base">
            Engagements where automation, data, and security came together to provide lasting impact.
          </p>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
        className="relative grid gap-8"
      >
        <span className="pointer-events-none absolute left-3 top-0 h-full w-px bg-border md:left-1/2" />
        {timeline.map((entry, index) => (
          <motion.div
            key={`${entry.date}-${entry.title}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
            className="relative md:grid md:grid-cols-2 md:items-center md:gap-10"
          >
            <span className="absolute left-0 top-2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-background bg-primary shadow-soft md:left-1/2" />
            <Card className="bg-card/90">
              <CardHeader className="space-y-2">
                <CardDescription className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {entry.date}
                </CardDescription>
                <CardTitle className="text-xl">{entry.title}</CardTitle>
                {entry.org ? <CardDescription>{entry.org}</CardDescription> : null}
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground md:text-base">
                <ul className="space-y-2">
                  {entry.bullets?.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                {entry.links && entry.links.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {entry.links.map((link) => (
                      <Button key={link.href} asChild size="sm" variant="outline">
                        <a href={link.href} target="_blank" rel="noopener noreferrer">
                          {link.label}
                        </a>
                      </Button>
                    ))}
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.section>
    </div>
  );
}