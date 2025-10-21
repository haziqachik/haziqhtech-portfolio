# Quick Start: Enable Claude Sonnet 4.5

The fastest way to get AI-powered comments working on your portfolio.

## ⚡ 3-Minute Setup

### Step 1: Get Anthropic API Key (2 minutes)

1. Open: https://console.anthropic.com/
2. Sign up or log in
3. Go to **API Keys**
4. Click **Create Key**
5. Copy the key (starts with `sk-ant-api03-...`)

### Step 2: Add to Vercel (1 minute)

1. Open: https://vercel.com/haziqachik/haziqhtech-portfolio/settings/environment-variables
2. Click **Add New**
3. Add each of these:

```
Key: ANTHROPIC_API_KEY
Value: sk-ant-api03-your-key-here
(Apply to: Production, Preview, Development)
```

```
Key: ENABLE_AI_MODERATION
Value: true
(Apply to: Production, Preview, Development)
```

```
Key: DATABASE_URL
Value: postgres://default:...  (your Vercel Postgres URL)
(Apply to: Production, Preview, Development)
```

4. Click **Save** after each

### Step 3: Redeploy

```powershell
git add .
git commit -m "Enable Claude Sonnet 4.5"
git push origin main
```

Done! 🎉

---

## 🧪 Test It

### Test AI Moderation

1. Go to: https://your-site.vercel.app/admin
2. Find the **AI Comment Moderation** panel
3. Enter a test comment:
   - Good: "Great article, very insightful!"
   - Spam: "Buy cheap products at http://spam.com"
4. Click **Analyze with Claude Sonnet 4.5**
5. See AI decision in real-time

### Test Live Comments

1. Go to any blog post: `/blog/maritime-safeguarding-future`
2. Scroll to comments
3. Post a comment
4. Check Vercel logs to see AI moderation:
   ```
   Vercel Dashboard → Deployments → Latest → Functions → /api/comments
   ```
   Look for: `🤖 AI Moderation: APPROVED` or `REJECTED`

---

## 🎯 What You Get

With `ANTHROPIC_API_KEY` set:

✅ **Auto-moderation** - Claude blocks spam/toxicity  
✅ **Comment summaries** - AI summarizes discussions  
✅ **Reply suggestions** - AI helps you respond  
✅ **Admin tools** - Test moderation before publishing  

Without it:

⚠️ **Basic moderation** - Simple keyword filtering  
⚠️ **Auto-approve** - All comments published immediately  

---

## 📝 Environment Variables Reference

| Variable | Required? | Purpose | Example |
|----------|-----------|---------|---------|
| `ANTHROPIC_API_KEY` | Optional | Enables AI features | `sk-ant-api03-...` |
| `ENABLE_AI_MODERATION` | Optional | Auto-moderate comments | `true` or `false` |
| `DATABASE_URL` | **Required** | Store comments | `postgres://...` |
| `MONGODB_URI` | Optional | Store projects | `mongodb+srv://...` |

---

## 🆘 Issues?

### AI Not Working

**Check**: Is `ANTHROPIC_API_KEY` set in Vercel?

1. Go to: Settings → Environment Variables
2. Look for `ANTHROPIC_API_KEY`
3. Make sure it's applied to **Production**

**Check**: Are logs showing errors?

1. Vercel Dashboard → Deployments → Latest
2. Click on a function (e.g., `/api/comments`)
3. Look for error messages with "Anthropic" or "AI"

### Comments Not Saving

**Symptom**: "Comments temporarily unavailable"

**Fix**: You need Vercel Postgres (not SQLite)

1. Vercel Dashboard → Storage → Create Database → Postgres
2. Copy the `POSTGRES_PRISMA_URL` 
3. Set as `DATABASE_URL` in Environment Variables

See full guide: [SETUP_GUIDE.md](./SETUP_GUIDE.md)

---

## 📚 More Info

- **Full Setup Guide**: [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- **AI Implementation**: `src/lib/ai-moderation.ts`
- **LLM Adapter**: `src/lib/llm.ts`
- **Anthropic Docs**: https://docs.anthropic.com/

---

**Ready to customize? Edit `src/lib/ai-moderation.ts` to adjust moderation rules! 🎨**
