package com.queue.controller;

import com.queue.entity.PaymentMethod;
import com.queue.service.QueueService;
import com.queue.repository.DepartmentRepository;
import com.queue.repository.GovServiceRepository;
import com.queue.repository.OfficeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class PublicController {

    private final OfficeRepository officeRepository;
    private final DepartmentRepository departmentRepository;
    private final GovServiceRepository govServiceRepository;
    private final QueueService queueService;

    @GetMapping("/offices")
    public Object offices() {
        return officeRepository.findAll();
    }

    @GetMapping("/departments/{officeId}")
    public Object departments(@PathVariable Long officeId) {
        return departmentRepository.findByOfficeId(officeId);
    }

    @GetMapping("/services/{departmentId}")
    public Object services(@PathVariable Long departmentId) {
        return govServiceRepository.findByDepartmentId(departmentId);
    }

    @GetMapping("/catalog")
    public Object catalog() {
        return Map.of(
                "offices", officeRepository.findAll(),
                "departments", departmentRepository.findAll(),
                "services", govServiceRepository.findAll(),
                "paymentMethods", PaymentMethod.values()
        );
    }

    @GetMapping("/display-board")
    public Object displayBoard(@RequestParam(required = false) Long officeId) {
        return queueService.getDisplayBoard(officeId);
    }
}
