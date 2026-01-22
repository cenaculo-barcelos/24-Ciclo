# Script para produção - faz build completo (usa quando quiseres fazer deploy)
# Remove container antigo se existir
docker rm -f cenaculo-site 2>$null

# Faz build da imagem
Write-Host "A construir a imagem..." -ForegroundColor Cyan
docker build -t cenaculo-site .

if ($LASTEXITCODE -eq 0) {
    # Corre o container na porta 3000 (sem volumes - ficheiros copiados na imagem)
    Write-Host "A iniciar o container na porta 3000..." -ForegroundColor Cyan
    docker run -d -p 3000:80 --name cenaculo-site cenaculo-site
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ Site a correr em http://localhost:3000" -ForegroundColor Green
        Write-Host "💡 Para desenvolvimento, usa: .\run-dev.ps1" -ForegroundColor Yellow
    }
}
