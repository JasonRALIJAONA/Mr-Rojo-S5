package com.cloud.crypto.mvtFond;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @Autowired
    ValidationMvtService validationMvtService;

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
    public ResponseEntity<?> validerMvtFond(@RequestParam(required = true)Long idMvtFond,
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

        String message;

        MvtFond newMvt = mvtFondService.getMvtFond(idMvtFond);
        ValidationMvt validationMvt = new ValidationMvt(LocalDateTime.now(), user , newMvt);
        validationMvtService.save(validationMvt);

        message="validation effectue";

        return ResponseEntity.ok().body(Map.of(
            "status", "success",
            "message", message,
            "mvtDetails", newMvt
        ));
    }

    @GetMapping("/fond")
    public ResponseEntity<?> getFondActuel(@RequestHeader(value = "Authorization", required = false) String authHeader) throws Exception{
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Token manquant ou invalide.");
        }
    
        // Extraction du token après "Bearer "
        String token = authHeader.substring(7);
    
        // Appeler le service pour valider et récupérer l'utilisateur via le token
        Utilisateur user = utilisateurService.findByToken(token);


        BigDecimal fondActuel = mvtFondService.getFondActuel(user.getId());
        return ResponseEntity.ok().body(Map.of(
            "fondActuel", fondActuel));
    }
    
    @GetMapping("/mvt-fond/non-valide")
    public List<MvtFond> getMvtFondNonValides() {
        return mvtFondService.getMvtFondNonValides();
    }
}
