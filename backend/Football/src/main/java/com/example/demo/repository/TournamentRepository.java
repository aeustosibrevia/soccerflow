package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.model.Tournament;

import java.time.LocalDate;
import java.util.List;

public interface TournamentRepository extends JpaRepository<Tournament,Long> {

	@Query("SELECT t FROM Tournament t WHERE LOWER(t.country) = LOWER(:country)")
    List<Tournament> findByCountryIgnoreCase(String country);

	@Query(name = "Tournament.findByTypeIgnoreCase")
    List<Tournament> findByTypeIgnoreCase(String type);

	
    List<Tournament> findByStartDateGreaterThanEqualAndEndDateLessThanEqual(
            LocalDate from,
            LocalDate to
    );
}
