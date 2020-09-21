package com.a305.balbadack.model.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.*;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CustomUserdetails implements UserDetails {

    @JsonIgnore
    private String uId;         // email
    
    @JsonIgnore
    private String uPassword;   // password
    
    @JsonIgnore
    private String uName;       // name
    
    @JsonIgnore
    private Collection<? extends GrantedAuthority> uAuthority;  // 
    
    @JsonIgnore
    private boolean enabled;

    public CustomUserdetails(String uId, String uPassword, String uName, Collection<? extends GrantedAuthority> uAuthority) {
        this.uId = uId;
        this.uPassword = uPassword;
        this.uName = uName;
        this.uAuthority = uAuthority;
    }

    public static CustomUserdetails create(User user) {
        List<GrantedAuthority> uAuthority = new ArrayList<GrantedAuthority>();

        String role = null;
        switch(user.getUCode()) {    
            case 2: role = "ROLE_ADMIN";
                uAuthority.add(new SimpleGrantedAuthority(role));
            case 1: role = "ROLE_STAFF"; 
                uAuthority.add(new SimpleGrantedAuthority(role));
            case 0: role = "ROLE_USER"; 
                uAuthority.add(new SimpleGrantedAuthority(role));
        }

        CustomUserdetails customUserdetails = new CustomUserdetails(user.getUId(), user.getUPw(), user.getUName(),
                uAuthority);
                
        return customUserdetails;
    }

    /**
     * UserDetails
     */
    @Override
	public String getPassword() {
		return uPassword;
	}
    
    @Override
	public boolean isEnabled() {
        // return enabled;
        return true;
	}

	public String getNAME() {
		return uName;
	}

	public void setNAME(String name) {
		this.uName = name;
    }
    
    @Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
        // ArrayList<GrantedAuthority> auth = new ArrayList<GrantedAuthority>();
        // auth.add(new SimpleGrantedAuthority(uAuthority));
        // return auth;
        return uAuthority;
    }
    
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public String getUsername() {
        return this.uId;
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    
}