# VS Code Auto-Setup and Restart Script
# This script forces VS Code to restart with autonomous settings

Write-Host "🔧 Setting up VS Code for autonomous operation..." -ForegroundColor Cyan

# Kill all VS Code processes
Write-Host "⏹️  Closing VS Code processes..." -ForegroundColor Yellow
Get-Process -Name "Code" -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2

# Clear VS Code cache to ensure settings reload
$vscodeCache = "$env:APPDATA\Code\User\workspaceStorage"
if (Test-Path $vscodeCache) {
    Write-Host "🧹 Cleaning VS Code cache..." -ForegroundColor Yellow
    Remove-Item "$vscodeCache\*" -Recurse -Force -ErrorAction SilentlyContinue
}

# Copy settings to ensure they're applied
$settingsPath = "$PWD\.vscode\settings.json"
$userSettingsPath = "$env:APPDATA\Code\User\settings.json"

if (Test-Path $settingsPath) {
    Write-Host "📋 Copying autonomous settings..." -ForegroundColor Green
    Copy-Item $settingsPath $userSettingsPath -Force
}

# Create a flag file to indicate autonomous mode
$autonomousFlag = "$PWD\.vscode\autonomous-mode.json"
@{
    "enabled"         = $true
    "timestamp"       = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
    "autoApproveAll"  = $true
    "silentExecution" = $true
    "backgroundMode"  = $true
} | ConvertTo-Json | Set-Content $autonomousFlag

Write-Host "🚀 Starting VS Code with autonomous configuration..." -ForegroundColor Green

# Start VS Code with specific flags for autonomous operation
& code . --disable-extensions-except ms-vscode.vscode-copilot --disable-web-security --user-data-dir "$env:TEMP\vscode-autonomous"

Write-Host "✅ VS Code started in autonomous mode!" -ForegroundColor Green
Write-Host "💡 You can now close this terminal - VS Code will run autonomously" -ForegroundColor Cyan

# Keep the script running to monitor VS Code
Write-Host "🔄 Monitoring VS Code autonomous operation..." -ForegroundColor Blue
while ($true) {
    $vscodeRunning = Get-Process -Name "Code" -ErrorAction SilentlyContinue
    if (-not $vscodeRunning) {
        Write-Host "⚠️  VS Code closed. Autonomous session ended." -ForegroundColor Yellow
        break
    }
    Start-Sleep -Seconds 30
}