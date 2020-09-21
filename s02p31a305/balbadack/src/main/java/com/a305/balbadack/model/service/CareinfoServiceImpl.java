package com.a305.balbadack.model.service;

import java.util.List;

import com.a305.balbadack.model.dto.Careinfo;
import com.a305.balbadack.repository.CareinfoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CareinfoServiceImpl implements CareinfoService {

    @Autowired
    CareinfoRepository careinfoRepository;

	@Override
	public void insert(Careinfo careinfo) {
		try {
            careinfoRepository.save(careinfo);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    @Override
	public void insert(List<Careinfo> careinfo) {
		try {
            for (int i = 0; i < careinfo.size(); i++) {
                careinfoRepository.save(careinfo.get(i));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
	}

	@Override
	public void update(Careinfo careinfo) {
		try {
            careinfoRepository.save(careinfo);
        } catch (Exception e) {
            e.printStackTrace();
        }
	}

	@Override
	public void delete(Careinfo careinfo) {
		try {
            careinfoRepository.delete(careinfo);
        } catch (Exception e) {
            e.printStackTrace();
        }
	}

	@Override
	public List<Careinfo> findByR_code(int r_code) {
        try{
            return careinfoRepository.findByReview_rCode(r_code);
        }catch(Exception e){
            e.printStackTrace();
        }
        return null;
	}

	@Override
	public List<Integer> findrCodeByaCode(int a_code) {
        try{
            return careinfoRepository.findrCodeByaCode(a_code);
        }catch(Exception e){
            e.printStackTrace();
        }
        return null;
	}

    @Override
    public List<Careinfo> findByCiName(String ci_name) {
        try{
            return careinfoRepository.findByCiNameContaining(ci_name);
        }catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }
    
}