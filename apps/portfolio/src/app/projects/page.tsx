const projects = [
  {
    title: "Infrastructure Automation Toolkit",
    description:
      "Collection of Terraform and Ansible modules that streamline deploying secure cloud-native environments.",
    link: "https://github.com/haziqhtech/infrastructure-automation-toolkit",
  },
  {
    title: "Security Analytics Dashboard",
    description:
      "Interactive dashboard built with Next.js and Supabase to monitor security events and visualize threat trends.",
    link: "https://github.com/haziqhtech/security-analytics-dashboard",
  },
  {
    title: "Data Quality Pipeline",
    description:
      "Python-based ETL pipeline with automated data validation and reporting for operational datasets.",
    link: "https://github.com/haziqhtech/data-quality-pipeline",
  },
];

export default function ProjectsPage() {
  return (
    <main className="space-y-10">
      <header className="space-y-4 text-center md:text-left">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Projects</h1>
        <p className="text-base text-slate-600 md:text-lg">
          A curated selection of work that showcases my experience across automation, data, and cybersecurity.
        </p>
      </header>
      <section className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">{project.title}</h2>
              <p className="text-sm text-slate-600">{project.description}</p>
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-500"
            >
              View on GitHub
              <span aria-hidden="true">&rarr;</span>
            </a>
          </article>
        ))}
      </section>
    </main>
  );
}

