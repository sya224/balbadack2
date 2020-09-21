package com.a305.balbadack.repository;

import com.a305.balbadack.model.dto.HospitalCarelist;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HospitalCarelistRepository extends JpaRepository<HospitalCarelist, Integer> {
    
    HospitalCarelist findByhCodeAndHcName(int h_code, String hc_name);
    
}