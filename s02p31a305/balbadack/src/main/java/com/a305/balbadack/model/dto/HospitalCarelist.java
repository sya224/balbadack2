package com.a305.balbadack.model.dto;

import javax.persistence.*;

import lombok.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "hospital_carelist")
public class HospitalCarelist {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // IDENTITY로 해야 Auto Increment
	@Column(nullable = false, unique = true, name = "hc_code")
    private int hcCode;

    @Column(nullable = false, name = "h_code")
    private int hCode;
    
    @Column(length = 50, nullable = false, name = "hc_name")
    private String hcName;

    @Column(nullable = false, columnDefinition = "int default 0", name = "hc_min")
    private int hcMin;

    @Column(nullable = false, columnDefinition = "int default 0", name = "hc_max")
    private int hcMax;
}