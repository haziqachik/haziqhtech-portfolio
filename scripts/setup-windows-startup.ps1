# Windows Startup Auto-Launch Script
# This sets up the autonomous system to start automatically with Windows

param(
    [switch]$Install,
    [switch]$Uninstall,
    [switch]$Status
)

$StartupFolder = [Environment]::GetFolderPath("Startup")
$StartupScript = "$StartupFolder\HaziqAutonomous.bat"
$ProjectPath = "$PWD"

function Install-StartupScript {
    Write-Host "🚀 Installing autonomous system to Windows startup..." -ForegroundColor Cyan
    
    # Create startup batch file
    $startupContent = @"
@echo off
REM Auto-start Haziq's Autonomous Development System
echo 🤖 Starting autonomous system at boot...

REM Change to project directory
cd /d "$ProjectPath"

REM Start the one-click autonomous system silently
powershell -WindowStyle Hidden -ExecutionPolicy Bypass -File "$ProjectPath\scripts\one-click-autonomous.ps1"

REM Optional: Show notification
powershell -Command "Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.MessageBox]::Show('🤖 Autonomous Development System Started!', 'Haziq Auto-Dev', 'OK', 'Information')"
"@

    $startupContent | Set-Content $StartupScript
    
    Write-Host "✅ Startup script created at: $StartupScript" -ForegroundColor Green
    
    # Also create a scheduled task for more reliability
    $taskName = "HaziqAutonomousDev"
    $taskAction = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-WindowStyle Hidden -ExecutionPolicy Bypass -File `"$ProjectPath\scripts\one-click-autonomous.ps1`""
    $taskTrigger = New-ScheduledTaskTrigger -AtStartup
    $taskPrincipal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive -RunLevel Highest
    $taskSettings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable
    
    try {
        Register-ScheduledTask -TaskName $taskName -Action $taskAction -Trigger $taskTrigger -Principal $taskPrincipal -Settings $taskSettings -Force | Out-Null
        Write-Host "✅ Scheduled task created for maximum reliability" -ForegroundColor Green
    } catch {
        Write-Host "⚠️  Couldn't create scheduled task (needs admin), but startup folder should work" -ForegroundColor Yellow
    }
    
    Write-Host ""
    Write-Host "🎉 AUTO-STARTUP INSTALLED!" -ForegroundColor Green
    Write-Host "📋 What happens on boot:" -ForegroundColor Cyan
    Write-Host "   1️⃣  Windows starts" -ForegroundColor White
    Write-Host "   2️⃣  Autonomous system auto-launches" -ForegroundColor White
    Write-Host "   3️⃣  VS Code starts autonomously" -ForegroundColor White
    Write-Host "   4️⃣  Development monitoring begins" -ForegroundColor White
    Write-Host "   5️⃣  You can immediately walk away!" -ForegroundColor White
    Write-Host ""
    Write-Host "💡 Next reboot will automatically start everything!" -ForegroundColor Yellow
}

function Uninstall-StartupScript {
    Write-Host "🗑️  Removing autonomous system from Windows startup..." -ForegroundColor Yellow
    
    if (Test-Path $StartupScript) {
        Remove-Item $StartupScript -Force
        Write-Host "✅ Startup script removed" -ForegroundColor Green
    }
    
    try {
        Unregister-ScheduledTask -TaskName "HaziqAutonomousDev" -Confirm:$false -ErrorAction SilentlyContinue
        Write-Host "✅ Scheduled task removed" -ForegroundColor Green
    } catch {
        Write-Host "ℹ️  No scheduled task to remove" -ForegroundColor Blue
    }
    
    Write-Host "✅ Auto-startup removed!" -ForegroundColor Green
}

function Show-StartupStatus {
    Write-Host "📊 AUTONOMOUS STARTUP STATUS" -ForegroundColor Cyan
    Write-Host "============================" -ForegroundColor Cyan
    
    # Check startup folder
    if (Test-Path $StartupScript) {
        Write-Host "✅ Startup Folder: INSTALLED" -ForegroundColor Green
        Write-Host "   📁 Location: $StartupScript" -ForegroundColor Blue
    } else {
        Write-Host "❌ Startup Folder: NOT INSTALLED" -ForegroundColor Red
    }
    
    # Check scheduled task
    $task = Get-ScheduledTask -TaskName "HaziqAutonomousDev" -ErrorAction SilentlyContinue
    if ($task) {
        Write-Host "✅ Scheduled Task: INSTALLED" -ForegroundColor Green
        Write-Host "   📋 Status: $($task.State)" -ForegroundColor Blue
        Write-Host "   ⏰ Next Run: $($task.NextRunTime)" -ForegroundColor Blue
    } else {
        Write-Host "❌ Scheduled Task: NOT INSTALLED" -ForegroundColor Red
    }
    
    # Check current processes
    $autonomousProcs = Get-Process -Name "powershell" | Where-Object { $_.CommandLine -like "*autonomous*" }
    if ($autonomousProcs) {
        Write-Host "✅ Currently Running: YES" -ForegroundColor Green
        $autonomousProcs | Format-Table ProcessName, Id, StartTime -AutoSize
    } else {
        Write-Host "❌ Currently Running: NO" -ForegroundColor Red
    }
    
    Write-Host ""
    Write-Host "💡 To install auto-startup: .\scripts\setup-windows-startup.ps1 -Install" -ForegroundColor Yellow
    Write-Host "🗑️  To remove auto-startup: .\scripts\setup-windows-startup.ps1 -Uninstall" -ForegroundColor Yellow
}

# Main execution
if ($Install) {
    Install-StartupScript
} elseif ($Uninstall) {
    Uninstall-StartupScript
} elseif ($Status) {
    Show-StartupStatus
} else {
    Write-Host "🔧 WINDOWS STARTUP CONFIGURATION" -ForegroundColor Cyan
    Write-Host "================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Options:" -ForegroundColor Yellow
    Write-Host "  -Install   : Set up auto-startup on Windows boot" -ForegroundColor White
    Write-Host "  -Uninstall : Remove auto-startup" -ForegroundColor White
    Write-Host "  -Status    : Check current startup status" -ForegroundColor White
    Write-Host ""
    Write-Host "Example: .\scripts\setup-windows-startup.ps1 -Install" -ForegroundColor Green
}