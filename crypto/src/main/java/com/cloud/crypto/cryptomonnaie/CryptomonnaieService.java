package com.cloud.crypto.cryptomonnaie;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class CryptomonnaieService {

    @Autowired
    private CryptomonnaieRepository repository;

    @Autowired
    private CoursCryptoRepository coursCryptoRepository;

    @Autowired
    CoursCryptoActuelRepository coursCryptoActuelRepository;

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

    public CoursCrypto genererCours(Long idCrypto) {
        Optional<Cryptomonnaie> crypto = repository.findById(idCrypto);

        if (crypto.isEmpty()) {
            throw new RuntimeException("Cryptomonnaie introuvable");
        }

        Random random = new Random();
        int montant = random.nextInt(100_000); // Valeur aléatoire de 0 à 100000

        CoursCrypto cours = new CoursCrypto();
        cours.setDateCours(LocalDateTime.now());
        cours.setMontant(montant);
        cours.setCryptomonnaie(crypto.get());

        return coursCryptoRepository.save(cours);
    }

    public List<CoursCrypto> getAllCours() {
        return coursCryptoRepository.findAll();
    }

    public List<CoursCrypto> getLast50Cours() {
        return coursCryptoRepository.findTop10ByOrderByDateCoursDesc();
    }

    public List<CoursCrypto> getLast10ByIdCryptomonnaie(Long idCrypto) {
        return coursCryptoRepository.findTop10ByCryptomonnaieIdOrderByDateCoursDesc(idCrypto);
    }

    public List<CoursCryptoActuel> getAllCoursCryptoActuel() {
        return coursCryptoActuelRepository.findAll();
    }
}
