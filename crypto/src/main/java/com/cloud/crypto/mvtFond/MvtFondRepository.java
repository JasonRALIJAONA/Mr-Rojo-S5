package com.cloud.crypto.mvtFond;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MvtFondRepository extends JpaRepository<MvtFond, Long> {
    @Query("SELECT m FROM MvtFond m WHERE m.id NOT IN (SELECT vm.mvtFond.id FROM ValidationMvt vm)")
    List<MvtFond> findMvtFondNonValides();
}