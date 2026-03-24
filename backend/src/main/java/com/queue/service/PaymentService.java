package com.queue.service;

import com.queue.dto.QueueDtos;
import com.queue.entity.*;
import com.queue.exception.BadRequestException;
import com.queue.repository.PaymentRepository;
import com.queue.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;

    public Payment createSuccessfulPayment(User user, Token token, BigDecimal amount, PaymentMethod method, String reference) {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) < 0) {
            throw new BadRequestException("Invalid payment amount");
        }
        if (amount.compareTo(BigDecimal.ZERO) > 0 && method == null) {
            throw new BadRequestException("Payment method is required for paid services");
        }

        String paymentReference = (reference == null || reference.isBlank())
                ? "PAY-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase()
                : reference.trim();

        Payment payment = paymentRepository.save(Payment.builder()
                .user(user)
                .token(token)
                .amount(amount)
                .method(method == null ? PaymentMethod.UPI : method)
                .status(PaymentStatus.PAID)
                .referenceNumber(paymentReference)
                .paidAt(LocalDateTime.now())
                .build());
        token.setPayment(payment);
        return payment;
    }

    public List<QueueDtos.PaymentHistoryResponse> getPaymentHistory(String email) {
        Long userId = userRepository.findByEmail(email).orElseThrow(() -> new BadRequestException("User not found")).getId();
        return paymentRepository.findByUserIdOrderByPaidAtDesc(userId).stream()
                .map(payment -> QueueDtos.PaymentHistoryResponse.builder()
                        .paymentId(payment.getId())
                        .tokenId(payment.getToken().getId())
                        .tokenNumber(payment.getToken().getTokenNumber())
                        .amount(payment.getAmount())
                        .method(payment.getMethod())
                        .status(payment.getStatus())
                        .referenceNumber(payment.getReferenceNumber())
                        .paidAt(payment.getPaidAt())
                        .build())
                .toList();
    }
}
