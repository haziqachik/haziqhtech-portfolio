# 🚀 Vercel Deployment - Add Resend API Key

## Quick Steps to Activate Contact Form in Production

Your code has been pushed and Vercel is deploying now. To activate the contact form, you need to add the Resend API key to Vercel.

---

## Step 1: Go to Vercel Dashboard

1. Open: **https://vercel.com/dashboard**
2. Click on your **haziqhtech-portfolio** project

---

## Step 2: Add Environment Variable

1. Click **"Settings"** (top menu)
2. Click **"Environment Variables"** (left sidebar)
3. Click **"Add New"** button

---

## Step 3: Add the API Key

Fill in the form:

- **Key (Name)**: `RESEND_API_KEY`
- **Value**: `re_H8nd6vha_8yTr5txGgAE3A5X4PqvJcdgC`
- **Environments**: ✅ Check all three:
  - ✅ Production
  - ✅ Preview
  - ✅ Development

Click **"Save"**

---

## Step 4: Redeploy (If Needed)

The current deployment might not have the API key yet. Two options:

### Option A: Wait for Current Deployment to Finish, Then Redeploy

1. Go to **"Deployments"** tab
2. Wait for the current deployment to finish
3. Click the **3 dots (...)** on the latest deployment
4. Click **"Redeploy"**

### Option B: Make a Small Change and Push Again

```bash
# Add a comment or space to any file
git commit --allow-empty -m "trigger redeploy with API key"
git push
```

---

## Step 5: Test the Contact Form

After redeployment completes (~2 minutes):

1. Visit: **https://haziqhtech.sg/contact**
2. Fill out the form:
   - Name: `Test User`
   - Email: `your-email@example.com`
   - Message: `Testing contact form!`
3. Click **"Send Message"**
4. You should see: **"Thanks! Your message has been sent successfully..."**
5. Check your Gmail (via Cloudflare forwarding to haziq@haziqhtech.sg)

---

## ✅ Expected Result

You should receive a beautiful email with:
- 📧 From: **Portfolio Contact <onboarding@resend.dev>**
- 📬 To: **haziq@haziqhtech.sg** (forwarded to your Gmail)
- 🎨 Beautiful gradient header design
- 👤 Sender's name and email
- 💬 Their message
- ⏰ Timestamp in Singapore time
- 🔄 Reply button automatically set to sender's email

---

## 🔍 Troubleshooting

### "Email service not configured" error

**Problem**: API key not added to Vercel or deployment hasn't picked it up yet

**Solution**:
1. Verify you added `RESEND_API_KEY` in Vercel Settings → Environment Variables
2. Make sure you checked all 3 environments (Production, Preview, Development)
3. Redeploy the site
4. Wait ~2 minutes for deployment to complete

### Emails not arriving

**Checks**:
1. ✅ Check **spam folder** in Gmail
2. ✅ Verify Cloudflare Email Routing is working (send a test email to haziq@haziqhtech.sg)
3. ✅ Check **Resend dashboard** at https://resend.com/emails for delivery logs
4. ✅ Check **Vercel deployment logs** for any API errors

### Form shows "Failed to send email"

**Problem**: API key might be incorrect or Resend API error

**Solution**:
1. Double-check the API key in Vercel (no extra spaces)
2. Verify API key is correct: `re_H8nd6vha_8yTr5txGgAE3A5X4PqvJcdgC`
3. Check Resend dashboard for any quota limits (100 emails/day)
4. Check Vercel function logs for detailed error messages

---

## 📊 Monitor Email Deliveries

### Resend Dashboard

Visit: **https://resend.com/emails**

You'll see:
- 📧 All emails sent
- ✅ Delivery status (Sent, Delivered, Bounced, etc.)
- 📈 Open rates (if tracking enabled)
- 🕐 Timestamps

### Vercel Function Logs

1. Go to Vercel Dashboard → Your Project
2. Click **"Logs"** tab
3. Filter by `/api/contact` to see contact form submissions
4. Look for success/error messages

---

## 🎉 Success Checklist

- [ ] Environment variable `RESEND_API_KEY` added to Vercel
- [ ] All 3 environments selected (Production, Preview, Development)
- [ ] Site redeployed with new environment variable
- [ ] Contact form tested at https://haziqhtech.sg/contact
- [ ] Email received in Gmail inbox
- [ ] Email is beautifully formatted with all details

---

## 🚀 Next Steps After Contact Form Works

1. **Monitor submissions**: Check Resend dashboard regularly
2. **Respond promptly**: Reply to contact form messages within 24 hours
3. **Track conversions**: See which blog posts drive the most contact form submissions
4. **Upgrade if needed**: If you exceed 100 emails/day, upgrade Resend plan

---

## 💡 Pro Tips

### Tip 1: Verify Your Domain (Optional - Better Deliverability)

Instead of sending from `onboarding@resend.dev`, send from `contact@haziqhtech.sg`:

1. In Resend dashboard, go to **Domains**
2. Click **"Add Domain"**
3. Enter: `haziqhtech.sg`
4. Add the DNS records to **Cloudflare**
5. Wait for verification (~5-30 min)
6. Update `from:` in `src/app/api/contact/route.ts`

### Tip 2: Set Up Email Notifications

Get notified when someone contacts you:
- Resend emails already go to haziq@haziqhtech.sg
- Cloudflare forwards to your Gmail
- Gmail mobile app notifies you instantly

### Tip 3: Auto-Reply Feature (Future Enhancement)

Send automatic "Thanks for contacting me!" email to visitors who submit the form.

---

**Your contact form is ready to go live! Just add the API key to Vercel and redeploy.** 🎉

Estimated time: **3 minutes**
