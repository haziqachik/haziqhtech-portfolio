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
