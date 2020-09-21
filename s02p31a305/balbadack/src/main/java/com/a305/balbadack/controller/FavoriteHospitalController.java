package com.a305.balbadack.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import java.util.*;

import com.a305.balbadack.model.dto.FavoriteHospital;
import com.a305.balbadack.model.dto.Hospital;
import com.a305.balbadack.model.service.FavoriteHospitalService;
import com.a305.balbadack.model.service.JwtService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins="{*}")
@RestController
@Api(value="FavoriteHospitalController", description="즐겨찾는 병원")
@RequestMapping("/favoriteHospital/*")
public class FavoriteHospitalController {

    @Autowired
    FavoriteHospitalService favoriteHospitalService;

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

    
    
    @ApiOperation("즐겨찾기 추가")
    @PostMapping(value="/insert")
    public ResponseEntity<Map<String, Object>> insertFavoriteHospital(@RequestBody FavoriteHospital favoriteHospital) {

        String uId = jwtService.getIdFromJwt();
        favoriteHospital.setUId(uId);

        try {
            favoriteHospitalService.insert(favoriteHospital);
        } catch (Exception e) {
            return handleFail("즐겨찾기 추가를 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }

        return handleSuccess("즐겨찾기 추가를 완료하였습니다.");
        
    }

    @ApiOperation("즐겨찾기 회원별 조회하기")
    @PostMapping(value="/findById")
    public ResponseEntity<Map<String, Object>> findFavoriteHospitalByUId(@RequestParam String uId) {

        List<Hospital> hospitals = null;

        String jwtId = jwtService.getIdFromJwt();
        if(jwtId.equals(uId)) {
            try {
                hospitals = favoriteHospitalService.findByUId(uId);   
            } catch (Exception e) {
                return handleFail("조회에 실패하였습니다.", HttpStatus.BAD_REQUEST);
            }
        } else {
            return handleFail("잘못된 접근입니다.", HttpStatus.BAD_REQUEST);
        }       

        return handleSuccess(hospitals);

    }
    
    @ApiOperation("즐겨찾기 삭제하기")
    @PostMapping(value="/delete")
    public ResponseEntity<Map<String, Object>> deleteFavoriteHospital(@RequestBody FavoriteHospital favoriteHospital) {

        try {
            favoriteHospitalService.delete(favoriteHospital);
        } catch (Exception e) {
            return handleFail("삭제에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }

        return handleSuccess("삭제를 완료하였습니다.");
        
    }

}