package com.queue.service;

import com.queue.dto.QueueDtos;
import com.queue.entity.Counter;
import com.queue.entity.Token;
import com.queue.entity.TokenStatus;
import com.queue.exception.BadRequestException;
import com.queue.exception.ResourceNotFoundException;
import com.queue.repository.CounterRepository;
import com.queue.repository.TokenRepository;
import com.queue.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StaffService {

    private final CounterRepository counterRepository;
    private final TokenRepository tokenRepository;
    private final UserRepository userRepository;
    private final QueueService queueService;
    private final NotificationService notificationService;

    @Transactional
    public QueueDtos.TokenStatusResponse callNextToken(String email) {
        Counter counter = getCounter(email);
        List<Token> waitingTokens = tokenRepository.findAll().stream()
                .filter(token -> token.getQueue().getDepartment().getId().equals(counter.getDepartment().getId()))
                .filter(token -> token.getStatus() == TokenStatus.WAITING || token.getStatus() == TokenStatus.SKIPPED)
                .sorted(Comparator.comparingInt(Token::getQueueSequence))
                .toList();
        if (waitingTokens.isEmpty()) {
            throw new BadRequestException("No waiting tokens");
        }

        Token token = waitingTokens.get(0);
        token.setStatus(TokenStatus.CALLED);
        token.setCalledAt(LocalDateTime.now());
        token.setCounter(counter);
        tokenRepository.save(token);
        notificationService.create(token.getCitizen(), "Proceed to counter", "Please proceed to " + counter.getName(), "QUEUE");
        queueService.publishQueueSnapshot(token.getQueue());
        return queueService.mapToken(token);
    }

    @Transactional
    public QueueDtos.TokenStatusResponse skipToken(Long tokenId) {
        Token token = getToken(tokenId);
        token.setStatus(TokenStatus.SKIPPED);
        tokenRepository.save(token);
        queueService.publishQueueSnapshot(token.getQueue());
        return queueService.mapToken(token);
    }

    @Transactional
    public QueueDtos.TokenStatusResponse recallToken(Long tokenId) {
        Token token = getToken(tokenId);
        token.setStatus(TokenStatus.CALLED);
        token.setCalledAt(LocalDateTime.now());
        tokenRepository.save(token);
        queueService.publishQueueSnapshot(token.getQueue());
        return queueService.mapToken(token);
    }

    @Transactional
    public QueueDtos.TokenStatusResponse completeToken(Long tokenId) {
        Token token = getToken(tokenId);
        token.setStatus(TokenStatus.COMPLETED);
        token.setCompletedAt(LocalDateTime.now());
        tokenRepository.save(token);
        notificationService.create(token.getCitizen(), "Service completed", "Token " + token.getTokenNumber() + " has been completed.", "QUEUE");
        queueService.publishQueueSnapshot(token.getQueue());
        return queueService.mapToken(token);
    }

    public List<QueueDtos.TokenStatusResponse> getWaitingUsers(String email) {
        Counter counter = getCounter(email);
        return tokenRepository.findAll().stream()
                .filter(token -> token.getQueue().getDepartment().getId().equals(counter.getDepartment().getId()))
                .filter(token -> token.getStatus() == TokenStatus.WAITING || token.getStatus() == TokenStatus.CALLED || token.getStatus() == TokenStatus.SKIPPED)
                .sorted(Comparator.comparingInt(Token::getQueueSequence))
                .map(queueService::mapToken)
                .toList();
    }

    public QueueDtos.StaffAssignmentResponse getAssignment(String email) {
        Counter counter = getCounter(email);
        long activeTokens = tokenRepository.findAll().stream()
                .filter(token -> token.getQueue().getDepartment().getId().equals(counter.getDepartment().getId()))
                .filter(token -> token.getStatus() == TokenStatus.WAITING || token.getStatus() == TokenStatus.CALLED || token.getStatus() == TokenStatus.SKIPPED)
                .count();

        return QueueDtos.StaffAssignmentResponse.builder()
                .counterId(counter.getId())
                .counterName(counter.getName())
                .officeName(counter.getOffice().getName())
                .departmentName(counter.getDepartment().getName())
                .staffName(counter.getAssignedStaff() != null ? counter.getAssignedStaff().getFullName() : null)
                .activeTokens(activeTokens)
                .build();
    }

    private Counter getCounter(String email) {
        Long staffId = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Staff user not found"))
                .getId();
        return counterRepository.findByAssignedStaffId(staffId)
                .orElseThrow(() -> new ResourceNotFoundException("Counter assignment not found"));
    }

    private Token getToken(Long tokenId) {
        return tokenRepository.findById(tokenId)
                .orElseThrow(() -> new ResourceNotFoundException("Token not found"));
    }
}
