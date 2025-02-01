package com.cloud.crypto.utilisateur;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/utilisateurs")
public class UtilisateurController {
    @Autowired
    private UtilisateurService utilisateurService;
    
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Mandeha ilay izy");
    }
    
    @GetMapping
    public ResponseEntity<?> getUtilisateurByEmail(@RequestParam(name = "email") String email, HttpSession session) {
        Optional<Utilisateur> utilisateur = utilisateurService.getUtilisateurByEmail(email);
    
        if (utilisateur.isPresent()) {
            // Ajouter l'utilisateur dans la session
            session.setAttribute("utilisateurConnecte", utilisateur.get());
            
            // Vérification si l'utilisateur est dans la session
            Utilisateur userInSession = (Utilisateur) session.getAttribute("utilisateurConnecte");
            if (userInSession != null) {
                System.out.println("Utilisateur ajouté à la session : " + userInSession.getNomUtilisateur());
            } else {
                System.out.println("Erreur : Utilisateur non ajouté à la session");
            }
    
            // Retourner l'utilisateur
            return ResponseEntity.ok(utilisateur.get());
        } else {
            return ResponseEntity.status(404).body("Utilisateur non trouvé");
        }
    }    

}
