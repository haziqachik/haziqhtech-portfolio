# Registry Auto-Start Setup (Alternative method)
# This adds the autonomous system to Windows registry for startup

param(
    [switch]$Install,
    [switch]$Uninstall
)

$RegPath = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Run"
$AppName = "HaziqAutonomousDev"
$ScriptPath = "$PWD\scripts\one-click-autonomous.ps1"

if ($Install) {
    Write-Host "📝 Adding to Windows Registry for auto-startup..." -ForegroundColor Cyan
    
    $command = "powershell -WindowStyle Hidden -ExecutionPolicy Bypass -File `"$ScriptPath`""
    Set-ItemProperty -Path $RegPath -Name $AppName -Value $command
    
    Write-Host "✅ Registry entry created!" -ForegroundColor Green
    Write-Host "📋 Entry: $AppName" -ForegroundColor Blue
    Write-Host "📂 Command: $command" -ForegroundColor Blue
    
} elseif ($Uninstall) {
    Write-Host "🗑️  Removing from Windows Registry..." -ForegroundColor Yellow
    
    Remove-ItemProperty -Path $RegPath -Name $AppName -ErrorAction SilentlyContinue
    Write-Host "✅ Registry entry removed!" -ForegroundColor Green
    
} else {
    Write-Host "Use -Install or -Uninstall parameter" -ForegroundColor Yellow
}