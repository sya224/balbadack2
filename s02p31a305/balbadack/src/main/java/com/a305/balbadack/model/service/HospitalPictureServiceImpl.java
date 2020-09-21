package com.a305.balbadack.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import com.a305.balbadack.model.dto.HospitalPicture;
import com.a305.balbadack.repository.HospitalPictureRepository;
import com.a305.balbadack.repository.HospitalRepository;
import com.a305.balbadack.model.service.JwtService;



@Service
public class HospitalPictureServiceImpl implements HospitalPictureService {
  @Autowired
  HospitalPictureRepository hospitalPictureRepository;

  @Autowired
  HospitalRepository hospitalRepository;

  @Autowired
  JwtService jwtService;


  @Override
  public void insert(HospitalPicture hospitalPicture) {
    try {
      hospitalPictureRepository.save(hospitalPicture);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  @Override
  public List<HospitalPicture> findByhPhotoCode(String hPhotoCode) {
    try {
      // System.out.println(hPhotoCode);
      return hospitalPictureRepository.findByhPhotoCode(hPhotoCode);
    } catch (Exception e) {
      e.printStackTrace();
    }
    return null;
  }

  @Override
  public void delete(Integer pCode) {
      try {
        // 병원 사진 코드로 병원 코드 조회
        String HPhotoCode = hospitalPictureRepository.getByhPCode(pCode).getHPhotoCode();
        // 현재 유저의 병원 코드 조회 
        String UserHPhotoCode = jwtService.getUserFromJwt().getHCode();
        System.out.println(HPhotoCode);
        System.out.println(UserHPhotoCode);
        if (HPhotoCode == UserHPhotoCode){
          hospitalPictureRepository.delete(pCode);
        }else{
          System.out.println("허용되지 않는 사용자가 삭제를 요청했습니다.");
        }
      } catch (Exception e) {
          e.printStackTrace();
      }
  }

}