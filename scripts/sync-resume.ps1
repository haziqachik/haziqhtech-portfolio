param(
  [string]$SourceFolder = 'G:\My Drive\All award\Resume_CVs',
  [string]$Destination = 'C:\Users\hzham\haziqhtech\apps\portfolio-mixed\public\Haziq_Asyraaf_CV.pdf'
)

$latest = Get-ChildItem -Path $SourceFolder -Filter 'resume_*.pdf' -ErrorAction SilentlyContinue |
  Sort-Object LastWriteTime -Descending |
  Select-Object -First 1

if (-not $latest) {
  Write-Warning "No resume_*.pdf files found in $SourceFolder"
  exit 1
}

Copy-Item -Path $latest.FullName -Destination $Destination -Force
Write-Host "Copied $($latest.Name) to $Destination"