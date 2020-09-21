package com.a305.balbadack.model.service;

import java.util.List;
import com.a305.balbadack.model.dto.HospitalPicture;

public interface HospitalPictureService {

    // 사진 등록
    public void insert(HospitalPicture hospitalPicture);

    // 병원별 사진 조회
    public List<HospitalPicture> findByhPhotoCode(String hPhotoCode);

    // 사진 삭제 
    public void delete(Integer pCode);
}