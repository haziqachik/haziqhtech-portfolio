"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { Button, Card } from "@haziq/ui";

type Project = {
  title: string;
  description: string;
  link: string;
};

type FormState = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const projects: Project[] = [
  {
    title: "Infrastructure Automation Toolkit",
    description:
      "Terraform and Ansible modules that accelerate provisioning of secure, cloud-native environments.",
    link: "https://github.com/haziqhtech/infrastructure-automation-toolkit",
  },
  {
    title: "Security Analytics Dashboard",
    description:
      "Next.js dashboard that visualises threat trends and real-time detections for SOC teams.",
    link: "https://github.com/haziqhtech/security-analytics-dashboard",
  },
  {
    title: "Data Quality Pipeline",
    description:
      "ETL pipeline with automated data validation, alerting, and reporting for operational telemetry.",
    link: "https://github.com/haziqhtech/data-quality-pipeline",
  },
];

const initialForm: FormState = {
  name: "",
  email: "",
  message: "",
};

export default function Home() {
  const [formData, setFormData] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const handleChange = (field: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
      setStatus("idle");
    };

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim()) {
      nextErrors.message = "Please include a short message.";
    } else if (formData.message.trim().length < 10) {
      nextErrors.message = "Message should be at least 10 characters long.";
    }

    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("idle");
      return;
    }

    setErrors({});
    setStatus("success");
    setFormData(initialForm);
  };

  return (
    <main className="flex flex-col gap-24 text-slate-900">
      <section id="hero" className="flex flex-col items-center gap-10 text-center">
        <div className="flex flex-col items-center gap-6">
          <span className="rounded-full bg-blue-50 px-4 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
            Welcome
          </span>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">Haziq Asyraaf</h1>
          <p className="max-w-2xl text-lg text-slate-600 md:text-2xl">
            IT Professional | Data Analyst | Cybersecurity Enthusiast
          </p>
          <Button as={Link} href="#projects">
            Explore My Projects
          </Button>
        </div>
        <p className="max-w-3xl text-balance text-base leading-relaxed text-slate-600 md:text-lg">
          I build resilient digital platforms that tie together data, infrastructure, and security principles. My goal
          is to deliver reliable systems, clear insights, and safe experiences for every stakeholder involved.
        </p>
      </section>

      <Card
        as="section"
        id="about"
        className="grid gap-10 p-10 shadow-md md:grid-cols-[minmax(0,220px)_1fr]"
        aria-labelledby="about-heading"
      >
        <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
          <div className="h-36 w-36 overflow-hidden rounded-full border-4 border-blue-100 bg-gradient-to-br from-blue-200 via-blue-100 to-white shadow-lg">
            <img src="/profile.jpg" alt="Portrait of Haziq Asyraaf" className="h-full w-full object-cover" />
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-500">About</p>
            <h2 id="about-heading" className="text-2xl font-semibold tracking-tight text-slate-900">
              Bridging Ops, Data &amp; Security
            </h2>
          </div>
        </div>
        <div className="space-y-5 text-sm leading-6 text-slate-600 md:text-base">
          <p>
            I specialise in designing infrastructure that scales effortlessly while remaining secure and observable.
            From deploying automated CI/CD pipelines to orchestrating zero-downtime releases, I focus on dependable
            execution and measurable impact.
          </p>
          <p>
            With hands-on DevOps experience, strong analytical fundamentals, and a cybersecurity mindset, I collaborate
            with teams to translate complex challenges into outcomes that protect users and unlock new opportunities.
          </p>
        </div>
      </Card>

      <section id="projects" className="space-y-10">
        <header className="space-y-3 text-center md:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-500">Projects</p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Work Highlights</h2>
          <p className="max-w-2xl text-sm text-slate-600 md:text-base">
            A curated selection of initiatives that showcase my background in automation, analytics, and cyber defence.
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <Card
              key={project.title}
              as="article"
              className="flex h-full flex-col justify-between border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-slate-900">{project.title}</h3>
                <p className="text-sm leading-6 text-slate-600">{project.description}</p>
              </div>
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-500"
              >
                View on GitHub
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <Card
        as="section"
        id="contact"
        className="p-8 shadow-md sm:p-10"
        aria-labelledby="contact-heading"
      >
        <div className="space-y-3 text-center md:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-500">Contact</p>
          <h2 id="contact-heading" className="text-3xl font-semibold tracking-tight text-slate-900">
            Let&apos;s collaborate
          </h2>
          <p className="text-sm text-slate-600 md:text-base">
            Share a brief note about your project, opportunity, or idea and I&apos;ll get back to you soon.
          </p>
        </div>
        <form className="mt-8 space-y-6" noValidate onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-slate-800">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange("name")}
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="Your name"
              />
              {errors.name ? (
                <p id="name-error" className="text-xs font-medium text-red-500">
                  {errors.name}
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-slate-800">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange("email")}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="you@example.com"
              />
              {errors.email ? (
                <p id="email-error" className="text-xs font-medium text-red-500">
                  {errors.email}
                </p>
              ) : null}
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-semibold text-slate-800">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange("message")}
              aria-invalid={errors.message ? "true" : "false"}
              aria-describedby={errors.message ? "message-error" : undefined}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              placeholder="How can I help?"
            />
            {errors.message ? (
              <p id="message-error" className="text-xs font-medium text-red-500">
                {errors.message}
              </p>
            ) : null}
          </div>
          <div className="space-y-3">
            <Button type="submit">Send Message</Button>
            <p className="text-xs text-slate-500" role="status" aria-live="polite">
              {status === "success" ? "Thanks for reaching out! I'll respond shortly." : "I reply within two working days."}
            </p>
          </div>
        </form>
      </Card>
    </main>
  );
}

