package com.queue.repository;

import com.queue.entity.GovService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GovServiceRepository extends JpaRepository<GovService, Long> {
    List<GovService> findByDepartmentId(Long departmentId);
    Optional<GovService> findByDepartmentIdAndName(Long departmentId, String name);
}
