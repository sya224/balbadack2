package com.a305.balbadack.repository;

import com.a305.balbadack.model.dto.HospitalPicture;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface HospitalPictureRepository extends JpaRepository<HospitalPicture, Integer> {

  // 코드별 사진 삭제 
  @Transactional
  @Modifying
  @Query(value = "delete from hospital_picture where p_code = :pCode", nativeQuery = true)
  void delete(@Param("pCode") Integer pCode);


  // 병원별 사진 찾기
  @Query(value = "select * from hospital_picture as hp where hp.h_photocode = :hPhotoCode and hp.hp_deleted=false", nativeQuery = true)
  List<HospitalPicture> findByhPhotoCode(@Param("hPhotoCode") String hPhotoCode);
  

  // 사진 코드로 사진 객체 찾기
  @Query(value = "select * from hospital_picture as hp where hp.p_code = :pCode and hp.hp_deleted=false", nativeQuery = true)
  HospitalPicture getByhPCode(@Param("pCode") Integer pCode);


}
