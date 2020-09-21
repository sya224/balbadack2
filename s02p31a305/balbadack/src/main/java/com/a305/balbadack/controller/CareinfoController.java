package com.a305.balbadack.controller;

import java.util.List;

import com.a305.balbadack.model.dto.Careinfo;
import com.a305.balbadack.model.service.CareinfoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins="{*}")
@RestController
@Api(value="CareinfoController", description="진료정보")
@RequestMapping("/careinfo/*")
public class CareinfoController {
    
    @Autowired
    CareinfoService careinfoService;

    @ApiOperation("진료 정보 등록하기")
    @PostMapping(value="/insert")
    public void insertCareinfo(@RequestBody Careinfo careinfo) {
        careinfoService.insert(careinfo);
    }

    @ApiOperation("진료 정보 수정하기")
    @PostMapping(value="/update")
    public void updateCareinfo(@RequestBody Careinfo careinfo) {
        careinfoService.update(careinfo);
    }

    @ApiOperation("진료 정보 삭제하기")
    @PostMapping(value="/delete")
    public void deleteCareinfo(@RequestBody Careinfo careinfo) {
        careinfoService.delete(careinfo);
    }

    @ApiOperation("진료 정보 리뷰별 조회하기")
    @PostMapping(value="/findByReview")
    public List<Careinfo> findCareinfoByReview(@RequestBody int r_code) {
        List<Careinfo> careinfos = careinfoService.findByR_code(r_code);
        return careinfos;
    }

}