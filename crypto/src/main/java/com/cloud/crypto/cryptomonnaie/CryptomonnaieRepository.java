package com.cloud.crypto.cryptomonnaie;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CryptomonnaieRepository extends JpaRepository<Cryptomonnaie, Long> {
}
