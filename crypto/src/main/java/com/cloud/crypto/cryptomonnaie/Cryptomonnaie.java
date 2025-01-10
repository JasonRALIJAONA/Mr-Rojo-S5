package com.cloud.crypto.cryptomonnaie;

import jakarta.persistence.*;

@Entity
@Table(name = "cryptomonnaie")
public class Cryptomonnaie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String nom;

    @Column(unique = true, nullable = false)
    private String symbole;

    public Cryptomonnaie() {
    }

    public Cryptomonnaie(Long id, String nom, String symbole) {
        this.id = id;
        this.nom = nom;
        this.symbole = symbole;
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

    // Getters and Setters
}


