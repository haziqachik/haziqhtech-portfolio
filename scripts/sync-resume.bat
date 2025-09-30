@echo off
setlocal
pushd "%~dp0.."
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0sync-resume.ps1"
echo Exit Code: %ERRORLEVEL%
echo Log files (if any) are in "%~dp0"
pause
popd
