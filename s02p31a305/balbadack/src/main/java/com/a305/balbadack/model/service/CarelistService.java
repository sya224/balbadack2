package com.a305.balbadack.model.service;

import java.util.List;

import com.a305.balbadack.model.dto.Carelist;

public interface CarelistService {
    
    // 진료 목록 불러오기
    public List<Carelist> findAll();
    
}