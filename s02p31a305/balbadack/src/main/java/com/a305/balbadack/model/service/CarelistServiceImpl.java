package com.a305.balbadack.model.service;

import java.util.List;

import com.a305.balbadack.model.dto.Carelist;
import com.a305.balbadack.repository.CarelistRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CarelistServiceImpl implements CarelistService {

    @Autowired
    CarelistRepository carelistRepository;

    @Override
    public List<Carelist> findAll() {
        try{
            return carelistRepository.findAll();
        }catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }
    
}