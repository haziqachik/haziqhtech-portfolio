import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import { z } from "zod";
import 'server-only';

const basePath = path.join(process.cwd(), "content");

const SocialSchema = z.object({
  github: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  x: z.string().url().optional(),
  website: z.string().url().optional(),
});

const ProfileSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  email: z.string().email(),
  location: z.string().min(1),
  socials: SocialSchema.default({}),
});

const ProjectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  tech: z.array(z.string().min(1)).nonempty(),
  href: z.string().url(),
  repo: z.string().url().optional(),
  year: z.number().int(),
  image: z.string().min(1).optional(),
});

const TimelineLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().url(),
});

const TimelineEntrySchema = z.object({
  date: z.string().min(1),
  title: z.string().min(1),
  org: z.string().min(1).optional(),
  bullets: z.array(z.string().min(1)).default([]),
  links: z.array(TimelineLinkSchema).default([]),
});

const SkillSchema = z.object({
  name: z.string().min(1),
  level: z.string().min(1).optional(),
  group: z.string().min(1).optional(),
});

const CertificationSchema = z.object({
  name: z.string().min(1),
  issuer: z.string().min(1),
  issued: z.string().min(1),
});

const ProjectsSchema = z.array(ProjectSchema);
const TimelineSchema = z.array(TimelineEntrySchema);
const SkillsSchema = z.array(SkillSchema);
const CertificationsSchema = z.array(CertificationSchema);

export type Profile = z.infer<typeof ProfileSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type TimelineEntry = z.infer<typeof TimelineEntrySchema>;
export type Skill = z.infer<typeof SkillSchema>;
export type Certification = z.infer<typeof CertificationSchema>;

function readJsonFile(file: string) {
  const filePath = path.join(basePath, file);
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

const loadProfile = cache(() => {
  const raw = readJsonFile("profile.json");
  return ProfileSchema.parse(raw);
});

const loadProjects = cache(() => {
  const raw = readJsonFile("projects.json");
  return ProjectsSchema.parse(raw);
});

const loadTimeline = cache(() => {
  const raw = readJsonFile("timeline.json");
  return TimelineSchema.parse(raw);
});

const loadSkills = cache(() => {
  const raw = readJsonFile("skills.json");
  return SkillsSchema.parse(raw);
});

const loadCertifications = cache(() => {
  const raw = readJsonFile("certifications.json");
  return CertificationsSchema.parse(raw);
});

export function getProfile(): Profile {
  return loadProfile();
}

export function getProjects(): Project[] {
  return loadProjects();
}

export function getTimeline(): TimelineEntry[] {
  return loadTimeline();
}

export function getSkills(): Skill[] {
  return loadSkills();
}
export function getCertifications(): Certification[] {
  return loadCertifications();
}
