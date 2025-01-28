package com.cloud.crypto.mvtFond;

import jakarta.persistence.*;
import java.time.LocalDate;

import com.cloud.crypto.utilisateur.Utilisateur;

@Entity
@Table(name = "validation_mvt")
public class ValidationMvt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_validation", nullable = false)
    private LocalDate dateValidation;

    @ManyToOne
    @JoinColumn(name = "id_utilisateur", nullable = false)
    private Utilisateur utilisateur;

    @OneToOne
    @JoinColumn(name = "id_mvt_fond", nullable = false)
    private MvtFond mvtFond;

    // Constructeurs
    public ValidationMvt() {}

    public ValidationMvt(LocalDate dateValidation, Utilisateur utilisateur, MvtFond mvtFond) {
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

    public LocalDate getDateValidation() {
        return dateValidation;
    }

    public void setDateValidation(LocalDate dateValidation) {
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
