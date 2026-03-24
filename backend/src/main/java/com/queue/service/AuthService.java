package com.queue.service;

import com.queue.dto.AuthDtos;
import com.queue.entity.Role;
import com.queue.exception.BadRequestException;
import com.queue.repository.UserRepository;
import com.queue.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthDtos.AuthResponse register(AuthDtos.RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already registered");
        }
        if (userRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            throw new BadRequestException("Phone number already registered");
        }

        Role role = request.getRole() == null ? Role.ROLE_CITIZEN : request.getRole();
        var user = userRepository.save(com.queue.entity.User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .password(passwordEncoder.encode(request.getPassword()))
                .preferredLanguage(request.getPreferredLanguage() == null ? "en" : request.getPreferredLanguage())
                .role(role)
                .enabled(true)
                .build());

        return buildResponse(user);
    }

    public AuthDtos.AuthResponse login(AuthDtos.LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("Invalid credentials"));
        return buildResponse(user);
    }

    public com.queue.entity.User getProfile(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("User not found"));
    }

    private AuthDtos.AuthResponse buildResponse(com.queue.entity.User user) {
        var principal = new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                List.of(() -> user.getRole().name())
        );
        String token = jwtService.generateToken(principal, Map.of("role", user.getRole().name(), "userId", user.getId()));
        return AuthDtos.AuthResponse.builder()
                .token(token)
                .userId(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }
}
