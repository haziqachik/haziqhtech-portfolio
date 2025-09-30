# Resume Sync Automation

Automated tools to keep your portfolio resume up-to-date with minimal effort.

## 🎯 Overview

This directory contains scripts to automatically sync your latest resume from Google Drive to your live portfolio website at [haziqhtech.sg/resume](https://haziqhtech.sg/resume).

**Two automation options:**
1. **Local automation** - Double-click a script on your Windows PC
2. **Server automation** - GitHub Actions runs on a schedule or on-demand

---

## 🖱️ Option 1: Local Automation (Recommended)

**Best for:** Daily updates from your local machine when you edit your resume.

### Quick Start

1. **Double-click `sync-resume.bat`** in this folder
2. The script will:
   - Find the newest PDF in `G:\My Drive\All award\Resume_CVs`
   - Copy it to the portfolio project
   - Commit and push to GitHub
   - Trigger Vercel auto-deployment

That's it! Your site updates in ~2 minutes.

### Requirements

- Windows PC with PowerShell
- Google Drive mounted (shows as G: drive with your files)
- Git installed and configured
- Git credentials set up (SSH key or credential manager)

### Customization

Edit `sync-resume.ps1` parameters if needed:

```powershell
.\sync-resume.ps1 -SourceFolder "D:\Documents\Resumes"
```

**Available parameters:**
- `-SourceFolder` - Where your resume PDFs are stored
- `-BranchName` - Create a branch instead of pushing to main (safer)
- `-AutoPush $false` - Copy only, don't commit/push

**Example: Create a branch for review**
```powershell
.\sync-resume.ps1 -BranchName "update/resume-$(Get-Date -Format 'yyyyMMdd')"
```

### Troubleshooting

**"Source folder not found"**
- Make sure Google Drive is running and synced
- Check that `G:\My Drive\All award\Resume_CVs` exists
- Update the path in `sync-resume.ps1` if your Drive is mounted differently

**"git command not found"**
- Install [Git for Windows](https://git-scm.com/download/win)
- Restart PowerShell after installing

**"Failed to push"**
- Check your internet connection
- Verify git credentials: run `git push origin main` manually
- May need to set up SSH key or GitHub token

**"No PDF files found"**
- Ensure your resume file is named with `.pdf` extension
- The script looks for any PDF file in the folder
- Latest file by modification date is selected

---

## 🤖 Option 2: Server Automation

**Best for:** Scheduled updates or triggering from mobile/remote.

### Setup

The GitHub Actions workflow is already configured at `.github/workflows/sync-resume.yml`.

### How to Use

#### Manual Trigger (from anywhere)

1. Go to [Actions tab](https://github.com/haziqachik/haziqhtech-portfolio/actions/workflows/sync-resume.yml)
2. Click **"Run workflow"**
3. Optionally provide a direct URL to download a resume PDF
4. Click **"Run workflow"** green button

**With a URL:**
- Upload your resume to Google Drive
- Get a public sharing link or direct download link
- Paste it in the workflow input
- GitHub will download and deploy it automatically

#### Scheduled Automation (Optional)

To run automatically every Monday at 9 AM:

1. Edit `.github/workflows/sync-resume.yml`
2. Uncomment the `schedule` section:
   ```yaml
   schedule:
     - cron: '0 9 * * 1'  # Every Monday 9 AM UTC
   ```
3. Commit and push the change

**Note:** Scheduled runs only work with the URL input method, as GitHub Actions can't access your local Google Drive.

### Advanced: Google Drive API Integration

For fully automated server-side sync from Google Drive:

1. Enable Google Drive API in [Google Cloud Console](https://console.cloud.google.com/)
2. Create a service account and download credentials JSON
3. Share your resume folder with the service account email
4. Add credentials to GitHub Secrets as `GOOGLE_DRIVE_CREDENTIALS`
5. Update the workflow to use the Google Drive API (requires additional Node.js script)

This setup is more complex but allows true "set and forget" automation. Let me know if you need help implementing this.

---

## 📁 File Structure

```
scripts/
├── sync-resume.bat      # Double-click launcher (Windows)
├── sync-resume.ps1      # Main PowerShell automation script
└── README.md            # This file

.github/workflows/
└── sync-resume.yml      # GitHub Actions workflow
```

---

## 🔄 How It Works

### Local Flow

```
Your Google Drive folder
    ↓ (finds latest .pdf)
sync-resume.ps1
    ↓ (copies to)
apps/portfolio-mixed/public/Haziq_Asyraaf_CV.pdf
    ↓ (git commit + push)
GitHub repository
    ↓ (webhook triggers)
Vercel deployment
    ↓ (2 minutes later)
Live site: haziqhtech.sg/resume
```

### Server Flow

```
GitHub Actions (manual/scheduled)
    ↓ (downloads from URL)
apps/portfolio-mixed/public/Haziq_Asyraaf_CV.pdf
    ↓ (git commit + push)
GitHub repository
    ↓ (webhook triggers)
Vercel deployment
    ↓ (2 minutes later)
Live site: haziqhtech.sg/resume
```

---

## ⚙️ Advanced Configuration

### Auto-run on Login (Windows)

To run the sync script automatically when you log in:

1. Press `Win+R`, type `shell:startup`, press Enter
2. Create a shortcut to `sync-resume.bat` in the Startup folder
3. Right-click shortcut → Properties → Run: Minimized

Now the script runs every time you log in to Windows.

### Task Scheduler (Windows)

For more control (e.g., run daily at a specific time):

1. Open Task Scheduler
2. Create Basic Task → name it "Resume Sync"
3. Trigger: Daily (or your preference)
4. Action: Start a program
   - Program: `powershell.exe`
   - Arguments: `-NoProfile -ExecutionPolicy Bypass -File "C:\path\to\scripts\sync-resume.ps1"`
5. Finish

### Exclude from Git (if testing)

If you want to test changes to the sync script without committing:

```bash
git update-index --assume-unchanged scripts/sync-resume.ps1
```

To undo:
```bash
git update-index --no-assume-unchanged scripts/sync-resume.ps1
```

---

## 🛠️ Maintenance

### Update Source Folder

If you move your resume folder, update the default path in `sync-resume.ps1`:

```powershell
[string]$SourceFolder = 'D:\New\Path\To\Resumes',
```

### File Naming

The script looks for **any PDF file** in your source folder and picks the newest one by modification date. 

Recommended naming conventions:
- `Haziq_Asyraaf_CV_2025.pdf`
- `resume_2025-01-15.pdf`
- `CV_updated.pdf`

Avoid having multiple active resumes in the folder if you want consistent results.

---

## 🤝 Contributing

Found a bug or have an improvement? 

1. Fork the repo
2. Create a branch: `git checkout -b fix/resume-sync-bug`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📞 Support

Having issues? 

1. Check the troubleshooting section above
2. Review the PowerShell script output (it's verbose on purpose)
3. Open an issue on GitHub with:
   - Error message
   - Your OS version
   - PowerShell version (`$PSVersionTable`)

---

## 📝 License

Part of the haziqhtech-portfolio project. See main LICENSE file.
