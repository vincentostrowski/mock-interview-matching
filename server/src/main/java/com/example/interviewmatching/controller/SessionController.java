package com.example.interviewmatching.controller;

import com.example.interviewmatching.model.Session;
import com.example.interviewmatching.service.SessionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/sessions")
public class SessionController {

    @Autowired
    private SessionService sessionService;

    @PostMapping
    public ResponseEntity<Session> createSession(@RequestBody Map<String, Object> requestData) {
        Session session = sessionService.createSession(requestData);
        return ResponseEntity.ok(session);
    }

    @PostMapping("/matches")
    public List<Session> fetchMatches(@RequestBody Map<String, Object> requestData) {
        return sessionService.fetchMatchingSessions(requestData);
    }

    @PostMapping("/{sessionId}/match")
    public ResponseEntity<Void> handleMatch(@PathVariable Long sessionId,
            @RequestBody Map<String, Object> requestData) {
        sessionService.handleMatch(sessionId, requestData);
        return ResponseEntity.ok().build(); // Returns a 200 OK response without a body
    }

    @GetMapping
    public ResponseEntity<List<Session>> getSessionsByStatusAndUser(
            @RequestParam Session.Status status,
            @RequestParam String discordId) {
        List<Session> sessions = sessionService.getSessionsByStatusAndUser(discordId, status);
        return ResponseEntity.ok(sessions);
    }
}