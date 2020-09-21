// package com.a305.balbadack.model.service;

// import java.io.IOException;

// import javax.servlet.FilterChain;
// import javax.servlet.ServletException;
// import javax.servlet.ServletRequest;
// import javax.servlet.ServletResponse;
// import javax.servlet.http.HttpServletRequest;

// import com.a305.balbadack.model.dto.JwtProvider;

// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.web.filter.GenericFilterBean;

// import lombok.RequiredArgsConstructor;

// /*
//     JwtProvider를 실제로 이용하는 Filter.
//     검증이 끝난 JWT로부터 유저정보를 받아와서 UsernamePasswordAuthenticationFilter로 전달.
// */
// @RequiredArgsConstructor
// public class JwtAuthenticationFilter extends GenericFilterBean {
    
//     private final JwtProvider jwtTokenProvider;

//     @Override
//     public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
//         // 헤더에서 JWT 를 받아옵니다.
//         String token = jwtTokenProvider.resolveToken((HttpServletRequest) request);
//         // 유효한 토큰인지 확인합니다.
//         if (token != null && jwtTokenProvider.validateToken(token)) {
//             // 토큰이 유효하면 토큰으로부터 유저 정보를 받아옵니다.
//             Authentication authentication = jwtTokenProvider.getAuthentication(token);
//             // SecurityContext 에 Authentication 객체를 저장합니다.
//             SecurityContextHolder.getContext().setAuthentication(authentication);
//         }
//         chain.doFilter(request, response);
//     }
    
// }