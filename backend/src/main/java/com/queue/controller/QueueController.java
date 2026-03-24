package com.queue.controller;

import com.queue.dto.QueueDtos;
import com.queue.service.PaymentService;
import com.queue.service.QueueService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/queue")
@RequiredArgsConstructor
public class QueueController {

    private final QueueService queueService;
    private final PaymentService paymentService;

    @PostMapping("/join")
    public QueueDtos.TokenStatusResponse join(Authentication authentication, @Valid @RequestBody QueueDtos.JoinQueueRequest request) {
        return queueService.joinQueue(authentication.getName(), request);
    }

    @GetMapping("/status/{tokenId}")
    public QueueDtos.TokenStatusResponse status(@PathVariable Long tokenId) {
        return queueService.getStatus(tokenId);
    }

    @PostMapping("/cancel")
    public void cancel(Authentication authentication, @RequestParam Long tokenId) {
        queueService.cancelToken(authentication.getName(), tokenId);
    }

    @GetMapping("/my-tokens")
    public Object myTokens(Authentication authentication) {
        return queueService.getCitizenTokens(authentication.getName());
    }

    @GetMapping("/snapshot/{queueId}")
    public QueueDtos.QueueSnapshotResponse snapshot(@PathVariable Long queueId) {
        return queueService.getQueueSnapshot(queueId);
    }

    @GetMapping("/payments")
    public Object payments(Authentication authentication) {
        return paymentService.getPaymentHistory(authentication.getName());
    }
}
