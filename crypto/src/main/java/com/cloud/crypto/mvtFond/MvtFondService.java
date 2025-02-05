package com.cloud.crypto.mvtFond;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class MvtFondService {
    @Autowired
    private MvtFondRepository MvtFondRepository;

    @Autowired
    private FondActuelRepository fondActuelRepository;

    public List<MvtFond> getAllMvtFonds() {
        return MvtFondRepository.findAll();
    }

    public MvtFond getMvtFond(Long id) {
        return MvtFondRepository.findById(id).orElse(null);
    }

    public MvtFond createMvtFond(MvtFond MvtFond) {
        return MvtFondRepository.save(MvtFond);
    }

    public void deleteMvtFond(Long id) {
        MvtFondRepository.deleteById(id);
    }

    public BigDecimal getFondActuel(Long idUtilisateur) {
        FondActuel fondActuel = fondActuelRepository.findFondActuelByUtilisateur(idUtilisateur);
        return fondActuel != null ? fondActuel.getFondActuel() : BigDecimal.ZERO;
    }

    public List<MvtFond> getMvtFondNonValides() {
        return MvtFondRepository.findMvtFondNonValides();
    }
}