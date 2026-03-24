package com.queue.controller;

import com.queue.service.StaffService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/staff")
@RequiredArgsConstructor
public class StaffController {

    private final StaffService staffService;

    @PostMapping("/next-token")
    public Object nextToken(Authentication authentication) {
        return staffService.callNextToken(authentication.getName());
    }

    @PostMapping("/skip-token")
    public Object skipToken(@RequestParam Long tokenId) {
        return staffService.skipToken(tokenId);
    }

    @PostMapping("/recall-token")
    public Object recallToken(@RequestParam Long tokenId) {
        return staffService.recallToken(tokenId);
    }

    @PostMapping("/complete-token")
    public Object completeToken(@RequestParam Long tokenId) {
        return staffService.completeToken(tokenId);
    }

    @GetMapping("/waiting-users")
    public Object waitingUsers(Authentication authentication) {
        return staffService.getWaitingUsers(authentication.getName());
    }

    @GetMapping("/assignment")
    public Object assignment(Authentication authentication) {
        return staffService.getAssignment(authentication.getName());
    }
}
