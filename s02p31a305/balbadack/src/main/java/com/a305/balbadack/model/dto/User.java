package com.a305.balbadack.model.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;

import org.hibernate.annotations.GenericGenerator;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString
@Entity(name="user")
public class User {

    /**
     * User
     */
    @Id
    // @GeneratedValue(generator = "system-uuid")
    // @GenericGenerator(name = "system-uuid", strategy = "uuid")
	@Column(length = 50, nullable = false, unique = true, name = "u_id")
    private String uId;
    
    @Column(length = 200, nullable = false, name = "u_pw")
    private String uPw;

    @Column(nullable = false, name="u_code", columnDefinition = "default 1")
    private Integer uCode;

    // @Enumerated(EnumType.STRING)
    // @Column(nullable = false, name = "u_role")
    // private Role uRole; //회원-1, 수의사-2, 병원관계자-3

    @Column(columnDefinition="tinyint(1) default 0", nullable = false, name = "u_manager")
    private boolean uManager;

    @Column(length = 20, nullable = false, name = "u_name")
    private String uName;

    @Column(length = 30, name = "h_code")
    private String hCode;

    @Column(name = "u_sms")
    private boolean uSms;

    @Column(columnDefinition = "tinyint(1) default 0", name = "u_deleted")
    private Boolean uDeleted;

}