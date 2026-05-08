package com.Glamfit.Glamfit_backend.services;

import com.Glamfit.Glamfit_backend.entity.Appointment;
import com.Glamfit.Glamfit_backend.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final EmailService emailService;

    // Constructor Injection (NO @Autowired needed)
    public AppointmentService(AppointmentRepository appointmentRepository,
                              EmailService emailService) {
        this.appointmentRepository = appointmentRepository;
        this.emailService = emailService;
    }

    // Save appointment and trigger emails
    public void saveAppointment(Appointment appointment) {

        // 1. Save to database (FAST)
        appointmentRepository.save(appointment);

        // 2. Send emails asynchronously (NON-BLOCKING)
        emailService.sendUserConfirmationMail(appointment);
        emailService.sendAdminNotificationMail(appointment);
    }
}
