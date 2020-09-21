package com.a305.balbadack.model.service;

import lombok.RequiredArgsConstructor;

import com.a305.balbadack.model.dto.CustomUserdetails;
import com.a305.balbadack.model.dto.User;
import com.a305.balbadack.repository.UserRepository;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service("CustomUserDetailService")
public class CustomUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public CustomUserdetails loadUserByUsername(String uId) throws UsernameNotFoundException {
        
        User user = userRepository.findByUid(uId)
                .orElseThrow(() -> 
                new UsernameNotFoundException("User not found with email : " + uId)
        );
        
        return CustomUserdetails.create(user);
        // return userRepository.findUserdetailsByUid(id);
                // .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));
    }

    public CustomUserdetails loadUserById(String uId) {
        User user = userRepository.findByUid(uId)
                .orElseThrow(() -> 
                new UsernameNotFoundException("User not found with email : " + uId)
        );
        return CustomUserdetails.create(user);
    }
}