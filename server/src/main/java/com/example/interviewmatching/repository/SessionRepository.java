package com.example.interviewmatching.repository;

import java.time.LocalDateTime;
import java.util.List;
import com.example.interviewmatching.model.Session;
import com.example.interviewmatching.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {

        @Query("SELECT s FROM Session s WHERE s.status = :status AND (s.participant1 = :user OR s.participant2 = :user) ORDER BY s.scheduledTime")
        List<Session> findByStatusAndUser(@Param("status") Session.Status status, @Param("user") User user);

        List<Session> findByTypeAndEaseAndTopic(String type, String ease, String topic);

        // Used to find sessions that match the given topic, type, ease, and time slots
        @Query("SELECT s FROM Session s " +
                        "JOIN TimeSlot t ON t.session = s " +
                        "WHERE s.status = 'REQUESTED' " +
                        "AND s.topic = :topic " +
                        "AND s.type = :type " +
                        "AND s.ease = :ease " +
                        "AND s.participant1 != :user " +
                        "AND t.startTime IN :timeSlots")
        List<Session> findMatchingSessions(@Param("user") User user, @Param("topic") String topic,
                        @Param("type") String type,
                        @Param("ease") String ease,
                        @Param("timeSlots") List<LocalDateTime> timeSlots);
}