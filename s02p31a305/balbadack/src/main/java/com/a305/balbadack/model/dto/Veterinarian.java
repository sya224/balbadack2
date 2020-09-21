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
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import org.apache.catalina.User;

import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
@Getter
@Setter
@ToString
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class)
@Table(name = "veterinarian")
public class Veterinarian {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false, unique = true, name = "v_code")
  private int vCode;

  @Column(length = 20, name = "v_name")
  private String vName;

  @Column(length = 500, name = "v_profile")
  private String vProfile;
  
  @Column(length = 500, name = "v_career")
  private String vCareer;

  @Column(length = 500, name = "v_special")
  private String vSpecial;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "h_code", referencedColumnName = "h_code", insertable = false, updatable = false, foreignKey = @ForeignKey(name = "fk_h_code"))
  private Hospital hospital;

	@Column(columnDefinition = "boolean default false", name = "v_deleted")
  private boolean vDeleted;
  
}