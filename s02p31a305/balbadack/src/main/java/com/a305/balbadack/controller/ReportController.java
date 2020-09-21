package com.a305.balbadack.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import java.util.List;

import com.a305.balbadack.model.dto.Report;
import com.a305.balbadack.model.service.ReportService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins="{*}")
@RestController
@Api(value="ReportController", description="신고하기")
@RequestMapping("/report/*")
public class ReportController {

    @Autowired
    ReportService ReportService;
    
    @ApiOperation("신고하기 등록하기")
    @PostMapping(value="/insert")
    public void insertReport(@RequestBody Report report) {
        ReportService.insert(report);
    }

    @ApiOperation("신고하기 회원별 조회하기")
    @PostMapping(value="/findById")
    public List<Report> findReportByU_id(@RequestBody String u_id) {
        return ReportService.findByU_id(u_id);
    }

    @ApiOperation("신고하기 리뷰별 조회하기")
    @PostMapping(value="/findByReview")
    public List<Report> findReportByR_code(@RequestBody int r_code) {
        return ReportService.findByR_code(r_code);
    }
    
    // @ApiOperation("신고하기 삭제하기")
    // @PostMapping(value="/delete")
    // public void deleteReport(@RequestBody Report report) {
    //     //re_deleted  true로 바꾸기
    //     ReportService.delete(report);   
    // }

    @ApiOperation("신고하기 삭제하기")
    @PostMapping(value="/delete")
    public void deleteReport(@RequestBody int re_code) {
        //re_deleted  true로 바꾸기
        ReportService.delete(re_code);
    }

    @ApiOperation("신고하기 전체 조회하기")
    @PostMapping(value="/findAll")
    public List<Report> findAll(){
        return ReportService.findAll();
    }
}