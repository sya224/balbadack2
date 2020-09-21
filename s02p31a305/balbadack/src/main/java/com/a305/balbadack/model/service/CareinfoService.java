package com.a305.balbadack.model.service;

import java.util.List;

import com.a305.balbadack.model.dto.Careinfo;

public interface CareinfoService {
    
    // 진료 정보 등록하기
    public void insert(Careinfo careinfo);
    public void insert(List<Careinfo> careinfo);

    // 진료 정보 수정하기
    public void update(Careinfo careinfo);
    
    // 진료 정보 삭제하기
    public void delete(Careinfo careinfo);
    
    // 진료 정보 불러오기
    public List<Careinfo> findByR_code(int r_code);

    // a_code로 r_code 불러오기
    public List<Integer> findrCodeByaCode(int a_code);

    // 진료 정보 불러오기 (ciname으로)
    public List<Careinfo> findByCiName(String ci_name);

}