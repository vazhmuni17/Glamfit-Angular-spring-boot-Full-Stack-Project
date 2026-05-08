package com.Glamfit.Glamfit_backend.controller;

import com.Glamfit.Glamfit_backend.entity.Plan;
import com.Glamfit.Glamfit_backend.repository.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/plans")
@CrossOrigin(origins = "http://localhost:4200")
public class PlanController {

    @Autowired
    private PlanRepository planRepository;

    @GetMapping
    public List<Plan> getAllPlans() {
        List<Plan> plans = planRepository.findAllByOrderByIdAsc();
        System.out.println("Returning " + plans.size() + " plans in ascending order");
        return plans;
    }

    @PostMapping
    public Plan savePlan(@RequestBody Plan plan) {
        System.out.println("Saving plan: " + plan.getName());
        return planRepository.save(plan);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePlan(@PathVariable Long id) {
        planRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
