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
@Entity(name="favorite_hospital")
public class FavoriteHospital {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // IDENTITY로 해야 Auto Increment
	@Column(nullable = false, unique = true, name = "f_code")
    private int fCode;

    @Column(nullable = false, name="u_id")
    private String uId;

    @Column(nullable = false, name="h_code")
    private Integer hCode;

    // 아이디
    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "u_id", referencedColumnName = "u_id", insertable = false, updatable = false, foreignKey = @ForeignKey(name = "fk_favoritehospital_uid"))
    private User user;
    
    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "h_code", referencedColumnName = "h_code", insertable = false, updatable = false, foreignKey = @ForeignKey(name = "fk_favoritehospital_hcode"))
    private Hospital hospital;
}