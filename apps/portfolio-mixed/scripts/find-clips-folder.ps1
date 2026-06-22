# Find Valorant Clips Folder
# Run this on your PC to locate your clip recording software

Write-Host "`n=== Searching for Clip Folders ===" -ForegroundColor Cyan

$videosPath = "$env:USERPROFILE\Videos"
$possiblePaths = @(
    "$videosPath\Medal",
    "$videosPath\Captures",
    "$videosPath\OBS",
    "$videosPath\Outplayed\Valorant",
    "$videosPath\Valorant",
    "$videosPath\NVIDIA",
    "$videosPath\Radeon ReLive"
)

Write-Host "`nChecking common locations..." -ForegroundColor Yellow

foreach ($path in $possiblePaths) {
    if (Test-Path $path) {
        $count = (Get-ChildItem $path -File -ErrorAction SilentlyContinue).Count
        Write-Host "✅ FOUND: $path ($count files)" -ForegroundColor Green
    }
}

Write-Host "`nAll folders in Videos:" -ForegroundColor Yellow
Get-ChildItem $videosPath -Directory | ForEach-Object {
    $count = (Get-ChildItem $_.FullName -File -ErrorAction SilentlyContinue).Count
    Write-Host "  📁 $($_.Name) - $count files"
}

Write-Host "`n=== Instructions ===" -ForegroundColor Cyan
Write-Host "1. Look for the folder with your clips above"
Write-Host "2. Copy the full path (e.g., C:\Users\YourName\Videos\Medal)"
Write-Host "3. Paste it into sync-to-gdrive.ps1 as the sourceFolder"
Write-Host ""
