package com.cloud.crypto.transaction;

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
}
