package com.a305.balbadack.model.service;

import java.util.List;

import com.a305.balbadack.model.dto.Review;
import com.a305.balbadack.repository.ReviewRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReviewServiceImpl implements ReviewService{
    
    @Autowired
    ReviewRepository reviewRepository;

    @Override
    public void insert(Review review){
        try{
            reviewRepository.save(review);
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public List<Review> findAll() {
        try{
            return reviewRepository.findAll();
        }catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Review findOne(int r_code) {
        try{
            return reviewRepository.findByrCode(r_code);
        }catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }
    
    @Override
    public int findRecentReviewsRCode() {
        try{
            return reviewRepository.findRecentReviewsRCode().get(0);
        }catch(Exception e){
            e.printStackTrace();
        }
        return -1;
    }
    
    @Override
    public List<Review> findByHospital(int h_code) {
        try{
            return reviewRepository.findAllByrDeletedAndHospital_hCode(false, h_code);
        }catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Review> findByUser(String u_id) {
        try{
            return reviewRepository.findAllByrDeletedAndUser_uId(false, u_id);
        }catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void delete(int r_code) {
        try{
            reviewRepository.reviewDelete(r_code);
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public void update(Review review) {
        try{
            reviewRepository.save(review);
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public List<Review> findByrPurpose(String r_purpose) {
        try{
            return reviewRepository.findByrPurposeContainingAndrDeleted(r_purpose);
        }catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Review> findByrContent(String r_content) {
        try{
            return reviewRepository.findByrContentContainingAndrDeleted(r_content);
        }catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<String> getPurpose(String r_purpose) {
        try {
            return reviewRepository.getPurpose(r_purpose);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}