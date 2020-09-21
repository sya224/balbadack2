package com.a305.balbadack.model.service;

import java.util.List;

import com.a305.balbadack.model.dto.Good;

public interface GoodService {
    
    public void insert(Good good);

    public List<Good> findByU_id(String u_id);
    
    public List<Good> findByR_code(int r_code);
    // public List<Good> findByR_code(Review review);

    public void delete(Good good);

}