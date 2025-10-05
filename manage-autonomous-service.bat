@echo off
echo 🔧 WINDOWS SERVICE AUTONOMOUS SYSTEM
echo ====================================
echo.
echo This installs a Windows service that runs autonomous development 24/7
echo ✅ Starts automatically with Windows
echo ✅ Runs even when you're not logged in
echo ✅ Survives reboots and crashes
echo.

echo Choose an option:
echo [1] Install Service (starts automatically)
echo [2] Start Service
echo [3] Stop Service  
echo [4] Check Service Status
echo [5] Uninstall Service
echo.

set /p choice="Enter choice (1-5): "

if "%choice%"=="1" (
    echo 🔧 Installing autonomous service...
    powershell -ExecutionPolicy Bypass -File "%~dp0scripts\autonomous-service.ps1" -Action Install
) else if "%choice%"=="2" (
    echo ▶️  Starting service...
    powershell -ExecutionPolicy Bypass -File "%~dp0scripts\autonomous-service.ps1" -Action Start
) else if "%choice%"=="3" (
    echo ⏹️  Stopping service...
    powershell -ExecutionPolicy Bypass -File "%~dp0scripts\autonomous-service.ps1" -Action Stop
) else if "%choice%"=="4" (
    echo 📊 Checking service status...
    powershell -ExecutionPolicy Bypass -File "%~dp0scripts\autonomous-service.ps1" -Action Status
) else if "%choice%"=="5" (
    echo 🗑️  Uninstalling service...
    powershell -ExecutionPolicy Bypass -File "%~dp0scripts\autonomous-service.ps1" -Action Uninstall
) else (
    echo ❌ Invalid choice
)

echo.
pause