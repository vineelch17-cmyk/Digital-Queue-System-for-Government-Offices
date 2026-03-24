package com.queue.service;

import com.queue.dto.QueueDtos;
import com.queue.entity.*;
import com.queue.exception.BadRequestException;
import com.queue.exception.ResourceNotFoundException;
import com.queue.repository.*;
import com.queue.util.TokenGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QueueService {

    private final QueueRepository queueRepository;
    private final TokenRepository tokenRepository;
    private final OfficeRepository officeRepository;
    private final DepartmentRepository departmentRepository;
    private final GovServiceRepository govServiceRepository;
    private final UserRepository userRepository;
    private final QueueRealtimeService realtimeService;
    private final NotificationService notificationService;
    private final TokenGenerator tokenGenerator;
    private final PaymentService paymentService;

    @Transactional
    public QueueDtos.TokenStatusResponse joinQueue(String email, QueueDtos.JoinQueueRequest request) {
        User citizen = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Office office = officeRepository.findById(request.getOfficeId())
                .orElseThrow(() -> new ResourceNotFoundException("Office not found"));
        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department not found"));
        GovService service = govServiceRepository.findById(request.getServiceId())
                .orElseThrow(() -> new ResourceNotFoundException("Service not found"));

        validateQueueSelection(citizen, office, department, service);

        Queue queue = queueRepository.findByOfficeIdAndDepartmentIdAndServiceIdAndQueueDate(
                office.getId(), department.getId(), service.getId(), LocalDate.now()
        ).orElseGet(() -> queueRepository.save(Queue.builder()
                .office(office)
                .department(department)
                .service(service)
                .queueDate(LocalDate.now())
                .active(true)
                .build()));

        int existingCount = tokenRepository.findByQueueIdOrderByQueueSequenceAsc(queue.getId()).size();
        int sequence = existingCount + 1;
        int effectiveOrder = request.getPriorityType() == PriorityType.NORMAL ? sequence : sequence - 1000;

        Token token = tokenRepository.save(Token.builder()
                .tokenNumber(tokenGenerator.generate(office.getName().substring(0, Math.min(3, office.getName().length())).toUpperCase(), sequence))
                .queueSequence(effectiveOrder)
                .status(TokenStatus.WAITING)
                .priorityType(request.getPriorityType() == null ? PriorityType.NORMAL : request.getPriorityType())
                .expiresAt(LocalDateTime.now().plusHours(8))
                .citizen(citizen)
                .queue(queue)
                .build());

        BigDecimal feeAmount = service.getFeeAmount() == null ? BigDecimal.ZERO : service.getFeeAmount();
        if (feeAmount.compareTo(BigDecimal.ZERO) > 0) {
            Payment payment = paymentService.createSuccessfulPayment(
                    citizen,
                    token,
                    feeAmount,
                    request.getPaymentMethod(),
                    request.getPaymentReference()
            );
            token.setPayment(payment);
            tokenRepository.save(token);
            notificationService.create(
                    citizen,
                    "Token generated",
                    "Your token " + token.getTokenNumber() + " is active. Payment: " + payment.getReferenceNumber(),
                    "QUEUE"
            );
        } else {
            notificationService.create(citizen, "Token generated", "Your token " + token.getTokenNumber() + " is active.", "QUEUE");
        }
        publishQueueSnapshot(queue);
        return mapToken(token);
    }

    public QueueDtos.TokenStatusResponse getStatus(Long tokenId) {
        return mapToken(getToken(tokenId));
    }

    @Transactional
    public void cancelToken(String email, Long tokenId) {
        Token token = getToken(tokenId);
        if (!token.getCitizen().getEmail().equals(email)) {
            throw new BadRequestException("Token does not belong to the current user");
        }
        if (token.getStatus() == TokenStatus.COMPLETED || token.getStatus() == TokenStatus.CALLED) {
            throw new BadRequestException("This token can no longer be cancelled");
        }
        token.setStatus(TokenStatus.CANCELLED);
        tokenRepository.save(token);
        publishQueueSnapshot(token.getQueue());
    }

    public List<QueueDtos.TokenStatusResponse> getCitizenTokens(String email) {
        Long userId = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"))
                .getId();
        return tokenRepository.findByCitizenIdOrderByCreatedAtDesc(userId).stream()
                .map(this::mapToken)
                .toList();
    }

    public QueueDtos.QueueSnapshotResponse getQueueSnapshot(Long queueId) {
        Queue queue = queueRepository.findById(queueId)
                .orElseThrow(() -> new ResourceNotFoundException("Queue not found"));
        return buildSnapshot(queue);
    }

    public QueueDtos.QueueSnapshotResponse buildSnapshot(Queue queue) {
        return QueueDtos.QueueSnapshotResponse.builder()
                .queueId(queue.getId())
                .officeName(queue.getOffice().getName())
                .departmentName(queue.getDepartment().getName())
                .serviceName(queue.getService().getName())
                .serviceFee(queue.getService().getFeeAmount())
                .tokens(tokenRepository.findByQueueIdOrderByQueueSequenceAsc(queue.getId()).stream().map(this::mapToken).toList())
                .build();
    }

    public QueueDtos.TokenStatusResponse mapToken(Token token) {
        List<TokenStatus> activeStates = List.of(TokenStatus.WAITING, TokenStatus.CALLED, TokenStatus.SKIPPED);
        List<Token> queueTokens = tokenRepository.findByQueueIdOrderByQueueSequenceAsc(token.getQueue().getId());
        long ahead = queueTokens.stream()
                .filter(item -> activeStates.contains(item.getStatus()))
                .filter(item -> item.getQueueSequence() < token.getQueueSequence())
                .count();
        long waitingCount = queueTokens.stream().filter(item -> item.getStatus() == TokenStatus.WAITING).count();
        long estimatedWait = ahead * (token.getQueue().getService().getAvgServiceTimeMinutes() == null
                ? 10
                : token.getQueue().getService().getAvgServiceTimeMinutes());

        return QueueDtos.TokenStatusResponse.builder()
                .tokenId(token.getId())
                .tokenNumber(token.getTokenNumber())
                .status(token.getStatus())
                .queuePosition((int) ahead + 1)
                .waitingCount(waitingCount)
                .estimatedWaitMinutes(estimatedWait)
                .serviceName(token.getQueue().getService().getName())
                .officeName(token.getQueue().getOffice().getName())
                .departmentName(token.getQueue().getDepartment().getName())
                .counterName(token.getCounter() != null ? token.getCounter().getName() : null)
                .serviceFee(token.getQueue().getService().getFeeAmount())
                .paymentMethod(token.getPayment() != null ? token.getPayment().getMethod() : null)
                .paymentStatus(token.getPayment() != null ? token.getPayment().getStatus() : null)
                .paymentReference(token.getPayment() != null ? token.getPayment().getReferenceNumber() : null)
                .createdAt(token.getCreatedAt())
                .calledAt(token.getCalledAt())
                .completedAt(token.getCompletedAt())
                .build();
    }

    public void publishQueueSnapshot(Queue queue) {
        QueueDtos.QueueSnapshotResponse snapshot = buildSnapshot(queue);
        realtimeService.publishQueueUpdate(queue.getId(), snapshot);
        snapshot.getTokens().forEach(token -> realtimeService.publishTokenUpdate(token.getTokenId(), token));
    }

    public List<QueueDtos.DisplayBoardRow> getDisplayBoard(Long officeId) {
        return queueRepository.findAll().stream()
                .filter(queue -> queue.isActive() && LocalDate.now().equals(queue.getQueueDate()))
                .filter(queue -> officeId == null || queue.getOffice().getId().equals(officeId))
                .map(queue -> {
                    List<Token> queueTokens = tokenRepository.findByQueueIdOrderByQueueSequenceAsc(queue.getId());
                    Token current = queueTokens.stream()
                            .filter(token -> token.getStatus() == TokenStatus.CALLED)
                            .min(Comparator.comparingInt(Token::getQueueSequence))
                            .orElse(null);
                    List<String> nextTokens = queueTokens.stream()
                            .filter(token -> token.getStatus() == TokenStatus.WAITING || token.getStatus() == TokenStatus.SKIPPED)
                            .sorted(Comparator.comparingInt(Token::getQueueSequence))
                            .limit(5)
                            .map(Token::getTokenNumber)
                            .toList();
                    long waiting = queueTokens.stream().filter(token -> token.getStatus() == TokenStatus.WAITING).count();

                    return QueueDtos.DisplayBoardRow.builder()
                            .queueId(queue.getId())
                            .officeName(queue.getOffice().getName())
                            .departmentName(queue.getDepartment().getName())
                            .serviceName(queue.getService().getName())
                            .currentToken(current != null ? current.getTokenNumber() : null)
                            .currentCounter(current != null && current.getCounter() != null ? current.getCounter().getName() : null)
                            .currentStatus(current != null ? current.getStatus().name() : "IDLE")
                            .nextTokens(nextTokens)
                            .waitingCount(waiting)
                            .build();
                })
                .toList();
    }

    public Map<String, Long> getTokenStatusCounts() {
        return tokenRepository.findAll().stream()
                .collect(Collectors.groupingBy(token -> token.getStatus().name(), Collectors.counting()));
    }

    @Scheduled(fixedDelay = 60000)
    @Transactional
    public void expireWaitingTokens() {
        List<Token> expired = tokenRepository.findAll().stream()
                .filter(token -> token.getStatus() == TokenStatus.WAITING)
                .filter(token -> token.getExpiresAt() != null && token.getExpiresAt().isBefore(LocalDateTime.now()))
                .toList();
        expired.forEach(token -> token.setStatus(TokenStatus.EXPIRED));
        tokenRepository.saveAll(expired);
        expired.stream().map(Token::getQueue).distinct().forEach(this::publishQueueSnapshot);
    }

    private Token getToken(Long tokenId) {
        return tokenRepository.findById(tokenId)
                .orElseThrow(() -> new ResourceNotFoundException("Token not found"));
    }

    private void validateQueueSelection(User citizen, Office office, Department department, GovService service) {
        if (!department.getOffice().getId().equals(office.getId())) {
            throw new BadRequestException("Department does not belong to the selected office");
        }
        if (!service.getDepartment().getId().equals(department.getId())) {
            throw new BadRequestException("Service does not belong to the selected department");
        }
        if (tokenRepository.existsByCitizenIdAndStatusIn(
                citizen.getId(),
                List.of(TokenStatus.WAITING, TokenStatus.CALLED, TokenStatus.SKIPPED)
        )) {
            throw new BadRequestException("You already have an active token");
        }
        if (!office.isActive()) {
            throw new BadRequestException("Selected office is not active");
        }
    }
}
