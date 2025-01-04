package com.example.interviewmatching.service;

import com.example.interviewmatching.model.Session;
import com.example.interviewmatching.model.User;
import com.example.interviewmatching.repository.SessionRepository;
import com.example.interviewmatching.repository.TimeSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.interviewmatching.service.DiscordService;

import java.util.Optional;
import java.util.List;
import java.time.LocalDateTime;

@Service
public class SessionService {

    private final SessionRepository sessionRepository;
    private final TimeSlotRepository timeSlotRepository;
    private DiscordService discordService;

    @Autowired
    public SessionService(SessionRepository sessionRepository, TimeSlotRepository timeSlotRepository,
            DiscordService discordService) {
        this.sessionRepository = sessionRepository;
        this.timeSlotRepository = timeSlotRepository;
        this.discordService = discordService;
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

    public List<Session> findMatchingSessions(User user, String topic, String ease, String type,
            List<LocalDateTime> timeSlots) {
        return sessionRepository.findMatchingSessions(topic, type, ease, timeSlots);
    }

    @Transactional
    public void handleMatch(Long sessionId, String user1DiscordId, String user2DiscordId) {
        // Delete the session
        sessionRepository.deleteById(sessionId);

        // Delete all time slots associated with the session
        timeSlotRepository.deleteBySessionId(sessionId);

        // Send a message to the Discord channel
        String mentionUser1 = discordService.mentionUser(user1DiscordId);
        String mentionUser2 = discordService.mentionUser(user2DiscordId);

        String message = mentionUser1 + " and " + mentionUser2 + " have been matched!";
        discordService.sendMessageToChannel("1283145574396330060", message);

    }
}