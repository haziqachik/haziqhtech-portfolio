# Email Setup Guide: haziq@haziqhtech.sg

## 🎯 Overview

Your email `haziq@haziqhtech.sg` is displayed on your website's contact page. Now you need to set up email forwarding or hosting to actually receive emails sent to this address.

## 📧 Current Status

✅ **Email displayed**: `haziq@haziqhtech.sg` (visible on contact page)
✅ **Domain**: `haziqhtech.sg` (hosted on Vercel)
⚠️ **Email service**: Not configured yet

## 🔧 Setup Options

### Option 1: Email Forwarding (FREE - Recommended for Start)

Forward `haziq@haziqhtech.sg` to your personal Gmail/Outlook account.

#### Using Cloudflare Email Routing (100% FREE)

**Benefits:**
- Completely free
- Unlimited email addresses
- Unlimited forwards
- Easy setup (5 minutes)
- No email storage needed

**Steps:**

1. **Transfer DNS to Cloudflare** (if not already)
   - Go to https://dash.cloudflare.com
   - Click "Add a Site"
   - Enter: `haziqhtech.sg`
   - Select Free plan
   - Cloudflare will show you nameservers

2. **Update Nameservers at Your Domain Registrar**
   - Login to where you bought `haziqhtech.sg` (e.g., Namecheap, GoDaddy)
   - Find DNS/Nameserver settings
   - Replace with Cloudflare nameservers:
     ```
     alexa.ns.cloudflare.com
     billy.ns.cloudflare.com
     ```
   - Wait 1-24 hours for propagation

3. **Enable Email Routing in Cloudflare**
   - Go to Cloudflare Dashboard → haziqhtech.sg
   - Click "Email" in sidebar
   - Click "Email Routing"
   - Click "Get Started"

4. **Add Forwarding Rule**
   - Destination address: `haziq@haziqhtech.sg`
   - Forward to: Your personal email (e.g., `your.personal@gmail.com`)
   - Verify your personal email (click link in verification email)

5. **Done!** 
   - Emails sent to `haziq@haziqhtech.sg` → forward to your Gmail
   - You can reply from your Gmail (will show your Gmail address)

**Current DNS Records Needed:**
```
Type: MX
Name: haziqhtech.sg
Value: route1.mx.cloudflare.net
Priority: 1

Type: MX
Name: haziqhtech.sg
Value: route2.mx.cloudflare.net
Priority: 2

Type: MX
Name: haziqhtech.sg
Value: route3.mx.cloudflare.net
Priority: 3

Type: TXT
Name: haziqhtech.sg
Value: v=spf1 include:_spf.mx.cloudflare.net ~all
```

---

### Option 2: Google Workspace (PAID - $6/month)

**Benefits:**
- Professional email with Gmail interface
- Send FROM `haziq@haziqhtech.sg` (not just receive)
- 30GB storage
- Google Drive, Docs, Calendar included
- Custom email signature
- Mobile app support

**Steps:**

1. **Sign up for Google Workspace**
   - Go to: https://workspace.google.com
   - Click "Get Started"
   - Enter business name: "Haziq Htech" or "Haziq Portfolio"
   - Enter domain: `haziqhtech.sg`
   - Choose plan: Business Starter ($6/month)

2. **Verify Domain Ownership**
   - Google will give you a TXT record
   - Add to your DNS (Vercel or domain registrar):
     ```
     Type: TXT
     Name: @
     Value: google-site-verification=XXX...
     ```

3. **Configure MX Records**
   - Add these to your DNS:
     ```
     Type: MX, Priority: 1, Value: ASPMX.L.GOOGLE.COM
     Type: MX, Priority: 5, Value: ALT1.ASPMX.L.GOOGLE.COM
     Type: MX, Priority: 5, Value: ALT2.ASPMX.L.GOOGLE.COM
     Type: MX, Priority: 10, Value: ALT3.ASPMX.L.GOOGLE.COM
     Type: MX, Priority: 10, Value: ALT4.ASPMX.L.GOOGLE.COM
     ```

4. **Create Email Account**
   - Username: `haziq`
   - Email: `haziq@haziqhtech.sg`
   - Password: (choose secure password)

5. **Access Your Email**
   - Go to: https://mail.google.com
   - Login with `haziq@haziqhtech.sg`
   - Or use Gmail app on mobile

---

### Option 3: Vercel Email (Currently in Beta)

Vercel is testing email features but not fully available yet. Skip for now.

---

### Option 4: Microsoft 365 (PAID - $6/month)

Similar to Google Workspace but uses Outlook.

**Steps:**
1. Go to: https://www.microsoft.com/microsoft-365/business
2. Choose Business Basic plan ($6/month)
3. Add domain: `haziqhtech.sg`
4. Follow verification steps
5. Configure MX records (Microsoft provides)

---

## 🎯 Recommended Setup (Start Simple)

**For most users starting out:**

### Step 1: Use Cloudflare Email Routing (FREE)
- Takes 5 minutes
- Forward to your Gmail
- Test if you actually receive emails to this address

### Step 2: If you get regular emails, upgrade to Google Workspace
- Allows sending FROM `haziq@haziqhtech.sg`
- Professional appearance
- Full email features

---

## 📝 Quick Start: Cloudflare Email Routing

Since you're already using Vercel for hosting, here's the fastest setup:

### 1. Check Current DNS Provider

Where did you register `haziqhtech.sg`?
- Namecheap?
- GoDaddy?
- Google Domains?
- Other?

### 2. Add Cloudflare (No Migration Needed)

You can use Cloudflare JUST for email while keeping Vercel for hosting:

1. **Sign up**: https://dash.cloudflare.com/sign-up
2. **Add site**: `haziqhtech.sg`
3. **Import DNS records** from your current provider (Cloudflare auto-detects)
4. **Keep Vercel records**:
   ```
   A     @     76.76.21.21  (Vercel)
   CNAME www   cname.vercel-dns.com  (Vercel)
   ```
5. **Add email routing** (steps above)
6. **Update nameservers** at your registrar

### 3. Test Email

After setup (wait 1-24 hours for DNS propagation):
- Send test email to: `haziq@haziqhtech.sg`
- Should arrive in your personal email
- Check spam folder if not received

---

## 🔍 Troubleshooting

### Email Not Received?

1. **Check DNS propagation**:
   - Visit: https://dnschecker.org
   - Enter: `haziqhtech.sg`
   - Type: MX
   - Should show Cloudflare MX records

2. **Check spam folder** in your forwarding destination

3. **Verify email routing is active** in Cloudflare dashboard

4. **Test with mail-tester**:
   - Visit: https://www.mail-tester.com
   - Send email from `haziq@haziqhtech.sg` to address shown
   - Check score (should be 8/10 or higher)

### Can't Send From haziq@haziqhtech.sg?

**If using Cloudflare Email Routing:**
- Forwarding is receive-only
- Replies come from your personal email
- **Solution**: Upgrade to Google Workspace or Microsoft 365

**If using Gmail forwarding:**
- Add as "Send mail as" in Gmail settings:
  1. Gmail → Settings → Accounts and Import
  2. "Send mail as" → Add another email address
  3. Enter: `haziq@haziqhtech.sg`
  4. Verify (requires SMTP setup)

---

## 📊 Comparison Table

| Feature | Cloudflare Routing | Google Workspace | Microsoft 365 |
|---------|-------------------|------------------|---------------|
| **Price** | FREE | $6/month | $6/month |
| **Receive Email** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Send Email** | ❌ No (forward only) | ✅ Yes | ✅ Yes |
| **Storage** | N/A | 30GB | 1TB |
| **Mobile App** | N/A | ✅ Gmail app | ✅ Outlook app |
| **Calendar** | ❌ | ✅ | ✅ |
| **Drive/Storage** | ❌ | ✅ Google Drive | ✅ OneDrive |
| **Professional** | Medium | High | High |
| **Setup Time** | 5 min | 15 min | 15 min |

---

## 🚀 My Recommendation

**Start with Cloudflare Email Routing (FREE):**
1. Quick to setup
2. Test if people actually email you
3. No commitment

**After 1-3 months, if getting regular emails:**
- Upgrade to Google Workspace ($6/month)
- Get full email features
- Professional sending capability

---

## 📧 Current Website Integration

Your contact page already displays the email correctly:

**File**: `content/profile.json`
```json
{
  "email": "haziq@haziqhtech.sg"
}
```

**Displayed on**:
- `/contact` page
- Footer (if applicable)
- Resume (if included)

**Contact Form**:
Your site has a contact form that sends submissions somewhere. Check if you have FormSpree or similar configured.

---

## ✅ Action Items

**Immediate (Next 15 minutes):**
1. [ ] Decide: Cloudflare (free) or Google Workspace (paid)?
2. [ ] Sign up for chosen service
3. [ ] Add MX records to DNS

**Within 24 hours:**
4. [ ] Wait for DNS propagation
5. [ ] Send test email to `haziq@haziqhtech.sg`
6. [ ] Verify it arrives in your inbox

**Within 1 week:**
7. [ ] Add email signature (if using Google Workspace)
8. [ ] Set up mobile email app
9. [ ] Test reply-to functionality

---

## 🆘 Need Help?

**Questions to answer:**
1. Where did you register `haziqhtech.sg`? (Namecheap/GoDaddy/etc.)
2. Do you want to send emails FROM `haziq@haziqhtech.sg`? (Yes → Google Workspace, No → Cloudflare)
3. Do you have access to DNS settings?

Let me know your answers and I can provide specific step-by-step instructions for YOUR setup!

---

## 📚 Additional Resources

- **Cloudflare Email Routing**: https://developers.cloudflare.com/email-routing
- **Google Workspace Setup**: https://support.google.com/a/answer/140034
- **DNS Checker**: https://dnschecker.org
- **Email Test**: https://www.mail-tester.com
- **SPF/DKIM Checker**: https://mxtoolbox.com

---

**Status**: Email displayed on website ✅ | Email service NOT YET configured ⚠️

**Next Step**: Choose Cloudflare (free) or Google Workspace (paid) and start setup!
