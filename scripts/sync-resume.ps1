param(
  [string]$SourceDir = "G:\My Drive\All award\Resume_CVs",
  [string]$TargetMd = "apps/portfolio-mixed/content/resume.md",
  [string]$TargetPdf = "apps/portfolio-mixed/public/Haziq_Asyraaf_CV.pdf"
)

function Abort($msg){ Write-Error $msg; try{ Stop-Transcript | Out-Null } catch{} ; exit 1 }

# Compute repo root (parent of scripts folder)
$ScriptDir = Split-Path -Parent $PSCommandPath
$RepoRoot  = Split-Path -Parent $ScriptDir

# Start a transcript log for visibility
$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
try { Start-Transcript -Path (Join-Path $ScriptDir "sync-resume-$stamp.log") -ErrorAction SilentlyContinue } catch {}

Write-Host "RepoRoot: $RepoRoot"
Write-Host "SourceDir: $SourceDir"

if(-not (Test-Path $SourceDir)){ Abort "Source folder not found: $SourceDir" }

# Discover newest .pdf or .md
$candidates = Get-ChildItem -Path $SourceDir -File | Where-Object { $_.Extension -in '.pdf','.md' }
if(-not $candidates){ Abort "No .md or .pdf found in $SourceDir" }
$latest = $candidates | Sort-Object LastWriteTime -Descending | Select-Object -First 1
Write-Host ("Newest file: {0}  ({1})" -f $latest.Name, $latest.LastWriteTime)

# Resolve targets
$TargetMdFull  = Join-Path $RepoRoot $TargetMd
$TargetPdfFull = Join-Path $RepoRoot $TargetPdf
$mdDir  = Split-Path $TargetMdFull -Parent
$pdfDir = Split-Path $TargetPdfFull -Parent
if(-not (Test-Path $mdDir))  { New-Item -ItemType Directory -Path $mdDir  | Out-Null }
if(-not (Test-Path $pdfDir)) { New-Item -ItemType Directory -Path $pdfDir | Out-Null }

# Ensure git is available
if(-not (Get-Command git -ErrorAction SilentlyContinue)){ Abort "git not found in PATH" }

Push-Location $RepoRoot
try {
  $isGit = (git rev-parse --is-inside-work-tree 2>$null)
  if(-not $isGit){ Abort "$RepoRoot is not a git repository" }

  git checkout main       | Out-Null
  git pull --ff-only origin main | Out-Null

  $changed = $false
  $ext = $latest.Extension.ToLowerInvariant()

  if($ext -eq ".md"){
    Copy-Item -Path $latest.FullName -Destination $TargetMdFull -Force
    Write-Host "Updated $TargetMdFull from newest Markdown"
    $changed = $true
    $commitMessage = "chore(resume): sync markdown from $($latest.Name) ($(Get-Date -Format 'yyyy-MM-dd HH:mm'))"
  }
  elseif($ext -eq ".pdf"){
    Copy-Item -Path $latest.FullName -Destination $TargetPdfFull -Force
    Write-Host "Updated $TargetPdfFull from newest PDF"
    $changed = $true

    # Insert/replace a PDF download block with cache-buster in resume.md
    $markerStart = "<!-- RESUME_PDF_START -->"
    $markerEnd   = "<!-- RESUME_PDF_END -->"
    $v = Get-Date -Format 'yyyyMMdd-HHmm'
    $pdfRelative = "/" + (Split-Path $TargetPdfFull -Leaf)
    $block = @"
$markerStart
## Download my resume
[Download PDF]($pdfRelative?v=$v)
$markerEnd
"@

    if(Test-Path $TargetMdFull){
      $mdText = Get-Content -Raw -Path $TargetMdFull
      if($mdText.Contains($markerStart) -and $mdText.Contains($markerEnd)){
        $before = $mdText.Substring(0, $mdText.IndexOf($markerStart))
        $after  = $mdText.Substring($mdText.IndexOf($markerEnd) + $markerEnd.Length)
        $newMdText = $before + $block + $after
      } else {
        $newMdText = $block + "`r`n" + $mdText
      }
    } else {
      $newMdText = $block + "`r`n"
    }
    Set-Content -Path $TargetMdFull -Value $newMdText -Force -Encoding UTF8
    Write-Host "Updated $TargetMdFull with PDF download block (cache-busted)"
    $commitMessage = "chore(resume): sync PDF from $($latest.Name) ($(Get-Date -Format 'yyyy-MM-dd HH:mm'))"
  }
  else {
    Abort "Unsupported extension: $ext (expected .md or .pdf)"
  }

  if(-not $changed){ Write-Host "Nothing changed."; return }

  git add -- $TargetMdFull | Out-Null
  if($ext -eq ".pdf"){ git add -- $TargetPdfFull | Out-Null }

  $status = git diff --cached --name-only
  if([string]::IsNullOrWhiteSpace($status)){
    Write-Host "No staged changes; skipping commit/push."
    return
  }

  git commit -m "$commitMessage" | Out-Null
  git push origin main | Out-Null

  Write-Host "Success: pushed to main. Vercel will redeploy automatically."
  Write-Host "Check after deploy: https://haziqhtech.sg/resume"
}
finally {
  Pop-Location
  try { Stop-Transcript | Out-Null } catch {}
}
