@echo off
setlocal
REM jump to repo root (parent of this scripts folder)
pushd "%~dp0.."
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0sync-resume.ps1"
set ERR=%ERRORLEVEL%
popd
exit /b %ERR%