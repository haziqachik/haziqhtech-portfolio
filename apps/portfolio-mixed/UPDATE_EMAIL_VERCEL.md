# ⚠️ IMPORTANT: Update Vercel Environment Variable

## Action Required: Update Email in Vercel

You need to add another environment variable to Vercel:

### Go to Vercel Dashboard

1. Visit: https://vercel.com/dashboard
2. Click your **haziqhtech-portfolio** project
3. Go to **Settings** → **Environment Variables**
4. Click **"Add New"**

### Add This Variable:

- **Key**: `CONTACT_EMAIL`
- **Value**: `haziqh@haziqhtech.sg`
- **Environments**: ✅ Check all three:
  - ✅ Production
  - ✅ Preview
  - ✅ Development

Click **"Save"**

---

## Summary of Changes Made:

✅ Updated `content/profile.json` → `haziqh@haziqhtech.sg`  
✅ Updated `src/app/api/contact/route.ts` → fallback to `haziqh@haziqhtech.sg`  
✅ Updated `.env.local` → `CONTACT_EMAIL="haziqh@haziqhtech.sg"`  
✅ Updated navigation headers → mailto links to `haziqh@haziqhtech.sg`  
✅ Pushed to GitHub → Vercel is deploying now  

---

## Test After Deployment:

Once the current deployment finishes (~2-3 minutes):

1. Visit: https://haziqhtech.sg/contact
2. Fill out the form
3. Submit
4. Check your Gmail (forwarded from `haziqh@haziqhtech.sg`)
5. Email should arrive successfully! 🎉

---

**The deployment is running now. After adding `CONTACT_EMAIL` to Vercel, the contact form will work!**
