package com.a305.balbadack.model.service;

import javax.transaction.Transactional;

import java.util.*;

import com.a305.balbadack.model.dto.User;
import com.a305.balbadack.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    // 회원가입
    @Override
    public boolean create(User user) throws Exception {
        try {
            System.out.println("USER: " + user.toString());
            
            User check = userRepository.findByUserId(user.getUId());
            System.out.println("CHECK: " + check);
            if(check != null) return false;
            
            userRepository.save(user);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("회원 가입 중 오류가 발생했습니다.");
        }
        return true;
    }

    @Override
    @Transactional //Repository에서 Update query문 사용할 때 꼭 설정
    public void delete(String id) throws Exception {
        try {
            userRepository.userDeleted(id);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("회원 탈퇴에 실패하였습니다.");
        }
    }

    @Override
    public void update(User user) throws Exception {
        try {
            userRepository.save(user);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("회원 정보 수정 중 오류가 발생했습니다.");
        }
    }

    @Override
    public boolean login(String id, String password) throws Exception {
        User user = null;
        try {
            user = userRepository.getOne(id);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("로그인 중 오류가 발생했습니다.");
        }

        if(user == null) { // 회원정보가 없는 경우(아이디 틀림)
            return false;
        } else {
            System.out.println("Password: "+ user.getUPw()+" "+password);
            if(user.getUPw().equals(password)) { // 비밀번호가 맞았을 때
                return true;
            } else { // 아이디는 맞는데 비밀번호가 틀렸을 때
                return false;
            }
        }
    }

    @Override
    public User findById(String id) throws Exception {
        User user = null;
        try {
            System.out.println(id);
            user = userRepository.findByUserId(id);
            if(user == null)
                System.out.println("IS NULL");
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("회원정보 조회 중 오류가 발생했습니다.");
        }
        return user;
    }

    @Override
    public List<User> findAll() throws Exception {
        List<User> user = null;
        try {
            user = userRepository.findAll();
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("전체 회원정보 조회 중 오류가 발생했습니다.");
        }
        return user;
    }

    @Transactional
    @Override
    public boolean updatePassword(String id, String oldPw, String newPw) throws Exception {
        
        if(checkPassword(id, oldPw)) {

            try {
                newPw = passwordEncoder.encode(newPw);
                userRepository.updatePassword(id, newPw);
            } catch (Exception e) {
                e.printStackTrace();
                throw new Exception("비밀번호 변경 중 오류가 발생했습니다.");
            }
            return true;
        }

        return false;
    }

    private boolean checkPassword(String id, String rawPassword) throws Exception {
        User user = findById(id);

        String encodedPassword = user.getUPw();

        if(passwordEncoder.matches(rawPassword, encodedPassword)) {
            System.out.println("비밀번호 맞음");
            return true;
        } else {
            System.out.println("비번 틀림");
        }

        return false;
    }

}