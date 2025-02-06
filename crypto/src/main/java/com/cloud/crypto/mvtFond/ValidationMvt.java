package com.cloud.crypto.mvtFond;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import com.cloud.crypto.utilisateur.Utilisateur;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({"chronology"})
@Table(name = "validation_mvt")
public class ValidationMvt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_validation", nullable = false)
    private LocalDateTime dateValidation;

    @ManyToOne
    @JoinColumn(name = "id_utilisateur", nullable = false)
    private Utilisateur utilisateur;

    @OneToOne
    @JoinColumn(name = "id_mvt_fond", nullable = false)
    private MvtFond mvtFond;

    // Constructeurs
    public ValidationMvt() {}

    public ValidationMvt(LocalDateTime dateValidation, Utilisateur utilisateur, MvtFond mvtFond) {
        this.dateValidation = dateValidation;
        this.utilisateur = utilisateur;
        this.mvtFond = mvtFond;
    }

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getDateValidation() {
        return dateValidation;
    }

    public void setDateValidation(LocalDateTime dateValidation) {
        this.dateValidation = dateValidation;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }

    public MvtFond getMvtFond() {
        return mvtFond;
    }

    public void setMvtFond(MvtFond mvtFond) {
        this.mvtFond = mvtFond;
    }
}
