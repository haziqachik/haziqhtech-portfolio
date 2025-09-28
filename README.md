This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
## Running Each App (no PowerShell scripts)
- In VS Code, open the integrated terminal (or any shell that can run npm commands).
- For Portfolio: `cd apps/portfolio`, run `npm install`, then `npm run dev`.
- For Timeline: `cd apps/timeline`, run `npm install`, then `npm run dev`.
- If PowerShell blocks scripts, open Command Prompt and run the same commands there.
## Managing portfolio-mixed content
- Update `apps/portfolio-mixed/content/` JSON files (profile, projects, timeline, skills) to add or tweak entries; the UI reloads automatically during dev.
- Profile fields (name, tagline, email, socials) flow into the hero, navbar, footer, and OG metadata without additional code changes.
- To add a project, append an object to `apps/portfolio-mixed/content/projects.json`, for example:
  ```json
  {
    "title": "Zero Trust Platform",
    "description": "Implemented policy-driven access controls across hybrid workloads.",
    "tech": ["Next.js", "Kubernetes", "OPA"],
    "href": "https://haziqhtech.sg/projects/zero-trust-platform",
    "repo": "https://github.com/haziqhtech/zero-trust-platform"
  }
  ```
