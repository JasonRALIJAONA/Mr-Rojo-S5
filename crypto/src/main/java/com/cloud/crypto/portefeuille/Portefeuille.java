package com.cloud.crypto.portefeuille;

import jakarta.persistence.*;
import java.math.BigDecimal;

import com.cloud.crypto.cryptomonnaie.Cryptomonnaie;
import com.cloud.crypto.utilisateur.Utilisateur;

@Entity
@Table(name = "portefeuille")
public class Portefeuille {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "utilisateur_id", nullable = false)
    private Utilisateur utilisateur;

    @ManyToOne
    @JoinColumn(name = "cryptomonnaie_id", nullable = false)
    private Cryptomonnaie cryptomonnaie;

    @Column(nullable = false)
    private BigDecimal montant = BigDecimal.ZERO;

    public Portefeuille() {
    }

    public Portefeuille(Long id, Utilisateur utilisateur, Cryptomonnaie cryptomonnaie, BigDecimal montant) {
        this.id = id;
        this.utilisateur = utilisateur;
        this.cryptomonnaie = cryptomonnaie;
        this.montant = montant;
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

    public Cryptomonnaie getCryptomonnaie() {
        return cryptomonnaie;
    }

    public void setCryptomonnaie(Cryptomonnaie cryptomonnaie) {
        this.cryptomonnaie = cryptomonnaie;
    }

    public BigDecimal getMontant() {
        return montant;
    }

    public void setMontant(BigDecimal montant) {
        this.montant = montant;
    }

    // Getters and Setters
}


