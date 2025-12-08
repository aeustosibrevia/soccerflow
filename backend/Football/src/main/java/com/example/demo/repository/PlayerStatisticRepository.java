package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.PlayerStatisticInMatch;

public interface PlayerStatisticRepository
        extends JpaRepository<PlayerStatisticInMatch, Long> {

    Optional<PlayerStatisticInMatch>
    findByPlayerIdAndMatchId(Long playerId, Long matchId);

    List<PlayerStatisticInMatch>
    findByPlayerId(Long playerId);

    List<PlayerStatisticInMatch>
    findByMatchId(Long matchId);

}
