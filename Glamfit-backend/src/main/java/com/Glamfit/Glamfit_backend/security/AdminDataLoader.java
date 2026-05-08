package com.Glamfit.Glamfit_backend.security;

import com.Glamfit.Glamfit_backend.entity.User;
import com.Glamfit.Glamfit_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminDataLoader implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByEmail("glamfit14@gmail.com").isEmpty()) {
            User admin = new User();
            admin.setEmail("glamfit14@gmail.com");
            admin.setPassword(passwordEncoder.encode("glamfit123")); // Set a secure default password
            admin.setRole("ADMIN");
            admin.setStatus("ACTIVE");
            userRepository.save(admin);
            System.out.println("Default admin user created: glamfit14@gmail.com");
        }
    }
}
