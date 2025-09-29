Deployment checklist — Vercel + CLDY (domain: haziqhtech.sg)

This repo is a monorepo using npm workspaces. The `vercel.json` at the
repo root is configured to run `npm ci` and `npm run build:mixed` so Vercel
can build `apps/portfolio-mixed` correctly.

1) Local verification (do this first)
   - npm ci
   - npm run build:mixed
   - npm --workspace apps/portfolio-mixed run start
   - Visit http://localhost:3000 and verify the site loads and critical flows work.

2) Vercel setup
   - Connect your repo to Vercel (choose the Git provider where the repo lives).
   - Create a new project from the repo. Project root: repository root.
   - Vercel should automatically detect Next.js. If not, set Framework Preset = Next.js.
   - Confirm `Install Command: npm ci` and `Build Command: npm run build:mixed`.
   - Add environment variables (Production scope):
     - NEXT_PUBLIC_SITE_URL = https://haziqhtech.sg
     - NEXT_PUBLIC_EMAILJS_SERVICE_ID
     - NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
     - NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
     - (Add any other API keys the app uses)

3) Add domain in Vercel
   - Project → Domains → Add `haziqhtech.sg` (and `www.haziqhtech.sg` if you want both).
   - Vercel will show the DNS records to add at your registrar (CLDY). Copy them.

4) Update DNS at CLDY (use the exact values Vercel shows; typical values below)
   - A  @    76.76.21.21    (points root domain to Vercel)
   - CNAME  www  cname.vercel-dns.com  (points www to Vercel)
   - IMPORTANT: Do not enable any proxying/traffic masking at CLDY — set DNS-only.
     Vercel must be able to validate the domain and issue certificates directly.

5) Wait for verification & TLS
   - Vercel will verify the DNS records and provision TLS certificates. This may
     take several minutes. Monitor the Domain status in the Vercel dashboard.

6) Final checks
   - Visit https://haziqhtech.sg and https://www.haziqhtech.sg (if added). Test forms.
   - If you need to redirect www → root (or root → www), add a redirect rule in Vercel.

Notes & troubleshooting
  - If build fails on Vercel, check Deployment logs in the Vercel project — they mirror
    what `npm run build:mixed` does locally. Fix errors locally first, then push.
  - If TLS fails, double-check the DNS records at CLDY and ensure there is no proxying.
  - If you want Cloudflare-like features, consider using CLDY’s proxy after the domain
    is successfully verified and certs are active — but switch carefully to Full (strict)
    SSL mode and test thoroughly.

If you want, I can:
  - Create a GitHub Action that runs `npm run build:mixed` on PRs.
  - Add a redirect config for canonical host (www → root) and commit it.
