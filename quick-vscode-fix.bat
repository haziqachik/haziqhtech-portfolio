@echo off
REM Quick VS Code Fix - Run when Copilot Chat stops responding
echo 🔧 VS Code Quick Fix Starting...

REM Close all unnecessary VS Code processes except the main one
taskkill /f /im "Code - Insiders.exe" 2>nul
timeout /t 2 /nobreak >nul

REM Run the PowerShell optimizer
echo 🚀 Running workspace optimizer...
powershell.exe -ExecutionPolicy Bypass -File "%~dp0vscode-optimizer.ps1" -RestartCopilot

REM Restart VS Code in the project directory
echo 🔄 Restarting VS Code...
cd /d "C:\Users\hzham\haziqhtech"
code . --disable-extensions --enable-extension github.copilot --enable-extension github.copilot-chat

echo ✅ VS Code should be responsive now!
echo 💡 Keep this batch file handy for quick fixes
pause