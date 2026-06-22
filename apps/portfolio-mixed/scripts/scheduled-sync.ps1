# Scheduled File Sync to Google Drive
# This script syncs files on a schedule (run via Task Scheduler)

param(
    [string]$SourceFolder = "C:\Path\To\Your\Source\Folder",
    [string]$DestinationFolder = "G:\My Drive\Valorant",
    [switch]$DeleteOrphans = $false  # Delete files in destination that don't exist in source
)

$logFile = "$PSScriptRoot\sync-log.txt"

function Write-Log {
    param($Message)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logMessage = "[$timestamp] $Message"
    Add-Content -Path $logFile -Value $logMessage
    Write-Host $logMessage
}

Write-Log "=== Sync Started ==="
Write-Log "Source: $SourceFolder"
Write-Log "Destination: $DestinationFolder"

# Verify source exists
if (-not (Test-Path $SourceFolder)) {
    Write-Log "ERROR: Source folder not found!"
    exit 1
}

# Create destination if needed
if (-not (Test-Path $DestinationFolder)) {
    New-Item -ItemType Directory -Path $DestinationFolder -Force | Out-Null
    Write-Log "Created destination folder"
}

# Get all files from source
$sourceFiles = Get-ChildItem -Path $SourceFolder -Recurse -File

$copiedCount = 0
$skippedCount = 0
$errorCount = 0

foreach ($file in $sourceFiles) {
    try {
        # Calculate destination path
        $relativePath = $file.FullName.Substring($SourceFolder.Length)
        $destPath = Join-Path $DestinationFolder $relativePath
        $destDir = Split-Path $destPath -Parent
        
        # Create destination directory if needed
        if (-not (Test-Path $destDir)) {
            New-Item -ItemType Directory -Path $destDir -Force | Out-Null
        }
        
        # Check if copy is needed
        $needsCopy = $false
        if (-not (Test-Path $destPath)) {
            $needsCopy = $true
        } else {
            $sourceHash = (Get-FileHash $file.FullName -Algorithm MD5).Hash
            $destHash = (Get-FileHash $destPath -Algorithm MD5).Hash
            if ($sourceHash -ne $destHash) {
                $needsCopy = $true
            }
        }
        
        if ($needsCopy) {
            Copy-Item -Path $file.FullName -Destination $destPath -Force
            Write-Log "Copied: $relativePath"
            $copiedCount++
        } else {
            $skippedCount++
        }
    }
    catch {
        Write-Log "ERROR copying $($file.FullName): $_"
        $errorCount++
    }
}

# Optional: Delete files in destination that don't exist in source
if ($DeleteOrphans) {
    $destFiles = Get-ChildItem -Path $DestinationFolder -Recurse -File
    $deletedCount = 0
    
    foreach ($file in $destFiles) {
        $relativePath = $file.FullName.Substring($DestinationFolder.Length)
        $sourcePath = Join-Path $SourceFolder $relativePath
        
        if (-not (Test-Path $sourcePath)) {
            Remove-Item -Path $file.FullName -Force
            Write-Log "Deleted orphan: $relativePath"
            $deletedCount++
        }
    }
    Write-Log "Deleted $deletedCount orphaned files"
}

Write-Log "=== Sync Complete ==="
Write-Log "Copied: $copiedCount | Skipped: $skippedCount | Errors: $errorCount"
Write-Log ""
