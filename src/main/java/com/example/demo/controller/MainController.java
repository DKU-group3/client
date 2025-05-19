package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/login")
    public String login() {
        return "login";  // templates/login.html
    }


    @GetMapping("/search")
    public String search() {
        return "search";  // templates/login.html
    }

    @GetMapping("/mappage")
    public String mappage() {
        return "mappage";  // templates/login.html
    }



    

}
