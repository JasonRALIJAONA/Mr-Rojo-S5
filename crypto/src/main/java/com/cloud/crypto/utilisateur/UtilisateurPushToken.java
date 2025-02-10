package com.cloud.crypto.utilisateur;

import java.io.Serializable;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "utilisateur_push_token")
public class UtilisateurPushToken implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "expo_token", nullable = false, length = 255)
    private String expoToken;

    @ManyToOne
    @JoinColumn(name = "id_utilisateur", nullable = false)
    private Utilisateur utilisateur;

    // Constructeurs
    public UtilisateurPushToken() {
    }

    public UtilisateurPushToken(String expoToken, Utilisateur utilisateur) {
        this.expoToken = expoToken;
        this.utilisateur = utilisateur;
    }

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getExpoToken() {
        return expoToken;
    }

    public void setExpoToken(String expoToken) {
        this.expoToken = expoToken;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }

    // Méthode toString
    @Override
    public String toString() {
        return "UtilisateurPushToken{" +
                "id=" + id +
                ", expoToken='" + expoToken + '\'' +
                ", utilisateur=" + utilisateur +
                '}';
    }
}