package com.cloud.crypto.cryptomonnaie;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "cours_crypto")
public class CoursCrypto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_cours", nullable = false)
    private LocalDateTime dateCours;

    @Column(nullable = false)
    private Integer montant;

    @ManyToOne
    @JoinColumn(name = "id_cryptomonnaie", nullable = false)
    private Cryptomonnaie cryptomonnaie;

    public CoursCrypto() {
    }

    public CoursCrypto(LocalDateTime dateCours, Integer montant, Cryptomonnaie cryptomonnaie) {
        this.dateCours = dateCours;
        this.montant = montant;
        this.cryptomonnaie = cryptomonnaie;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getDateCours() {
        return dateCours;
    }

    public void setDateCours(LocalDateTime dateCours) {
        this.dateCours = dateCours;
    }

    public Integer getMontant() {
        return montant;
    }

    public void setMontant(Integer montant) {
        this.montant = montant;
    }

    public Cryptomonnaie getCryptomonnaie() {
        return cryptomonnaie;
    }

    public void setCryptomonnaie(Cryptomonnaie cryptomonnaie) {
        this.cryptomonnaie = cryptomonnaie;
    }
}
