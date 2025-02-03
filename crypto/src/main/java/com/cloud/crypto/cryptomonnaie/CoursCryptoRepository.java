package com.cloud.crypto.cryptomonnaie;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CoursCryptoRepository extends JpaRepository<CoursCrypto, Long> {
    List<CoursCrypto> findTop10ByOrderByDateCoursDesc();
    List<CoursCrypto> findTop10ByCryptomonnaieIdOrderByDateCoursDesc(Long cryptomonnaieId);
}
