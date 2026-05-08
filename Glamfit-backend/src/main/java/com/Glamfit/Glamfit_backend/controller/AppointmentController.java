package com.Glamfit.Glamfit_backend.controller;

import com.Glamfit.Glamfit_backend.entity.Appointment;
import com.Glamfit.Glamfit_backend.services.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:4200")
public class AppointmentController {

    private final AppointmentService appointmentService;

    // Constructor Injection
    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    // Book Appointment API
    @PostMapping
    public ResponseEntity<String> bookAppointment(@RequestBody Appointment appointment) {

        appointmentService.saveAppointment(appointment);

        return ResponseEntity.ok("Appointment booked successfully");
    }
}
