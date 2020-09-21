package com.a305.balbadack.model.service;

import com.a305.balbadack.model.dto.HospitalCarelist;
import com.a305.balbadack.repository.HospitalCarelistRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HospitalCarelistServiceImpl implements HospitalCarelistService {

    @Autowired
    HospitalCarelistRepository hospitalCarelistRepository;

    @Override
    public void insert(HospitalCarelist hospitalCarelist) {
        try {
            hospitalCarelistRepository.save(hospitalCarelist);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void update(HospitalCarelist hospitalCarelist) {
        try {
            hospitalCarelistRepository.save(hospitalCarelist);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public HospitalCarelist findByhCodeAndHcName(int h_code, String hc_name) {
        try {
            hospitalCarelistRepository.findByhCodeAndHcName(h_code, hc_name);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
   
}