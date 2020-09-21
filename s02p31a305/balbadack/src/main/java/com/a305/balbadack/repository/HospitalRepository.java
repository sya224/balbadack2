package com.a305.balbadack.repository;

import java.util.*;

import com.a305.balbadack.model.dto.Hospital;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface HospitalRepository extends JpaRepository<Hospital, Integer> {

  // 병원 이름으로 검색
  @Query(value = "select * from hospital as h where h.h_name like concat('%', :Name, '%')",nativeQuery = true)
  List<Hospital> findByhNameLike(@Param("Name") String Name);
  
  // 병원 사진 코드로 병원 코드 찾기 
  @Query(value = "select * from hospital as h where h.h_photocode=:hPhotoCode",nativeQuery = true)
  Hospital findhCode(@Param("hPhotoCode") String hPhotoCode);

  // 이름이 있으면 이름 검색, 위치 검색 
  @Query(value = "select * from hospital h where (6371 * acos(cos( radians(:latitude) ) * cos( radians(h.h_latitude) ) * cos( radians(:longtitude) - radians(h.h_longitude) ) + sin( radians(:latitude) ) * sin( radians( h.h_latitude ) ))) < 3 and h.h_name like concat('%', :keyword, '%') or h.h_gu like concat('%', :keyword, '%') or h.h_dong like concat('%', :keyword, '%') or h.h_station like concat('%', :keyword, '%') or h.h_tag like concat('%', :keyword, '%')", nativeQuery = true)
  List<Hospital> findByhKeyword(@Param("keyword") String keyword, @Param("latitude") Double latitude, @Param("longtitude") Double longtitude);

  // 가까운 위치별로 
  @Query(value = "select * from hospital as h where (6371 * acos(cos( radians(:latitude) ) * cos( radians(h.h_latitude) ) * cos( radians(:longtitude) - radians(h.h_longitude) ) + sin( radians(:latitude) ) * sin( radians( h.h_latitude ) ))) < 3 order by (6371 * acos(cos( radians(:latitude) ) * cos( radians(h.h_latitude) ) * cos( radians(:longtitude) - radians(h.h_longitude) ) + sin( radians(:latitude) ) * sin( radians( h.h_latitude ) ))) limit :page, :limit", nativeQuery = true)
  List<Hospital> findByLocation(@Param("latitude") Double latitude, @Param("longtitude") Double longtitude, @Param("page") Integer page,@Param("limit") Integer limit);

  // 가까운 위치별로
  @Query(value = "select * from hospital as h order by (6371 * acos(cos( radians(:latitude) ) * cos( radians(h.h_latitude) ) * cos( radians(:longtitude) - radians(h.h_longitude) ) + sin( radians(:latitude) ) * sin( radians( h.h_latitude ) )))", nativeQuery = true)
  List<Hospital> findAllByLocation(@Param("latitude") Double latitude, @Param("longtitude") Double longtitude);

  @Query(value="select * from hospital as h where (6371 * acos(cos( radians(:latitude) ) * cos( radians(h.h_latitude) ) * cos( radians(:longtitude) - radians(h.h_longitude) ) + sin( radians(:latitude) ) * sin( radians( h.h_latitude ) ))) < 3 and h.h_code in :hCodeList",nativeQuery = true)
  List<Hospital> findByhCodeIn(List<Integer> hCodeList, @Param("latitude") Double latitude, @Param("longtitude") Double longtitude);

  @Query(value="select * from hospital as h where h.h_code in :hCodeList", nativeQuery = true)
  List<Hospital> findByhCodeInhCodeList(List<Integer> hCodeList);

  // 별점 순 조회
  @Query(value="select * from hospital as h order by h.h_starrating desc, (6371 * acos(cos( radians(:latitude) ) * cos( radians(h.h_latitude) ) * cos( radians(:longtitude) - radians(h.h_longitude) ) + sin( radians(:latitude) ) * sin( radians( h.h_latitude ) ))) limit :page, :limit",nativeQuery = true)
  List<Hospital> findByStar(@Param("latitude") Double latitude, @Param("longtitude") Double longtitude, @Param("page") Integer page, @Param("limit") Integer limit);

  // 별점 순(3KM) 조회
  @Query(value="select * from hospital as h where (6371 * acos(cos( radians(:latitude) ) * cos( radians(h.h_latitude) ) * cos( radians(:longtitude) - radians(h.h_longitude) ) + sin( radians(:latitude) ) * sin( radians( h.h_latitude ) ))) < 3 order by h.h_starrating desc, h.h_reviewcount desc, (6371 * acos(cos( radians(:latitude) ) * cos( radians(h.h_latitude) ) * cos( radians(:longtitude) - radians(h.h_longitude) ) + sin( radians(:latitude) ) * sin( radians( h.h_latitude ) ))) limit :page, :limit",nativeQuery = true)
  List<Hospital> findByStarNear(@Param("latitude") Double latitude, @Param("longtitude") Double longtitude, @Param("page") Integer page, @Param("limit") Integer limit);

  // 리뷰 순 조회
  @Query(value="select * from hospital as h order by h.h_reviewcount desc, (6371 * acos(cos( radians(:latitude) ) * cos( radians(h.h_latitude) ) * cos( radians(:longtitude) - radians(h.h_longitude) ) + sin( radians(:latitude) ) * sin( radians( h.h_latitude ) ))) limit :page, :limit",nativeQuery = true)
  List<Hospital> findByReview(@Param("latitude") Double latitude, @Param("longtitude") Double longtitude, @Param("page") Integer page, @Param("limit") Integer limit);

  // 리뷰 순(3KM) 조회
  @Query(value="select * from hospital as h where (6371 * acos(cos( radians(:latitude) ) * cos( radians(h.h_latitude) ) * cos( radians(:longtitude) - radians(h.h_longitude) ) + sin( radians(:latitude) ) * sin( radians( h.h_latitude ) ))) < 3 order by h.h_reviewcount desc, h.h_reviewcount desc, (6371 * acos(cos( radians(:latitude) ) * cos( radians(h.h_latitude) ) * cos( radians(:longtitude) - radians(h.h_longitude) ) + sin( radians(:latitude) ) * sin( radians( h.h_latitude ) ))) limit :page, :limit",nativeQuery = true)
  List<Hospital> findByReviewNear(@Param("latitude") Double latitude, @Param("longtitude") Double longtitude, @Param("page") Integer page, @Param("limit") Integer limit);
  
  List<Hospital> findByhNameContaining(String keyword);
  
  // 별점순 조회 마지막 확인
  @Query(value = "select * from hospital as h order by (6371 * acos(cos( radians(:latitude) ) * cos( radians(h.h_latitude) ) * cos( radians(:longtitude) - radians(h.h_longitude) ) + sin( radians(:latitude) ) * sin( radians( h.h_latitude ) ))) , h.h_starrating desc limit :page, 1", nativeQuery=true)
  Hospital isLastPage(@Param("latitude") Double latitude, @Param("longtitude") Double longtitude, @Param("page") Integer page);

  // 거리순 조회 마지막 확인 
  @Query(value = "select * from hospital as h where (6371 * acos(cos( radians(:latitude) ) * cos( radians(h.h_latitude) ) * cos( radians(:longtitude) - radians(h.h_longitude) ) + sin( radians(:latitude) ) * sin( radians( h.h_latitude ) ))) < 3 order by (6371 * acos(cos( radians(:latitude) ) * cos( radians(h.h_latitude) ) * cos( radians(:longtitude) - radians(h.h_longitude) ) + sin( radians(:latitude) ) * sin( radians( h.h_latitude ) ))) limit :page, 1", nativeQuery=true)
  Hospital isLastPageNear(@Param("latitude") Double latitude, @Param("longtitude") Double longtitude, @Param("page") Integer page);

  //리뷰 순 조회 마지막 확인 
  @Query(value = "select * from hospital as h order by h.h_reviewcount desc, (6371 * acos(cos( radians(:latitude) ) * cos( radians(h.h_latitude) ) * cos( radians(:longtitude) - radians(h.h_longitude) ) + sin( radians(:latitude) ) * sin( radians( h.h_latitude ) ))) , h.h_starrating desc limit :page, 1", nativeQuery=true)
  Hospital isLastPageReview(@Param("latitude") Double latitude, @Param("longtitude") Double longtitude, @Param("page") Integer page);
  
}