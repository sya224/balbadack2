package com.a305.balbadack.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import java.util.List;

import com.a305.balbadack.model.dto.Good;
import com.a305.balbadack.model.service.GoodService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "{*}")
@RestController
@Api(value = "GoodController", description = "도움이 됐어요")
@RequestMapping("/good/*")
public class GoodController {

    @Autowired
    GoodService goodService;

    @ApiOperation("도움이 됐어요 등록하기")
    @PostMapping(value = "/insert")
    public void insertGood(@RequestBody Good good) {
        System.out.println(good.toString());
        System.out.println("good.getGcode " + good.getGCode());
        System.out.println("good.get uid " + good.getUser().getUId());
        System.out.println("good.get rcode " + good.getReview().getRCode());
        goodService.insert(good);
    }

    @ApiOperation("도움이 됐어요 회원별 조회하기")
    @PostMapping(value = "/findById")
    public List<Good> findGoodByU_id(@RequestBody String u_id) {
        System.out.println("도움이 됐어요 회원별 조회 u_id : " + u_id);
        List<Good> good = goodService.findByU_id(u_id);
        for (int i = 0, size = good.size(); i < size; i++) {
            good.get(i).setReview(null);
            good.get(i).setUser(null);
        }
        return good;
    }

    @ApiOperation("도움이 됐어요 리뷰별 조회하기")
    @PostMapping(value = "/findByReview")
    public List<Good> findGoodByR_code(@RequestBody int r_code) {
        System.out.println("도움이 됐어요 리뷰별 조회 r_code : " + r_code);
        List<Good> good = goodService.findByR_code(r_code);
        for (int i = 0, size = good.size(); i < size; i++) {
            good.get(i).setReview(null);
            good.get(i).setUser(null);
            /**
             * or good의 Review까지 필요할 때
             * good.get(i).setUser(good.get(i).getUser().setGood(null));
             */
        }

        return good;
    }

    @ApiOperation("도움이 됐어요 삭제하기")
    @DeleteMapping(value = "/delete")
    public void deleteGood(@RequestBody Good good) {
        goodService.delete(good);
    }

}