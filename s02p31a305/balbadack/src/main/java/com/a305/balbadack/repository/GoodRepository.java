package com.a305.balbadack.repository;

import java.util.List;

import com.a305.balbadack.model.dto.Good;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GoodRepository extends JpaRepository<Good, Integer> {
    
    List<Good> findAllByUser_uId(String u_id);

    List<Good> findAllByReview_rCode(int r_code);
    
}