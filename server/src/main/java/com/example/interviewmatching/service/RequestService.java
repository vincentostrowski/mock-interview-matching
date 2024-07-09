package com.example.interviewmatching.service;

import com.example.interviewmatching.model.Request;
import com.example.interviewmatching.model.User;
import com.example.interviewmatching.repository.RequestRepository;
import com.example.interviewmatching.repository.TimeSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.interviewmatching.service.DiscordService;

import java.util.Optional;
import java.util.List;
import java.time.LocalDateTime;

@Service
public class RequestService {

    private final RequestRepository requestRepository;
    private final TimeSlotRepository timeSlotRepository;
    private DiscordService discordService;

    @Autowired
    public RequestService(RequestRepository requestRepository, TimeSlotRepository timeSlotRepository,
            DiscordService discordService) {
        this.requestRepository = requestRepository;
        this.timeSlotRepository = timeSlotRepository;
        this.discordService = discordService;
    }

    public Request saveRequest(Request request) {
        return requestRepository.save(request);
    }

    public Optional<Request> getRequestById(Long id) {
        return requestRepository.findById(id);
    }

    public void deleteRequestById(Long id) {
        requestRepository.deleteById(id);
    }

    public List<Request> findMatchingRequests(User user, String topic, String ease, String type,
            List<LocalDateTime> timeSlots) {
        return requestRepository.findMatchingRequests(topic, type, ease, timeSlots);
    }

    @Transactional
    public void handleMatch(Long requestId, String user1DiscordId, String user2DiscordId) {
        // Delete the request
        requestRepository.deleteById(requestId);

        // Delete all time slots associated with the request
        timeSlotRepository.deleteByRequestId(requestId);

        // Send a message to the Discord channel
        String mentionUser1 = discordService.mentionUser(user1DiscordId);
        String mentionUser2 = discordService.mentionUser(user2DiscordId);

        String message = mentionUser1 + " and " + mentionUser2 + " have been matched!";
        discordService.sendMessageToChannel("1283145574396330060", message);

    }
}