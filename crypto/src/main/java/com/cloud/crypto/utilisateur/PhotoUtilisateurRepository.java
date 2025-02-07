package com.cloud.crypto.utilisateur;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PhotoUtilisateurRepository extends JpaRepository<PhotoUtilisateur, Long> {
    // Méthode pour récupérer les photos d'un utilisateur spécifique
    @Query("SELECT p FROM PhotoUtilisateur p WHERE p.utilisateur.id = :userId ORDER BY p.dateChangement DESC")
    List<PhotoUtilisateur> findPhotosByUtilisateur(@Param("userId") Long userId);
}
