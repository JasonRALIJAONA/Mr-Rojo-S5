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
    public ResponseEntity<?> saveTransaction(@RequestParam(required = false) String typeTransaction,
                                       @RequestParam(required = false) BigDecimal prixUnitaire,
                                       @RequestParam(required = false) Integer quantite,
                                       @RequestParam(required = false) Long cryptomonnaieId,
                                       @RequestHeader(value = "Authorization", required = false) String authHeader) throws Exception {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Token manquant ou invalide.");
        }

        // Extraction du token après "Bearer "
        String token = authHeader.substring(7);
        System.out.println("tokennn: " + token);

        // Appeler le service pour valider et récupérer l'utilisateur via le token
        Utilisateur user = utilisateurService.findByToken(token);

        System.out.println("hiiiiii----" + cryptomonnaieId);

        // Utilisation de BigDecimal.ZERO si prixUnitaire ou quantite est null
        BigDecimal totalPrix = (prixUnitaire != null ? prixUnitaire : BigDecimal.ZERO)
        .multiply(BigDecimal.valueOf(quantite != null ? quantite : 0));

        LocalDateTime transactionDate = LocalDateTime.now();
        // Créer une nouvelle transaction avec les valeurs passées
        Transaction transaction = new Transaction();   
        transaction.setDateTransaction(transactionDate);
        transaction.setCryptomonnaie(cryptomonnaieService.getCryptoById(cryptomonnaieId).get());
        transaction.setPrixUnitaire(prixUnitaire);
        transaction.setUtilisateur(user);
        
        String message;
        if (typeTransaction.equalsIgnoreCase("vente")) {
            transaction.setVente(totalPrix);
            message = "transaction enregistré avec un vente de " + totalPrix + " ariary.";
        } else if (typeTransaction.equalsIgnoreCase("achat")) {
            transaction.setAchat(totalPrix);
            message = "transaction enregistré avec un achat de " + totalPrix + " ariary.";
        } else {
            message = "Aucune opération enregistrée.";
        }
        
        transactionService.save(transaction);

        return ResponseEntity.ok().body(Map.of(
            "status", "success",
            "message", message,
            "mvtDetails", transaction
        ));
    }

}
