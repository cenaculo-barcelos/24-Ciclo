# Script para desenvolvimento - usa volumes (alterações aparecem imediatamente)
# Remove container antigo se existir
docker rm -f cenaculo-site 2>$null

# Faz build da imagem (só precisa uma vez, ou quando mudares Dockerfile/nginx.conf)
Write-Host "A construir a imagem..." -ForegroundColor Cyan
docker build -t cenaculo-site .

if ($LASTEXITCODE -eq 0) {
    # Corre o container com VOLUMES - as alterações aparecem imediatamente!
    Write-Host "A iniciar o container na porta 3000 (modo desenvolvimento)..." -ForegroundColor Cyan
    
    # Monta os ficheiros como volume (caminho absoluto)
    $currentPath = (Get-Location).Path
    docker run -d -p 3000:80 `
        -v "${currentPath}:/usr/share/nginx/html" `
        -v "${currentPath}/nginx.conf:/etc/nginx/conf.d/default.conf" `
        --name cenaculo-site cenaculo-site
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ Site a correr em http://localhost:3000" -ForegroundColor Green
        Write-Host "💡 As alterações aparecem imediatamente (sem rebuild)!" -ForegroundColor Yellow
    }
}
