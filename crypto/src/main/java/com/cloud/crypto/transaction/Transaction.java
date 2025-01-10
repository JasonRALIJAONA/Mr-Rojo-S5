package com.cloud.crypto.transaction;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.cloud.crypto.cryptomonnaie.Cryptomonnaie;
import com.cloud.crypto.utilisateur.Utilisateur;


@Entity
@Table(name = "transaction")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "vendeur_id", nullable = false)
    private Utilisateur vendeur;

    @ManyToOne
    @JoinColumn(name = "acheteur_id", nullable = false)
    private Utilisateur acheteur;

    @ManyToOne
    @JoinColumn(name = "cryptomonnaie_id", nullable = false)
    private Cryptomonnaie cryptomonnaie;

    @Column(nullable = false)
    private BigDecimal montant = BigDecimal.ZERO;

    @Column(name = "est_valide", nullable = false)
    private Boolean estValide = false;

    @Column(name = "date_transaction", updatable = false)
    private LocalDateTime dateTransaction = LocalDateTime.now();

    public Transaction() {
    }

    public Transaction(Long id, Utilisateur vendeur, Utilisateur acheteur, Cryptomonnaie cryptomonnaie,
            BigDecimal montant, Boolean estValide, LocalDateTime dateTransaction) {
        this.id = id;
        this.vendeur = vendeur;
        this.acheteur = acheteur;
        this.cryptomonnaie = cryptomonnaie;
        this.montant = montant;
        this.estValide = estValide;
        this.dateTransaction = dateTransaction;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Utilisateur getVendeur() {
        return vendeur;
    }

    public void setVendeur(Utilisateur vendeur) {
        this.vendeur = vendeur;
    }

    public Utilisateur getAcheteur() {
        return acheteur;
    }

    public void setAcheteur(Utilisateur acheteur) {
        this.acheteur = acheteur;
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

    public Boolean getEstValide() {
        return estValide;
    }

    public void setEstValide(Boolean estValide) {
        this.estValide = estValide;
    }

    public LocalDateTime getDateTransaction() {
        return dateTransaction;
    }

    public void setDateTransaction(LocalDateTime dateTransaction) {
        this.dateTransaction = dateTransaction;
    }

}


