package com.a305.balbadack.repository;

import java.util.List;

import com.a305.balbadack.model.dto.Report;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {

    List<Report> findAll();

    List<Report> findByUser(String u_id);

    List<Report> findByReview(int r_code);

    @Modifying
    @Query(value = "update repost re set re.deleted = 1 where re.re_code=:re_code", nativeQuery = true)
    void reportDelete(@Param("re_code") int re_code);
    
}