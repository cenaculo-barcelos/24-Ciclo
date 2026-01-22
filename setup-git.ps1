# Script para configurar Git e fazer primeiro commit
Write-Host "=== Configuração do Git ===" -ForegroundColor Cyan

# Verificar se já está inicializado
if (Test-Path .git) {
    Write-Host "Git já está inicializado neste diretório." -ForegroundColor Yellow
} else {
    Write-Host "A inicializar Git..." -ForegroundColor Cyan
    git init
}

# Adicionar remote (substitui se já existir)
Write-Host "`nA configurar remote..." -ForegroundColor Cyan
git remote remove origin 2>$null
git remote add origin https://github.com/cenaculo-barcelos/24-Ciclo.git

Write-Host "`nRemote configurado: https://github.com/cenaculo-barcelos/24-Ciclo.git" -ForegroundColor Green

# Verificar status
Write-Host "`n=== Ficheiros para commit ===" -ForegroundColor Cyan
git status --short

Write-Host "`n=== Próximos passos ===" -ForegroundColor Yellow
Write-Host "1. Adiciona os ficheiros: git add ." -ForegroundColor White
Write-Host "2. Faz commit: git commit -m 'Mensagem do commit'" -ForegroundColor White
Write-Host "3. Faz push: git push -u origin main" -ForegroundColor White
Write-Host "`nOu executa: .\commit-and-push.ps1" -ForegroundColor Green
