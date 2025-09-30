# Resume Sync Automation - Visual Guide

## 🎯 What This Does

Automatically syncs your latest resume from Google Drive to your live portfolio website at [haziqhtech.sg/resume](https://haziqhtech.sg/resume).

---

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    LOCAL AUTOMATION                          │
│                                                              │
│  📁 Google Drive                                            │
│  G:\My Drive\All award\Resume_CVs\                          │
│  └── resume_latest.pdf ← Your updated resume                │
│                         │                                    │
│                         ↓                                    │
│  🖱️  Double-click sync-resume.bat                           │
│                         │                                    │
│                         ↓                                    │
│  ⚙️  PowerShell Script (sync-resume.ps1)                    │
│      • Finds newest PDF                                     │
│      • Validates file                                       │
│      • Copies to project                                    │
│                         │                                    │
│                         ↓                                    │
│  📦 Local Repository                                         │
│  apps/portfolio-mixed/public/Haziq_Asyraaf_CV.pdf           │
│                         │                                    │
│                         ↓                                    │
│  🔄 Git Commit & Push                                        │
│      git add + commit + push to GitHub                      │
└──────────────────────────┼───────────────────────────────────┘
                          │
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                   GITHUB & DEPLOYMENT                        │
│                                                              │
│  🔗 GitHub Repository                                        │
│  github.com/haziqachik/haziqhtech-portfolio                 │
│                         │                                    │
│                         ↓                                    │
│  🚀 Vercel Webhook                                           │
│      Detects new commit                                     │
│                         │                                    │
│                         ↓                                    │
│  ⚡ Vercel Build & Deploy                                    │
│      • Builds Next.js app                                   │
│      • Deploys to production                                │
│      • ~90 seconds total                                    │
│                         │                                    │
│                         ↓                                    │
│  🌐 Live Website                                             │
│  https://haziqhtech.sg/resume                               │
│      ✓ Updated resume visible                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🤖 Alternative: Server Automation

```
┌─────────────────────────────────────────────────────────────┐
│              GITHUB ACTIONS (SERVER-SIDE)                    │
│                                                              │
│  🌍 Any Device (Phone/Tablet/PC)                            │
│                         │                                    │
│                         ↓                                    │
│  🖱️  GitHub Actions UI                                       │
│      Actions → Sync Resume → Run workflow                   │
│                         │                                    │
│                         ↓                                    │
│  📥 Optional: Provide Resume URL                             │
│      Direct link from Google Drive/Dropbox                  │
│                         │                                    │
│                         ↓                                    │
│  ☁️  GitHub Runner (Ubuntu VM)                              │
│      • Downloads PDF from URL                               │
│      • OR uses existing file                                │
│      • Validates PDF format                                 │
│      • Git commit & push                                    │
│                         │                                    │
│                         ↓                                    │
│  🚀 Triggers Vercel Deployment                               │
│      (Same as local automation)                             │
│                         │                                    │
│                         ↓                                    │
│  🌐 Live on haziqhtech.sg/resume                            │
└─────────────────────────────────────────────────────────────┘
```

---

## ⏱️ Timeline

| Step | Duration | Notes |
|------|----------|-------|
| 1. Find & copy PDF | < 1 sec | PowerShell scans folder |
| 2. Git operations | 5-10 sec | Commit & push to GitHub |
| 3. Vercel webhook | ~30 sec | Detects new commit |
| 4. Build & deploy | 60-90 sec | Next.js build + CDN push |
| **Total** | **~2 min** | From double-click to live |

---

## 🔄 Workflow Comparison

| Feature | Local Script | GitHub Actions |
|---------|--------------|----------------|
| **Trigger** | Double-click .bat | GitHub UI |
| **Source** | Local Google Drive | URL or manual upload |
| **Speed** | Fast (if git push works) | Same speed |
| **Requirements** | Windows + Git + Drive | Just internet |
| **Best for** | Daily updates | Remote/mobile updates |
| **Automation** | Can use Task Scheduler | Can use cron schedule |

---

## 🛠️ How to Use

### Method 1: Local (Recommended)

1. Ensure Google Drive is synced
2. Navigate to repo folder
3. Double-click `scripts/sync-resume.bat`
4. Wait for success message
5. Visit [haziqhtech.sg/resume](https://haziqhtech.sg/resume) in 2 minutes

### Method 2: GitHub Actions

1. Go to [Actions tab](https://github.com/haziqachik/haziqhtech-portfolio/actions/workflows/sync-resume.yml)
2. Click "Run workflow"
3. (Optional) Paste resume URL
4. Click "Run workflow" button
5. Watch logs (optional)
6. Visit site when complete

---

## 🔐 Security Notes

- ✅ **Safe**: Only updates one PDF file
- ✅ **Reversible**: Git history preserves old versions
- ✅ **Validated**: Checks file is actually a PDF
- ✅ **Logged**: All changes tracked in git commits
- ⚠️ **Caution**: Direct-to-main bypasses PR review

**Safer alternative**: Use `-BranchName` parameter to create a branch first:
```powershell
.\sync-resume.ps1 -BranchName "update/resume"
```
Then create a PR for review before merging.

---

## 📱 Mobile-Friendly Option

To update resume from your phone:

1. Upload new resume to Google Drive
2. Get shareable link (set to "Anyone with link can view")
3. Open GitHub on mobile browser
4. Go to Actions → Sync Resume
5. Paste link in `resume_url` field
6. Run workflow
7. Done! ✨

---

## 🎓 Learning Resources

- **PowerShell**: Script is heavily commented - read it to understand each step
- **GitHub Actions**: `.github/workflows/sync-resume.yml` shows CI/CD basics
- **Git automation**: See how commits are automated safely
- **Next.js deployment**: Understand the Vercel build pipeline

---

## 🔍 Troubleshooting

See `scripts/README.md` for detailed troubleshooting guide.

Quick fixes:
- **Script won't run**: Right-click → "Run as Administrator"
- **Git push fails**: Check `git config --list` for credentials
- **No PDF found**: Verify Google Drive path in script
- **Site not updating**: Check Vercel deployment logs

---

## 📞 Support

Having issues? Check these in order:

1. ✅ Test output from test-automation.sh
2. 📖 Read scripts/README.md troubleshooting section
3. 🔍 Check Vercel deployment logs
4. 🐛 Open GitHub issue with error details

---

**Last updated**: 2025-01-15  
**Version**: 1.0  
**Status**: ✅ Production Ready
