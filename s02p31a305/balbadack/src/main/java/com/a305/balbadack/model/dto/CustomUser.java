package com.a305.balbadack.model.dto;

import java.util.Set;
import java.util.HashSet;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

// @Getter
// @Setter
// @ToString
// @Entity
// @AllArgsConstructor
// @NoArgsConstructor
public class CustomUser {
    
    // private static final long serialVersionUID = -3009157732242241606L;
	@Id
	private Long id;

	private String email;

	private String nickname;

	private String password;

    private Set<Role> roles = new HashSet<>();

    public Set<Role> getRoles () {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

}