package com.Glamfit.Glamfit_backend.controller;

import com.Glamfit.Glamfit_backend.entity.Plan;
import com.Glamfit.Glamfit_backend.repository.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public/plans")
@CrossOrigin(origins = "http://localhost:4200")
public class PublicPlanController {

    @Autowired
    private PlanRepository planRepository;

    @GetMapping
    public List<Plan> getAllPlans() {
        return planRepository.findAll();
    }
}
