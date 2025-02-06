package com.cloud.crypto.transaction;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUtilisateurId(Long idUtilisateur);

    List<Transaction> findByCryptomonnaieId(Long idCryptomonnaie);

    List<Transaction> findByDateTransactionBetween(LocalDateTime startDate, LocalDateTime endDate);

    List<Transaction> findByUtilisateurIdAndCryptomonnaieId(Long idUtilisateur, Long idCryptomonnaie);

    List<Transaction> findByUtilisateurIdAndDateTransactionBetween(Long idUtilisateur, LocalDateTime startDate, LocalDateTime endDate);

    List<Transaction> findByCryptomonnaieIdAndDateTransactionBetween(Long idCryptomonnaie, LocalDateTime startDate, LocalDateTime endDate);

    List<Transaction> findByUtilisateurIdAndCryptomonnaieIdAndDateTransactionBetween(Long idUtilisateur, Long idCryptomonnaie, LocalDateTime startDate, LocalDateTime endDate);

}



