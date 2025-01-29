package com.cloud.crypto.cryptomonnaie;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CryptomonnaieService {

    @Autowired
    private CryptomonnaieRepository repository;

    public List<Cryptomonnaie> getAllCryptos() {
        return repository.findAll();
    }

    public Optional<Cryptomonnaie> getCryptoById(Long id) {
        return repository.findById(id);
    }

    public Cryptomonnaie saveCrypto(Cryptomonnaie cryptomonnaie) {
        return repository.save(cryptomonnaie);
    }

    public Cryptomonnaie updateCrypto(Long id, Cryptomonnaie updatedCrypto) {
        return repository.findById(id)
                .map(crypto -> {
                    crypto.setNom(updatedCrypto.getNom());
                    crypto.setSymbole(updatedCrypto.getSymbole());
                    return repository.save(crypto);
                })
                .orElseThrow(() -> new RuntimeException("Cryptomonnaie non trouvée pour l'ID : " + id));
    }

    public void deleteCrypto(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("Cryptomonnaie introuvable pour l'ID : " + id);
        }
    }
}
