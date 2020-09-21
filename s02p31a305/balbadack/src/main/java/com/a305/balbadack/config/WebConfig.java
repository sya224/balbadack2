package com.a305.balbadack.config;

// 토큰 인증을 제외할 path 설정
public class WebConfig {
    private static final String[] EXCLUDE_PATHS = { 
        // 사실 리뷰작성, 마이페이지, 병원정보 수정 등을 제외하고는 전부 가능한게 좋음
        "/api/user/login",
        "/api/user/findPw",
        "/api/user/signUp",
        "/error/**",
        "/api/user/main",
    };
}