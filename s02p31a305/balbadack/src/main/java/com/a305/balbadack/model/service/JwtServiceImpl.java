package com.a305.balbadack.model.service;

import javax.servlet.http.HttpServletRequest;

import com.a305.balbadack.model.dto.User;
import com.a305.balbadack.repository.UserRepository;
import com.a305.balbadack.security.*;

import org.springframework.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.*;

@Service
public class JwtServiceImpl implements JwtService {

    @Autowired
    JwtProvider jwtProvider;

    @Autowired
    CustomUserDetailService customUserDetailService;

    @Autowired
    UserRepository userRepository;
    
    @Override
    public String getIdFromJwt() {
        String token = getJwt();
        String uId = jwtProvider.getUserIdFromJWT(token);

        System.out.println("getIdFromJwt() ... " + uId);

        return uId;
    }

    @Override
    public User getUserFromJwt() {
        String token = getJwt();
        String uId = jwtProvider.getUserIdFromJWT(token);

        System.out.println("getUserFromJwt() ... " + uId);

        User user = userRepository.findByUserId(uId);

        return user;
    }

    @Override
    public String getJwt() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
                .getRequest();

        String token = request.getHeader("Authorization");
        System.out.println("JWT is .... " + token);

        if (StringUtils.hasText(token)) {
            return token;
        }

        return null;
    }

    @Override
    public List<String> getAuthorityFromJwt() {
        String uId = getIdFromJwt();

        UserDetails userDetails = customUserDetailService.loadUserById(uId);

        System.out.println("ROLES: " + userDetails.getAuthorities());
        Collection<?> authorities = userDetails.getAuthorities();
        List<String> roles = new ArrayList<>();

        Object[] array_authorities = authorities.toArray();
        for(int i = 0; i<array_authorities.length; i++) {
            String role = array_authorities[i].toString();
            roles.add(role);
        }

        return roles;
    }
    
}