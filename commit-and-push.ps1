# Script para fazer commit e push
param(
    [string]$message = "Update website"
)

Write-Host "=== Adicionar ficheiros ===" -ForegroundColor Cyan
git add .

Write-Host "`n=== Status ===" -ForegroundColor Cyan
git status --short

Write-Host "`n=== Fazer commit ===" -ForegroundColor Cyan
git commit -m $message

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Commit criado com sucesso!" -ForegroundColor Green
    
    Write-Host "`n=== Fazer push ===" -ForegroundColor Cyan
    $branch = git branch --show-current
    if ($branch -eq "") {
        $branch = "main"
    }
    
    Write-Host "A fazer push para origin/$branch..." -ForegroundColor Yellow
    git push -u origin $branch
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ Push realizado com sucesso!" -ForegroundColor Green
    } else {
        Write-Host "`n❌ Erro ao fazer push. Verifica as credenciais." -ForegroundColor Red
    }
} else {
    Write-Host "`n❌ Erro ao fazer commit. Verifica se há alterações." -ForegroundColor Red
}
