package com.queue.service;

import com.queue.dto.AdminDtos;
import com.queue.entity.*;
import com.queue.exception.ResourceNotFoundException;
import com.queue.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final OfficeRepository officeRepository;
    private final DepartmentRepository departmentRepository;
    private final GovServiceRepository govServiceRepository;
    private final CounterRepository counterRepository;
    private final UserRepository userRepository;
    private final QueueRepository queueRepository;
    private final TokenRepository tokenRepository;
    private final QueueService queueService;

    public Office createOffice(AdminDtos.OfficeRequest request) {
        return officeRepository.save(Office.builder()
                .name(request.getName())
                .address(request.getAddress())
                .city(request.getCity())
                .state(request.getState())
                .contactNumber(request.getContactNumber())
                .active(true)
                .build());
    }

    public Department createDepartment(AdminDtos.DepartmentRequest request) {
        Office office = officeRepository.findById(request.getOfficeId())
                .orElseThrow(() -> new ResourceNotFoundException("Office not found"));
        return departmentRepository.save(Department.builder()
                .office(office)
                .name(request.getName())
                .description(request.getDescription())
                .build());
    }

    public GovService createService(AdminDtos.ServiceRequest request) {
        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department not found"));
        return govServiceRepository.save(GovService.builder()
                .department(department)
                .name(request.getName())
                .description(request.getDescription())
                .avgServiceTimeMinutes(request.getAvgServiceTimeMinutes())
                .prioritySupported(request.isPrioritySupported())
                .feeAmount(request.getFeeAmount() == null ? BigDecimal.ZERO : request.getFeeAmount())
                .build());
    }

    public Counter createCounter(AdminDtos.CounterRequest request) {
        Office office = officeRepository.findById(request.getOfficeId())
                .orElseThrow(() -> new ResourceNotFoundException("Office not found"));
        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department not found"));
        User staff = userRepository.findById(request.getStaffUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Staff not found"));
        return counterRepository.save(Counter.builder()
                .office(office)
                .department(department)
                .assignedStaff(staff)
                .name(request.getName())
                .status(request.getStatus())
                .build());
    }

    public AdminDtos.AnalyticsResponse getAnalytics() {
        long activeQueues = queueRepository.findAll().stream()
                .filter(queue -> queue.isActive() && LocalDate.now().equals(queue.getQueueDate()))
                .count();
        long waitingTokens = tokenRepository.findAll().stream().filter(token -> token.getStatus() == TokenStatus.WAITING).count();
        long completedTokens = tokenRepository.findAll().stream().filter(token -> token.getStatus() == TokenStatus.COMPLETED).count();

        return AdminDtos.AnalyticsResponse.builder()
                .totalCitizens(userRepository.findByRole(Role.ROLE_CITIZEN).size())
                .totalStaff(userRepository.findByRole(Role.ROLE_STAFF).size())
                .totalOffices(officeRepository.count())
                .activeQueues(activeQueues)
                .waitingTokens(waitingTokens)
                .completedTokens(completedTokens)
                .tokensByStatus(queueService.getTokenStatusCounts())
                .build();
    }

    public java.util.List<Office> listOffices() {
        return officeRepository.findAll();
    }

    public java.util.List<Department> listDepartments() {
        return departmentRepository.findAll();
    }

    public java.util.List<GovService> listServices() {
        return govServiceRepository.findAll();
    }

    public java.util.List<Counter> listCounters() {
        return counterRepository.findAll();
    }

    public java.util.List<User> listStaffAccounts() {
        return userRepository.findByRole(Role.ROLE_STAFF);
    }
}
