package com.a305.balbadack.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ChangePassword {
    String id;
    String password;
    String newPassword;

    public ChangePassword(String password, String newPassword) {
        this.password = password;
        this.newPassword = newPassword;
    }
}