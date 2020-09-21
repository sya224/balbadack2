package com.a305.balbadack.model.dto;

import java.util.List;

import lombok.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ReviewCareinfo {
    Review review;
    List<Careinfo> careinfo;
}