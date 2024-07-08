package com.example.interviewmatching.repository;

import java.time.LocalDateTime;
import java.util.List;
import com.example.interviewmatching.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {

    List<Request> findByUserId(Long id);

    List<Request> findByTypeAndEaseAndTopic(String type, String ease, String topic);

    // Used to find requests that match the given topic, type, ease, and time slots
    @Query("SELECT r FROM Request r JOIN TimeSlot t ON t.request = r WHERE r.topic = :topic AND r.ease = :ease AND r.type = :type AND t.startTime IN :timeSlots")
    List<Request> findMatchingRequests(@Param("topic") String topic, @Param("type") String type,
            @Param("ease") String ease, @Param("timeSlots") List<LocalDateTime> timeSlots);

}