package com.cloud.crypto.mvtFond;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.cloud.crypto.utilisateur.*;

import jakarta.servlet.http.HttpSession;

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
        HttpSession session) {

        Utilisateur user = (Utilisateur) session.getAttribute("utilisateurConnecte");

        if (user == null) {
            return ResponseEntity.status(401).body("Utilisateur non connecté.");
        }

        else{
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
    }

}
