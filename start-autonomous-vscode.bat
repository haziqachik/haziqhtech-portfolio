@echo off
echo 🔧 Starting Autonomous VS Code Setup...

REM Run the PowerShell script with execution policy bypass
powershell.exe -ExecutionPolicy Bypass -File "%~dp0setup-autonomous-vscode.ps1"

echo ✅ Autonomous VS Code setup complete!
pause