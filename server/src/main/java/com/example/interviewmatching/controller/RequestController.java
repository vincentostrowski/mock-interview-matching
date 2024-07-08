package com.example.interviewmatching.controller;

import com.example.interviewmatching.model.Request;
import com.example.interviewmatching.model.TimeSlot;
import com.example.interviewmatching.model.User;
import com.example.interviewmatching.service.RequestService;
import com.example.interviewmatching.service.TimeSlotService;
import com.example.interviewmatching.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/requests")
@CrossOrigin(origins = "http://localhost:5173")
public class RequestController {

    @Autowired
    private RequestService requestService;

    @Autowired
    private UserService userService;

    @Autowired
    private TimeSlotService timeSlotService;

    @PostMapping
    public Request createRequest(@RequestBody Map<String, Object> requestData) {
        String discordId = (String) requestData.get("user");
        User user = userService.getUserByDiscordId(discordId).orElseThrow(() -> new RuntimeException("User not found"));

        Request request = new Request();
        request.setUser(user);
        request.setTopic((String) requestData.get("topic"));
        request.setEase((String) requestData.get("ease"));
        request.setType((String) requestData.get("type"));

        // Map the time slots
        List<String> timeSlotStrings = (List<String>) requestData.get("timeSlots");
        List<TimeSlot> timeSlots = timeSlotStrings.stream()
                .map(time -> {
                    TimeSlot timeSlot = new TimeSlot();
                    timeSlot.setStartTime(LocalDateTime.parse(time));
                    timeSlot.setRequest(request);
                    return timeSlot;
                })
                .collect(Collectors.toList());

        Request savedRequest = requestService.saveRequest(request);
        timeSlotService.saveAll(timeSlots);

        return savedRequest;
    }

    @PostMapping("/view_matches")
    public List<Request> viewMatches(@RequestBody Map<String, Object> requestData) {

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

        return requestService.findMatchingRequests(user, topic, ease, type, timeSlots);
    }

    @PostMapping("/handle_match")
    public void handleMatch(@RequestBody Map<String, Object> requestData) {
        Long requestId = ((Number) requestData.get("requestId")).longValue();
        String user1DiscordId = (String) requestData.get("user1DiscordId");
        String user2DiscordId = (String) requestData.get("user2DiscordId");

        requestService.handleMatch(requestId, user1DiscordId, user2DiscordId);
    }

}