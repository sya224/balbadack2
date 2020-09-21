package com.a305.balbadack.model.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.ForeignKey;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString
@Entity(name="animal")
public class Animal {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // IDENTITY로 해야 Auto Increment
	@Column(nullable = false, unique = true, name = "a_code")
    private Integer aCode;
    
    @Column(length = 30, nullable = false, name = "a_type")
    private String aType;

    @Column(length = 30, nullable = false, name = "a_species")
    private String aSpecies;

    @Column(nullable = false, name = "a_kg")
    private Double aKg;

    @Column(length = 10, nullable = false, name = "a_sex")
    private String aSex;
    
    @Column(columnDefinition = "tinyint(1) default 0", name = "a_deleted")
    private Boolean aDeleted;

    @Column(length = 50, nullable = false, name="u_id")
    private String uId;

    // 아이디
    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "u_id", referencedColumnName = "u_id", insertable = false, updatable = false, foreignKey = @ForeignKey(name = "fk_animal_uid"))
	private User user;
    
}