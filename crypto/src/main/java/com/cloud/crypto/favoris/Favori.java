package com.cloud.crypto.favoris;

import java.time.LocalDateTime;

import com.cloud.crypto.cryptomonnaie.Cryptomonnaie;
import com.cloud.crypto.utilisateur.Utilisateur;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "favori")
public class Favori{
    @Id
    private Long id;

    @Column(name="date_ajout")
    private LocalDateTime dateAjout;

    @ManyToOne
    @JoinColumn(name = "id_cryptomonnaie", nullable = false)
    private Cryptomonnaie cryptomonnaie;

    @ManyToOne
    @JoinColumn(name = "id_utilisateur", nullable = false)
    private Utilisateur utilisateur;

}
