<#
.SYNOPSIS
    Automatically sync the latest resume PDF from Google Drive to the portfolio website.

.DESCRIPTION
    This script finds the newest resume file in your Google Drive folder, copies it to the
    portfolio's public directory, commits the change to git, and pushes it to GitHub.
    Vercel will automatically deploy the updated resume to your live site.

.PARAMETER SourceFolder
    The folder containing your resume files (default: G:\My Drive\All award\Resume_CVs)

.PARAMETER RepoRoot
    The root directory of the portfolio repository (default: auto-detected)

.PARAMETER AutoPush
    If true, automatically pushes changes to main branch (default: true)

.PARAMETER BranchName
    If specified, creates a branch instead of pushing to main (safer for review)

.EXAMPLE
    .\sync-resume.ps1
    Syncs the latest resume and pushes directly to main

.EXAMPLE
    .\sync-resume.ps1 -BranchName "update/resume-$(Get-Date -Format 'yyyyMMdd')"
    Syncs resume to a new branch for review before merging
#>

param(
  [string]$SourceFolder = 'G:\My Drive\All award\Resume_CVs',
  [string]$RepoRoot = '',
  [switch]$AutoPush = $true,
  [string]$BranchName = ''
)

# Color output helpers
function Write-Success($msg) { Write-Host "✓ $msg" -ForegroundColor Green }
function Write-Info($msg) { Write-Host "ℹ $msg" -ForegroundColor Cyan }
function Write-Warn($msg) { Write-Host "⚠ $msg" -ForegroundColor Yellow }
function Write-Fail($msg) { Write-Host "✗ $msg" -ForegroundColor Red }

# Auto-detect repo root if not specified
if (-not $RepoRoot) {
  $scriptDir = Split-Path -Parent $PSCommandPath
  $RepoRoot = Split-Path -Parent $scriptDir
  Write-Info "Auto-detected repo root: $RepoRoot"
}

# Validate paths
if (-not (Test-Path $SourceFolder)) {
  Write-Fail "Source folder not found: $SourceFolder"
  Write-Info "Make sure Google Drive is mounted and the path is correct"
  exit 1
}

$Destination = Join-Path $RepoRoot "apps\portfolio-mixed\public\Haziq_Asyraaf_CV.pdf"
if (-not (Test-Path (Split-Path $Destination))) {
  Write-Fail "Destination directory not found: $(Split-Path $Destination)"
  exit 1
}

# Find the latest resume file (supports multiple patterns)
Write-Info "Scanning for resume files in: $SourceFolder"
$latest = Get-ChildItem -Path $SourceFolder -Include @('*.pdf', '*.PDF') -File -ErrorAction SilentlyContinue |
  Where-Object { $_.Name -match 'resume|cv|haziq' -or $_.Name -like '*.pdf' } |
  Sort-Object LastWriteTime -Descending |
  Select-Object -First 1

if (-not $latest) {
  Write-Fail "No PDF files found in $SourceFolder"
  Write-Info "Expected files like: resume_*.pdf, CV_*.pdf, Haziq_*.pdf, or any .pdf"
  exit 1
}

Write-Success "Found latest resume: $($latest.Name) (modified: $($latest.LastWriteTime))"

# Check if file has changed
$needsUpdate = $true
if (Test-Path $Destination) {
  $destHash = (Get-FileHash -Path $Destination -Algorithm MD5).Hash
  $srcHash = (Get-FileHash -Path $latest.FullName -Algorithm MD5).Hash
  if ($destHash -eq $srcHash) {
    Write-Info "Resume is already up-to-date (identical file)"
    $needsUpdate = $false
  }
}

if ($needsUpdate) {
  # Copy the file
  Copy-Item -Path $latest.FullName -Destination $Destination -Force
  Write-Success "Copied to: $Destination"
} else {
  Write-Info "Skipping copy - files are identical"
}

# Git operations
if ($AutoPush) {
  Write-Info "Preparing git commit..."
  
  Push-Location $RepoRoot
  try {
    # Check if git is available
    $gitCheck = Get-Command git -ErrorAction SilentlyContinue
    if (-not $gitCheck) {
      Write-Fail "git command not found. Please install Git for Windows."
      exit 1
    }
    
    # Verify we're in a git repo
    $isGitRepo = git rev-parse --is-inside-work-tree 2>$null
    if ($LASTEXITCODE -ne 0) {
      Write-Fail "Not a git repository: $RepoRoot"
      exit 1
    }
    
    # Stage the resume file
    git add "apps/portfolio-mixed/public/Haziq_Asyraaf_CV.pdf"
    
    # Check if there are changes to commit
    $status = git status --porcelain "apps/portfolio-mixed/public/Haziq_Asyraaf_CV.pdf"
    if (-not $status) {
      Write-Info "No changes to commit (file unchanged in git)"
      Write-Success "Resume sync complete - no update needed"
      exit 0
    }
    
    # Create commit message with file info
    $commitMsg = "chore: update resume PDF from $($latest.Name)"
    
    if ($BranchName) {
      # Branch workflow (safer)
      Write-Info "Creating branch: $BranchName"
      git checkout -b $BranchName 2>&1 | Out-Null
      
      if ($LASTEXITCODE -ne 0) {
        Write-Warn "Branch may already exist, switching to it"
        git checkout $BranchName 2>&1 | Out-Null
      }
      
      git commit -m $commitMsg
      Write-Success "Committed changes to branch: $BranchName"
      
      git push -u origin $BranchName
      if ($LASTEXITCODE -eq 0) {
        Write-Success "Pushed branch to origin"
        Write-Info "Next step: Create a Pull Request on GitHub to merge to main"
        Write-Info "Visit: https://github.com/haziqachik/haziqhtech-portfolio/pull/new/$BranchName"
      } else {
        Write-Fail "Failed to push branch"
        exit 1
      }
    } else {
      # Direct to main (faster but less safe)
      Write-Info "Committing to main branch..."
      
      # Ensure we're on main
      $currentBranch = git branch --show-current
      if ($currentBranch -ne 'main') {
        Write-Info "Switching to main branch..."
        git checkout main 2>&1 | Out-Null
        if ($LASTEXITCODE -ne 0) {
          Write-Fail "Failed to checkout main branch"
          exit 1
        }
      }
      
      # Pull latest changes first
      Write-Info "Pulling latest changes..."
      git pull origin main
      if ($LASTEXITCODE -ne 0) {
        Write-Warn "Pull had conflicts or errors - review manually"
      }
      
      # Re-stage after pull (in case of conflicts)
      git add "apps/portfolio-mixed/public/Haziq_Asyraaf_CV.pdf"
      
      # Commit
      git commit -m $commitMsg
      Write-Success "Committed changes"
      
      # Push
      Write-Info "Pushing to origin/main..."
      git push origin main
      if ($LASTEXITCODE -eq 0) {
        Write-Success "Pushed to GitHub successfully"
        Write-Success "Vercel will auto-deploy your updated resume in ~2 minutes"
        Write-Info "Check deployment at: https://vercel.com/haziqachik/haziqhtech-portfolio"
      } else {
        Write-Fail "Failed to push to origin/main"
        Write-Warn "You may need to resolve conflicts or check permissions"
        exit 1
      }
    }
  }
  finally {
    Pop-Location
  }
} else {
  Write-Info "AutoPush disabled - changes not committed"
  Write-Info "Run 'git add apps/portfolio-mixed/public/Haziq_Asyraaf_CV.pdf' and commit manually"
}

Write-Success "Resume sync complete!"