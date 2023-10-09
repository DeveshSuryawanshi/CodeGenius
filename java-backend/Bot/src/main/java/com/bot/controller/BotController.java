package com.bot.controller;

import com.bot.model.Request;
import com.bot.model.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.concurrent.CompletableFuture;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/bot")
public class BotController {
    private final StringBuilder conversationHistory = new StringBuilder();
    @Value("${openai.model}")
    private String model;
    @Value("${openai.api.url}")
    private String apiUrl;
    @Autowired
    private RestTemplate restTemplate;

    @CrossOrigin(origins = "*")
    @GetMapping("/chat")
    public CompletableFuture<String> chat(String prompt) {
        return CompletableFuture.supplyAsync(() -> {
            conversationHistory.append("You: ").append(prompt).append("\n");

            String promptWithHistory = conversationHistory + "Bot:";
            Request request = new Request(model, promptWithHistory);

            Response response = restTemplate.postForObject(apiUrl, request, Response.class);

            if (response != null && !response.getChoices().isEmpty()) {
                String aiResponse = response.getChoices().get(0).getMessage().getContent();

                conversationHistory.append("Bot: ").append(aiResponse).append("\n");

                return aiResponse;
            } else {
                throw new RuntimeException("Response is null or empty");
            }
        });
    }
}