package com.queue.repository;

import com.queue.entity.Queue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface QueueRepository extends JpaRepository<Queue, Long> {
    Optional<Queue> findByOfficeIdAndDepartmentIdAndServiceIdAndQueueDate(Long officeId, Long departmentId, Long serviceId, LocalDate queueDate);
}
