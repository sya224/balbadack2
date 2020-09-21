package com.a305.balbadack.model.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.AccessLevel;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Getter
@Setter
@ToString
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class)
@Table(name = "hospital_picture")
public class HospitalPicture {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false, unique = true, name="p_code")
  private int pCode;

  @Column(length = 100, name="h_image")
  private String hImage;

  // 병원 테이블의 사진 코드
  @Column(length = 100, name="h_photocode")
  private String hPhotoCode;
  
  // 삭제 여부 
  @Column(columnDefinition = "Boolean default false", name = "hp_deleted")
  private Boolean hpDeleted;
  

// 외래키 안하기로함 
	// @ManyToOne(fetch = FetchType.LAZY)
	// @JoinColumn(name = "h_code", referencedColumnName = "h_code", insertable = false, updatable = false, foreignKey = @ForeignKey(name = "fk_h_code"))
  // private Hospital hospital;
}