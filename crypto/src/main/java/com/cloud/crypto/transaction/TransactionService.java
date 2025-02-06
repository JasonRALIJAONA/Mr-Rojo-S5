package com.cloud.crypto.transaction;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
@Transactional
class TransactionService {

    @Autowired
    private TransactionRepository repository;

    public List<Transaction> findAll() {
        return repository.findAll();
    }

    public Optional<Transaction> findById(Long id) {
        return repository.findById(id);
    }

    public Transaction save(Transaction entity) {
        return repository.save(entity);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public List<Transaction> getHistorique(Long idUtilisateur, Long idCryptomonnaie, LocalDateTime dateStart, LocalDateTime dateEnd) {
        if (idUtilisateur == null && idCryptomonnaie == null && dateStart == null && dateEnd == null) {
            return repository.findAll();
        }
    
        if (idUtilisateur != null && idCryptomonnaie == null && dateStart == null && dateEnd == null) {
            return repository.findByUtilisateurId(idUtilisateur);
        }
    
        if (idCryptomonnaie != null && idUtilisateur == null && dateStart == null && dateEnd == null) {
            return repository.findByCryptomonnaieId(idCryptomonnaie);
        }
    
        if (idUtilisateur != null && idCryptomonnaie != null && dateStart == null && dateEnd == null) {
            return repository.findByUtilisateurIdAndCryptomonnaieId(idUtilisateur, idCryptomonnaie);
        }
    
        if (idUtilisateur == null && idCryptomonnaie == null) {
            return repository.findByDateTransactionBetween(dateStart, dateEnd);
        }
    
        if (idUtilisateur != null && dateStart != null && dateEnd != null) {
            return repository.findByUtilisateurIdAndDateTransactionBetween(idUtilisateur, dateStart, dateEnd);
        }
    
        if (idCryptomonnaie != null && dateStart != null && dateEnd != null) {
            return repository.findByCryptomonnaieIdAndDateTransactionBetween(idCryptomonnaie, dateStart, dateEnd);
        }
    
        return repository.findByUtilisateurIdAndCryptomonnaieIdAndDateTransactionBetween(idUtilisateur, idCryptomonnaie, dateStart, dateEnd);
    }
    
    
}
