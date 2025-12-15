package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Match;

import java.time.LocalDate;
import java.util.List;

public interface MatchRepository extends JpaRepository<Match, Long> {

    List<Match> findByTeamOneIdOrTeamTwoId(Long teamOneId, Long teamTwoId);

    List<Match> findByMatchDate(LocalDate matchDate);
}
