package com.cloud.crypto.utilisateur;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/crypto/api")
public class UtilisateurController {
    
    @GetMapping("/test")
    public ResponseEntity<String> test(){
        return ResponseEntity.ok("Mandeha ilay izy");
    }
}
