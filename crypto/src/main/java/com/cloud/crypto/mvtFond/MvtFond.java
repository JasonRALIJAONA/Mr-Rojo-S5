package com.cloud.crypto.mvtFond;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.cloud.crypto.utilisateur.Utilisateur;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({"chronology"})
@Table(name = "mvt_fond")
public class MvtFond {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_utilisateur", nullable = false)
    private Utilisateur utilisateur;

    @Column(nullable = false)
    private BigDecimal depot = BigDecimal.ZERO;

    @Column(nullable = false)
    private BigDecimal retrait = BigDecimal.ZERO;

    @Column(name = "date_mvt", updatable = false)
    private LocalDateTime dateMvt;

    public MvtFond() {
    }

    public MvtFond(Long id, Utilisateur utilisateur, BigDecimal depot, BigDecimal retrait, LocalDateTime dateMvt) {
        this.id = id;
        this.utilisateur = utilisateur;
        this.depot = depot;
        this.retrait = retrait;
        this.dateMvt = dateMvt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }

    public BigDecimal getDepot() {
        return depot;
    }

    public void setDepot(BigDecimal depot) {
        this.depot = depot;
    }

    public BigDecimal getRetrait() {
        return retrait;
    }

    public void setRetrait(BigDecimal retrait) {
        this.retrait = retrait;
    }

    public LocalDateTime getDateMvt() {
        return dateMvt;
    }

    public void setDateMvt(LocalDateTime dateMvt) {
        this.dateMvt = dateMvt;
    }
}

