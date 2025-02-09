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

    private BigDecimal achat;

    private BigDecimal vente;

    @Column(name = "prix_unitaire", nullable = false)
    private BigDecimal prixUnitaire;

    @Column(nullable = false)
    private Integer quantite;

    @Column(name = "date_transaction")
    private LocalDateTime dateTransaction;

    @ManyToOne
    @JoinColumn(name = "id_cryptomonnaie", nullable = false)
    private Cryptomonnaie cryptomonnaie;

    @ManyToOne
    @JoinColumn(name = "id_utilisateur", nullable = false)
    private Utilisateur utilisateur;

    public Transaction(BigDecimal achat, BigDecimal vente, BigDecimal prixUnitaire,
            Integer quantite, LocalDateTime dateTransaction, Cryptomonnaie cryptomonnaie, Utilisateur utilisateur) {
        this.achat = achat;
        this.vente = vente;
        this.prixUnitaire = prixUnitaire;
        this.quantite = quantite;
        this.dateTransaction = dateTransaction;
        this.cryptomonnaie = cryptomonnaie;
        this.utilisateur = utilisateur;
    }

    public Transaction() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getAchat() {
        return achat;
    }

    public void setAchat(BigDecimal achat) {
        this.achat = achat;
    }

    public BigDecimal getVente() {
        return vente;
    }

    public void setVente(BigDecimal vente) {
        this.vente = vente;
    }

    public BigDecimal getPrixUnitaire() {
        return prixUnitaire;
    }

    public void setPrixUnitaire(BigDecimal prixUnitaire) {
        this.prixUnitaire = prixUnitaire;
    }

    public Integer getQuantite() {
        return quantite;
    }

    public void setQuantite(Integer quantite) {
        this.quantite = quantite;
    }

    public LocalDateTime getDateTransaction() {
        return dateTransaction;
    }

    public void setDateTransaction(LocalDateTime dateTransaction) {
        this.dateTransaction = dateTransaction;
    }

    public Cryptomonnaie getCryptomonnaie() {
        return cryptomonnaie;
    }

    public void setCryptomonnaie(Cryptomonnaie cryptomonnaie) {
        this.cryptomonnaie = cryptomonnaie;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }

}


