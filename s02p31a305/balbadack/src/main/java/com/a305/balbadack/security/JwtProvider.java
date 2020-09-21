package com.a305.balbadack.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

import java.util.*;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import com.a305.balbadack.model.dto.CustomUserdetails;

// @Configuration
@Component("JwtProvider")
public class JwtProvider {
    
    private final Logger logger = LoggerFactory.getLogger(JwtProvider.class);

    private String secretKey = "balbadacka305";

    // 토큰 유효시간 30분
    private long tokenValidTime = 30 * 60 * 1000L;

    // private final UserDetailsService userDetailsService;

    // 객체 초기화, secretKey를 Base64로 인코딩
    // @PostConstruct
    // protected void init() {
    //     secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    // }

    // // JWT 토큰 생성
    // public String createToken(String userPk, List<String> roles) {
    //     Claims claims = Jwts.claims().setSubject(userPk); // JWT payload에 저장되는 정보 단위
    //     claims.put("roles", roles); // key/value
    //     Date now = new Date();

    //     return Jwts.builder()
    //                 .setClaims(claims) // 정보 저장
    //                 .setIssuedAt(now) // 토큰 발행 시간
    //                 .setExpiration(new Date(now.getTime() + tokenValidTime))
    //                 .signWith(SignatureAlgorithm.HS256, secretKey)

    //                 .compact();
    // }
    /**
     * ValidateToken Error 발생 시 변경
     */
    public String generateToken(Authentication authentication) {

        CustomUserdetails customUserdetails = (CustomUserdetails) authentication.getPrincipal();
        System.out.println(customUserdetails.toString());
        
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + tokenValidTime);

        return Jwts.builder()
                .setSubject(customUserdetails.getUId())
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
    }

    public String getUserIdFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();

        System.out.println("getUserIdFromJWT: " + claims.getSubject());
        return claims.getSubject();
    }

    // 토큰의 유효성 + 만료일자 확인
    public boolean validateToken(String jwtToken) {
        System.out.println("JwtProvider.............................................");
        System.out.println("jwtToken: " + jwtToken);
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
            System.out.println(claims.toString());
            return !claims.getBody().getExpiration().before(new Date());
        } catch (SignatureException se) {
            logger.error("Invalid JWT signature");
        } catch(MalformedJwtException ex) {
            logger.error("Invalid JWT token");
        } catch(ExpiredJwtException ex) {
            logger.error("Expired JWT token");
        } catch(Exception e) {
            logger.error("Error");
        }

        return false;
    }

    public String returnToken(String jwtToken) {
        return jwtToken;
    }




    /**
     * 
     */

    // JWT 토큰에서 인증 정보 조회
    public Authentication getAuthentication(String token) {
        return null;
        // UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserPk(token));
        // return new UsernamePasswordAuthenticationToken(userDetails,  "", userDetails.getAuthorities());
    }

    // 토큰에서 회원정보 추출
    public String getUserPk(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    // // Request의 Header에서 token 값을 가져온다. "X-AUTH-TOKEN" : "TOKEN값"
    // public String resolveToken(HttpServletRequest request) {
    //     return request.getHeader("X-AUTH-TOKEN");
    // }
    
}