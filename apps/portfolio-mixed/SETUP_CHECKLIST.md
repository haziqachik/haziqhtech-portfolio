# ✅ COMPLETE SETUP CHECKLIST

Use this checklist to verify everything is set up correctly.

---

## 📋 CHECKLIST - Complete These in Order

### ☐ STEP 1: Create Anthropic API Key
- [ ] Go to: https://console.anthropic.com/settings/keys
- [ ] Click "Create Key"
- [ ] Name it: "Portfolio AI Moderation"
- [ ] Copy the key (starts with `sk-ant-api03-...`)
- [ ] Save it somewhere safe

---

### ☐ STEP 2: Add Environment Variables to Vercel

Go to: https://vercel.com/haziqachik/haziqhtech-portfolio/settings/environment-variables

Add these 6 variables (click "Add New" for each):

- [ ] **DATABASE_URL**
  ```
  postgresql://neondb_owner:npg_xYsTBaO13qNk@ep-young-mud-a1z4l2ey-pooler.ap-southeast-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require
  ```
  ✅ Production ✅ Preview ✅ Development

- [ ] **ANTHROPIC_API_KEY**
  ```
  [Your key from Step 1]
  ```
  ✅ Production ✅ Preview ✅ Development

- [ ] **ENABLE_AI_MODERATION**
  ```
  true
  ```
  ✅ Production ✅ Preview ✅ Development

- [ ] **AI_PROVIDER**
  ```
  anthropic
  ```
  ✅ Production ✅ Preview ✅ Development

- [ ] **AI_MODEL**
  ```
  sonnet-4.5
  ```
  ✅ Production ✅ Preview ✅ Development

- [ ] **MONGODB_URI**
  ```
  mongodb+srv://AdminhzDBweb:33HzS9823465i+1998@hzwebportfoliocluster.imubfze.mongodb.net/haziq-portfolio
  ```
  ✅ Production ✅ Preview ✅ Development

---

### ☐ STEP 3: Redeploy on Vercel

- [ ] Go to: https://vercel.com/haziqachik/haziqhtech-portfolio/deployments
- [ ] Find latest deployment
- [ ] Click three dots (...) → "Redeploy"
- [ ] Wait ~2 minutes for build to complete
- [ ] Check that build shows ✓ "Ready"

---

### ☐ STEP 4: Test Your Site

#### Test 1: Database & Comments
- [ ] Visit: `https://your-site.vercel.app/blog/maritime-safeguarding-future`
- [ ] Scroll to bottom - see 2 sample comments from Alex Chen and Sarah Maritime
- [ ] Try posting a new comment
- [ ] Should see: "Comment added successfully!"

#### Test 2: AI Moderation Panel
- [ ] Visit: `https://your-site.vercel.app/admin`
- [ ] Find "AI Comment Moderation" section
- [ ] Test good comment:
  ```
  Author: Test User
  Comment: Great article on maritime security!
  ```
- [ ] Click "Analyze with Claude Sonnet 4.5"
- [ ] Should see: ✅ Approved (confidence ~95%)

- [ ] Test spam comment:
  ```
  Author: Spammer
  Comment: Buy cheap products at http://spam.com
  ```
- [ ] Should see: ❌ Rejected (confidence ~99%)

#### Test 3: Check AI Logs (Optional)
- [ ] Go to: Vercel Dashboard → Deployments → Latest
- [ ] Click "Functions" tab
- [ ] Click `/api/comments`
- [ ] Look for: `🤖 AI Moderation: APPROVED - ...`

---

## 🎯 WHAT YOU SHOULD SEE

### When Everything Works:

✅ **Comments Section**
- Shows existing comments
- Can post new comments
- Comments appear immediately (if approved by AI)

✅ **Admin Panel**
- AI moderation tester works
- Shows confidence scores
- Identifies spam/toxicity

✅ **Database**
- Stores comments in Neon PostgreSQL
- Persistent across deployments
- No "temporarily unavailable" messages

✅ **AI Features**
- Auto-moderates new comments
- Blocks spam automatically
- Shows moderation decisions in logs

---

## 🆘 TROUBLESHOOTING

### Issue: "Comments Temporarily Unavailable"

**Cause**: DATABASE_URL not set in Vercel or wrong value

**Fix**:
1. Check Vercel environment variables
2. Make sure DATABASE_URL is the Neon Postgres connection string
3. Redeploy on Vercel

---

### Issue: AI Moderation Not Working

**Check**:
1. Is ANTHROPIC_API_KEY set in Vercel?
2. Is ENABLE_AI_MODERATION set to "true" (string)?
3. Check Function Logs in Vercel for errors

**Test Locally**:
```powershell
cd apps\portfolio-mixed
$env:ANTHROPIC_API_KEY="your-key"
$env:ENABLE_AI_MODERATION="true"
npm run dev
# Visit: http://localhost:3000/admin
```

---

### Issue: Comments Not Saving

**Cause**: Database connection issue

**Fix**:
```powershell
# Test database connection
$env:DATABASE_URL="postgresql://neondb_owner:npg_xYsTBaO13qNk@ep-young-mud-a1z4l2ey-pooler.ap-southeast-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require"
npx prisma db pull
# Should succeed without errors
```

---

## 📊 VERIFICATION SCRIPT

Run this to test everything locally:

```powershell
cd apps\portfolio-mixed
.\test-setup.ps1
```

This will check:
- ✅ Database connection
- ✅ Vercel deployment status
- ✅ Local build success

---

## 🎉 WHEN COMPLETE

You'll have:
- ✅ AI-powered comment moderation (Claude Sonnet 4.5)
- ✅ Working comments system (PostgreSQL)
- ✅ Admin tools for testing
- ✅ Production-ready deployment

---

## 📚 DOCUMENTATION

All setup docs in `apps/portfolio-mixed/`:
- `QUICK_START.md` - 3-minute setup
- `SETUP_GUIDE.md` - Full guide
- `ARCHITECTURE.md` - System diagrams
- `NEXT_STEPS.md` - Detailed instructions

---

**Save this checklist and check off items as you complete them!** ✅
