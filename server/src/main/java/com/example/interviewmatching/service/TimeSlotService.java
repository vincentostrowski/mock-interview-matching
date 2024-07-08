package com.example.interviewmatching.service;

import com.example.interviewmatching.model.TimeSlot;
import com.example.interviewmatching.repository.TimeSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TimeSlotService {

    @Autowired
    private TimeSlotRepository timeSlotRepository;

    public List<TimeSlot> saveAll(List<TimeSlot> timeSlots) {
        return timeSlotRepository.saveAll(timeSlots);
    }
}