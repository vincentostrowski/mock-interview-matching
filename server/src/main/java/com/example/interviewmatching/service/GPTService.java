package com.example.interviewmatching.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

@Service
public class GPTService {

    @Value("${openai.api.url}")
    private String apiUrl;

    @Value("${openai.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public GPTService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getGPTResponse(String prompt) {
        try {
            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + apiKey);
            headers.set("Content-Type", "application/json");

            // Set request body
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", "gpt-4o");
            requestBody.put("messages", List.of(
                    Map.of("role", "system", "content",
                            "You are an AI assistant helping interviewers guide candidates during coding interviews. Provide hints and guidance when necessary."),
                    Map.of("role", "user", "content", prompt)));
            requestBody.put("max_tokens", 150);
            requestBody.put("temperature", 0.7);

            // Convert body to JSON
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

            // Send POST request to OpenAI
            ResponseEntity<String> response = restTemplate.postForEntity(apiUrl + "/v1/chat/completions", request,
                    String.class);

            // Parse response
            String responseBody = response.getBody();
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> responseMap = objectMapper.readValue(responseBody, Map.class);

            // Extract the first choice's content
            List<Map<String, Object>> choices = (List<Map<String, Object>>) responseMap.get("choices");
            Map<String, Object> firstChoice = choices.get(0);
            Map<String, Object> message = (Map<String, Object>) firstChoice.get("message");
            return (String) message.get("content");

        } catch (Exception e) {
            throw new RuntimeException("Error while calling OpenAI API", e);
        }
    }
}
