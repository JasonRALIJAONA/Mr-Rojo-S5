package com.cloud.crypto.front;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/crypto")
public class HomeController {
    @GetMapping
    public ModelAndView index() {
        ModelAndView m = new ModelAndView("index");
        return m; // 
    }
}
