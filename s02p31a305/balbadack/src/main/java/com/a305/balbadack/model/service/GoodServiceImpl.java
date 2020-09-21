package com.a305.balbadack.model.service;

import java.util.List;

import com.a305.balbadack.model.dto.Good;
import com.a305.balbadack.repository.GoodRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GoodServiceImpl implements GoodService {

    @Autowired
    GoodRepository goodRepository;

    @Override
    public void insert(Good good) {
        try {
            goodRepository.save(good);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    @Override
    public List<Good> findByU_id(String u_id) {
        try {
            System.out.println("Service의 u_id : " + u_id);
            return goodRepository.findAllByUser_uId(u_id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    
    @Override
    public List<Good> findByR_code(int r_code) {
        try {
            System.out.println("Service의 r_code : " + r_code);
            return goodRepository.findAllByReview_rCode(r_code);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    
    @Override
    public void delete(Good good) {
        try {
            goodRepository.delete(good);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}