# Add environment variables to Vercel
Write-Host "Adding RESEND_API_KEY..." -ForegroundColor Yellow
echo "re_H8nd6vha_8yTr5txGgAE3A5X4PqvJcdgC" | vercel env add RESEND_API_KEY production

Write-Host "`nAdding CONTACT_EMAIL..." -ForegroundColor Yellow
echo "haziqh@haziqhtech.sg" | vercel env add CONTACT_EMAIL production

Write-Host "`nDone! Triggering new deployment..." -ForegroundColor Green
vercel --prod --yes
