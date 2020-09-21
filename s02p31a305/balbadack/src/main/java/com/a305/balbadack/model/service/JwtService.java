package com.a305.balbadack.model.service;

import java.util.*;

import com.a305.balbadack.model.dto.User;

public interface JwtService {
    
    public String getIdFromJwt();

    public User getUserFromJwt();

    public List<String> getAuthorityFromJwt();

    public String getJwt();

}