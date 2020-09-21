package com.a305.balbadack.model.service;

import java.util.*;

import com.a305.balbadack.model.dto.FavoriteHospital;
import com.a305.balbadack.model.dto.Hospital;

public interface FavoriteHospitalService {
    public void insert(FavoriteHospital favoriteHospital) throws RuntimeException;

    public List<Hospital> findByUId(String u_id) throws RuntimeException;

    public void delete(FavoriteHospital favoriteHospital) throws RuntimeException;
}