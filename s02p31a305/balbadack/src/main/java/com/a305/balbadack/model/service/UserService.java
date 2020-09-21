package com.a305.balbadack.model.service;

import com.a305.balbadack.model.dto.User;
import java.util.*;

public interface UserService {
    
    public boolean create(User user) throws Exception;
    public void delete(String id) throws Exception;
    public void update(User user) throws Exception;
    public User findById(String id) throws Exception;

    public boolean updatePassword(String id, String oldPw, String newPw) throws Exception;

    public List<User> findAll() throws Exception;

    public boolean login(String id, String password) throws Exception;
}