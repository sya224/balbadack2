package com.a305.balbadack.repository;

import com.a305.balbadack.model.dto.Carelist;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarelistRepository extends JpaRepository<Carelist, Integer> {
    
}