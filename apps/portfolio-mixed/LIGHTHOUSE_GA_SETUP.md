# 🎯 Performance Audit & Optimization Guide

## Google Analytics Setup

Google Analytics is now integrated! Follow these steps to activate it:

### Step 1: Create Google Analytics 4 Property
1. Go to https://analytics.google.com/
2. Sign in with your Google account
3. Create a new Property for haziqhtech.sg
4. Measurement ID will be like: `G-XXXXXXXXXX`

### Step 2: Add to Environment Variables

**For Local Development:**
```bash
# In .env.local
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**For Production (Vercel):**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add: `NEXT_PUBLIC_GA_ID` = `G-XXXXXXXXXX`
3. Redeploy

### Step 3: Verify It's Working
1. Build & deploy: `npm run build`
2. Visit https://haziqhtech.sg
3. Open Google Analytics dashboard
4. Real-time section should show your visits

---

## Lighthouse Performance Audit

### Run Audit Locally
```bash
npm run build
npm run start

# In another terminal:
lighthouse https://localhost:3000 --view
```

### Check Key Metrics (Core Web Vitals)
- **LCP (Largest Contentful Paint)**: Target < 2.5s
- **FID (First Input Delay)**: Target < 100ms  
- **CLS (Cumulative Layout Shift)**: Target < 0.1

### Vercel Analytics
1. Go to Vercel Dashboard → Your Project
2. Click "Analytics" tab
3. View real visitor metrics

### Chrome DevTools Lighthouse
1. Open https://haziqhtech.sg
2. Chrome → DevTools (F12)
3. Lighthouse tab → Generate report

---

## What Gets Tracked

### Google Analytics Tracks:
- Page views
- Unique visitors
- Bounce rate
- Session duration
- Traffic source (Google, LinkedIn, direct)
- Device & browser info
- Geographic location
- User demographics

### Performance Data Shows:
- Page load speed
- Time to first contentful paint
- Cumulative layout shift
- Overall performance score

---

## Next Steps for Optimization

### Quick Wins:
- [ ] Review Lighthouse report
- [ ] Optimize images (check if all use Next.js `<Image>`)
- [ ] Check bundle size
- [ ] Enable compression

### Core Web Vitals Improvements:
- [ ] Implement code splitting
- [ ] Defer non-critical JavaScript
- [ ] Preload critical resources
- [ ] Optimize fonts loading

### SEO Improvements:
- [ ] Submit sitemap to Google Search Console
- [ ] Verify domain in Search Console
- [ ] Monitor search performance

---

## Dashboard Links

- **Google Analytics**: https://analytics.google.com/
- **Vercel Analytics**: https://vercel.com/dashboard
- **Google Search Console**: https://search.google.com/search-console
- **Lighthouse CI**: Can be integrated with GitHub Actions

---

## Getting Help

Each metric is clickable in the dashboards for detailed explanations.
