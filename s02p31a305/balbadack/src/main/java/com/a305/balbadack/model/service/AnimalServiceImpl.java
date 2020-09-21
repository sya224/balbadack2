package com.a305.balbadack.model.service;

import java.util.List;

import javax.transaction.Transactional;

import com.a305.balbadack.model.dto.Animal;
import com.a305.balbadack.repository.AnimalRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnimalServiceImpl implements AnimalService {

    @Autowired
    AnimalRepository animalRepository;

    @Override
    public void create(Animal animal) throws Exception {
        try {
            animalRepository.save(animal);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("동물 등록 중 오류가 발생했습니다.");
        }
    }

    @Override
    public void update(Animal animal) throws Exception {
        try {
            animalRepository.save(animal);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("동물정보 수정 중 오류가 발생했습니다.");
        }

    }

    @Transactional
    @Override
    public void delete(Integer aCode) throws Exception {
        try {
            animalRepository.delete(aCode);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("동물정보 삭제 중 오류가 발생했습니다.");
        }
    }

    @Override
    public Animal findByACode(String uId, Integer aCode) throws Exception {
        Animal animal = null;
        try {
            animal = animalRepository.findByACode(uId, aCode);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return animal;
    }

    @Override
    public List<Animal> findByUid(String uId) throws Exception {
        List<Animal> animals = null;
        try {
            System.out.println("u_id: "+ uId);
            animals = animalRepository.findByUList(uId);
            System.out.println(animals.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return animals;
    }

    @Override
    public List<Integer> findByKeyword(String keyword) {
        try {
            System.out.println(keyword);
            return animalRepository.findByaSpeciesOraType(keyword);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    
}