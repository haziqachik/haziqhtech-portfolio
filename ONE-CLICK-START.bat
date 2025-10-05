@echo off
title Ultimate One-Click Autonomous System

echo 🎯 ONE-CLICK AUTONOMOUS STARTER
echo ===============================
echo.
echo ⚡ Automatically detects and starts the best autonomous mode
echo 🧠 Smart selection based on your system
echo 🚀 Just double-click and walk away!
echo.

powershell -ExecutionPolicy Bypass -File "%~dp0scripts\one-click-autonomous.ps1"

echo.
echo Press any key to close...
pause >nul