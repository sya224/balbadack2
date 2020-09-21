package com.a305.balbadack.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.StringTokenizer;

import com.a305.balbadack.model.dto.Careinfo;
import com.a305.balbadack.model.dto.Hospital;
import com.a305.balbadack.model.dto.HospitalCarelist;
import com.a305.balbadack.model.dto.Review;
import com.a305.balbadack.model.dto.ReviewCareinfo;
import com.a305.balbadack.model.service.AnimalService;
import com.a305.balbadack.model.service.CareinfoService;
import com.a305.balbadack.model.service.HospitalCarelistService;
import com.a305.balbadack.model.service.HospitalService;
import com.a305.balbadack.model.service.ReviewService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = { "*" })
@RestController
@Api(value = "ReviewController", description = "리뷰")
@RequestMapping("/review/*")
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @Autowired
    CareinfoService careinfoService;

    @Autowired
    HospitalCarelistService hospitalCarelistService;

    @Autowired
    AnimalService animalService;

    @Autowired
    HospitalService hospitalService;

    String[] animalList = { "햄스터", "고양이", "강아지", "토끼", "이구아나", "앵무새", "새", "개", "거북이", "고슴도치", "달팽이", "라쿤", "기니피그",
            "장수풍뎅이", "미어캣", "다람쥐", "돼지" };

    @ApiOperation("리뷰 등록")
    @PostMapping("/insert")
    public void insertReview(@RequestBody ReviewCareinfo reviewCareinfo) {

        Review review = reviewCareinfo.getReview();
        List<Careinfo> careinfos = reviewCareinfo.getCareinfo();

        // 리뷰 테이블에 리뷰 등록
        System.out.println(review);
        review.setRDate(new Date());
        reviewService.insert(review);

        int getrCode = reviewService.findRecentReviewsRCode();
        review.setRCode(getrCode);

        // careinfo 테이블에 진료 정보 등록
        for (int i = 0; i < careinfos.size(); i++) {
            Careinfo careinfo = careinfos.get(i);
            careinfo.setReview(review);
            careinfoService.insert(careinfo);

            // 동시에 hospital carelist에 등록
            String carelist = careinfo.getCiName();
            int price = careinfo.getCiPrice();
            int hcode = careinfo.getHospital().getHCode();

            // 해당 진료항목이 hospita carelist에 있는지 확인
            HospitalCarelist hospitalcarelist = hospitalCarelistService.findByhCodeAndHcName(hcode, carelist);
            if (hospitalcarelist != null) {
                // 가격 업데이트
                if (price < hospitalcarelist.getHcMin()) {
                    hospitalcarelist.setHcMin(price);
                    hospitalCarelistService.update(hospitalcarelist);
                } else if (price > hospitalcarelist.getHcMax()) {
                    hospitalcarelist.setHcMax(price);
                    hospitalCarelistService.update(hospitalcarelist);
                }
            } else {// 없으면 메뉴판에 새로 집어넣기
                HospitalCarelist newHospitalCarelist = new HospitalCarelist(0, hcode, carelist, price, price);
                hospitalCarelistService.insert(newHospitalCarelist);
            }
        }
    }

    @ApiOperation("모든 리뷰 가져오기")
    @PostMapping("/findAll")
    public List<ReviewCareinfo> findAll() {
        List<Review> re = reviewService.findAll();
        List<ReviewCareinfo> reviewcareinfos = new LinkedList<>();

        for (int i = 0; i < re.size(); i++) {
            re.get(i).setHospital(null);
            re.get(i).setUser(null);
            System.out.println(re.get(i));
            List<Careinfo> careinfos = careinfoService.findByR_code(re.get(i).getRCode());
            reviewcareinfos.add(new ReviewCareinfo(re.get(i), careinfos));
        }

        return reviewcareinfos;
    }

    @ApiOperation("리뷰 하나 가져오기")
    @PostMapping("/findOne")
    public ReviewCareinfo findOne(@RequestParam int r_code) {
        Review re = reviewService.findOne(r_code);

        re.setHospital(null);
        re.setUser(null);
        System.out.println(re);

        List<Careinfo> careinfos = careinfoService.findByR_code(r_code);

        ReviewCareinfo reviewcareinfo = new ReviewCareinfo(re, careinfos);

        return reviewcareinfo;
    }

    @ApiOperation("리뷰 병원별로 가져오기")
    @PostMapping("/findByHospital")
    public List<ReviewCareinfo> findByHospital(@RequestParam int h_code) {
        List<Review> re = reviewService.findByHospital(h_code);
        List<ReviewCareinfo> reviewcareinfos = new LinkedList<>();
        
        for (int i = 0; i < re.size(); i++) {
            re.get(i).setHospital(null);
            re.get(i).setUser(null);
            System.out.println(re.get(i));
            List<Careinfo> careinfos = careinfoService.findByR_code(re.get(i).getRCode());
            reviewcareinfos.add(new ReviewCareinfo(re.get(i), careinfos));
        }

        return reviewcareinfos;
    }

    @ApiOperation("리뷰 회원별로 가져오기")
    @PostMapping("/findByUser")
    public List<ReviewCareinfo> findByUser(@RequestParam String u_id) {
        List<Review> re = reviewService.findByUser(u_id);
        List<ReviewCareinfo> reviewcareinfos = new LinkedList<>();

        for (int i = 0; i < re.size(); i++) {
            re.get(i).setHospital(null);
            re.get(i).setUser(null);
            System.out.println(re.get(i).toString());
            List<Careinfo> careinfos = careinfoService.findByR_code(re.get(i).getRCode());
            reviewcareinfos.add(new ReviewCareinfo(re.get(i), careinfos));
        }
        
        return reviewcareinfos;
    }

    @ApiOperation("목적 List 가져오기")
    @PostMapping("/purpose/{r_purpose}")
    public List<String> getPurpose(@PathVariable String r_purpose) {
        List<String> purpose = reviewService.getPurpose(r_purpose);
        return purpose;
    }

    @ApiOperation("리뷰 검색하기 {'yes' or 'no'} / {'star' or 'good' or 'price'} / {keyword}")
    @PostMapping("/findByKeyword/{distance}/{filter}/{keyword}")
    public List<ReviewCareinfo> findByKeyword(@PathVariable String distance, @PathVariable String filter, @PathVariable String keyword, @RequestParam Double latitude, @RequestParam Double longtitude){

        System.out.println("입력된 검색어 : " + keyword);
        StringTokenizer st = new StringTokenizer(keyword);
        ArrayList<String> keywords = new ArrayList<>();
        while (st.hasMoreTokens()) {
            keywords.add(st.nextToken());
        }

        boolean flag = false;
        String animal = "";
        for (String animalOne : animalList) {
            if (keywords.contains(animalOne)) {
                flag = true;
                animal = animalOne;
                keywords.remove(animalOne);
                break;
            }
        }

        List<Review> reviews = new LinkedList<>();
        
        if(distance.equals("yes")){ // 3km이내
            reviews = find(keywords, flag, animal, true, latitude, longtitude);
        }else{ // 모든 지역
            reviews = find(keywords, flag, animal, false, latitude, longtitude);
        }
        
        if(filter.equals("star")){
            Collections.sort(reviews, new Comparator<Review>() {
				@Override
				public int compare(Review o1, Review o2) {
					return (int)o2.getRStarrating() - (int)o1.getRStarrating();
				}
            });
        }else if(filter.equals("good")){
            Collections.sort(reviews, new Comparator<Review>() {
				@Override
				public int compare(Review o1, Review o2) {
					return (int)o2.getRTotalgood() - (int)o1.getRTotalgood();
				}
            });
        }else if(filter.equals("price")){
            // 각 리뷰와 연결된 careinfo의 ciname중 keyword가 들어가 있는 것들을 찾아서
            // review의 min을 설정. 없으면 그냥 젤 작은 값이 min으로 나오게하자
            for (Review review : reviews) {
                int min = Integer.MAX_VALUE;
                boolean isKeyword = false;
                List<Careinfo> ci = careinfoService.findByR_code(review.getRCode());
                point : 
                for (Careinfo careinfo : ci) {
                    for (String word : keywords) {
                        if(careinfo.getCiName().contains(word)){
                            isKeyword = true;
                            review.setMin(careinfo.getCiPrice());
                            break point; 
                        }
                    }
                    if(min > careinfo.getCiPrice()) min = careinfo.getCiPrice();
                }
                if(!isKeyword) review.setMin(min);
            }

            Collections.sort(reviews, new Comparator<Review>() {
				@Override
				public int compare(Review o1, Review o2) {
					return (int)o1.getMin() - (int)o2.getMin();
				}
            });
        }

        List<ReviewCareinfo> reviewcareinfos = new LinkedList<>();
        for (Review review : reviews) {
            System.out.println("최종 review .rcode는 " + review.getRCode());
            List<Careinfo> careinfos = careinfoService.findByR_code(review.getRCode());
            reviewcareinfos.add(new ReviewCareinfo(review, careinfos));
        }

        return reviewcareinfos;
    }

    @ApiOperation("리뷰 수정")
    @PutMapping("/update") 
    public void updateReview(@RequestBody Review review, @RequestBody List<Careinfo> careinfos){
        
        reviewService.insert(review);

        for (int i = 0; i < careinfos.size(); i++) {
            Careinfo careinfo = careinfos.get(i);
            // careinfo.setReview(review);
            careinfoService.insert(careinfo);
        }

    }

    @ApiOperation("리뷰 삭제")
    @PostMapping("/delete") 
    public void deleteReview(@RequestParam int r_code){
        reviewService.delete(r_code);
    }

    public List<Review> find(ArrayList<String> keywords, boolean flag, String animal, boolean in3km, Double latitude, Double longtitude) {
        
        List<Integer> hcodeList = new LinkedList<>();
        if(in3km){
            List<Hospital> hospitals = hospitalService.findAllByLocation(latitude, longtitude);
            for (Hospital hospital : hospitals) {
                hcodeList.add(hospital.getHCode());
            }
        }

        if(flag){
            // -- start 1. 동물검색

            // 먼저, animal에서 햄스터인 a_code를 찾음
            // careinfo에서 해당 a_code를 포함한 리스트를 불러와서 그 리스트에 있는 r_code를 저장
            List<Integer> a_codes = animalService.findByKeyword(animal);
            List<Integer> r_codes = new LinkedList<>();
            for (Integer a_code : a_codes) {
                System.out.println("a_code는 " + a_code);
                List<Integer> tmpRCodes = careinfoService.findrCodeByaCode(a_code);
                for (Integer r_code : tmpRCodes) {
                    if(!r_codes.contains(r_code)){
                        r_codes.add(r_code);
                    }
                }
            }

            List<Review> reviews = new LinkedList<>();
            for (Integer r_code : r_codes) {
                System.out.println("r_code는 " + r_code);
                reviews.add(reviewService.findOne(r_code));
            }

            if(in3km){
                for(int i = 0; i < reviews.size(); i++){
                    if(!hcodeList.contains(reviews.get(i).getHospital().getHCode())){
                        reviews.remove(reviews.get(i));
                        i--;
                    }
                }
            }

            System.out.println("찾아진 reviews는 " + reviews.size());

            // -- end 1. 동물검색 output A == reviews
            
            // -- start 2. 방문목적검색
            
            List<Review> B = new LinkedList<>();
            for(int i = 0; i < reviews.size(); i++){
                for (String word : keywords) {
                    System.out.println("keyword는 " + word);
                    if(reviews.get(i).getRPurpose().equals(word)){
                        B.add(reviews.get(i));
                        reviews.remove(i);
                        i--;
                    }
                }
            }
            // B 최신순 정렬
            Collections.sort(B, new Comparator<Review>() {
				@Override
				public int compare(Review o1, Review o2) {	
					return o2.getRCode() - o1.getRCode();
				}
            });

            for (Review review : B) {
                System.out.println("B의 reveiw.rcode는 " + review.getRCode());
            }
            for (Review review : reviews) {
                System.out.println("남은 review는 " + review.getRCode());
            }

            // -- end 2. 방문목적검색 output B

            // -- start 3. 진료항목검색

            List<Review> C = new LinkedList<>();
            for(int i = 0; i < reviews.size(); i++){
                List<Careinfo> C_careinfos = careinfoService.findByR_code(reviews.get(i).getRCode());
                point:
                for (int j = 0; j < C_careinfos.size(); j++) {
                        for (String word : keywords) {
                            System.out.println("keyword는 " + word);
                            if(C_careinfos.get(j).getCiName().equals(word)){
                                C.add(reviews.get(i));
                                reviews.remove(i);
                                i--;
                                break point;
                            }
                        }
                }
            }
            // C 최신순 정렬
            Collections.sort(C, new Comparator<Review>() {
				@Override
				public int compare(Review o1, Review o2) {	
					return o2.getRCode() - o1.getRCode();
				}
            });

            for (Review review : C) {
                System.out.println("C의 reveiw.rcode는 " + review.getRCode());
            }
            for (Review review : reviews) {
                System.out.println("남은 review는 " + review.getRCode());
            }

            // -- end 3. 진료항목검색 output C

            // -- start 4. Contents검색

            List<Review> D = new LinkedList<>();
            for(int i = 0; i < reviews.size(); i++){
                for (String word : keywords) {
                    System.out.println("keyword는 " + word);
                    if(reviews.get(i).getRContent().contains(word)){
                        D.add(reviews.get(i));
                        reviews.remove(i);
                        i--;
                    }
                }
            }
            // D 최신순 정렬
            Collections.sort(D, new Comparator<Review>() {
				@Override
				public int compare(Review o1, Review o2) {	
					return o2.getRCode() - o1.getRCode();
				}
            });

            for (Review review : D) {
                System.out.println("D의 reveiw.rcode는 " + review.getRCode());
            }
            for (Review review : reviews) {
                System.out.println("남은 review는 " + review.getRCode());
            }

            // -- end 4. Contents검색 output D

            // -- start 5. 동물병원검색

            List<Integer> hcodes = new LinkedList<>();
            for (String word : keywords) {
                System.out.println("keyword는 " + word);
                List<Hospital> H = hospitalService.findByKeyword(word, latitude, longtitude);
                for (Hospital hospital : H) {
                    if(hcodes.contains(hospital.getHCode())){
                        hcodes.add(hospital.getHCode());
                    }
                }
            }

            if(in3km){
                for(int i = 0; i < hcodes.size(); i++){
                    if(!hcodeList.contains(hcodes.get(i))){
                        hcodes.remove(hcodes.get(i));
                        i--;
                    }
                }
            }

            // hcode로 리뷰 찾기
            List<Review> E = new LinkedList<>();
            for (Integer hcode : hcodes) {
                List<Review> tmp = reviewService.findByHospital(hcode);
                for (Review review : tmp) {
                    E.add(review);
                }
            }

            // -- end 5. 동물병원검색 output E

            List<Review> result = new LinkedList<>();
            for (Review review : B) {
                result.add(review);
            }
            for (Review review : C) {
                result.add(review);
            }
            for (Review review : D) {
                result.add(review);
            }
            for (Review review : reviews) {
                result.add(review);
            }
            for (Review review : E) {
                result.add(review);
            }
            
            return result;

        }else{

            // -- start 1. 방문목적검색

            List<Review> A = new LinkedList<>();
            for (String word : keywords) {
                List<Review> tmp = reviewService.findByrPurpose(word);
                for (Review review : tmp) {
                    if(!A.contains(review))
                        A.add(review);
                }
            }

            // A 최신순 정렬
            Collections.sort(A, new Comparator<Review>() {
				@Override
				public int compare(Review o1, Review o2) {	
					return o2.getRCode() - o1.getRCode();
				}
            });

            for (Review review : A) {
                System.out.println("A의 reveiw.rcode는 " + review.getRCode());
            }

            // -- end 1. 방문목적검색 output A

            // -- start 2. 진료항목검색

            List<Review> B = new LinkedList<>();
            
            for (String word : keywords) {
                System.out.println("keyword는 " + word);
                List<Careinfo> careinfos = careinfoService.findByCiName(word);
                for (Careinfo careinfo : careinfos) {
                    Review review = reviewService.findOne(careinfo.getReview().getRCode());
                    if(!B.contains(review))
                        B.add(review);
                }
            }
            
            // B 최신순 정렬
            Collections.sort(B, new Comparator<Review>() {
				@Override
				public int compare(Review o1, Review o2) {	
					return o2.getRCode() - o1.getRCode();
				}
            });

            // -- end 2. 진료항목검색 output B

            // -- start 3. Content검색

            List<Review> C = new LinkedList<>();
            for (String word : keywords) {
                List<Review> tmp = reviewService.findByrContent(word);
                for (Review review : tmp) {
                    if(!C.contains(review))
                        C.add(review);
                }
            }

            // C 최신순 정렬
            Collections.sort(C, new Comparator<Review>() {
				@Override
				public int compare(Review o1, Review o2) {	
					return o2.getRCode() - o1.getRCode();
				}
            });

            // -- end 3. Content검색 output C

            // -- start 4. 동물병원검색

            List<Integer> hcodes = new LinkedList<>();
            for (String word : keywords) {
                System.out.println("keyword는 " + word);
                List<Hospital> H = hospitalService.findByKeyword(word, latitude, longtitude);
                for (Hospital hospital : H) {
                    if(hcodes.contains(hospital.getHCode())){
                        hcodes.add(hospital.getHCode());
                    }
                }
            }

            // hcode로 리뷰 찾기
            List<Review> D = new LinkedList<>();
            for (Integer hcode : hcodes) {
                List<Review> tmp = reviewService.findByHospital(hcode);
                for (Review review : tmp) {
                    D.add(review);
                }
            }

            // -- end 4. 동물병원검색 output D

            List<Review> result = new LinkedList<>();

            for (Review review : A) {
                if(!result.contains(review))
                    result.add(review);
            }
            for (Review review : B) {
                if(!result.contains(review))
                    result.add(review);
            }
            for (Review review : C) {
                if(!result.contains(review))
                    result.add(review);
            }
            for (Review review : D) {
                if(!result.contains(review))
                    result.add(review);
            }

            if(in3km){
                for(int i = 0; i < result.size(); i++){
                    if(!hcodeList.contains(result.get(i).getHospital().getHCode())){
                        result.remove(result.get(i));
                        i--;
                    }
                }
            }

            return result;
        }

    }

}