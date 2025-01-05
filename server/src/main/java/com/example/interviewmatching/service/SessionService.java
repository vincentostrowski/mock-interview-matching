package com.example.interviewmatching.service;

import com.example.interviewmatching.model.Session;
import com.example.interviewmatching.model.TimeSlot;
import com.example.interviewmatching.model.User;
import com.example.interviewmatching.repository.SessionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.List;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class SessionService {

    private final SessionRepository sessionRepository;
    private final TimeSlotService timeSlotService;
    private final UserService userService;

    @Autowired
    public SessionService(SessionRepository sessionRepository, TimeSlotService timeSlotService,
            UserService userService) {
        this.sessionRepository = sessionRepository;
        this.timeSlotService = timeSlotService;
        this.userService = userService;
    }

    public Session createSession(Map<String, Object> requestData) {
        String discordId = (String) requestData.get("user");
        User user = userService.getUserByDiscordId(discordId).orElseThrow(() -> new RuntimeException("User not found"));

        Session session = new Session();
        session.setParticipant1(user);
        session.setTopic((String) requestData.get("topic"));
        session.setEase((String) requestData.get("ease"));
        session.setType((String) requestData.get("type"));

        // Creating the time slots
        List<String> timeSlotStrings = (List<String>) requestData.get("timeSlots");
        List<TimeSlot> timeSlots = timeSlotStrings.stream()
                .map(time -> {
                    TimeSlot timeSlot = new TimeSlot();
                    timeSlot.setStartTime(LocalDateTime.parse(time));
                    timeSlot.setSession(session);
                    return timeSlot;
                })
                .collect(Collectors.toList());

        Session savedSession = this.saveSession(session);
        timeSlotService.saveAll(timeSlots);

        return savedSession;
    }

    public List<Session> getSessionsByStatusAndUser(String discordId, Session.Status status) {
        User user = userService.getUserByDiscordId(discordId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return sessionRepository.findByStatusAndUser(status, user);
    }

    public Session saveSession(Session session) {
        return sessionRepository.save(session);
    }

    public Optional<Session> getSessionById(Long id) {
        return sessionRepository.findById(id);
    }

    public void deleteSessionById(Long id) {
        sessionRepository.deleteById(id);
    }

    public List<Session> fetchMatchingSessions(Map<String, Object> requestData) {
        String discordId = (String) requestData.get("user");
        User user = userService.getUserByDiscordId(discordId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String topic = (String) requestData.get("topic");
        String ease = (String) requestData.get("ease");
        String type = (String) requestData.get("type");
        List<String> timeSlotStrings = (List<String>) requestData.get("timeSlots");
        List<LocalDateTime> timeSlots = timeSlotStrings.stream()
                .map(LocalDateTime::parse)
                .collect(Collectors.toList());

        return sessionRepository.findMatchingSessions(user, topic, type, ease, timeSlots);
    }

    @Transactional
    public void handleMatch(Long sessionId, Map<String, Object> requestData) {
        // Validate and retrieve the user
        String discordId = (String) requestData.get("user");
        User user = userService.getUserByDiscordId(discordId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Validate and retrieve the session
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        // Update the session
        session.setParticipant2(user);
        session.setStatus(Session.Status.SCHEDULED);
        sessionRepository.save(session);

        // Parse the provided time slots
        List<String> timeSlotStrings = (List<String>) requestData.get("timeSlots");
        List<LocalDateTime> timeSlots = timeSlotStrings.stream()
                .map(LocalDateTime::parse)
                .collect(Collectors.toList());

        // Delegate time slot deletion to the TimeSlotService
        timeSlotService.deleteTimeSlots(sessionId, timeSlots);

        // Send a message to the Discord channel
        /*
         * String mentionUser1 = discordService.mentionUser(participant1_DiscordId);
         * String mentionUser2 = discordService.mentionUser(participant2_DiscordId);
         * 
         * String message = mentionUser1 + " and " + mentionUser2 +
         * " have been matched!";
         * discordService.sendMessageToChannel("1283145574396330060", message);
         */

    }
}