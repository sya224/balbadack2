package com.a305.balbadack.model.service;

import java.util.List;

import com.a305.balbadack.model.dto.Report;

public interface ReportService {
    
    public void insert(Report report);

    public List<Report> findByU_id(String u_id);

    public List<Report> findAll();
    
    public List<Report> findByR_code(int r_code);

    public void delete(Report report);

    public void delete(int re_code);

}