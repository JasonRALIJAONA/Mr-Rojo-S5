# Pour lancer la documentation swagger du fournisseur d'identite
localhost:5092/swagger/

# Pour deployer le projet dans docker et le run
docker-compose up --build
ctrl+C pour terminer le processus (car il y a erreur de postgres qui n'est pas encore detecte par spring boot)
puis docker-compose up