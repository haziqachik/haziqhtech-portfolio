@echo off
echo 🤖 ULTIMATE BACKGROUND AUTONOMOUS SYSTEM
echo =========================================
echo.
echo This will run ALL autonomous options continuously in the background:
echo   🔹 Option 1: VS Code Autonomous Mode (auto-restart)
echo   🔹 Option 2: Development Monitoring (git, deployment, health)  
echo   🔹 Option 3: Background Task Processing (builds, syncs, checks)
echo.
echo ⚡ FULLY AUTOMATIC - No user interaction needed!
echo ⏰ Runs 24/7 until you stop it
echo 📝 Check autonomous-background.log for status
echo.

set /p duration="How many hours to run? (default: 24): "
if "%duration%"=="" set duration=24

echo.
echo 🚀 Starting background autonomous system for %duration% hours...
echo 💡 You can close this window - everything runs in background!
echo.

REM Start the ultimate background script in a hidden window
powershell -WindowStyle Hidden -ExecutionPolicy Bypass -File "%~dp0scripts\ultimate-background-autonomous.ps1" -MaxHours %duration%

echo ✅ Background autonomous system is now running!
echo.
echo 📊 To check status: type "Get-Content autonomous-background.log -Tail 10" in PowerShell
echo 🛑 To stop: Kill PowerShell processes or restart computer
echo.
pause