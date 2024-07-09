package com.example.interviewmatching.controller;

import com.example.dto.DiscordTokenResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")
public class OAuthController {

    @Value("${discord.client-id}")
    private String clientId;

    @Value("${discord.client-secret}")
    private String clientSecret;

    @Value("${discord.redirect-uri}")
    private String redirectUri;

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping("/discord/token")
    public ResponseEntity<?> exchangeCodeForToken(@RequestParam("code") String code) {
        String tokenUrl = "https://discord.com/api/oauth2/token";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        // Manually create the request body as URL-encoded
        String requestBody = "client_id=" + clientId +
                "&client_secret=" + clientSecret +
                "&grant_type=authorization_code" +
                "&code=" + code +
                "&redirect_uri=" + redirectUri;

        // Use HttpEntity<String> to send the request body as a URL-encoded string
        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        // Send the POST request to Discord API
        ResponseEntity<DiscordTokenResponse> response = restTemplate.exchange(
                tokenUrl,
                HttpMethod.POST,
                entity,
                DiscordTokenResponse.class);

        // Return the response back to the frontend
        return ResponseEntity.ok(response.getBody());
    }

}