package com.queue.repository;

import com.queue.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
    List<Department> findByOfficeId(Long officeId);
    Optional<Department> findByOfficeIdAndName(Long officeId, String name);
}
