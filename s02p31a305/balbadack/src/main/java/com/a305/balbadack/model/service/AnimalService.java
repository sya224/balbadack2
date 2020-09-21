package com.a305.balbadack.model.service;

import com.a305.balbadack.model.dto.Animal;

import org.springframework.security.access.annotation.Secured;

import java.util.*;

public interface AnimalService {

	@Secured("ROLE_USER")
	public void create(Animal animal) throws Exception;

	@Secured("ROLE_USER")
	public void update(Animal animal) throws Exception;

	@Secured("ROLE_USER")
	public void delete(Integer aCode) throws Exception;

	@Secured("ROLE_USER")
	public Animal findByACode(String u_id, Integer a_code) throws Exception;

	@Secured("ROLE_USER")
	public List<Animal> findByUid(String u_id) throws Exception;

	public List<Integer> findByKeyword(String keyword);
    
}