package com.cloud.crypto.mvtFond;

import java.math.BigDecimal;

import jakarta.persistence.*;

@Entity
@Table(name = "v_fond_actuel")
public class FondActuel {
    @Id
    private Long idUtilisateur;
    
    private BigDecimal fondActuel;

    // Getters and setters
    public Long getIdUtilisateur() {
        return idUtilisateur;
    }

    public void setIdUtilisateur(Long idUtilisateur) {
        this.idUtilisateur = idUtilisateur;
    }

    public BigDecimal getFondActuel() {
        return fondActuel;
    }

    public void setFondActuel(BigDecimal fondActuel) {
        this.fondActuel = fondActuel;
    }
}
