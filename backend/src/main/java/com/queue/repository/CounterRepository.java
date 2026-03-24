package com.queue.repository;

import com.queue.entity.Counter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CounterRepository extends JpaRepository<Counter, Long> {
    Optional<Counter> findByAssignedStaffId(Long staffId);
    Optional<Counter> findByOfficeIdAndName(Long officeId, String name);
}
