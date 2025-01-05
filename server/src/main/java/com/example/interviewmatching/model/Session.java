package com.example.interviewmatching.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private User participant1; // The user who created this request

    @ManyToOne
    @JoinColumn(nullable = true)
    private User participant2; // The user who accepted this request

    @Column(nullable = false)
    private String topic; // Example: "Data Structures", "System Design", etc.

    @Column(nullable = false)
    private String ease; // Example: "Easy", "Medium", "Hard", etc.

    @Column(nullable = false)
    private String type; // "Guided", "Non-Guided"

    @Column(nullable = true)
    private String problem1;

    @Column(nullable = true)
    private String problem2;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    public enum Status {
        REQUESTED,
        SCHEDULED,
        COMPLETED
    }

    // seems like this will be called before the entity is persisted to the
    // database, so no need to call this method explicitly
    @PrePersist
    protected void onCreate() {
        this.status = Status.REQUESTED;
    }

    // Constructors
    public Session() {
    }
}
