package com.cloud.crypto.portefeuille;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "v_porte_feuille")
@AllArgsConstructor
@NoArgsConstructor
public class PorteFeuille {

    @Id
    @Column(name = "id_utilisateur")
    private Long idUtilisateur;

    @Id
    @Column(name = "id_cryptomonnaie")
    private Long idCryptomonnaie;

    @Column(name = "nom_cryptomonnaie")
    private String nomCryptomonnaie;

    @Column(name = "symbole_cryptomonnaie")
    private String symboleCryptomonnaie;

    @Column(name = "quantite_totale")
    private BigDecimal quantiteTotale;


}



