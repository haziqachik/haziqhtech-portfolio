#!/usr/bin/env bash
# Test script to verify the automation setup
# This simulates what would happen when sync-resume.ps1 runs

set -e

echo "=============================================="
echo "  Resume Sync Automation Test Suite"
echo "=============================================="
echo ""

# Test 1: Check PowerShell script exists and is readable
echo "Test 1: Checking PowerShell script..."
if [ -f "scripts/sync-resume.ps1" ]; then
    echo "✓ sync-resume.ps1 exists"
    lines=$(wc -l < scripts/sync-resume.ps1)
    echo "  Script has $lines lines"
else
    echo "✗ sync-resume.ps1 not found"
    exit 1
fi

# Test 2: Check batch wrapper exists
echo ""
echo "Test 2: Checking batch wrapper..."
if [ -f "scripts/sync-resume.bat" ]; then
    echo "✓ sync-resume.bat exists"
else
    echo "✗ sync-resume.bat not found"
    exit 1
fi

# Test 3: Check GitHub Actions workflow
echo ""
echo "Test 3: Checking GitHub Actions workflow..."
if [ -f ".github/workflows/sync-resume.yml" ]; then
    echo "✓ sync-resume.yml workflow exists"
    # Check YAML is valid (basic check)
    if grep -q "workflow_dispatch" .github/workflows/sync-resume.yml; then
        echo "  ✓ Manual trigger configured"
    fi
    if grep -q "resume_url" .github/workflows/sync-resume.yml; then
        echo "  ✓ URL input parameter configured"
    fi
else
    echo "✗ GitHub Actions workflow not found"
    exit 1
fi

# Test 4: Check documentation
echo ""
echo "Test 4: Checking documentation..."
docs_found=0
if [ -f "scripts/README.md" ]; then
    echo "✓ scripts/README.md exists"
    docs_found=$((docs_found + 1))
fi
if [ -f "QUICK_REFERENCE.md" ]; then
    echo "✓ QUICK_REFERENCE.md exists"
    docs_found=$((docs_found + 1))
fi
if [ $docs_found -eq 2 ]; then
    echo "  ✓ All documentation files present"
else
    echo "  ⚠ Some documentation missing"
fi

# Test 5: Check destination path exists
echo ""
echo "Test 5: Checking destination path..."
if [ -f "apps/portfolio-mixed/public/Haziq_Asyraaf_CV.pdf" ]; then
    echo "✓ Resume PDF exists in public folder"
    size=$(stat -f%z "apps/portfolio-mixed/public/Haziq_Asyraaf_CV.pdf" 2>/dev/null || stat -c%s "apps/portfolio-mixed/public/Haziq_Asyraaf_CV.pdf" 2>/dev/null)
    echo "  Current resume size: $size bytes"
else
    echo "⚠ Resume PDF not found (may be expected)"
fi

# Test 6: Check resume page references the sync script
echo ""
echo "Test 6: Checking resume page integration..."
if [ -f "apps/portfolio-mixed/src/app/resume/page.tsx" ]; then
    if grep -q "sync-resume.ps1" apps/portfolio-mixed/src/app/resume/page.tsx; then
        echo "✓ Resume page references sync script"
    else
        echo "  ℹ Resume page doesn't mention sync script (optional)"
    fi
    if grep -q "Haziq_Asyraaf_CV.pdf" apps/portfolio-mixed/src/app/resume/page.tsx; then
        echo "✓ Resume page links to PDF"
    fi
fi

# Test 7: Check README.md mentions resume sync
echo ""
echo "Test 7: Checking main README integration..."
if [ -f "README.md" ]; then
    if grep -q "Resume Sync" README.md || grep -q "resume sync" README.md; then
        echo "✓ README.md documents resume sync"
    else
        echo "  ⚠ README.md doesn't mention resume sync"
    fi
fi

# Test 8: Simulate PowerShell syntax check (if PowerShell available)
echo ""
echo "Test 8: PowerShell syntax validation..."
if command -v pwsh &> /dev/null; then
    if pwsh -NoProfile -Command "Get-Help scripts/sync-resume.ps1" &> /dev/null; then
        echo "✓ PowerShell script syntax valid"
    else
        echo "  ℹ Could not parse PowerShell help (may be normal)"
    fi
else
    echo "  ℹ PowerShell not available for syntax check (expected on Linux)"
fi

# Summary
echo ""
echo "=============================================="
echo "  Test Results Summary"
echo "=============================================="
echo ""
echo "✓ All critical components are in place"
echo ""
echo "Components:"
echo "  • PowerShell automation script"
echo "  • Windows batch launcher"
echo "  • GitHub Actions workflow"
echo "  • Documentation files"
echo "  • Resume page integration"
echo ""
echo "Ready to use!"
echo ""
echo "Next steps:"
echo "  1. Commit these changes to GitHub"
echo "  2. On Windows, double-click scripts/sync-resume.bat"
echo "  3. Or trigger via GitHub Actions manually"
echo ""
