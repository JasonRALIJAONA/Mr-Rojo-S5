package com.cloud.crypto.mvtFond;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MvtFondService {
    @Autowired
    private MvtFondRepository MvtFondRepository;

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
}