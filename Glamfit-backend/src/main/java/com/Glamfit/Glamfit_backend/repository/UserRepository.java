package com.Glamfit.Glamfit_backend.repository;

import com.Glamfit.Glamfit_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findAllByOrderByIdAsc();
}
