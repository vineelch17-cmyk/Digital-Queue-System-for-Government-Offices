package com.queue.dto;

import com.queue.entity.PaymentMethod;
import com.queue.entity.PaymentStatus;
import com.queue.entity.PriorityType;
import com.queue.entity.TokenStatus;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class QueueDtos {

    @Getter
    @Setter
    public static class JoinQueueRequest {
        @NotNull
        private Long officeId;
        @NotNull
        private Long departmentId;
        @NotNull
        private Long serviceId;
        private PriorityType priorityType = PriorityType.NORMAL;
        private PaymentMethod paymentMethod;
        private String paymentReference;
    }

    @Getter
    @Builder
    public static class TokenStatusResponse {
        private Long tokenId;
        private String tokenNumber;
        private TokenStatus status;
        private Integer queuePosition;
        private Long waitingCount;
        private Long estimatedWaitMinutes;
        private String serviceName;
        private String officeName;
        private String departmentName;
        private String counterName;
        private BigDecimal serviceFee;
        private PaymentMethod paymentMethod;
        private PaymentStatus paymentStatus;
        private String paymentReference;
        private LocalDateTime createdAt;
        private LocalDateTime calledAt;
        private LocalDateTime completedAt;
    }

    @Getter
    @Builder
    public static class QueueSnapshotResponse {
        private Long queueId;
        private String officeName;
        private String departmentName;
        private String serviceName;
        private BigDecimal serviceFee;
        private List<TokenStatusResponse> tokens;
    }

    @Getter
    @Builder
    public static class PaymentHistoryResponse {
        private Long paymentId;
        private Long tokenId;
        private String tokenNumber;
        private BigDecimal amount;
        private PaymentMethod method;
        private PaymentStatus status;
        private String referenceNumber;
        private LocalDateTime paidAt;
    }

    @Getter
    @Builder
    public static class DisplayBoardRow {
        private Long queueId;
        private String officeName;
        private String departmentName;
        private String serviceName;
        private String currentToken;
        private String currentCounter;
        private String currentStatus;
        private List<String> nextTokens;
        private Long waitingCount;
    }

    @Getter
    @Builder
    public static class StaffAssignmentResponse {
        private Long counterId;
        private String counterName;
        private String officeName;
        private String departmentName;
        private String staffName;
        private Long activeTokens;
    }
}
