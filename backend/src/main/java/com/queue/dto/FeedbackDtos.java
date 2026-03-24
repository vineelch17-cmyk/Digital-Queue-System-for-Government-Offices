package com.queue.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

public class FeedbackDtos {

    @Getter
    @Setter
    public static class FeedbackRequest {
        @NotNull
        private Long tokenId;
        @Min(1)
        @Max(5)
        private Integer rating;
        @NotBlank
        private String comments;
    }
}
