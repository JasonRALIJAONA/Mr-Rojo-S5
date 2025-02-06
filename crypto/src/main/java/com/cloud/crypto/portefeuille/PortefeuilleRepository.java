package com.cloud.crypto.portefeuille;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PorteFeuilleRepository extends JpaRepository<PorteFeuille, PorteFeuilleId> {
    public List<PorteFeuille> findByIdUtilisateur(Long id);
}