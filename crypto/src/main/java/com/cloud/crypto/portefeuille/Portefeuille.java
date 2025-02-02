package com.cloud.crypto.portefeuille;

import jakarta.persistence.*;

import com.cloud.crypto.cryptomonnaie.Cryptomonnaie;
import com.cloud.crypto.utilisateur.Utilisateur;

@Entity
@Table(name = "portefeuille")
public class Portefeuille {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer montant;

    @ManyToOne
    @JoinColumn(name = "id_cryptomonnaie", nullable = false)
    private Cryptomonnaie cryptomonnaie;

    @ManyToOne
    @JoinColumn(name = "id_utilisateur", nullable = false)
    private Utilisateur utilisateur;

    public Portefeuille() {
    }

    public Portefeuille(Long id, Utilisateur utilisateur, Cryptomonnaie cryptomonnaie, Integer montant) {
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

    public Integer getMontant() {
        return montant;
    }

    public void setMontant(Integer montant) {
        this.montant = montant;
    }

    // Getters and Setters
}


