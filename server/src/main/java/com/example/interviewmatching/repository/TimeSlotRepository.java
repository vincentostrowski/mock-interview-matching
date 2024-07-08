package com.example.interviewmatching.repository;

import com.example.interviewmatching.model.TimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.time.LocalDateTime;

@Repository
public interface TimeSlotRepository extends JpaRepository<TimeSlot, Long> {
    List<TimeSlot> findByStartTimeIn(List<LocalDateTime> startTimes);

    @Modifying
    @Query("DELETE FROM TimeSlot t WHERE t.startTime < :now")
    void deletePastTimeSlots(@Param("now") LocalDateTime now);

    @Modifying
    @Query("DELETE FROM TimeSlot t WHERE t.request.id = :requestId")
    void deleteByRequestId(@Param("requestId") Long requestId);
}
