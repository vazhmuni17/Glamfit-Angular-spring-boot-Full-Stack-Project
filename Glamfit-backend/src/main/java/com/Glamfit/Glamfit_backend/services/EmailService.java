package com.Glamfit.Glamfit_backend.services;

import com.Glamfit.Glamfit_backend.entity.Appointment;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    // SMTP sender (must match spring.mail.username)
    @Value("${spring.mail.username}")
    private String fromEmail;

    // One and only admin email
    @Value("${app.admin.email}")
    private String adminEmail;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    // ================= USER SUCCESS EMAIL =================
    @Async
    public void sendUserConfirmationMail(Appointment appointment) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(appointment.getEmail());
            message.setSubject("Appointment Confirmed - GlamFit");
            message.setText(
                    "Hi " + appointment.getFirstName() + ",\n\n" +
                            "Your appointment has been booked successfully.\n\n" +
                            "Services: " + appointment.getService() + "\n" +
                            "Date: " + appointment.getAppointmentDate() + "\n" +
                            "Time: " + appointment.getAppointmentTime() + "\n\n" +
                            "Contact us:\nPhone: 81227 18901\nEmail: glamfit41@gmail.com\n\n" +
                            "Thank you for choosing GlamFit!"
            );

            mailSender.send(message);
            System.out.println("✅ User confirmation email sent");

        } catch (Exception e) {
            System.err.println("❌ Failed to send user email");
            e.printStackTrace();
        }
    }

    // ================= ADMIN NOTIFICATION EMAIL =================
    @Async
    public void sendAdminNotificationMail(Appointment appointment) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);      // SMTP sender
            message.setTo(adminEmail);       // arockiajerin123@gmail.com
            message.setSubject("New Appointment Booked - GlamFit");
            message.setText(
                    "New Appointment Details\n\n" +
                            "Name: " + appointment.getFirstName() + " " + appointment.getLastName() + "\n" +
                            "Email: " + appointment.getEmail() + "\n" +
                            "Phone: " + appointment.getPhone() + "\n" +
                            "Service: " + appointment.getService() + "\n" +
                            "Date: " + appointment.getAppointmentDate() + "\n" +
                            "Time: " + appointment.getAppointmentTime()
            );

            mailSender.send(message);
            System.out.println("✅ Admin notification email sent");

        } catch (Exception e) {
            System.err.println("❌ Failed to send admin email");
            e.printStackTrace();
        }
    }
}