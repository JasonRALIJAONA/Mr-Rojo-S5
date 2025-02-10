package com.cloud.crypto.transaction;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cloud.crypto.cryptomonnaie.Cryptomonnaie;
import com.cloud.crypto.cryptomonnaie.CryptomonnaieService;
import com.cloud.crypto.utilisateur.Utilisateur;
import com.cloud.crypto.utilisateur.UtilisateurService;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private UtilisateurService utilisateurService;

    @Autowired
    private CryptomonnaieService cryptomonnaieService;

    @GetMapping("/historique")
    public List<Transaction> getTransactions(@RequestParam(required = false) Long idUtilisateur,
                                              @RequestParam(required = false) Long idCryptomonnaie,
                                              @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss") LocalDateTime dateStart,
                                              @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss") LocalDateTime dateEnd) {
        return transactionService.getHistorique(idUtilisateur, idCryptomonnaie, dateStart, dateEnd);
    }    

    @PostMapping("/save")
    public ResponseEntity<?> saveTransaction(@RequestBody Map<String, Object> payload,
                                              @RequestHeader(value = "Authorization", required = false) String authHeader) throws Exception {
    
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Token manquant ou invalide.");
        }
    
        // Extraction du token après "Bearer "
        String token = authHeader.substring(7);
        Utilisateur user = utilisateurService.findByToken(token);
        if (user == null) {
            return ResponseEntity.status(404).body("Utilisateur non trouvé.");
        }
    
        // Récupérer les données depuis le payload JSON
        String typeTransaction = (String) payload.get("typeTransaction");
        BigDecimal prixUnitaire = new BigDecimal(payload.get("prixUnitaire").toString());
        Integer quantite = (Integer) payload.get("quantite");
        Long cryptomonnaieId = ((Number) payload.get("cryptomonnaieId")).longValue();
    
        // Vérification des champs obligatoires
        if (typeTransaction == null || prixUnitaire == null || quantite == null || cryptomonnaieId == null) {
            return ResponseEntity.badRequest().body("Données invalides ou manquantes.");
        }
    
        // Calcul du total
        BigDecimal totalPrix = prixUnitaire.multiply(BigDecimal.valueOf(quantite));
        LocalDateTime transactionDate = LocalDateTime.now();
    
        // Créer une transaction
        Transaction transaction = new Transaction();
        transaction.setDateTransaction(transactionDate);
        transaction.setCryptomonnaie(cryptomonnaieService.getCryptoById(cryptomonnaieId).orElseThrow(
            () -> new RuntimeException("Crypto introuvable")));
        transaction.setPrixUnitaire(prixUnitaire);
        transaction.setUtilisateur(user);
    
        String message;
        if ("vente".equalsIgnoreCase(typeTransaction)) {
            transaction.setVente(totalPrix);
            message = "Transaction enregistrée avec une vente de " + totalPrix + " Ariary.";
        } else if ("achat".equalsIgnoreCase(typeTransaction)) {
            transaction.setAchat(totalPrix);
            message = "Transaction enregistrée avec un achat de " + totalPrix + " Ariary.";
        } else {
            return ResponseEntity.badRequest().body("Type de transaction non valide.");
        }
    
        // Sauvegarde de la transaction
        transactionService.save(transaction);
    
        return ResponseEntity.ok().body(Map.of(
            "status", "success",
            "message", message,
            "transactionDetails", transaction
        ));
    }    

}
