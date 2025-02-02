package com.cloud.crypto.portefeuille;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
@Transactional
class PortefeuilleService {

    @Autowired
    private PortefeuilleRepository repository;

    public List<Portefeuille> findAll() {
        return repository.findAll();
    }

    public Optional<Portefeuille> findById(Long id) {
        return repository.findById(id);
    }

    public Portefeuille save(Portefeuille entity) {
        return repository.save(entity);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
