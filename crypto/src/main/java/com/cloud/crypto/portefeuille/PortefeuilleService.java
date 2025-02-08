package com.cloud.crypto.portefeuille;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
@Transactional
class PorteFeuilleService {

    @Autowired
    private PorteFeuilleRepository porteFeuilleRepository;

    public List<PorteFeuille> findAll() {
        return porteFeuilleRepository.findAll();
    }

    public List<PorteFeuille> findByIdUtilisateur(Long idUtilisateur) {
        return porteFeuilleRepository.findByIdUtilisateur(idUtilisateur);
    }
}
