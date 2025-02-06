package com.cloud.crypto.portefeuille;

import java.io.Serializable;
import java.util.Objects;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
@AllArgsConstructor
@NoArgsConstructor
public class PorteFeuilleId implements Serializable {
    private Long idUtilisateur;
    private Long idCryptomonnaie;

    public Long getIdUtilisateur() {
        return idUtilisateur;
    }

    public void setIdUtilisateur(Long idUtilisateur) {
        this.idUtilisateur = idUtilisateur;
    }

    public Long getIdCryptomonnaie() {
        return idCryptomonnaie;
    }

    public void setIdCryptomonnaie(Long idCryptomonnaie) {
        this.idCryptomonnaie = idCryptomonnaie;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PorteFeuilleId that = (PorteFeuilleId) o;
        return Objects.equals(idUtilisateur, that.idUtilisateur) &&
               Objects.equals(idCryptomonnaie, that.idCryptomonnaie);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idUtilisateur, idCryptomonnaie);
    }
}
