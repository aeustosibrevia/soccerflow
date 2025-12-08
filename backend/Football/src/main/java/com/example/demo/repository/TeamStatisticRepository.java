package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.TeamStatisticInMatch;

public interface TeamStatisticRepository
        extends JpaRepository<TeamStatisticInMatch, Long> {

    Optional<TeamStatisticInMatch>
        findByTeamIdAndMatchId(Long teamId, Long matchId);

    List<TeamStatisticInMatch>
        findByMatchId(Long matchId);

    List<TeamStatisticInMatch>
        findByTeamId(Long teamId);

}
