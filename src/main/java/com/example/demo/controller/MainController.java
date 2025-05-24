package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    //로그인 페이지로 리다이렉트
    @GetMapping("/")
    public String redirectToLogin() {
        return "redirect:/login";
    }

    @GetMapping("/login")
    public String login() {
        return "login";  // templates/login.html
    }

    @GetMapping("/search")
    public String search() {
        return "search";  // templates/search.html
    }

    @GetMapping("/mappage")
    public String mappage() {
        return "mappage";  // templates/mappage.html
    }

    @GetMapping("/mypage")
    public String mypage() {
        return "mypage";  // templates/mappage.html
    }
}

