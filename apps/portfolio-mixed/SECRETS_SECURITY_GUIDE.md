# 🔒 Environment Variables Security Guide

## Sensitive vs Public Variables

### 🔴 Sensitive Variables (Hide the Value)
These should ALWAYS be marked sensitive in Vercel:

- `DATABASE_URL` - PostgreSQL connection string
- `MONGODB_URI` - MongoDB connection string
- `RESEND_API_KEY` - Email service API key
- `ANTHROPIC_API_KEY` - Claude AI API key
- `NEXTAUTH_SECRET` - Authentication secret

**How to mark as Sensitive:**
1. Vercel Dashboard → Settings → Environment Variables
2. Click variable → Edit
3. Check: "Sensitive (value hidden after saving)"
4. Save

---

### 🟢 Public Variables (Can be Visible)
These are fine to be public:

- `NEXT_PUBLIC_GA_ID` - Google Analytics (exposed in browser anyway)
- `NEXT_PUBLIC_SITE_URL` - Your website URL
- `AI_PROVIDER` - Configuration setting
- `USE_MOCK_MONGODB` - Feature flag

**Why?** They start with `NEXT_PUBLIC_` so they're included in the browser bundle.

---

## Security Best Practices

### 1. Rotate Secrets Regularly
```bash
# If a secret is exposed:
1. Generate new secret/key at the source
2. Add new version to Vercel
3. Test that everything works
4. Delete old secret at the source (not Vercel yet)
5. Wait 24 hours
6. Remove old version from Vercel
```

### 2. Database Credentials
**For DATABASE_URL (PostgreSQL):**
- Hosted on Vercel Postgres
- Connection string is like: `postgres://user:pass@host:5432/db`
- ✅ Rotate: Go to Vercel Postgres dashboard → Reset credentials
- ✅ Update Vercel env vars with new connection string
- ✅ Redeploy

**For MONGODB_URI (MongoDB Atlas):**
- Connection string is like: `mongodb+srv://user:pass@cluster.mongodb.net/db`
- ✅ Rotate: Go to MongoDB Atlas → Database Access → Change password
- ✅ Update Vercel env vars with new connection string
- ✅ Redeploy

### 3. API Keys
**For RESEND_API_KEY:**
- Go to https://resend.com/api-keys
- Generate new key
- Add to Vercel
- Delete old key from Resend
- Redeploy

**For ANTHROPIC_API_KEY:**
- Go to https://console.anthropic.com/
- Create new API key
- Add to Vercel
- Delete old key
- Redeploy

### 4. Vercel-Managed Secrets
For truly sensitive secrets, you can also use:
```bash
# Via Vercel CLI
vercel env add RESEND_API_KEY
# Enter value (hidden)
# Select environments
```

---

## Current Status of Your Secrets

| Variable | Current | Should Be | Action |
|----------|---------|-----------|--------|
| `DATABASE_URL` | Visible ⚠️ | Sensitive | ✅ Mark Sensitive |
| `MONGODB_URI` | Visible ⚠️ | Sensitive | ✅ Mark Sensitive |
| `NEXT_PUBLIC_GA_ID` | Visible ✅ | Public | No change |
| `NEXT_PUBLIC_SITE_URL` | Visible ✅ | Public | No change |
| `RESEND_API_KEY` | N/A | Sensitive | Add when needed |
| `ANTHROPIC_API_KEY` | N/A | Sensitive | Add when needed |

---

## Immediate Action Required

1. Go to Vercel: https://vercel.com/dashboard/haziqhtech-portfolio
2. Settings → Environment Variables
3. For each variable:
   - `DATABASE_URL` → Edit → Check "Sensitive" → Save
   - `MONGODB_URI` → Edit → Check "Sensitive" → Save
4. Click **Redeploy** button at bottom
5. Done! ✅

---

## What Happens After Marking Sensitive

- Value is encrypted by Vercel
- Shown as `••••••••` in UI
- Still accessible by your application
- No redeploy needed (retroactive security)
- Can't be seen even by you after saving (by design)

---

## Emergency: Secret Was Exposed

If a secret was accidentally exposed publicly:

1. **Immediately rotate it**:
   - Generate new secret at source
   - Add new version to Vercel

2. **Delete old secret**:
   - From source (Resend, MongoDB, etc.)
   - This invalidates old key

3. **Monitor for abuse**:
   - Watch API logs for unauthorized access
   - Check database access logs

4. **Update documentation**:
   - Tell your team
   - Update internal docs with new process

---

## Links

- **Vercel Environment Variables**: https://vercel.com/docs/projects/environment-variables
- **Vercel Postgres**: https://vercel.com/postgres
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
- **Resend API Keys**: https://resend.com/api-keys
- **Anthropic Console**: https://console.anthropic.com/

