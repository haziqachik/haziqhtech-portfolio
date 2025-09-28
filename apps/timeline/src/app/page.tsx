import { Card, Button } from "@haziq/ui";

type TimelineLink = {
  label: string;
  href: string;
};

type TimelineEntry = {
  date: string;
  title: string;
  org?: string;
  bullets?: string[];
  links?: TimelineLink[];
};

const timelineEntries: TimelineEntry[] = [
  {
    date: "2025",
    title: "Senior IT Operations Engineer",
    org: "FinTech Innovations",
    bullets: [
      "Implemented infrastructure-as-code pipelines that reduced provisioning time by 40%.",
      "Led cross-functional incident response drills improving recovery SLAs by 25%.",
    ],
    links: [
      {
        label: "Role overview",
        href: "https://example.com/fintech-innovations",
      },
    ],
  },
  {
    date: "2023 - 2024",
    title: "DevOps & Security Consultant",
    org: "CloudShield Solutions",
    bullets: [
      "Automated compliance reporting with custom dashboards for SOC 2 controls.",
      "Designed zero-trust network segmentation for hybrid workloads.",
    ],
    links: [
      {
        label: "Case study",
        href: "https://example.com/cloudshield-solutions",
      },
    ],
  },
  {
    date: "2021 - 2022",
    title: "Data Analyst",
    org: "Insight Analytics Lab",
    bullets: [
      "Built ETL pipelines that consolidated telemetry from 15+ data sources.",
      "Developed predictive models to forecast infrastructure capacity needs.",
    ],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="space-y-4 text-center sm:text-left">
          <span className="inline-flex items-center rounded-full bg-blue-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-blue-300">
            Timeline
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            My Professional Journey
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Highlights of the roles, projects, and initiatives that shaped my expertise across IT operations, DevOps,
            data analytics, and cybersecurity.
          </p>
        </header>

        <div className="relative mt-16">
          <div className="absolute inset-y-0 left-[1.1rem] hidden w-px sm:block">
            <div className="sticky top-28 h-[calc(100vh-7rem)] bg-slate-800/60" />
          </div>
          <div className="space-y-12 sm:space-y-14">
            {timelineEntries.map((entry) => (
              <Card
                key={`${entry.date}-${entry.title}`}
                as="article"
                className="relative flex flex-col gap-6 border-slate-800/70 bg-slate-900/60 p-6 text-left text-slate-100 backdrop-blur"
              >
                <div className="flex items-start gap-4">
                  <div className="relative flex items-center">
                    <span className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 shadow-[0_0_0_4px] shadow-slate-950">
                      <span className="h-2 w-2 rounded-full bg-white" />
                    </span>
                    <span className="absolute left-1/2 top-4 hidden h-[calc(100%+2rem)] w-px -translate-x-1/2 bg-slate-800 sm:block" />
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-200">
                        {entry.date}
                      </p>
                      <h2 className="text-2xl font-semibold text-white">{entry.title}</h2>
                      {entry.org ? (
                        <p className="text-sm font-medium text-slate-400">{entry.org}</p>
                      ) : null}
                    </div>
                    {entry.bullets ? (
                      <ul className="space-y-2 text-sm leading-6 text-slate-300">
                        {entry.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-2">
                            <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-blue-500/80" aria-hidden="true" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {entry.links ? (
                      <div className="flex flex-wrap gap-3">
                        {entry.links.map((link) => (
                          <Button
                            key={link.href}
                            as="a"
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outline"
                            className="border-blue-500/40 px-3 py-1.5 text-xs font-medium text-blue-200 hover:border-blue-300 hover:text-blue-100"
                          >
                            {link.label}
                            <span aria-hidden="true">&rarr;</span>
                          </Button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <footer className="border-t border-slate-800/60 bg-slate-950/80">
        <div className="mx-auto flex max-w-4xl flex-col gap-2 px-4 py-6 text-center text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span>&copy; {new Date().getFullYear()} HaziqhTech Timeline</span>
          <Button
            as="a"
            href="mailto:haziq@haziqhtech.sg"
            variant="outline"
            className="mx-auto w-fit border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-blue-400 hover:text-blue-200 sm:mx-0"
          >
            haziq@haziqhtech.sg
          </Button>
        </div>
      </footer>
    </main>
  );
}

