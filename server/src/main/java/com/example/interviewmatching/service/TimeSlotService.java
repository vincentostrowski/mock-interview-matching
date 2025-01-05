package com.example.interviewmatching.service;

import com.example.interviewmatching.model.TimeSlot;
import com.example.interviewmatching.repository.TimeSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TimeSlotService {

    @Autowired
    private TimeSlotRepository timeSlotRepository;

    public List<TimeSlot> saveAll(List<TimeSlot> timeSlots) {
        return timeSlotRepository.saveAll(timeSlots);
    }

    @Transactional
    public void deleteTimeSlots(Long sessionId, List<LocalDateTime> times) {
        // Delete the TimeSlots
        timeSlotRepository.deleteBySessionIdAndStartTimeNotIn(sessionId, times);
    }
}