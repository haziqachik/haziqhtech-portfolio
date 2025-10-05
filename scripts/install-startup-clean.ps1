# Auto-Startup Installation - Clean Version
Write-Host "Installing Autonomous System Auto-Startup..." -ForegroundColor Cyan

# Get paths
$StartupFolder = [Environment]::GetFolderPath("Startup")
$StartupScript = "$StartupFolder\HaziqAutonomous.bat"  
$ProjectPath = (Get-Location).Path

Write-Host "Creating startup script..." -ForegroundColor Yellow

# Create startup batch file
$startupContent = "@echo off`r`ncd /d `"$ProjectPath`"`r`npowershell -WindowStyle Hidden -ExecutionPolicy Bypass -File `"$ProjectPath\scripts\one-click-autonomous.ps1`""
$startupContent | Set-Content $StartupScript

Write-Host "Adding registry entry..." -ForegroundColor Yellow

# Add registry entry
$RegPath = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Run"
$AppName = "HaziqAutonomousDev"  
$Command = "powershell -WindowStyle Hidden -ExecutionPolicy Bypass -File `"$ProjectPath\scripts\one-click-autonomous.ps1`""

Set-ItemProperty -Path $RegPath -Name $AppName -Value $Command

Write-Host ""
Write-Host "AUTO-STARTUP INSTALLED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green
Write-Host ""
Write-Host "What happens next:" -ForegroundColor Cyan
Write-Host "  1. When you restart Windows" -ForegroundColor White
Write-Host "  2. Autonomous system starts automatically" -ForegroundColor White
Write-Host "  3. VS Code launches in autonomous mode" -ForegroundColor White  
Write-Host "  4. Development monitoring begins" -ForegroundColor White
Write-Host "  5. Everything runs hands-free!" -ForegroundColor White
Write-Host ""
Write-Host "You never have to remember to start it again!" -ForegroundColor Green
Write-Host "Just boot your PC and walk away!" -ForegroundColor Yellow
Write-Host ""

# Verify installation
if (Test-Path $StartupScript) {
    Write-Host "Startup file created: $StartupScript" -ForegroundColor Green
} else {
    Write-Host "Warning: Startup file not created" -ForegroundColor Red
}

$regValue = Get-ItemProperty -Path $RegPath -Name $AppName -ErrorAction SilentlyContinue
if ($regValue) {
    Write-Host "Registry entry created successfully" -ForegroundColor Green
} else {
    Write-Host "Warning: Registry entry not created" -ForegroundColor Red
}

Write-Host ""
Write-Host "Installation complete! Restart Windows to test auto-startup." -ForegroundColor Cyan