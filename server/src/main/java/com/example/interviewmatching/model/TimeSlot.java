package com.example.interviewmatching.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "TimeSlot", indexes = {
        @Index(name = "idx_start_time", columnList = "startTime"),
        @Index(name = "idx_request_id", columnList = "request_id")
})
@Setter
@Getter
public class TimeSlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime startTime; // Start time of the interview

    @ManyToOne
    @JoinColumn(name = "request_id", nullable = false)
    private Request request; // The request associated with this time slot

    public TimeSlot() {
    }
}
