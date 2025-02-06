package com.cloud.crypto.utilisateur;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "photo_utilisateur") // Nom de la table dans la base de données
public class PhotoUtilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incrémentation de l'ID
    private Long id;

    @Column(name = "date_changement", nullable = false)
    private LocalDateTime dateChangement;

    @Column(name = "lien_photo", nullable = false, length = 255)
    private String lienPhoto;

    @ManyToOne
    @JoinColumn(name = "id_utilisateur", nullable = false)
    private Utilisateur utilisateur;

    // Constructeurs, getters et setters

    public PhotoUtilisateur() {
        // Constructeur par défaut requis par JPA
    }

    public PhotoUtilisateur(LocalDateTime dateChangement, String lienPhoto, Utilisateur utilisateur) {
        this.dateChangement = dateChangement;
        this.lienPhoto = lienPhoto;
        this.utilisateur = utilisateur;
    }

    // Getters et Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getDateChangement() {
        return dateChangement;
    }

    public void setDateChangement(LocalDateTime dateChangement) {
        this.dateChangement = dateChangement;
    }

    public String getLienPhoto() {
        return lienPhoto;
    }

    public void setLienPhoto(String lienPhoto) {
        this.lienPhoto = lienPhoto;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }
}