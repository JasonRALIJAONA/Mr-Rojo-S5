package com.cloud.crypto.mvtFond;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cloud.crypto.utilisateur.*;

@RestController
@RequestMapping("/api/MvtFond")
public class MvtFondController {
    @Autowired
    private MvtFondService mvtFondService;

    @Autowired
    private UtilisateurService utilisateurService;

   @GetMapping("/insertMvt")
public ResponseEntity<?> insertMvt(
    @RequestParam(required = false) BigDecimal depot,
    @RequestParam(required = false) BigDecimal retrait,
    @RequestHeader(value = "Authorization", required = false) String authHeader) throws Exception {

    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        return ResponseEntity.status(401).body("Token manquant ou invalide.");
    }

    // Extraction du token après "Bearer "
    String token = authHeader.substring(7);

    // Appeler le service pour valider et récupérer l'utilisateur via le token
    Utilisateur user = utilisateurService.findByToken(token);
    
    if (user == null) {
        return ResponseEntity.status(401).body("Utilisateur non trouvé.");
    }

    LocalDateTime mvtDate = LocalDateTime.now();
    MvtFond newMvt = new MvtFond();
    newMvt.setDateMvt(mvtDate);
    newMvt.setUtilisateur(user);

    String message;
    if (depot != null) {
        newMvt.setDepot(depot);
        message = "Mouvement enregistré avec un dépôt de " + depot + " unités.";
    } else if (retrait != null) {
        newMvt.setRetrait(retrait);
        message = "Mouvement enregistré avec un retrait de " + retrait + " unités.";
    } else {
        message = "Aucune opération enregistrée.";
    }

    mvtFondService.createMvtFond(newMvt);

    return ResponseEntity.ok().body(Map.of(
        "status", "success",
        "message", message,
        "mvtDetails", newMvt
    ));
}


    @GetMapping("/validerMvtFond")
    public ResponseEntity<?> validerMvtFond(@RequestParam(required = true)Long idMvtFond) {
        
        return ResponseEntity.ok().body(null);
    }
    

}
