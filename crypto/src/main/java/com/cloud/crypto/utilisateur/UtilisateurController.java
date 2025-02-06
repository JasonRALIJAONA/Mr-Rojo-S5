package com.cloud.crypto.utilisateur;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/utilisateurs")
public class UtilisateurController {
    @Autowired
    private UtilisateurService utilisateurService;
    
    @GetMapping("/all")
    public ResponseEntity<List<Utilisateur>> getAllUtilisateurs() {
        List<Utilisateur> utilisateurs = utilisateurService.getAllUtilisateurs();
        return ResponseEntity.ok(utilisateurs);
    }
    
    @GetMapping
    public ResponseEntity<?> getUtilisateurByEmail(@RequestParam(name = "email") String email) {
        String token = utilisateurService.getUtilisateurByEmail(email);
    
        if (token!=null) {
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(404).body("Utilisateur non trouvé");
        }
    }    

}
