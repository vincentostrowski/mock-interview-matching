package com.example.interviewmatching.controller;

import com.example.interviewmatching.model.Session;
import com.example.interviewmatching.model.TimeSlot;
import com.example.interviewmatching.model.User;
import com.example.interviewmatching.service.SessionService;
import com.example.interviewmatching.service.TimeSlotService;
import com.example.interviewmatching.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/sessions")
public class SessionController {

    @Autowired
    private SessionService sessionService;

    @Autowired
    private UserService userService;

    @Autowired
    private TimeSlotService timeSlotService;

    @PostMapping
    public Session createSession(@RequestBody Map<String, Object> requestData) {
        String discordId = (String) requestData.get("user");
        User user = userService.getUserByDiscordId(discordId).orElseThrow(() -> new RuntimeException("User not found"));

        Session session = new Session();
        session.setParticipant1(user);
        session.setTopic((String) requestData.get("topic"));
        session.setEase((String) requestData.get("ease"));
        session.setType((String) requestData.get("type"));

        // Map the time slots
        List<String> timeSlotStrings = (List<String>) requestData.get("timeSlots");
        List<TimeSlot> timeSlots = timeSlotStrings.stream()
                .map(time -> {
                    TimeSlot timeSlot = new TimeSlot();
                    timeSlot.setStartTime(LocalDateTime.parse(time));
                    timeSlot.setSession(session);
                    return timeSlot;
                })
                .collect(Collectors.toList());

        Session savedSession = sessionService.saveSession(session);
        timeSlotService.saveAll(timeSlots);

        return savedSession;
    }

    @PostMapping("/view_matches")
    public List<Session> viewMatches(@RequestBody Map<String, Object> requestData) {

        String discordId = (String) requestData.get("user");
        User user = userService.getUserByDiscordId(discordId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String topic = (String) requestData.get("topic");
        String ease = (String) requestData.get("ease");
        String type = (String) requestData.get("type");

        // Map the time slots
        List<String> timeSlotStrings = (List<String>) requestData.get("timeSlots");
        List<LocalDateTime> timeSlots = timeSlotStrings.stream()
                .map(LocalDateTime::parse)
                .collect(Collectors.toList());

        return sessionService.findMatchingSessions(user, topic, ease, type, timeSlots);
    }

    @PostMapping("/handle_match")
    public void handleMatch(@RequestBody Map<String, Object> requestData) {
        Long sessionId = ((Number) requestData.get("sessionId")).longValue();
        String user1DiscordId = (String) requestData.get("user1DiscordId");
        String user2DiscordId = (String) requestData.get("user2DiscordId");

        sessionService.handleMatch(sessionId, user1DiscordId, user2DiscordId);
    }

}