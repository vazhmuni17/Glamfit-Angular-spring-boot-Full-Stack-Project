package com.Glamfit.Glamfit_backend.repository;

import com.Glamfit.Glamfit_backend.entity.Plan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlanRepository extends JpaRepository<Plan, Long> {
    List<Plan> findAllByOrderByIdAsc();
}
