package com.queue.dto;

import com.queue.entity.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

public class AuthDtos {

    @Getter
    @Setter
    public static class RegisterRequest {
        @NotBlank
        private String fullName;
        @Email
        private String email;
        @NotBlank
        private String phoneNumber;
        @NotBlank
        private String password;
        private String preferredLanguage;
        private Role role;
    }

    @Getter
    @Setter
    public static class LoginRequest {
        @Email
        private String email;
        @NotBlank
        private String password;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class AuthResponse {
        private String token;
        private Long userId;
        private String fullName;
        private String email;
        private Role role;
    }
}
