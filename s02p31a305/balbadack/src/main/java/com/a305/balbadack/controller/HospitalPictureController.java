package com.a305.balbadack.controller;

import com.a305.balbadack.model.dto.HospitalPicture;
import com.a305.balbadack.model.service.HospitalPictureService;

import java.util.List;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins="{*}")
@RestController
@Api(value="HospitalPictureController", description="병원 사진")
@RequestMapping("/hospitalpicture/*")
public class HospitalPictureController {

  @Autowired
  HospitalPictureService hospitalPictureService;

  // create : 병원 사진 등록하기 
  @ApiOperation("병원 사진 등록하기")
  @PostMapping(value="/insert")
  public void insert(@RequestBody HospitalPicture hospitalPicture) {
      hospitalPictureService.insert(hospitalPicture);
  }

  // Read : 병원 별 사진 조회
  @ApiOperation("병원 별 사진 조회하기")
  @PostMapping(value="/findByhospital")
  public List<HospitalPicture> findByHospital(@RequestBody String hPhotoCode) {
      return hospitalPictureService.findByhPhotoCode(hPhotoCode);
  }

  // Delete : 병원 사진 삭제하기
  @ApiOperation("병원 사진 삭제하기")
  @PostMapping(value="/delete")
  public void delete(@RequestParam Integer pCode) {
      //hp_deleted  true로 바꾸기
      hospitalPictureService.delete(pCode);
  }

  
}