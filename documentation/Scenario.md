**Scénario d'Application Crypto**

### **1. Connexion de l'utilisateur**
L'utilisateur se connecte à l'application crypto en utilisant une adresse email existante dans un fournisseur d'identité. Lors de la tentative de connexion :

- Un code PIN temporaire de 90 secondes est automatiquement généré et envoyé à l'adresse email enregistrée (par exemple, une adresse yopmail).
- L'utilisateur doit accéder à son compte email pour récupérer le code PIN et le saisir dans l'application.
- Une fois le code PIN validé, l'utilisateur est authentifié et peut accéder à son tableau de bord.

### **2. Mouvement de fonds (Dépôt et Retrait)**
L'utilisateur peut effectuer les opérations suivantes :

- **Dépôt** :
  - Sélectionne l'option "Dépôt".
  - Saisit le montant souhaité.
  - Confirme la transaction.
  - L'opération reste en attente jusqu'à validation par l'administrateur.

- **Retrait** :
  - Sélectionne l'option "Retrait".
  - Saisit le montant à retirer.
  - Confirme la demande.
  - L'opération est également soumise à validation par l'administrateur.

### **3. Validation par l'administrateur**
L'administrateur dispose d'une interface permettant de visualiser toutes les demandes de dépôt et de retrait en attente.

- Chaque transaction est analysée avant validation.
- L'administrateur peut :
  - Valider une transaction.
  - Rejeter une transaction avec un commentaire expliquant la raison.
- Une notification est envoyée à l'utilisateur concernant l'état de sa demande.

### **4. Visualisation du cours des cryptomonnaies**
L'application présente un graphique interactif permettant de suivre l'évolution des cours des cryptomonnaies.

- Le graphique est actualisé automatiquement toutes les 10 secondes.
- Les données incluent :
  - Le prix actuel.
  - Les variations de prix sur une période donnée.

### **5. Historique des transactions**
L'utilisateur a accès à un historique complet de ses transactions.

- Chaque transaction affiche :
  - La date et l'heure.
  - Le type d'opération (dépôt ou retrait).
  - Le montant.
  - L'état de la transaction (en attente, validée, rejetée).
- Une option de filtrage permet de rechercher des transactions par période ou par type.

