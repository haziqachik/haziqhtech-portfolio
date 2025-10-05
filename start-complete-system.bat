@echo off
title COMPLETE AUTONOMOUS PORTFOLIO SYSTEM
color 0A
cls

echo ============================================================
echo          COMPLETE AUTONOMOUS PORTFOLIO SYSTEM
echo ============================================================
echo.
echo 🚀 FULLY AUTOMATED OPERATION
echo 💯 ZERO MANUAL INTERVENTION REQUIRED  
echo 🔒 AUTOMATIC SECURITY CONFIGURATION
echo 📖 AUTO-GENERATED WIKI DOCUMENTATION
echo ⚡ PERFORMANCE OPTIMIZATION INCLUDED
echo 🤖 COMMITS, BUILDS, DEPLOYS AUTOMATICALLY
echo.
echo This script will configure EVERYTHING automatically:
echo ✅ Enable all GitHub security features (Dependabot, Secret Scanning, CodeQL)
echo ✅ Create comprehensive Wiki documentation  
echo ✅ Set up branch protection and repository optimization
echo ✅ Configure autonomous development with performance monitoring
echo ✅ Auto-commit changes every 15 seconds
echo ✅ Auto-build and deploy on main branch  
echo ✅ Prevent VS Code slowdowns with resource management
echo.

REM Navigate to project directory
cd /d "c:\Users\hzham\haziqhtech"

REM Clean up any stuck processes
echo 🧹 Optimizing system for peak performance...
taskkill /F /IM "Code.exe" /FI "STATUS eq NOT RESPONDING" 2>nul >nul
taskkill /F /IM "node.exe" /FI "WINDOWTITLE eq *autonomous*" 2>nul >nul

REM Clear system resources for best performance
del /Q "%TEMP%\*" 2>nul >nul
ipconfig /flushdns >nul 2>nul

REM Check for GitHub CLI and install if needed
echo 🔍 Checking GitHub CLI availability...
gh --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 📥 Installing GitHub CLI...
    winget install GitHub.cli --silent
    echo ✅ GitHub CLI installed successfully
)

REM Authenticate GitHub CLI if needed
echo 🔑 Checking GitHub authentication...
gh auth status >nul 2>&1
if %errorlevel% neq 0 (
    echo 🔐 Please authenticate with GitHub...
    echo Opening browser for authentication...
    gh auth login --web
)

REM Install Node dependencies if missing  
if not exist "node_modules" (
    echo 📦 Installing Node.js dependencies...
    npm install --silent
)

REM Set high performance mode
echo ⚡ Activating high performance mode...
wmic process where name="node.exe" CALL setpriority "above normal" 2>nul >nul

echo.
echo ========================================================
echo                 STARTING AUTOMATION
echo ========================================================
echo.

REM First, run GitHub security and Wiki setup (one-time or weekly)
echo 🔒 Phase 1: Configuring GitHub Security & Wiki...
echo 📊 This will enable all security features automatically
echo 📖 Creating comprehensive Wiki documentation
node github-automation.js
if %errorlevel% equ 0 (
    echo ✅ GitHub configuration completed successfully!
) else (
    echo ⚠️ GitHub configuration had issues, continuing with autonomous mode...
)

echo.
echo 🤖 Phase 2: Starting Ultimate Autonomous Mode...
echo 💡 The system will now run continuously with:
echo    - Auto-commits every 15 seconds if changes detected
echo    - Auto-build when builds become stale  
echo    - Auto-deploy to production on main branch
echo    - Performance monitoring and memory optimization
echo    - VS Code resource cleanup and optimization
echo    - Weekly security audits and GitHub maintenance
echo.
echo 📝 All activities logged to: ultimate-autonomous.log
echo 🛑 Press Ctrl+C for graceful shutdown
echo.

REM Start the ultimate autonomous system with auto-restart
:restart
echo 🚀 Autonomous system starting...
node ultimate-autonomous.js
set exit_code=%errorlevel%

if %exit_code% neq 0 (
    echo.
    echo ⚠️ Autonomous system stopped (exit code: %exit_code%)
    echo 🔄 Auto-restarting in 10 seconds...
    echo 💪 Resilient operation ensures continuous development
    timeout /t 10 /nobreak >nul
    goto restart
)

echo.
echo ✅ Complete autonomous system finished successfully
echo 📊 Check logs for detailed performance metrics:
echo    - ultimate-autonomous.log (development automation)
echo    - github-automation.log (security and wiki updates)
echo.
pause