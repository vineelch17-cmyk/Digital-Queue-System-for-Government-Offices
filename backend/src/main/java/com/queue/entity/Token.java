package com.queue.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Token {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String tokenNumber;

    @Column(nullable = false)
    private Integer queueSequence;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TokenStatus status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PriorityType priorityType;

    private LocalDateTime createdAt;

    private LocalDateTime calledAt;

    private LocalDateTime completedAt;

    private LocalDateTime expiresAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"password"})
    private User citizen;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "queue_id", nullable = false)
    @JsonIgnoreProperties({"office", "department", "service"})
    private Queue queue;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "counter_id")
    private Counter counter;

    @OneToOne(mappedBy = "token", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Payment payment;

    @PrePersist
    void prePersist() {
        createdAt = LocalDateTime.now();
    }
}
