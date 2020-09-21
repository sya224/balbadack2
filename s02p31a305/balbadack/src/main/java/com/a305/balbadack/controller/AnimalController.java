package com.a305.balbadack.controller;

import java.util.*;

import com.a305.balbadack.model.dto.Animal;
import com.a305.balbadack.model.service.AnimalService;
import com.a305.balbadack.model.service.JwtService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins="{*}", maxAge=6000)
@RestController()
@RequestMapping("/animal/*")
@Api(value="동물정보", description="동물정보")
@EnableAutoConfiguration
public class AnimalController {
    
    @Autowired
	AnimalService animalService;
	
	@Autowired
	JwtService jwtService;

    @ExceptionHandler
	public ResponseEntity<Map<String, Object>> handler(Exception e){
		return handleFail(e.getMessage(), HttpStatus.OK);
	}
	
	private ResponseEntity<Map<String, Object>> handleSuccess(Object data){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("state", HttpStatus.OK);
		resultMap.put("message", data);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

	private ResponseEntity<Map<String, Object>> handleFail(Object data, HttpStatus status) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("state",  "fail");
		resultMap.put("message",  data);
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @ApiOperation("동물정보 등록")
	@PostMapping("/insert")
    public ResponseEntity<Map<String, Object>> signUp(@RequestBody Animal animal) {
		
		String uId = jwtService.getIdFromJwt();
		
		if(uId == null) {
			return handleFail("로그인이 필요합니다.", HttpStatus.BAD_REQUEST);
		}

		animal.setUId(uId);
		animal.setADeleted(false);

        try {
			System.out.println("동물 등록 시작...");
            animalService.create(animal);
            return handleSuccess("동물 등록을 완료하였습니다.");
        } catch (Exception e) {
            return handleFail(e.toString(), HttpStatus.OK);
        }

	}
	

	@ApiOperation("동물정보수정")
	@PostMapping("/update")
	public ResponseEntity<Map<String, Object>> update(@RequestBody Animal animal) {
		
		String uId = jwtService.getIdFromJwt();

		if(uId == null) {
			return handleFail("로그인이 필요합니다.", HttpStatus.BAD_REQUEST);
		}

		if(animal.getUId().equals(uId)) {
			try {
				animalService.update(animal);
				return handleSuccess("동물정보를 수정하였습니다.");
			} catch (Exception e) {
				return handleFail(e.toString(), HttpStatus.BAD_REQUEST);
			}
		} else {
			return handleFail("잘못된 접근입니다.", HttpStatus.BAD_REQUEST);
		}

	}

	@ApiOperation("동물 삭제")
	@PostMapping("/delete")
	public ResponseEntity<Map<String, Object>> signout(@RequestBody Animal animal) {
		
		String uId = jwtService.getIdFromJwt();
		Integer aCode = animal.getACode();

		if(uId.equals(animal.getUId())) {
			try {
				animalService.delete(aCode);
				return handleSuccess("동물정보 삭제하였습니다.");
			} catch (Exception e) {
				return handleFail(e.toString(), HttpStatus.OK); //Status 다시 지정
			}
		} else {
			return handleFail("삭제할 수 없습니다.", HttpStatus.BAD_REQUEST);
		}      

	}

	@ApiOperation("마이페이지 - 내 동물 조회")
	@PostMapping("/mycompanion/all")
	public ResponseEntity<Map<String, Object>> myCompanions() {
	
		String uId = jwtService.getIdFromJwt();

		if(uId == null) {
			return handleFail("로그인이 필요합니다.", HttpStatus.BAD_REQUEST);
		}

		try {
			List<Animal> myAllCompanions = animalService.findByUid(uId);
			System.out.println(myAllCompanions.toString());
		
			for(int i = 0, size = myAllCompanions.size(); i<size; i++) {
				myAllCompanions.get(i).setUser(null);
			}

			return handleSuccess(myAllCompanions);
		} catch (Exception e) {
			return handleFail(e.toString(), HttpStatus.BAD_REQUEST);
		}

	}

	@ApiOperation("마이페이지 - 동물 상세 조회")
	@PostMapping("/mycompanion/one")
	public ResponseEntity<Map<String, Object>> myCompanion(@RequestParam Integer aCode) {
		
		String uId = jwtService.getIdFromJwt();

		if(uId == null) {
			return handleFail("로그인이 필요합니다.", HttpStatus.BAD_REQUEST);
		}

		try {
			Animal myOneCompanion = animalService.findByACode(uId, aCode);
			System.out.println(myOneCompanion.toString());
		
			myOneCompanion.setUser(null);

			return handleSuccess(myOneCompanion);
		} catch (Exception e) {
			return handleFail(e.toString(), HttpStatus.BAD_REQUEST);
		}

	}
}