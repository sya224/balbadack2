package com.a305.balbadack.model.service;

import java.util.List;

import com.a305.balbadack.model.dto.Review;

public interface ReviewService {
    
    // 리뷰 작성
    public void insert(Review review);

    // 가장 최근 리뷰의 PK 찾아오기 (careinfo에 r_code 넣어주기 위한 메소드)
    public int findRecentReviewsRCode();

    // 모든 리뷰 검색
    public List<Review> findAll();

    // 리뷰 하나 검색
    public Review findOne(int r_code);

    // 동물병원별 리뷰 검색
    public List<Review> findByHospital(int h_code);

    // 내가 쓴 리뷰 검색
    public List<Review> findByUser(String u_id);

    // 방문 목적별 리뷰 검색
    public List<Review> findByrPurpose(String r_purpose);

    // 후기별 리뷰 검색
    public List<Review> findByrContent(String r_content);
    
    // 리뷰 수정
    public void update(Review review);

    // 내가 쓴 리뷰 삭제 (r_deleted를 true로 변경)
    public void delete(int r_code);
    
    // 모든 목적 list 가져오기
    public List<String> getPurpose(String r_purpose);
}