package com.example.interviewmatching.controller;

import com.example.interviewmatching.service.GPTService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/gpt")
public class GPTController {

    @Autowired
    private GPTService gptService;

    @RequestMapping(method = RequestMethod.OPTIONS)
    public ResponseEntity<Void> handleOptionsRequest() {
        return ResponseEntity.ok().build();
    }

    // Changed to POST method to handle data in the body
    @PostMapping
    public String getGPTResponse(@RequestBody Map<String, Object> requestData) {
        // Get the prompt from the request body and pass it to the service
        return gptService.getGPTResponse(requestData.get("prompt").toString());
    }
}
