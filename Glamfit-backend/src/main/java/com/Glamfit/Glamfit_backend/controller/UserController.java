package com.Glamfit.Glamfit_backend.controller;

import com.Glamfit.Glamfit_backend.entity.User;
import com.Glamfit.Glamfit_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAllByOrderByIdAsc();
    }

    @PostMapping
    public User saveUser(@RequestBody User user) {
        if (user.getId() == null) {
            // New user: encode password
            if (user.getPassword() != null && !user.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(user.getPassword()));
            } else {
                user.setPassword(passwordEncoder.encode("Default@123"));
            }
        } else {
            // Existing user: check if password was provided in the request
            Optional<User> existingUser = userRepository.findById(user.getId());
            if (existingUser.isPresent()) {
                // If the password field in the request is empty or matches the existing hash,
                // don't re-encode
                if (user.getPassword() == null || user.getPassword().isEmpty()
                        || user.getPassword().equals(existingUser.get().getPassword())) {
                    user.setPassword(existingUser.get().getPassword());
                } else {
                    // Password was explicitly changed
                    user.setPassword(passwordEncoder.encode(user.getPassword()));
                }
            }
        }
        return userRepository.save(user);
    }

    @PostMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestParam String status) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            User u = user.get();
            u.setStatus(status);
            userRepository.save(u);
            return ResponseEntity.ok(u);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // ── Admin Profile Update ──────────────────────────────────────────────────
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody Map<String, String> body) {
        String oldEmail = body.get("oldEmail");
        if (oldEmail == null)
            oldEmail = body.get("email");
        String email = body.get("email");
        String name = body.get("name");

        Optional<User> found = userRepository.findByEmail(oldEmail);
        if (found.isEmpty()) {
            // Try to find the ADMIN role user if email changed and no oldEmail was provided
            // (legacy fallback)
            List<User> admins = userRepository.findAll().stream()
                    .filter(u -> "ADMIN".equals(u.getRole())).toList();
            if (admins.isEmpty())
                return ResponseEntity.notFound().build();
            found = Optional.of(admins.get(0));
        }

        User admin = found.get();
        if (name != null)
            admin.setName(name);
        if (email != null && !email.equals(admin.getEmail())) {
            if (userRepository.findByEmail(email).isPresent()) {
                return ResponseEntity.status(400).body("Email already in use");
            }
            admin.setEmail(email);
        }
        userRepository.save(admin);
        return ResponseEntity.ok(Map.of("message", "Profile updated successfully"));
    }

    // ── Admin Password Change ─────────────────────────────────────────────────
    @PutMapping("/password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String currentPwd = body.get("currentPassword");
        String newPwd = body.get("newPassword");

        Optional<User> found = userRepository.findByEmail(email);
        if (found.isEmpty())
            return ResponseEntity.status(404).body("Admin not found");

        User admin = found.get();
        if (!passwordEncoder.matches(currentPwd, admin.getPassword())) {
            return ResponseEntity.status(400).body("Current password is incorrect");
        }

        admin.setPassword(passwordEncoder.encode(newPwd));
        userRepository.save(admin);
        return ResponseEntity.ok(Map.of("message", "Password changed successfully"));
    }
}
