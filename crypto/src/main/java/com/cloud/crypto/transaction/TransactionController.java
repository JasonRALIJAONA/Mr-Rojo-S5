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
    public ResponseEntity<?> saveTransaction(@RequestParam(required = false) BigDecimal achat,
                                       @RequestParam(required = false) BigDecimal vente,
                                       @RequestParam(required = false) BigDecimal prixUnitaire,
                                       @RequestParam(required = false) Integer quantite,
                                       @RequestParam(required = false) Long cryptomonnaieId,
                                       @RequestHeader(value = "Authorization", required = false) String authHeader) throws Exception {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Token manquant ou invalide.");
        }

        // Extraction du token après "Bearer "
        String token = authHeader.substring(7);

        // Appeler le service pour valider et récupérer l'utilisateur via le token
        Utilisateur user = utilisateurService.findByToken(token);

        System.out.println("tokennn: " + token);
        System.out.println("hiiiiii----" + cryptomonnaieId);

        LocalDateTime transactionDate = LocalDateTime.now();
        // Créer une nouvelle transaction avec les valeurs passées
        Transaction transaction = new Transaction();   
        transaction.setDateTransaction(transactionDate);
        transaction.setCryptomonnaie(cryptomonnaieService.getCryptoById(cryptomonnaieId).get());
        transaction.setPrixUnitaire(prixUnitaire);
        transaction.setUtilisateur(user);
        
        String message;
        if (vente != null) {
            transaction.setVente(vente);
            message = "transaction enregistré avec un vente de " + vente + " ariary.";
        } else if (achat != null) {
            transaction.setAchat(achat);
            message = "transaction enregistré avec un achat de " + achat + " ariary.";
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
