package com.cloud.crypto.utilisateur;

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
}
