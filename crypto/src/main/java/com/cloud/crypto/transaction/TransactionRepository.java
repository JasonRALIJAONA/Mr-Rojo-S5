package com.cloud.crypto.transaction;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    // @Query("SELECT t FROM Transaction t WHERE " +
    //     "(:startDate IS NULL OR t.dateTransaction >= :startDate) AND " +
    //     "(:endDate IS NULL OR t.dateTransaction <= :endDate) AND " +
    //     "(:userId IS NULL OR t.utilisateur.id = :userId) AND " +
    //     "(:cryptoId IS NULL OR t.cryptomonnaie.id = :cryptoId)")
    // List<Transaction> findTransactions(
    //     @Param("startDate") LocalDateTime startDate, 
    //     @Param("endDate") LocalDateTime endDate, 
    //     @Param("userId") Long idUtilisateur, 
    //     @Param("cryptoId") Long idCryptomonnaie
    // );
}
