package com.cloud.crypto.cryptomonnaie;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "cryptomonnaie")
public class Cryptomonnaie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 50)
    private String nom;

    @Column(unique = true, nullable = false, length = 10)
    private String symbole;

    @Column(precision = 15, scale = 8)
    private BigDecimal prix = BigDecimal.ZERO;

    @Column(precision = 5, scale = 2)
    private BigDecimal variation = BigDecimal.ZERO;

    public Cryptomonnaie(Long id, String nom, String symbole, BigDecimal prix, BigDecimal variation) {
        this.id = id;
        this.nom = nom;
        this.symbole = symbole;
        this.prix = prix;
        this.variation = variation;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getSymbole() {
        return symbole;
    }

    public void setSymbole(String symbole) {
        this.symbole = symbole;
    }

    public BigDecimal getPrix() {
        return prix;
    }

    public void setPrix(BigDecimal prix) {
        this.prix = prix;
    }

    public BigDecimal getVariation() {
        return variation;
    }

    public void setVariation(BigDecimal variation) {
        this.variation = variation;
    }

    // Getters and setters
}

