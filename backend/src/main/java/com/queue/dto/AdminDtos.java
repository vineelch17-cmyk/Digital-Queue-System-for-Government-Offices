package com.queue.dto;

import lombok.*;

import java.math.BigDecimal;
import java.util.Map;

public class AdminDtos {

    @Getter @Setter
    public static class OfficeRequest {
        private String name;
        private String address;
        private String city;
        private String state;
        private String contactNumber;
    }

    @Getter @Setter
    public static class DepartmentRequest {
        private Long officeId;
        private String name;
        private String description;
    }

    @Getter @Setter
    public static class ServiceRequest {
        private Long departmentId;
        private String name;
        private String description;
        private Integer avgServiceTimeMinutes;
        private boolean prioritySupported;
        private BigDecimal feeAmount;
    }

    @Getter @Setter
    public static class CounterRequest {
        private Long officeId;
        private Long departmentId;
        private Long staffUserId;
        private String name;
        private String status;
    }

    @Getter
    @Builder
    public static class AnalyticsResponse {
        private long totalCitizens;
        private long totalStaff;
        private long totalOffices;
        private long activeQueues;
        private long waitingTokens;
        private long completedTokens;
        private Map<String, Long> tokensByStatus;
    }
}
