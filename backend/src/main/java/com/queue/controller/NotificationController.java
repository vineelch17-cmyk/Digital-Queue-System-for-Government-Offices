package com.queue.controller;

import com.queue.repository.UserRepository;
import com.queue.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;
    private final UserRepository userRepository;

    @GetMapping
    public Object notifications(Authentication authentication) {
        Long userId = userRepository.findByEmail(authentication.getName()).orElseThrow().getId();
        return notificationService.getForUser(userId);
    }

    @GetMapping("/unread-count")
    public Object unreadCount(Authentication authentication) {
        Long userId = userRepository.findByEmail(authentication.getName()).orElseThrow().getId();
        return java.util.Map.of("unreadCount", notificationService.getUnreadCount(userId));
    }

    @PostMapping("/{notificationId}/read")
    public Object markRead(Authentication authentication, @PathVariable Long notificationId) {
        Long userId = userRepository.findByEmail(authentication.getName()).orElseThrow().getId();
        return notificationService.markAsRead(userId, notificationId);
    }

    @PostMapping("/read-all")
    public Object markAllRead(Authentication authentication) {
        Long userId = userRepository.findByEmail(authentication.getName()).orElseThrow().getId();
        return notificationService.markAllAsRead(userId);
    }
}
