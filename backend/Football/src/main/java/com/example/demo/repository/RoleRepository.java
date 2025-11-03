package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.usermodel.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
	Optional<Role> findByRole(String role);

}
