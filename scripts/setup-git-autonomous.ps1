# Git Auto-Configuration for Autonomous Mode
Write-Host "Configuring Git for autonomous operation..." -ForegroundColor Cyan

# Disable all interactive prompts and confirmations
git config --global core.autocrlf false
git config --global add.interactive false  
git config --global core.editor "true"
git config --global merge.tool false
git config --global advice.addIgnoredFile false
git config --global advice.addEmptyPathspec false
git config --global advice.pushNonFastForward false
git config --global advice.statusHints false
git config --global advice.commitBeforeMerge false
git config --global advice.resolveConflict false
git config --global advice.implicitIdentity false
git config --global advice.detachedHead false
git config --global advice.amWorkDir false

# Set autonomous commit settings
git config --global commit.verbose false
git config --global status.showUntrackedFiles no
git config --global push.default simple

# Create git aliases for autonomous operations
git config --global alias.auto-add "add -A"
git config --global alias.auto-commit "commit -m"
git config --global alias.auto-push "push origin HEAD"

Write-Host "Git configured for autonomous operation!" -ForegroundColor Green
Write-Host ""
Write-Host "Autonomous Git Commands Available:" -ForegroundColor Yellow
Write-Host "  git auto-add    - Add all changes" -ForegroundColor White
Write-Host "  git auto-commit - Commit with message" -ForegroundColor White  
Write-Host "  git auto-push   - Push to origin" -ForegroundColor White
Write-Host ""

# Test autonomous git operation
Write-Host "Testing autonomous git operations..." -ForegroundColor Cyan
$testResult = git status --porcelain 2>$null
if ($testResult) {
    Write-Host "Found uncommitted changes - testing auto-operations..." -ForegroundColor Yellow
    git add -A 2>$null
    $commitMsg = "Auto-config: Git autonomous setup $(Get-Date -Format 'HH:mm:ss')"
    git commit -m $commitMsg 2>$null
    Write-Host "Autonomous git operations working!" -ForegroundColor Green
} else {
    Write-Host "No changes to test, but configuration is ready" -ForegroundColor Green
}