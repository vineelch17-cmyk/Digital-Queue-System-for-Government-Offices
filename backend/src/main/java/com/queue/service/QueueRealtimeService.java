package com.queue.service;

import com.queue.dto.QueueDtos;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QueueRealtimeService {

    private final SimpMessagingTemplate messagingTemplate;

    public void publishQueueUpdate(Long queueId, QueueDtos.QueueSnapshotResponse snapshot) {
        messagingTemplate.convertAndSend("/topic/queues/" + queueId, snapshot);
    }

    public void publishTokenUpdate(Long tokenId, QueueDtos.TokenStatusResponse token) {
        messagingTemplate.convertAndSend("/topic/tokens/" + tokenId, token);
    }
}
