package com.a305.balbadack.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

public class RootController implements ErrorController {
    @GetMapping("/") // @RequestMapping(value ="/helloworld", method = RequestMethod.GET)
    public String welcome() {
        return "index";
    }

    /** Controller에서 모든 uri에 대하여 index.html로 향하게 하는 함수 */
    @GetMapping("/error")
    public String error(){
        return "index";
    }

    @Override
    public String getErrorPath() {
        return "/error";
    }
}



