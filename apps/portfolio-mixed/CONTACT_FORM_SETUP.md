# 📧 Contact Form Email Setup Guide

Your contact form is now configured to send real emails to **haziq@haziqhtech.sg**!

## ✅ What's Already Done

1. **API Route Created**: `/api/contact` endpoint with Resend integration
2. **Contact Form Updated**: Now uses the API route as primary method
3. **Fallback System**: EmailJS → Formspree → mailto: (if API fails)
4. **Package Installed**: Resend npm package already installed

## 🔧 Setup Steps (5 minutes)

### Step 1: Get Your FREE Resend API Key

1. Go to: **https://resend.com/**
2. Click **"Start Building"** (sign up with GitHub or email)
3. After logging in, go to: **https://resend.com/api-keys**
4. Click **"Create API Key"**
   - Name: `Portfolio Contact Form`
   - Permission: **Full Access** (or just "Sending Access")
5. Copy the API key (starts with `re_...`)

### Step 2: Add API Key to Environment

1. Open `.env.local` file in your project root
2. Find the line: `RESEND_API_KEY="re_123456789_YourAPIKeyHere"`
3. Replace `re_123456789_YourAPIKeyHere` with your actual API key
4. Save the file

Example:
```env
RESEND_API_KEY="re_ABC123xyz_YourRealKeyFromResend"
CONTACT_EMAIL="haziq@haziqhtech.sg"
```

### Step 3: Deploy to Vercel

Add the environment variable to Vercel:

1. Go to: **https://vercel.com/dashboard**
2. Click on your **haziqhtech-portfolio** project
3. Go to **Settings** → **Environment Variables**
4. Add:
   - **Key**: `RESEND_API_KEY`
   - **Value**: Your Resend API key (the one that starts with `re_...`)
   - **Environment**: Select all (Production, Preview, Development)
5. Click **"Save"**
6. **Redeploy** your site (or push a new commit)

### Step 4: Test Locally

```bash
# Make sure environment is loaded
npm run dev

# Visit: http://localhost:3000/contact
# Fill out and submit the contact form
# Check if email arrives at haziq@haziqhtech.sg
```

### Step 5: Test in Production

After deploying:
1. Visit: **https://haziqhtech.sg/contact**
2. Fill out the contact form
3. Submit
4. Check your email at **haziq@haziqhtech.sg** (via Cloudflare forwarding to Gmail)

## 📊 Resend Free Tier Limits

- ✅ **100 emails per day**
- ✅ **3,000 emails per month**
- ✅ **Unlimited domains**
- ✅ **Email analytics**

This is more than enough for a portfolio contact form!

## 🎨 Email Features

Your contact form emails include:

- ✅ **Beautiful HTML formatting** with gradient header
- ✅ **Reply-To header** set to sender's email (click Reply to respond)
- ✅ **Sender info** (name, email, message)
- ✅ **Timestamp** in Singapore time (SGT)
- ✅ **Mobile-friendly** responsive design

## 🔄 Fallback System

If Resend fails (unlikely), the form automatically tries:

1. **Resend API** (primary - fast, reliable)
2. **EmailJS** (if configured)
3. **Formspree** (if configured)
4. **mailto: link** (opens user's email client)

## 🚨 Troubleshooting

### "Email service not configured" error

**Solution**: Make sure `RESEND_API_KEY` is set in `.env.local` (local) and Vercel (production)

### Emails not arriving

1. **Check spam folder** in your Gmail
2. **Verify Cloudflare Email Routing** is working (send test email to haziq@haziqhtech.sg)
3. **Check Resend dashboard** at https://resend.com/emails for delivery status
4. **Look at Vercel logs** for any API errors

### "Failed to send email" error

1. **Verify API key** is correct (no extra spaces, quotes, etc.)
2. **Check Resend quota** (100/day limit)
3. **Restart dev server** after adding API key
4. **Redeploy on Vercel** after adding environment variable

## 🎯 Next Steps (Optional)

### 1. Verify Your Own Domain (Professional)

Instead of `onboarding@resend.dev`, use `contact@haziqhtech.sg`:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter: `haziqhtech.sg`
4. Add DNS records in **Cloudflare** (Resend will show you which ones)
5. Wait for verification (~5-30 minutes)
6. Update `from:` in `src/app/api/contact/route.ts`:
   ```typescript
   from: "Contact Form <contact@haziqhtech.sg>",
   ```

### 2. Add Auto-Reply

Send an automatic "Thanks for contacting me!" email to the sender.

### 3. Save Submissions to Database

Store all contact form submissions in your Postgres database for reference.

### 4. Add Rate Limiting

Prevent spam by limiting submissions per IP address.

## 📝 Summary

✅ Contact form API route created  
✅ Resend package installed  
✅ Environment variables configured  
⏳ **ACTION NEEDED**: Get Resend API key and add to `.env.local` + Vercel  
⏳ **ACTION NEEDED**: Test locally and in production  

After adding the API key, your contact form will send beautiful emails directly to **haziq@haziqhtech.sg**! 🎉

---

**Questions?** The contact form will work once you add the Resend API key. It takes literally 2 minutes to set up!
