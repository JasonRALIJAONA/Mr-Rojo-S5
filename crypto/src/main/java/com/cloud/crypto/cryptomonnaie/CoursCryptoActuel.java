package com.cloud.crypto.cryptomonnaie;

import jakarta.persistence.*;

@Entity
@Table(name = "v_cours_crypto_actuel")
public class CoursCryptoActuel {

    @Id
    private Long id_cryptomonnaie;

    private String nom_cryptomonnaie;
    private String symbole_cryptomonnaie;
    private double prix_actuel;

    // Getters et setters
    public Long getId_cryptomonnaie() {
        return id_cryptomonnaie;
    }

    public void setId_cryptomonnaie(Long id_cryptomonnaie) {
        this.id_cryptomonnaie = id_cryptomonnaie;
    }

    public String getNom_cryptomonnaie() {
        return nom_cryptomonnaie;
    }

    public void setNom_cryptomonnaie(String nom_cryptomonnaie) {
        this.nom_cryptomonnaie = nom_cryptomonnaie;
    }

    public String getSymbole_cryptomonnaie() {
        return symbole_cryptomonnaie;
    }

    public void setSymbole_cryptomonnaie(String symbole_cryptomonnaie) {
        this.symbole_cryptomonnaie = symbole_cryptomonnaie;
    }

    public double getPrix_actuel() {
        return prix_actuel;
    }

    public void setPrix_actuel(double prix_actuel) {
        this.prix_actuel = prix_actuel;
    }
}

