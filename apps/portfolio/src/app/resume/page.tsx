const skills = [
  "Cloud Infrastructure",
  "Terraform & IaC",
  "CI/CD Pipelines",
  "Python & SQL",
  "Data Visualization",
  "Cybersecurity Operations",
  "Incident Response",
  "Network Hardening",
  "Linux Administration",
  "Monitoring & Observability",
  "Automation Scripting",
  "Stakeholder Communication",
];

export default function ResumePage() {
  return (
    <main className="space-y-12">
      <header className="space-y-4 text-center md:text-left">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Resume</h1>
        <p className="text-base text-slate-600 md:text-lg">
          Explore my experience, education, and technical skill set. Download the full CV for a detailed overview.
        </p>
        <div>
          <a
            href="/Haziq_Asyraaf_CV.pdf"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:-translate-y-0.5 hover:bg-blue-500"
            download
          >
            Download CV (PDF)
          </a>
        </div>
      </header>
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-900">Skills</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <div
              key={skill}
              className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm"
            >
              {skill}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
