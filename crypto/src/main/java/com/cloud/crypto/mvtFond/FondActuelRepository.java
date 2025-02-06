package com.cloud.crypto.mvtFond;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FondActuelRepository extends JpaRepository<FondActuel, Long> {
    @Query("SELECT f FROM FondActuel f WHERE f.idUtilisateur = :idUtilisateur")
    FondActuel findFondActuelByUtilisateur(@Param("idUtilisateur") Long idUtilisateur);
}
