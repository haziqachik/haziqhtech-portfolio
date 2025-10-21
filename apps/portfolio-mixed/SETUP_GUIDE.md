# Portfolio Setup Guide

Complete step-by-step guide to set up your portfolio with all features enabled, including AI-powered comment moderation with Claude Sonnet 4.5.

## 📋 Table of Contents

1. [Database Setup (Required for Production)](#1-database-setup)
2. [AI Setup (Optional - Enables Claude Sonnet 4.5)](#2-ai-setup-claude-sonnet-45)
3. [Vercel Deployment](#3-vercel-deployment)
4. [Testing Locally](#4-testing-locally)
5. [Feature Overview](#5-feature-overview)

---

## 1. Database Setup

### Option A: Vercel Postgres (Recommended for Production)

**Step 1: Create Vercel Postgres Database**

1. Go to your Vercel project dashboard: https://vercel.com/haziqachik/haziqhtech-portfolio
2. Click on the **"Storage"** tab
3. Click **"Create Database"**
4. Select **"Postgres"**
5. Choose a name (e.g., `portfolio-comments`)
6. Select region closest to your users (e.g., `Singapore - sin1`)
7. Click **"Create"**

**Step 2: Copy Connection String**

After creation, Vercel will show you environment variables. You need:

```bash
POSTGRES_URL="postgres://default:..."
POSTGRES_PRISMA_URL="postgres://default:...?pgbouncer=true&connect_timeout=15"
```

**Step 3: Update Environment Variables**

1. In Vercel dashboard → **Settings** → **Environment Variables**
2. Update `DATABASE_URL` to use your Postgres connection:
   ```
   DATABASE_URL="postgres://default:abc123...@region.postgres.vercel-storage.com:5432/verceldb"
   ```
3. Add all `POSTGRES_*` variables that Vercel provided
4. Click **Save**

**Step 4: Run Prisma Migration**

```powershell
cd apps\portfolio-mixed
$env:DATABASE_URL="your-postgres-url-here"
npx prisma migrate deploy
```

### Option B: Local SQLite (Development Only)

For local development, SQLite works fine:

```powershell
cd apps\portfolio-mixed

# Create database
npx prisma migrate dev --name init

# Seed sample comments (optional)
npx tsx src/scripts/seed-comments.ts
```

> ⚠️ **Warning**: SQLite with `file:./dev.db` will NOT work on Vercel (serverless). You must use Postgres for production.

---

## 2. AI Setup (Claude Sonnet 4.5)

This enables AI-powered features:
- ✨ Automatic comment moderation (spam, toxicity detection)
- 📝 Comment summarization
- 💡 Reply suggestions

### Step 1: Get Anthropic API Key

1. Go to: https://console.anthropic.com/
2. Sign up or log in
3. Navigate to **API Keys** section
4. Click **"Create Key"**
5. Copy your API key (starts with `sk-ant-api03-...`)

### Step 2: Add to Vercel Environment Variables

1. Go to Vercel dashboard → **Settings** → **Environment Variables**
2. Add these variables:

```bash
ANTHROPIC_API_KEY="sk-ant-api03-your-actual-key-here"
AI_PROVIDER="anthropic"
AI_MODEL="sonnet-4.5"
ENABLE_AI_MODERATION="true"
```

3. Click **Save** after each

### Step 3: Add to Local `.env.local`

```powershell
cd apps\portfolio-mixed
```

Create or edit `.env.local`:

```bash
ANTHROPIC_API_KEY="sk-ant-api03-your-actual-key-here"
AI_PROVIDER="anthropic"
AI_MODEL="sonnet-4.5"
ENABLE_AI_MODERATION="true"
```

### Step 4: Test AI Moderation

Run dev server and test the admin panel:

```powershell
npm run dev:mixed
```

Then visit: http://localhost:3000/admin and look for the **AI Moderation** panel.

---

## 3. Vercel Deployment

### Auto-Deploy (Recommended)

Since your repo is already connected to Vercel, every push triggers a deploy:

```powershell
# Make sure all changes are committed
git add .
git commit -m "Enable Claude Sonnet 4.5 with AI moderation"
git push origin main
```

Vercel will automatically:
1. Detect the push
2. Build your project
3. Deploy to production

### Manual Deploy via CLI

If you prefer manual control:

```powershell
# Install Vercel CLI (if not already)
npm install -g vercel

# Login to Vercel (opens browser)
vercel login

# Deploy to production
cd apps\portfolio-mixed
vercel --prod
```

---

## 4. Testing Locally

### Run Development Server

```powershell
cd apps\portfolio-mixed
npm run dev
```

Visit: http://localhost:3000

### Test Comment System

1. Go to any blog post: http://localhost:3000/blog/maritime-safeguarding-future
2. Scroll to comments section
3. Try posting a comment:
   - ✅ Good comment: "Great insights on maritime security!"
   - ❌ Spam comment: "Buy cheap watches here: http://scam.com"
4. Check terminal logs for AI moderation results

### Test Admin Panel

Visit: http://localhost:3000/admin

Features available:
- 📊 Database health checks
- 🤖 AI moderation tester
- 💬 Comment management
- 📈 Analytics overview

### Test API Endpoints

```powershell
# Check database health
curl http://localhost:3000/api/health

# Test comment moderation
curl -X POST http://localhost:3000/api/comments/moderate -H "Content-Type: application/json" -d "{\"commentText\":\"This is a test\",\"authorName\":\"Test User\"}"

# Get comment summary
curl "http://localhost:3000/api/comments/summarize?postSlug=maritime-safeguarding-future"
```

---

## 5. Feature Overview

### ✅ What's Implemented

| Feature | Status | Requires |
|---------|--------|----------|
| **Comment System** | ✅ Ready | Postgres (production) |
| **Comment UI with Fallback** | ✅ Ready | Nothing (graceful degradation) |
| **AI Comment Moderation** | ✅ Ready | `ANTHROPIC_API_KEY` + `ENABLE_AI_MODERATION=true` |
| **AI Comment Summarization** | ✅ Ready | `ANTHROPIC_API_KEY` |
| **AI Reply Suggestions** | ✅ Ready | `ANTHROPIC_API_KEY` |
| **Admin Dashboard** | ✅ Ready | Nothing (basic features work without AI) |
| **Database Health Checks** | ✅ Ready | Nothing |
| **Multi-DB Architecture** | ✅ Ready | Postgres + MongoDB configs |

### 🎯 How AI Moderation Works

When `ENABLE_AI_MODERATION=true`:

1. User submits comment
2. API sends to Claude Sonnet 4.5 for analysis
3. AI checks for:
   - Spam patterns
   - Toxic language
   - Relevance to content
   - Overall quality
4. Returns decision: **Approve** or **Reject**
5. Rejected comments are saved but marked as not approved
6. Admin can review flagged comments later

When AI is disabled or unavailable:
- Falls back to basic rule-based moderation
- Auto-approves most comments (demo mode)

### 📊 AI Confidence Levels

- **90-100%**: Very confident (spam/obvious toxicity)
- **70-89%**: Confident (questionable content)
- **50-69%**: Uncertain (edge cases)
- **Below 50%**: Low confidence (manual review recommended)

---

## 🆘 Troubleshooting

### Comments Not Showing on Production

**Symptom**: Comments work locally but fail on Vercel

**Solution**: 
1. Check you're using Postgres, not SQLite (`file:./dev.db`)
2. Verify `DATABASE_URL` in Vercel environment variables
3. Check deployment logs for database connection errors

### AI Moderation Not Working

**Symptom**: Comments auto-approve without AI analysis

**Checks**:
1. Is `ANTHROPIC_API_KEY` set in Vercel? (Check Settings → Environment Variables)
2. Is `ENABLE_AI_MODERATION` set to `"true"` (string, not boolean)?
3. Check deployment logs for AI errors:
   ```
   Vercel Dashboard → Deployments → Latest → Function Logs
   ```

### "Comments Temporarily Unavailable" Message

**Symptom**: Yellow warning box instead of comment form

**Meaning**: The `/api/comments` endpoint returned 503 (service unavailable)

**Common Causes**:
- Using SQLite (`file:`) on Vercel (serverless)
- Database connection string incorrect
- Prisma client not generated

**Fix**: Follow [Database Setup](#1-database-setup) section above

---

## 🎓 Learning Resources

- **Anthropic Claude Docs**: https://docs.anthropic.com/
- **Prisma Docs**: https://www.prisma.io/docs
- **Vercel Postgres**: https://vercel.com/docs/storage/vercel-postgres
- **Next.js App Router**: https://nextjs.org/docs/app

---

## 📞 Next Steps

After completing this setup:

1. ✅ Test comments on a live blog post
2. ✅ Try posting spam → should be rejected by AI
3. ✅ Check admin panel → see moderation stats
4. ✅ Monitor Vercel logs for AI activity
5. ✅ (Optional) Customize moderation rules in `src/lib/ai-moderation.ts`

**Your portfolio is now powered by Claude Sonnet 4.5! 🚀**
