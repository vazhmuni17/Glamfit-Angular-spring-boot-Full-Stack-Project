package com.Glamfit.Glamfit_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    private String phone;

    private String name;

    private String role;

    private String status = "ACTIVE";

    private java.time.LocalDate joined = java.time.LocalDate.now();
}
