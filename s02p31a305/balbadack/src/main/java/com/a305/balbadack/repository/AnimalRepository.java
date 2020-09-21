package com.a305.balbadack.repository;

import java.util.List;

import com.a305.balbadack.model.dto.Animal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Integer>{

    @Modifying
    @Query(value = "delete from animal a where a.a_code=:code", nativeQuery = true)
	void delete(@Param("code") Integer code);

    @Query(value = "select * from animal a where a.u_id=:uid", nativeQuery = true)
    List<Animal> findByUList(String uid);
    
    @Query(value = "select * from animal a where a.a_code = :acode and a.u_id=:uid", nativeQuery = true)
    Animal findByACode(@Param("uid") String uid, @Param("acode") Integer acode);

    // List<Animal> findByaSpeciesContainingOrATypeContaining(String aSpecies, String aType);
    // List<Animal> findAllByaSpeciesContainingOratypeContaining(String aSpecies, String aType);
    @Query(value = "select a.a_code from animal a where a.a_species like %:keyword% or a.a_type like %:keyword%", nativeQuery = true)
    List<Integer> findByaSpeciesOraType(String keyword);
    
}