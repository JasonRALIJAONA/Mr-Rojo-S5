package com.cloud.crypto.utilisateur;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/crypto/api/utilisateurs")
public class UtilisateurController {
    @Autowired
    private UtilisateurService utilisateurService;
    
    @GetMapping("/test")
    public ResponseEntity<String> test(){
        return ResponseEntity.ok("Mandeha ilay izy");
    }
    
     @GetMapping("/")
    public ResponseEntity<?> getUtilisateurByEmail(@RequestParam(name = "email") String email) {
        Optional<Utilisateur> utilisateur = utilisateurService.getUtilisateurByEmail(email);
        if (utilisateur.isPresent()) {
            return ResponseEntity.ok(utilisateur.get());
        } else {
            return ResponseEntity.status(404).body("Utilisateur non trouvé");
        }
    }
}
