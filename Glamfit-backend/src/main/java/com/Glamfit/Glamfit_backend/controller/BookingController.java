package com.Glamfit.Glamfit_backend.controller;

import com.Glamfit.Glamfit_backend.entity.Appointment;
import com.Glamfit.Glamfit_backend.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/bookings")
@CrossOrigin(origins = "http://localhost:4200")
public class BookingController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @GetMapping
    public List<Appointment> getAllBookings() {
        return appointmentRepository.findAll();
    }

    @PostMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestParam String status) {
        Optional<Appointment> appointment = appointmentRepository.findById(id);
        if (appointment.isPresent()) {
            Appointment a = appointment.get();
            a.setStatus(status);
            appointmentRepository.save(a);
            return ResponseEntity.ok(a);
        }
        return ResponseEntity.notFound().build();
    }
}
