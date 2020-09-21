package com.a305.balbadack.controller;

import com.a305.balbadack.model.dto.ChangePassword;
import com.a305.balbadack.model.dto.User;
import com.a305.balbadack.model.service.JwtService;
import com.a305.balbadack.model.service.UserService;
import com.a305.balbadack.payload.ApiResponse;
import com.a305.balbadack.payload.JwtAuthenticationResponse;
import com.a305.balbadack.repository.UserRepository;
import com.a305.balbadack.security.JwtProvider;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = "{*}", maxAge = 6000)
@RestController()
@RequestMapping("/user/*")
@Api(value = "회원관리", description = "회원관리")
@EnableAutoConfiguration
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	UserRepository userRepository;

	@Autowired
	JwtService jwtService;

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	JwtProvider jwtProvider;

	@Autowired
	PasswordEncoder passwordEncoder;

	@ExceptionHandler
	public ResponseEntity<Map<String, Object>> handler(Exception e) {
		return handleFail(e.getMessage(), HttpStatus.OK);
	}

	private ResponseEntity<Map<String, Object>> handleSuccess(Object data) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("state", HttpStatus.OK);
		resultMap.put("message", data);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

	private ResponseEntity<Map<String, Object>> handleFail(Object data, HttpStatus status) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("state", "fail");
		resultMap.put("message", data);
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	@ApiOperation("회원가입")
	@PostMapping("/signup")
	public ResponseEntity<?> signUp(@RequestBody User user) {

		user.setUPw(passwordEncoder.encode(user.getUPw()));
		user.setUCode(0);
		boolean check = true;

		try {
			check = userService.create(user);
			if(!check) {
				return handleFail("잘못된 접근입니다.", HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			e.printStackTrace(); 
		}
		
		return new ResponseEntity(new ApiResponse(true, "User registered successfully"),
		HttpStatus.OK);

	}

	@ApiOperation("회원가입(병원 STAFF)")
    @PostMapping("/signup/staff")
    public ResponseEntity<Map<String, Object>> signUpStaff(@RequestBody User user) {
		
		user.setUPw(passwordEncoder.encode(user.getUPw()));
		user.setUCode(1);

        try {
			Boolean check = userService.create(user);
			if(!check) { // 이미 가입된 아이디일 경우
				return handleFail("이미 가입된 아이디입니다.", HttpStatus.BAD_REQUEST);
			}
            return handleSuccess("회원가입을 완료하였습니다.");
        } catch (Exception e) {
            return handleFail(e.toString(), HttpStatus.BAD_REQUEST);
        }

	}
	
	@ApiOperation("로그인")
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestParam String uId, @RequestParam String uPw) {
        
		System.out.println("로그인");
		
		Authentication authentication = authenticationManager.authenticate(
			new UsernamePasswordAuthenticationToken(uId, uPw)
		);

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String jwt = jwtProvider.generateToken(authentication);

		return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));

	}

	@ApiOperation("회원정보수정")
	@PostMapping("/update")
	public ResponseEntity<Map<String, Object>> update(@RequestBody User user) {

		User jwtUser = jwtService.getUserFromJwt();

		String password = user.getUPw();
		user.setUPw(passwordEncoder.encode(password));

		if(jwtUser.getUId().equals(user.getUId())) {
			try {
				userService.update(user);
				return handleSuccess("회원정보를 수정하였습니다.");
			} catch (Exception e) {
				return handleFail(e.toString(), HttpStatus.BAD_REQUEST);
			}
		} else {
			return handleFail("잘못된 접근입니다.", HttpStatus.BAD_REQUEST);
		}       

	}

	@ApiOperation("회원 탈퇴")
	@PostMapping("/signout")
	public ResponseEntity<Map<String, Object>> signout(@RequestParam String uId) {
		
		User jwtUser = jwtService.getUserFromJwt();

		if(jwtUser.getUId().equals(uId)) {
			try {
				userService.delete(uId);
				return handleSuccess("회원탈퇴를 완료하였습니다.");
			} catch (Exception e) {
				return handleFail(e.toString(), HttpStatus.BAD_REQUEST);
			}
		} else {
			return handleFail("잘못된 접근입니다.", HttpStatus.BAD_REQUEST);
		}        

	}

	@ApiOperation("마이페이지 조회")
	@PostMapping("/mypage")
	public ResponseEntity<Map<String, Object>> mypage() {
		
		String jwtId = jwtService.getIdFromJwt();
		
		User user = null;
        try {
			user = userService.findById(jwtId);
			user.setUPw(null);
            return handleSuccess(user);
        } catch (Exception e) {
            return handleFail(e.toString(), HttpStatus.BAD_REQUEST);
        }
	} 

	@ApiOperation("비밀번호 변경")
	@PostMapping("/password")
	public ResponseEntity<Map<String, Object>> password(@RequestBody ChangePassword changePassword) {
		
		String id = changePassword.getId();
		String oldPw = changePassword.getPassword();
		String newPw = changePassword.getNewPassword();

		boolean flag = false;
		try {
			flag = userService.updatePassword(id, oldPw, newPw);
		} catch (Exception e) {
			return handleFail(e.toString(), HttpStatus.BAD_REQUEST);
		}

		if(flag) {
			return handleSuccess("비밀번호를 변경하였습니다.");
		} else {
			return handleFail("비밀번호 변경에 실패하였습니다.", HttpStatus.BAD_REQUEST);
		}
	
	}

}
