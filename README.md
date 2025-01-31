# Pour lancer la documentation swagger du fournisseur d'identite
localhost:5092/swagger/

# Pour deployer le projet dans docker et le run
docker-compose up --build
docker build --rm -f 'Dockerfile' -t 'cryptos5:latest' '.' 
docker run --rm -d -p 5093:80/tcp -p 8080:8080/tcp cryptos5:latest