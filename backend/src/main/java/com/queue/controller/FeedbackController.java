package com.queue.controller;

import com.queue.dto.FeedbackDtos;
import com.queue.service.FeedbackService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/feedback")
@RequiredArgsConstructor
public class FeedbackController {

    private final FeedbackService feedbackService;

    @PostMapping
    public Object submit(Authentication authentication, @Valid @RequestBody FeedbackDtos.FeedbackRequest request) {
        return feedbackService.submit(authentication.getName(), request);
    }
}
