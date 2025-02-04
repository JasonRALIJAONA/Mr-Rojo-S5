package com.cloud.crypto.utilisateur;

import java.security.SecureRandom;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UtilisateurService {
    @Autowired
    private UtilisateurRepository utilisateurRepository;

    public Optional<Utilisateur> getUtilisateurByEmail(String email) {
        // Utilisation de la méthode du repository
        return utilisateurRepository.findByEmail(email);
    }

    public Optional<Utilisateur> getUtilisateurById(Long id) {
        // Utilisation de la méthode du repository
        return utilisateurRepository.findById(id);
    }

    public String generateToken() {
        int length = 20;
        String allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        SecureRandom random = new SecureRandom();
        StringBuilder token = new StringBuilder(length);

        for (int i = 0; i < length; i++) {
            int index = random.nextInt(allowedChars.length());
            token.append(allowedChars.charAt(index));
        }

        return token.toString();
    }

    public Utilisateur findByToken (String token) throws Exception{
        // Utilisation de la méthode du repository
        Utilisateur utilisateur = utilisateurRepository.findByToken(token).orElse(null);
        if (utilisateur == null) {
            throw new Exception("Utilisateur non trouve : Token invalide");
        }

        if (utilisateur.getDateExpiration().isBefore(java.time.LocalDateTime.now())) {
            throw new Exception("Token expire : Veuillez vous reconnecter");
        }

        return utilisateur;
    }
}
