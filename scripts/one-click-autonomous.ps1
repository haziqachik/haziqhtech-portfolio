# One-Click Autonomous Starter
# This script automatically detects the best autonomous mode and starts it

Write-Host "🚀 ULTIMATE ONE-CLICK AUTONOMOUS STARTER" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")

# Check current system load
$processes = Get-Process
$vsCodeRunning = $processes | Where-Object { $_.ProcessName -eq "Code" }
$autonomousRunning = $processes | Where-Object { $_.CommandLine -like "*autonomous*" }

Write-Host "🔍 System Analysis:" -ForegroundColor Yellow
Write-Host "   Admin Rights: $(if($isAdmin){'✅ Yes'}else{'❌ No'})"
Write-Host "   VS Code Running: $(if($vsCodeRunning){'✅ Yes'}else{'❌ No'})"  
Write-Host "   Autonomous Processes: $(if($autonomousRunning){'✅ Running'}else{'❌ None'})"
Write-Host ""

# Auto-select best option
if ($autonomousRunning) {
    Write-Host "✅ Autonomous system already running!" -ForegroundColor Green
    Write-Host "📊 Current autonomous processes:" -ForegroundColor Cyan
    $autonomousRunning | Format-Table ProcessName, Id, StartTime -AutoSize
    
    $choice = Read-Host "Continue with existing (C) or restart (R)? [C/R]"
    if ($choice -eq "R") {
        Write-Host "🔄 Stopping existing autonomous processes..." -ForegroundColor Yellow
        $autonomousRunning | Stop-Process -Force
        Start-Sleep 2
    } else {
        Write-Host "✅ Keeping existing autonomous system running" -ForegroundColor Green
        exit 0
    }
}

if ($isAdmin) {
    Write-Host "🛡️  Admin detected - Installing Windows Service for maximum reliability..." -ForegroundColor Green
    & "$PWD\scripts\autonomous-service.ps1" -Action Install
    Write-Host "✅ Windows Service autonomous system started!" -ForegroundColor Green
    Write-Host "💡 This will survive reboots and run 24/7" -ForegroundColor Cyan
} else {
    Write-Host "🔄 Starting 24-hour background autonomous system..." -ForegroundColor Green
    Start-Process powershell -ArgumentList "-WindowStyle Hidden -ExecutionPolicy Bypass -File `"$PWD\scripts\ultimate-background-autonomous.ps1`" -MaxHours 24" -WindowStyle Hidden
    Write-Host "✅ Background autonomous system started!" -ForegroundColor Green
    Write-Host "💡 Will run for 24 hours in background" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "🎉 ONE-CLICK SETUP COMPLETE!" -ForegroundColor Green
Write-Host "📝 Logs: autonomous-background.log" -ForegroundColor Blue
Write-Host "🛑 To stop: Use manage-autonomous-service.bat" -ForegroundColor Blue
Write-Host ""
Write-Host "You can now close everything and walk away! 🚶‍♂️" -ForegroundColor Yellow

# Wait a moment then minimize/hide this window
Start-Sleep 3