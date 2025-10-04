import { Download, FileText } from "lucide-react";

import fs from "node:fs";
import path from "node:path";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResumeTimeline } from "@/components/resume/resume-timeline";
import { getCertifications, getProfile, getSkills, getTimeline } from "@/lib/content";

function Divider() {
  return (
    <div className="relative h-px w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </div>
  );
}

export default async function ResumePage() {
  const [profile, skills, timeline, certifications] = await Promise.all([
    getProfile(),
    getSkills(),
    getTimeline(),
    getCertifications(),
  ]);

  const resumeSourcePath = path.join(process.cwd(), "content", "resume.md");
  const resumeStats = fs.statSync(resumeSourcePath);
  const resumeUpdated = new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(resumeStats.mtime);

  const grouped = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    const bucket = skill.group ?? "General";
    if (!acc[bucket]) {
      acc[bucket] = [];
    }
    acc[bucket].push(skill);
    return acc;
  }, {});

  const highlights = timeline.slice(0, 3);

  return (
    <div className="flex flex-col gap-12">
      <section className="space-y-6 text-center md:text-left">
        <Badge variant="secondary" className="mx-auto w-fit md:mx-0">
          Resume
        </Badge>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{profile.name}</h1>
          <p className="text-base text-muted-foreground md:text-lg">{profile.tagline}</p>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">Updated {resumeUpdated}</p>
        </div>
        <div className="overflow-hidden rounded-3xl border border-primary/20 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.25),_transparent_55%)] p-6 shadow-soft-sm md:p-10">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <div className="space-y-1">
              <p className="text-sm font-medium text-primary/90 md:text-base">Download the full resume</p>
              <p className="max-w-xl text-sm text-muted-foreground md:text-base">
                The PDF export mirrors the content curated on this page. Keep it on hand for recruiters or role submissions.
              </p>
            </div>
            <Button asChild size="lg" className="gap-2 rounded-full bg-primary px-6 py-6 text-base font-semibold shadow-lg shadow-primary/30 transition hover:translate-y-[-2px] hover:shadow-xl focus-visible:ring-2 focus-visible:ring-primary">
              <a href="/Haziq_Asyraaf_CV.pdf" download>
                <Download className="h-5 w-5" />
                Download PDF
              </a>
            </Button>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground md:justify-start md:text-sm">
            <FileText className="h-4 w-4 text-primary/70" />
            <span>Managed in content/resume.md and synced via scripts/sync-resume.ps1</span>
          </div>
        </div>
      </section>

      <Divider />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Recent Highlights</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((entry) => (
            <Card
              key={`${entry.date}-${entry.title}`}
              className="border-border/70 bg-card/90 transition-shadow duration-300 hover:shadow-lg"
            >
              <CardHeader className="space-y-2">
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{entry.date}</span>
                <CardTitle className="text-lg">{entry.title}</CardTitle>
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
      </section>

      <Divider />

      <ResumeTimeline timeline={timeline.slice(0, 4)} viewAllHref="/timeline" />

      <Divider />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Certifications & Learning</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="flex flex-col rounded-xl border border-border/60 bg-background/70 px-4 py-3 shadow-soft-sm transition hover:border-primary/50"
            >
              <span className="text-sm font-medium">{cert.name}</span>
              <span className="text-xs text-muted-foreground">{cert.issuer}</span>
              <span className="text-xs text-muted-foreground">{cert.issued}</span>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Core Skills by Domain</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {Object.entries(grouped).map(([group, items]) => (
            <Card key={group} className="border-border/70 bg-card/90">
              <CardHeader>
                <CardTitle className="text-xl">{group}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                {items.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between rounded-xl border border-border/60 bg-background/70 px-4 py-3 text-sm shadow-soft-sm transition hover:border-primary/50"
                  >
                    <span className="font-medium">{skill.name}</span>
                    {skill.level ? (
                      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{skill.level}</span>
                    ) : null}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
