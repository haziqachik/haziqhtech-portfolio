# Simple Auto-Startup Installation
Write-Host "🚀 Installing Autonomous System Auto-Startup..." -ForegroundColor Cyan

# Method 1: Windows Startup Folder (Most reliable)
$StartupFolder = [Environment]::GetFolderPath("Startup")
$StartupScript = "$StartupFolder\HaziqAutonomous.bat"
$ProjectPath = (Get-Location).Path

Write-Host "📁 Creating startup script in: $StartupFolder" -ForegroundColor Yellow

$startupBat = @'
@echo off
cd /d "' + $ProjectPath + @'"
powershell -WindowStyle Hidden -ExecutionPolicy Bypass -File "' + $ProjectPath + @'\scripts\one-click-autonomous.ps1"
'@

$startupBat | Set-Content $StartupScript

# Method 2: Registry Entry (Backup)
Write-Host "📝 Adding registry entry..." -ForegroundColor Yellow
$RegPath = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Run"
$AppName = "HaziqAutonomousDev"
$Command = "powershell -WindowStyle Hidden -ExecutionPolicy Bypass -File `"$ProjectPath\scripts\one-click-autonomous.ps1`""

try {
    Set-ItemProperty -Path $RegPath -Name $AppName -Value $Command -ErrorAction Stop
    Write-Host "✅ Registry entry created" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Registry method failed, but startup folder should work" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 AUTO-STARTUP INSTALLED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green
Write-Host ""
Write-Host "💻 What happens next:" -ForegroundColor Cyan
Write-Host "   1️⃣  When you restart Windows" -ForegroundColor White
Write-Host "   2️⃣  Autonomous system starts automatically" -ForegroundColor White  
Write-Host "   3️⃣  VS Code launches in autonomous mode" -ForegroundColor White
Write-Host "   4️⃣  Development monitoring begins" -ForegroundColor White
Write-Host "   5️⃣  Everything runs hands-free!" -ForegroundColor White
Write-Host ""
Write-Host "✅ You never have to remember to start it again!" -ForegroundColor Green
Write-Host "🚶‍♂️ Just boot your PC and walk away!" -ForegroundColor Yellow

# Test the setup immediately
Write-Host ""
$test = Read-Host "🧪 Test the autonomous system now? (y/n)"
if ($test -eq 'y' -or $test -eq 'Y') {
    Write-Host "🚀 Starting autonomous system..." -ForegroundColor Cyan
    & "$ProjectPath\scripts\one-click-autonomous.ps1"
}