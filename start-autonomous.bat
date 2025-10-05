@echo off
title Autonomous Development Assistant
cls

echo ============================================
echo    AUTONOMOUS DEVELOPMENT ASSISTANT
echo ============================================
echo.
echo Starting continuous autonomous operation...
echo This will run in background without interruption.
echo.
echo Features:
echo - Auto-commit changes every 15 minutes
echo - Auto-deploy on main branch
echo - Auto-build when needed
echo - VS Code optimization
echo - No manual intervention required
echo.
echo Press Ctrl+C to stop (but you don't need to!)
echo.

REM Navigate to project directory
cd /d "c:\Users\hzham\haziqhtech"

REM Install dependencies if needed
if not exist "node_modules" (
    echo Installing Node.js dependencies...
    npm install
)

REM Start the autonomous assistant
echo Starting autonomous assistant...
echo.

REM Run in background mode with auto-restart
:restart
node autonomous-dev-assistant.js
if %errorlevel% neq 0 (
    echo Assistant stopped with error, restarting in 10 seconds...
    timeout /t 10 /nobreak >nul
    goto restart
)

echo Autonomous assistant completed normally.
pause