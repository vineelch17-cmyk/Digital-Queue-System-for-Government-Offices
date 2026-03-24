package com.queue.service;

import com.queue.entity.Notification;
import com.queue.entity.User;
import com.queue.exception.ResourceNotFoundException;
import com.queue.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final JavaMailSender mailSender;

    public Notification create(User user, String title, String message, String type) {
        Notification notification = notificationRepository.save(Notification.builder()
                .user(user)
                .title(title)
                .message(message)
                .type(type)
                .build());
        messagingTemplate.convertAndSend("/topic/notifications/" + user.getId(), notification);
        return notification;
    }

    public List<Notification> getForUser(Long userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public Notification markAsRead(Long userId, Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found"));
        if (!notification.getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("Notification not found");
        }
        notification.setReadFlag(true);
        Notification saved = notificationRepository.save(notification);
        publishUnreadCount(userId);
        return saved;
    }

    public Map<String, Long> markAllAsRead(Long userId) {
        List<Notification> notifications = notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
        notifications.forEach(notification -> notification.setReadFlag(true));
        notificationRepository.saveAll(notifications);
        publishUnreadCount(userId);
        return Map.of("updated", (long) notifications.size());
    }

    public long getUnreadCount(Long userId) {
        return notificationRepository.countByUserIdAndReadFlagFalse(userId);
    }

    public void sendEmail(String to, String subject, String body) {
        // Production email integration hook.
    }

    public void sendSms(String phoneNumber, String message) {
        // Optional SMS integration hook.
    }

    private void publishUnreadCount(Long userId) {
        messagingTemplate.convertAndSend("/topic/notifications/" + userId + "/unread", Map.of("unreadCount", getUnreadCount(userId)));
    }
}
