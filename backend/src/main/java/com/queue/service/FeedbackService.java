package com.queue.service;

import com.queue.dto.FeedbackDtos;
import com.queue.entity.Feedback;
import com.queue.exception.ResourceNotFoundException;
import com.queue.repository.FeedbackRepository;
import com.queue.repository.TokenRepository;
import com.queue.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;

    public Feedback submit(String email, FeedbackDtos.FeedbackRequest request) {
        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        var token = tokenRepository.findById(request.getTokenId())
                .orElseThrow(() -> new ResourceNotFoundException("Token not found"));
        return feedbackRepository.save(Feedback.builder()
                .user(user)
                .token(token)
                .rating(request.getRating())
                .comments(request.getComments())
                .build());
    }
}
