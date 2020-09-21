package com.a305.balbadack.model.service;

import com.a305.balbadack.model.dto.HospitalCarelist;


public interface HospitalCarelistService {

    void insert(HospitalCarelist hospitalCarelist);
    
    HospitalCarelist findByhCodeAndHcName(int h_code, String hc_name);

    void update(HospitalCarelist hospitalCarelist);
}