package com.example.interviewmatching.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class TimeSlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime startTime; // Start time of the interview

    @ManyToOne
    @JoinColumn(name = "session_id", nullable = false)
    private Session session; // The request associated with this time slot

    public TimeSlot() {
    }
}
