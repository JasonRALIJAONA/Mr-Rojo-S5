package com.cloud.crypto.utilisateur;

import java.security.SecureRandom;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UtilisateurService {
    @Autowired
    private UtilisateurRepository utilisateurRepository;

    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }  

    public Map<String, Object> getUtilisateurByEmail(String email) {
        Optional<Utilisateur> utilisateurOpt = utilisateurRepository.findByEmail(email);

        Map<String, Object> response = new HashMap<>();

        if (utilisateurOpt.isPresent()) {
            // Générer le token
            String token = generateToken();
        
            // Mettre à jour le token dans l'utilisateur et définir une date d'expiration
            Utilisateur utilisateur = utilisateurOpt.get();
            utilisateur.setToken(token);
            utilisateur.setDateExpiration(java.time.LocalDateTime.now().plusHours(1)); // Expire après 1 heure
            utilisateurRepository.save(utilisateur);
        
            // Ajouter le token et le rôle dans la réponse
            response.put("token", token);
            response.put("role", utilisateur.getRole().getRole());  // Assurez-vous que `getRole()` renvoie bien le rôle de l'utilisateur
        
            return response;
        }

        // Si l'utilisateur n'est pas trouvé, retourner une réponse vide ou avec un message d'erreur
        response.put("message", "Utilisateur non trouvé");
        return response;
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
