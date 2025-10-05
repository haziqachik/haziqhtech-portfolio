@echo off
title ULTIMATE ZERO-CLICK AUTONOMOUS SYSTEM
color 0A
cls

echo ========================================================
echo          ULTIMATE ZERO-CLICK AUTONOMOUS SYSTEM
echo ========================================================
echo.
echo 🚀 COMPLETELY HANDS-OFF OPERATION
echo 💯 NO APPROVALS OR CLICKING REQUIRED
echo ⚡ PREVENTS VS CODE SLOWDOWNS  
echo 🤖 AUTONOMOUS COMMITS, BUILDS, DEPLOYS
echo 📊 PERFORMANCE MONITORING & OPTIMIZATION
echo.
echo Starting ultimate autonomous mode...
echo You can literally walk away and come back to completed work!
echo.

REM Navigate to project directory
cd /d "c:\Users\hzham\haziqhtech"

REM Kill any stuck VS Code processes to prevent slowdowns
echo 🧹 Cleaning up any stuck processes...
taskkill /F /IM "Code.exe" /FI "STATUS eq NOT RESPONDING" 2>nul >nul
taskkill /F /IM "node.exe" /FI "WINDOWTITLE eq *autonomous*" 2>nul >nul

REM Clear system temp files for performance
echo ⚡ Optimizing system performance...
del /Q "%TEMP%\*" 2>nul >nul
ipconfig /flushdns >nul 2>nul

REM Install Node dependencies if missing
if not exist "node_modules" (
    echo 📦 Installing Node.js dependencies...
    npm install --silent
)

REM Set process priority for better performance
echo 🎯 Setting high performance mode...
wmic process where name="node.exe" CALL setpriority "above normal" 2>nul >nul

REM Start the ultimate autonomous assistant
echo.
echo ✨ Starting ultimate autonomous assistant...
echo 📝 All logs will be saved to: ultimate-autonomous.log
echo 🔄 System will auto-commit every 15 seconds if changes detected
echo 🏗️ Auto-build and deploy on main branch
echo 🧠 Memory monitoring and auto-cleanup enabled
echo 🛑 Press Ctrl+C to stop (graceful shutdown)
echo.

REM Run with auto-restart on any failures
:restart
node ultimate-autonomous.js
set exit_code=%errorlevel%

if %exit_code% neq 0 (
    echo.
    echo ⚠️ Assistant stopped with exit code: %exit_code%
    echo 🔄 Auto-restarting in 10 seconds...
    echo 💡 This ensures continuous operation even on errors
    timeout /t 10 /nobreak >nul
    goto restart
)

echo.
echo ✅ Ultimate autonomous assistant completed successfully
echo 📊 Check ultimate-autonomous.log for detailed performance metrics
pause