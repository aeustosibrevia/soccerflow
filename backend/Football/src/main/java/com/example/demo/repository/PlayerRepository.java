package com.example.demo.repository;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Player;

public interface PlayerRepository extends JpaRepository<Player, Long> {
	Optional<Player> findByFirstNameAndSecondNameAndDateOfBirth(String firstName, String seconName, LocalDate date);

}
