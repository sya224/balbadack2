package com.a305.balbadack.model.service;

import java.util.*;

import com.a305.balbadack.model.dto.Hospital;
import com.a305.balbadack.model.service.HospitalService;
import com.a305.balbadack.repository.HospitalRepository;
import com.a305.balbadack.repository.CareinfoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HospitalServicelmpl implements HospitalService {

  static int limit = 7;
  static List<Hospital> fResult;
  
  @Autowired
  HospitalRepository hospitalRepository;

  @Autowired
  CareinfoRepository careinfoRepository;

  @Override
  public void insert(final Hospital hospital) {
    try {
      hospitalRepository.save(hospital);
    } catch (final Exception e) {
      e.printStackTrace();
    }
  }

  @Override
  public void update(final Hospital hospital) {
    try {
      hospitalRepository.save(hospital);
    } catch (final Exception e) {
      e.printStackTrace();
    }
  }

  @Override
  public void delete(final Hospital hospital) {
    try {
      hospitalRepository.delete(hospital);
    } catch (final Exception e) {
      e.printStackTrace();
    }
  }

  @Override
  public List<Hospital> searchAll(){
    try {
      return hospitalRepository.findAll();
    } catch (Exception e) {
      e.printStackTrace();
      System.err.println("전체 병원 목록 조회 중 오류 발생");
    }
    return null;
  }

  // 이름, 위치, 진료명에 따른 병원 결과
  @Override
  public List<Hospital> findByKeyword(String keyword, final Double latitude, final Double longtitude) {
    try {
       // 이름, 위치에 따른 결과
      List<Hospital> result = hospitalRepository.findByhKeyword(keyword, latitude, longtitude);
      // 진료 테이블에서 병원 코드 받아오기 -> 중복 제거 같은 코드가 있으면 빼기
      List<Integer> hCodeList = careinfoRepository.findByName(keyword);
      // System.out.println(hCodeList);
      // 병원 코드로 병원 조회하기 -> 중복 제거 해야함
      result.addAll(hospitalRepository.findByhCodeIn(hCodeList, latitude, longtitude));
      HashSet<Hospital> resultSet = new HashSet<Hospital>(result);
      fResult = new ArrayList<Hospital>(resultSet);
      return fResult;
    } catch (final Exception e) {
      e.printStackTrace();
    }
    return null;
  }

  @Override
  public List<Hospital> findByLocation(final Double latitude, final Double longtitude, Integer page) {
    try {
      return hospitalRepository.findByLocation(latitude, longtitude, page, limit);
    } catch (final Exception e) {
      e.printStackTrace();
      System.out.println("내 위치로 병원 조회 중 오류 발생 함.");
    }
    return null;
  }

  @Override
  public List<Hospital> findAllByLocation(final Double latitude, final Double longtitude) {
    try {
      return hospitalRepository.findAllByLocation(latitude, longtitude);
    } catch (final Exception e) {
      e.printStackTrace();
      System.out.println("내 위치로 병원 조회 중 오류 발생 함.");
    }
    return null;
  }

  @Override
  public List<Hospital> findByStar(final Double latitude, final Double longtitude, Integer page) {
    try {
      return hospitalRepository.findByStar(latitude, longtitude, page, limit);
    } catch (Exception e) {
      e.printStackTrace();
      System.out.println("별점 순으로 병원 조회 중 오류 발생 함.");
    }
    return null;
  }

  @Override
  public List<Hospital> findByReview(Double latitude, Double longtitude, Integer page) {
    try {
      return hospitalRepository.findByReview(latitude, longtitude, page, limit);
    } catch (Exception e) {
      e.printStackTrace();
      System.out.println("리뷰별 병원 조회중 오류 발생");
    }
    return null;
  }

  @Override
  public List<Hospital> findByStarNear(Double latitude, Double longtitude, Integer page){
    try {
      return hospitalRepository.findByStarNear(latitude, longtitude, page, limit);
    } catch (Exception e) {
      e.printStackTrace();
      System.out.println("별점 (3KM) 조회 중 오류 발생");
    }
    return null;
  }

  @Override
  public List<Hospital> findByReviewNear(Double latitude, Double longtitude, Integer page) {
    try {
      return hospitalRepository.findByReviewNear(latitude, longtitude, page, limit);
    } catch (Exception e) {
      e.printStackTrace();
      System.out.println("리뷰 (3KM) 조회 중 오류 발생");
    }
    return null;
  }

  @Override
  public Hospital isLastPage(Double latitude, Double longtitude, Integer page){
    try {
      return hospitalRepository.isLastPage(latitude, longtitude, page);
    } catch (Exception e) {
      e.printStackTrace();
      System.out.println("위치, 별점 기반 검색 마지막 페이지 조회 중 오류 발생 함.");
    }
    return null;
  }

  @Override
  public Hospital isLastPageNear(Double latitude, Double longtitude, Integer page){
    try{
      return hospitalRepository.isLastPageNear(latitude, longtitude, page);
    }catch(Exception e){
      e.printStackTrace();
      System.out.println("거리순, 별점 순, 마지막 페이지 조회 중 오류 발생");
    }
    return null;
  }

  @Override
  public Hospital isLastPageReview(Double latitude, Double longtitude, Integer page) {
    try {
      return hospitalRepository.isLastPageReview(latitude, longtitude, page);
    } catch (Exception e) {
      e.printStackTrace();
      System.out.println("전체 리뷰순 조회 마지막 페이지 조회 중 오류 발생");
    }
    return null;
  }

  @Override
  public List<Hospital> findByHName(String Name) {
    try {
      return hospitalRepository.findByhNameLike(Name);
    } catch (Exception e) {
      e.printStackTrace();
      System.out.println("이름 검색 시 오류 발생");
    }
    return null;
  }

}

    