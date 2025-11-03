package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.usermodel.User;

public interface UserRepository extends JpaRepository<User, Long> {
	List<User> findByUsername(String username);

	Optional<User> findByUsernameAndPassword(String username, String encode);

}
