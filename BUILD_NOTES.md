First run build — portfolio fixes and notes
=========================================

This commit contains a set of targeted fixes and developer conveniences to get the `apps/portfolio` and `apps/portfolio-mixed` Next.js workspaces building and running locally in a Windows environment.

What I changed (high level)
- Added a repo-level ambient TypeScript declaration for Tailwind modules so monorepo TypeScript checks don't fail on Tailwind type resolution: `types/tailwindcss.d.ts`.
- Added a UI-package local declaration to resolve `tailwindcss/colors` during `packages/ui` and app builds: `packages/ui/src/types/tailwindcss-colors.d.ts`.
- Updated `apps/portfolio/tsconfig.json` to include the above declarations so the app picks them up during `next build`.
- Made `apps/portfolio/tailwind.config.ts` untyped (`const config: any = { ... }`) to avoid moduleResolution problems with different TypeScript settings across the monorepo.
- Relaxed the MDX components mapping type so MDX components with different props can be used: `apps/portfolio-mixed/src/types/mdx.ts`.
- Added small build notes and minor cleanups so the `portfolio` workspace can be built and the `portfolio-mixed` dev server can be started locally.

Files changed or added in this commit (high level)
- `types/tailwindcss.d.ts` — ambient module declarations for `tailwindcss` and `tailwindcss/colors`.
- `packages/ui/src/types/tailwindcss-colors.d.ts` — local declaration for `tailwindcss/colors` used by the UI package.
- `apps/portfolio/tsconfig.json` — include entries for ambient declarations.
- `apps/portfolio/tailwind.config.ts` — removed typed import to avoid moduleResolution fails.
- `apps/portfolio-mixed/src/types/mdx.ts` — loosened MDX map type to `ComponentType<any>` with ESLint note.

How to run locally (recommended via cmd.exe on Windows)
1) Install dependencies (repo root):
```cmd
npm install
```

2) Start dev server for `portfolio-mixed` (hot reload):
```cmd
npm --workspace apps/portfolio-mixed run dev
```
Open: http://localhost:3000

3) Start dev server for `portfolio`:
```cmd
npm --workspace apps/portfolio run dev
```

4) Production preview (build + start):
```cmd
npm --workspace apps/portfolio run build
npx --workspace apps/portfolio next start -p 3000
```

Notes / next cleanups
- The repository currently includes a small number of temporary typing/lint relaxations (use of `any`, an ambient declaration). These are purposeful and low-risk to unblock the monorepo build, but you can tighten them later by:
  - switching `moduleResolution` to `node16`/`nodenext` if you prefer using upstream tailwind types;
  - replacing `ComponentType<any>` with a stricter MDX component mapping.

Repository link
- https://github.com/haziqachik/haziqhtech-portfolio

If you want, I can now also:
- open a PR instead of committing directly to `main` (recommended for collaboration), or
- create a release tag and upload an archive of the built assets.

---

CI / Vercel onboarding steps (what I added and next steps)

I added a GitHub Actions workflow at `.github/workflows/ci-build.yml` that runs on push and pull requests to `main`. The workflow does a repo-root `npm ci` and runs `npm run build:mixed` to build `apps/portfolio-mixed`. It also uploads the `.next` folder as an artifact to help debug build issues.

If you'd like me to finish the Vercel project setup and domain configuration, please do one of the following:

- Invite the GitHub user/email I should use as a collaborator to your Vercel project (Vercel UI: Team/Project > Settings > Members -> Invite). Once invited I can:
  - Confirm the import settings (Project root should be the repository root).
  - Ensure Install command is `npm ci` and Build command is `npm run build:mixed` (or use the included `vercel.json`).
  - Add production environment variables (for example: `NEXT_PUBLIC_SITE_URL`, EmailJS keys) in the Vercel Project Settings.
  - Trigger and verify a production deploy.

- Or add me as a Deploy Contributor on the Vercel project and provide the project name here. I cannot invite myself.

DNS / CLDY steps (what you'll do in your DNS provider):

1. In Vercel: Project > Domains > Add Domain > enter `haziqhtech.sg`.
2. Vercel will display DNS records to add at your DNS host (CLDY). Copy them.
3. In CLDY/Cloudflare/your registrar: create the DNS records exactly as Vercel provides (CNAME for www, and A/ALIAS for apex if required).
4. Wait for propagation and click Verify in Vercel.

What I need from you to finish:

- Invite the account I should use on Vercel (or provide a one-time invite link).

- Confirm any environment variables (or add them to Vercel after I join).

Once invited I will:

- Verify the import/build settings and trigger a deployment.

- Complete the domain verification and provide a final smoke-test of the live site.

