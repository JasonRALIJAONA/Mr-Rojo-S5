package com.cloud.crypto.favoris;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FavoriService {
    @Autowired
    private FavoriRepository favoriRepository;

    public Favori save(Favori favori) {
        return favoriRepository.save(favori);
    } 
    public void delete(Long id) {
        favoriRepository.deleteById(id);
    }
}
