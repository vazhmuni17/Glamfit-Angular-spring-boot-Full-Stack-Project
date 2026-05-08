package com.Glamfit.Glamfit_backend.repository;

import com.Glamfit.Glamfit_backend.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository
        extends JpaRepository<Appointment, Long> {
}
