@echo off
title Autonomous Development Environment
color 0A

echo ================================
echo  🚀 AUTONOMOUS DEVELOPMENT LAUNCHER
echo ================================
echo.

REM Navigate to project directory
cd /d "C:\Users\hzham\haziqhtech"

echo 🧹 Step 1: Cleaning workspace...
powershell.exe -ExecutionPolicy Bypass -File "scripts\vscode-optimizer.ps1" -CleanupOnly

echo.
echo 🤖 Step 2: Starting autonomous developer...
start /b node scripts\autonomous-developer.js start

echo.
echo 🔧 Step 3: Opening VS Code with optimal settings...
code . --disable-extensions --enable-extension github.copilot --enable-extension github.copilot-chat

echo.
echo ✅ AUTONOMOUS DEVELOPMENT ENVIRONMENT READY!
echo.
echo 💡 Pro Tips:
echo    - VS Code will auto-cleanup editors and terminals
echo    - Copilot Chat should run continuously without stopping
echo    - Run quick-vscode-fix.bat if issues occur
echo    - Check autonomous-dev.log for monitoring details
echo.
echo 🎯 Your development environment is now hands-free!
echo    Just focus on coding, everything else is automated.
echo.
pause