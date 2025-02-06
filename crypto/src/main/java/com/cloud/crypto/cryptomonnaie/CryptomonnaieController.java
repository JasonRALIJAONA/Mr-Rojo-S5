package com.cloud.crypto.cryptomonnaie;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cryptos")
public class CryptomonnaieController {

    @Autowired
    private CryptomonnaieService service;

    @GetMapping
    public List<Cryptomonnaie> getAllCryptos() {
        return service.getAllCryptos();
    }

    @GetMapping("/{id}")
    public Optional<Cryptomonnaie> getCryptoById(@PathVariable Long id) {
        return service.getCryptoById(id);
    }

    @PostMapping
    public Cryptomonnaie addCrypto(@RequestBody Cryptomonnaie cryptomonnaie) {
        return service.saveCrypto(cryptomonnaie);
    }

    @PutMapping("/{id}")
    public Cryptomonnaie updateCrypto(@PathVariable Long id, @RequestBody Cryptomonnaie cryptomonnaie) {
        return service.updateCrypto(id, cryptomonnaie);
    }

    @DeleteMapping("/{id}")
    public String deleteCrypto(@PathVariable Long id) {
        service.deleteCrypto(id);
        return "Cryptomonnaie supprimée avec succès.";
    }

    @PostMapping("/generate/{idCrypto}")
    public CoursCrypto genererCours(@PathVariable Long idCrypto) {
        return service.genererCours(idCrypto);
    }

    @GetMapping("/cours")
    public List<CoursCrypto> getAllCours() {
        return service.getAllCours();
    }

    @GetMapping("/cours/last50")
    public List<CoursCrypto> getLast50Cours() {
        return service.getLast50Cours();
    }

    @GetMapping("/cours/last50/{idCrypto}")
    public List<CoursCrypto> getLast50ByIdCryptomonnaie(@PathVariable Long idCrypto) {
        return service.getLast10ByIdCryptomonnaie(idCrypto);
    }
}
