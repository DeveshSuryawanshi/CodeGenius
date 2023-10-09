package com.bot.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {
    @GetMapping("/bot/viewpage")
    public String voiceBot() {
        return "bot";
    }
}