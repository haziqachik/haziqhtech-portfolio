# Windows Service Wrapper for Autonomous System
# This creates a Windows service that starts automatically with Windows

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("Install", "Uninstall", "Start", "Stop", "Status")]
    [string]$Action
)

$ServiceName = "HaziqAutoDevService"
$ServiceDisplayName = "Haziq Autonomous Development Service"
$ServiceDescription = "Runs autonomous development tasks 24/7 in background"
$ScriptPath = "$PWD\scripts\ultimate-background-autonomous.ps1"
$ServicePath = "$PWD\service-wrapper.ps1"

function Install-AutoService {
    Write-Host "🔧 Installing Autonomous Development Service..." -ForegroundColor Cyan
    
    # Create service wrapper script
    $wrapperScript = @"
# Service Wrapper for Autonomous Development
Set-Location '$PWD'
& '$ScriptPath' -MaxHours 8760 -CheckIntervalSeconds 300
"@
    $wrapperScript | Set-Content $ServicePath
    
    # Create the service
    $nssm = "$PWD\tools\nssm.exe"
    if (-not (Test-Path $nssm)) {
        Write-Host "📥 Downloading NSSM (Non-Sucking Service Manager)..." -ForegroundColor Yellow
        New-Item -Path "$PWD\tools" -ItemType Directory -Force | Out-Null
        Invoke-WebRequest -Uri "https://nssm.cc/release/nssm-2.24.zip" -OutFile "$PWD\tools\nssm.zip"
        Expand-Archive "$PWD\tools\nssm.zip" "$PWD\tools" -Force
        Move-Item "$PWD\tools\nssm-2.24\win64\nssm.exe" "$PWD\tools\nssm.exe"
        Remove-Item "$PWD\tools\nssm.zip", "$PWD\tools\nssm-2.24" -Recurse -Force
    }
    
    # Install service
    & $nssm install $ServiceName powershell.exe
    & $nssm set $ServiceName Arguments "-ExecutionPolicy Bypass -File `"$ServicePath`""
    & $nssm set $ServiceName DisplayName "$ServiceDisplayName"
    & $nssm set $ServiceName Description "$ServiceDescription"
    & $nssm set $ServiceName Start SERVICE_AUTO_START
    & $nssm set $ServiceName AppStdout "$PWD\service.log"
    & $nssm set $ServiceName AppStderr "$PWD\service-error.log"
    
    Write-Host "✅ Service installed successfully!" -ForegroundColor Green
    Write-Host "🚀 Starting service..." -ForegroundColor Cyan
    Start-Service $ServiceName
}

function Uninstall-AutoService {
    Write-Host "🗑️  Uninstalling Autonomous Development Service..." -ForegroundColor Yellow
    Stop-Service $ServiceName -ErrorAction SilentlyContinue
    & "$PWD\tools\nssm.exe" remove $ServiceName confirm
    Remove-Item $ServicePath -ErrorAction SilentlyContinue
    Write-Host "✅ Service uninstalled!" -ForegroundColor Green
}

switch ($Action) {
    "Install" { Install-AutoService }
    "Uninstall" { Uninstall-AutoService }
    "Start" { 
        Start-Service $ServiceName
        Write-Host "✅ Service started!" -ForegroundColor Green
    }
    "Stop" { 
        Stop-Service $ServiceName
        Write-Host "⏹️  Service stopped!" -ForegroundColor Yellow
    }
    "Status" { 
        $service = Get-Service $ServiceName -ErrorAction SilentlyContinue
        if ($service) {
            Write-Host "📊 Service Status: $($service.Status)" -ForegroundColor Cyan
            Write-Host "📝 Log: Get-Content service.log -Tail 5" -ForegroundColor Blue
        } else {
            Write-Host "❌ Service not installed" -ForegroundColor Red
        }
    }
}