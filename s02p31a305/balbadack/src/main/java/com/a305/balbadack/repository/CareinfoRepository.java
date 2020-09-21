package com.a305.balbadack.repository;

import java.util.List;

import com.a305.balbadack.model.dto.Careinfo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface CareinfoRepository extends JpaRepository<Careinfo, Integer> {
    
    List<Careinfo> findByReview_rCode(int r_code);

    // 병원 검색 하기 
    @Query(value="select h_code from careinfo as c where c.ci_name like concat('%', :keyword, '%')",nativeQuery = true)
    List<Integer> findByName(@Param("keyword") String keyword);

    @Query(value = "select c.r_code from careinfo c where c.a_code = :aCode", nativeQuery = true)
    List<Integer> findrCodeByaCode(int aCode);

    List<Careinfo> findByCiNameContaining(String ciName);

}