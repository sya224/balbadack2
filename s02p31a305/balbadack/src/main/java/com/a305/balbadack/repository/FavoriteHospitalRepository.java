package com.a305.balbadack.repository;

import com.a305.balbadack.model.dto.FavoriteHospital;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteHospitalRepository extends JpaRepository<FavoriteHospital, Integer> {
    
    @Query(value = "select fh.h_code from favorite_hospital fh where fh.u_id = :uid", nativeQuery = true)
    List<Integer> findByUid(@Param("uid") String id);

}