package com.Glamfit.Glamfit_backend.controller;

import com.Glamfit.Glamfit_backend.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminStatsController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        long totalBookings = appointmentRepository.count();
        // Since we don't have a User entity yet in the list, we can count total unique emails or a dummy value
        long totalUsers = totalBookings > 0 ? (totalBookings / 2) + 1 : 0; 
        
        stats.put("totalUsers", totalUsers);
        stats.put("totalOrders", totalBookings);
        stats.put("revenue", totalBookings * 500); // Dummy calculation: 500 per booking
        
        return stats;
    }
}
