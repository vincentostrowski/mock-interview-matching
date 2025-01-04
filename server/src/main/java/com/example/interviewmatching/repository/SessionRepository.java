package com.example.interviewmatching.repository;

import java.time.LocalDateTime;
import java.util.List;
import com.example.interviewmatching.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {

    List<Session> findByParticipant1_Id(Long participant1Id);

    // use either of the following two methods to find a session by the id of one of
    // the participants
    List<Session> findByParticipant1_IdOrParticipant2_Id(Long participant1Id, Long participant2Id);

    @Query("SELECT s FROM Session s WHERE s.participant1.id = :userId OR s.participant2.id = :userId")
    List<Session> findByUserParticipation(@Param("userId") Long userId);

    List<Session> findByTypeAndEaseAndTopic(String type, String ease, String topic);

    // Used to find sessions that match the given topic, type, ease, and time slots
    @Query("SELECT s FROM Session s JOIN TimeSlot t ON t.session = s WHERE s.topic = :topic AND s.ease = :ease AND s.type = :type AND t.startTime IN :timeSlots")
    List<Session> findMatchingSessions(@Param("topic") String topic, @Param("type") String type,
            @Param("ease") String ease, @Param("timeSlots") List<LocalDateTime> timeSlots);

}