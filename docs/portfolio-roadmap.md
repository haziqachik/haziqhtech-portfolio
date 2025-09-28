# Portfolio Evolution Roadmap

This checklist captures the improvements we discussed for `apps/portfolio-mixed`. Work through them gradually—each item is scoped so you can tackle it in a focused work session.

## Product & Storytelling
- Reframe every highlighted project with a **Problem → Approach → Impact** narrative. Draft in Notion/Google Docs before pasting into the site.
- Collect metrics, screenshots, architecture diagrams, or code snippets to prove the impact of each project.
- Add testimonials or short quotes (even anonymous) from teammates/clients.
- Create a "Services / How I Help" section outlining engagements (automation audits, security posture reviews, observability bootstraps, etc.).

## Visual & Interaction Enhancements
- Produce project visuals: use Figma/Excalidraw/tldraw to sketch architectures or UI mockups and embed them with subtle parallax or fade-in effects.
- Introduce micro-interactions with `framer-motion` (staggered timeline entries, hover tilts on cards, animated badges).
- Refine the color palette and typography using tools like Hype4 Palette, coolors.co, or FontPair. Bake final tokens into `tailwind.config.ts`.

## Content Workflow
- Consider moving project/timeline data from JSON to Markdown/MDX (Contentlayer or manual MDX import) so long-form case studies can include images, lists, and embeds.
- Start a blog/case-study section. Even one deep-dive per quarter improves discoverability.

## Resume & Skills Growth
- Run your resume through ResumeWorded or a similar tool to uncover missing keywords; reflect them in `skills.json`, project copy, and the resume PDF.
- Build a skills matrix: define tiers (Foundational → Practitioner → Expert). For gaps, schedule hands-on mini projects (e.g., IaC security scanning lab, OpenTelemetry deployment, data quality ETL experiment).
- Document processes (incident response playbooks, deployment checklists) and offer them as downloadable assets.

## Experiments & Proof
- Add an "Experiments" or "Lab" page highlighting homelab builds, CTF write-ups, Kaggle notebooks, etc.
- Track analytics with Plausible/Simple Analytics to see which sections attract attention.
- Offer a "Book 30 minutes" CTA (Calendly/Cal.com) to convert visitors into conversations.

## Tooling & Quality Gates
- Set up Storybook (or Ladle) for UI component previews.
- Add Playwright tests for core flows (nav, contact form, CV download).
- Integrate Lighthouse CI or run PageSpeed Insights regularly to monitor performance/accessibility.

## When Creating New Apps
- Start from a template folder that already includes the clean Tailwind/PostCSS config, `.editorconfig`, `tsconfig`, and baseline dependencies.
- Always run `npm install` at the repo root after copying a workspace; keep only one root `package-lock.json`.
- Enforce formatting with Prettier + ESLint (consider Husky + lint-staged).

## Personal Development Tracker
- Analyze job descriptions for roles you want (DevSecOps, Security Engineer, Platform Engineer). Highlight recurring tools/practices you still need and turn them into learning projects.
- Keep a "Gap Planner" doc: Skill → Current Evidence → Desired Evidence → Planned Action. Review monthly.

## Suggested Starting Point
1. **Rewrite one flagship project** using the Problem → Approach → Impact format. Gather supporting visuals and add them to the project card/page.
2. **Run ResumeWorded (or similar) on your CV** and feed the insights back into `skills.json` and the resume page.
3. **Plan one new experiment/project** that closes a skills gap you identified. Log it under a new "Experiments" section (even as "Coming Soon") to hold yourself accountable.

Work through these incrementally; the site, resume, and your capabilities will evolve together.
## Resume Polish & Action Items
- Updated `content/resume.md` with a Network Security Engineer�focused r�sum�; PDF exports pull from the same source.
- Gap highlights: finish CCNA/AZ-500, build firewall/IDS/SIEM lab case studies, capture metrics for automation work, document an IR playbook.
- Script `scripts/sync-resume.ps1` copies the newest `resume_*.pdf` from Google Drive into the site (`public/Haziq_Asyraaf_CV.pdf`). Run it whenever you export a new PDF.
- `/resume` now renders the Markdown content dynamically�edit `content/resume.md`, then regenerate the PDF with `npx md-to-pdf` (or your preferred tool) to keep everything in sync.

## Immediate Focus
1. Complete one networking/security lab (pfSense + Suricata or similar), capture screenshots/logs, and write it up for the Projects section.
2. Add quantitative metrics to BCA/CPFB bullets in `content/resume.md` once data is available.
3. Keep `skills.json` aligned with new tooling/certs as you progress (e.g., Splunk, Defender for Cloud, firewall platforms).
