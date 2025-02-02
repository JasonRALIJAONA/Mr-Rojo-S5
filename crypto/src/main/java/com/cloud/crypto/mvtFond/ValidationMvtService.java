package com.cloud.crypto.mvtFond;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
@Transactional
class ValidationMvtService {

    @Autowired
    private ValidationMvtRepository repository;

    public List<ValidationMvt> findAll() {
        return repository.findAll();
    }

    public Optional<ValidationMvt> findById(Long id) {
        return repository.findById(id);
    }

    public ValidationMvt save(ValidationMvt entity) {
        return repository.save(entity);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}