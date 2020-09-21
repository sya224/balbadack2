package com.a305.balbadack.model.dto;

import javax.persistence.*;

import lombok.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "carelist")
public class Carelist {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // IDENTITY로 해야 Auto Increment
	@Column(nullable = false, unique = true, name = "c_code")
    private int cCode;
    
    @Column(length = 50, nullable = false, name = "c_name")
    private String cName;

    @Column(length = 50, nullable = false, name = "c_category")
    private String cCategory;
}