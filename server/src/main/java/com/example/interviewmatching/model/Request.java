package com.example.interviewmatching.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Request", indexes = {
        @Index(name = "idx_user_topic_ease_type", columnList = "user_id, topic, ease, type")
})
@Setter
@Getter
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // The user who created this request

    @Column(nullable = false)
    private String topic; // Example: "Data Structures", "System Design", etc.

    @Column(nullable = false)
    private String ease; // Example: "Easy", "Medium", "Hard", etc.

    @Column(nullable = false)
    private String type; // "Guided", "Non-Guided"

    // Constructors
    public Request() {
    }
}
