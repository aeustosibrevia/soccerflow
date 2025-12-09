package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Tournament;

public interface TournamentRepository extends JpaRepository<Tournament,Long> {

    List<Tournament> findByCountryIgnoreCase(String country);

    List<Tournament> findByTypeIgnoreCase(String type);

    List<Tournament> findByStartDateGreaterThanEqualAndEndDateLessThanEqual(
            LocalDate from,
            LocalDate to
    );
}
