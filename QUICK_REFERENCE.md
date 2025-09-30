# Quick Reference - Resume Sync

## 🚀 Quick Start

### For Windows Users (Simplest)

**Double-click:** `scripts/sync-resume.bat`

That's it! Your resume will be synced from Google Drive to your website.

---

## 📍 Common Commands

### Basic Sync (Push to Main)
```powershell
cd scripts
.\sync-resume.ps1
```

### Safe Sync (Create Branch First)
```powershell
cd scripts
.\sync-resume.ps1 -BranchName "update/resume"
```

### Custom Source Folder
```powershell
cd scripts
.\sync-resume.ps1 -SourceFolder "D:\My Documents\Resumes"
```

### Copy Only (No Git)
```powershell
cd scripts
.\sync-resume.ps1 -AutoPush:$false
```

---

## 🌐 GitHub Actions (Remote Sync)

1. Go to: https://github.com/haziqachik/haziqhtech-portfolio/actions/workflows/sync-resume.yml
2. Click: **"Run workflow"**
3. (Optional) Paste a resume URL
4. Click: **"Run workflow"** green button

---

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| Source folder not found | Check Google Drive is mounted and synced |
| Git command not found | Install Git for Windows |
| Push failed | Check internet and git credentials |
| No PDF found | Ensure .pdf files exist in source folder |

---

## 📂 File Locations

```
Source:      G:\My Drive\All award\Resume_CVs\*.pdf
Destination: apps/portfolio-mixed/public/Haziq_Asyraaf_CV.pdf
Live Site:   https://haziqhtech.sg/resume
```

---

## ⏱️ Deployment Timeline

1. **Run script** → 0 seconds
2. **Git push** → ~5 seconds
3. **Vercel detect** → ~30 seconds
4. **Build & deploy** → ~60-90 seconds
5. **Live on site** → ~2 minutes total

---

## 📝 What Gets Updated

When you sync your resume:
- ✅ PDF file in `public/` folder
- ✅ Download link on `/resume` page
- ✅ Automatic Vercel deployment
- ✅ Git commit with timestamp

What doesn't change:
- ❌ Skills/timeline content (edit `content/*.json` separately)
- ❌ Resume page layout
- ❌ Other site pages

---

## 🎯 Best Practices

1. **Keep one active resume** in your Google Drive folder
2. **Use descriptive filenames**: `Haziq_CV_2025.pdf`
3. **Test locally first** before pushing to main
4. **Check deployment** at https://vercel.com after sync
5. **Backup old versions** before overwriting

---

## 🔗 Related Files

- Main script: `scripts/sync-resume.ps1`
- Batch launcher: `scripts/sync-resume.bat`
- Workflow: `.github/workflows/sync-resume.yml`
- Full docs: `scripts/README.md`
- Resume page: `apps/portfolio-mixed/src/app/resume/page.tsx`

---

For detailed documentation, see `scripts/README.md`
