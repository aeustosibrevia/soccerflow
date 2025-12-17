package com.example.demo.api.playerStatistic;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.PlayerStatisticInMatch;
import com.example.demo.repository.MatchRepository;
import com.example.demo.repository.PlayerRepository;
import com.example.demo.repository.PlayerStatisticRepository;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/player-stats")
@AllArgsConstructor
public class ApiPlayerStatistic {

    private PlayerStatisticRepository playerStatisticRepository;
    private PlayerRepository playerRepository;
    private MatchRepository matchRepository;

    @GetMapping
    @PreAuthorize("hasAnyRole('USER','EDITOR','ADMIN')")
    public List<PlayerStatisticInMatch> getAll(){
        return playerStatisticRepository.findAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER','EDITOR','ADMIN')")
    public ResponseEntity<?> getById(@PathVariable Long id){

        Optional<PlayerStatisticInMatch> statOpt =
                playerStatisticRepository.findById(id);

        if(statOpt.isPresent()){
            return ResponseEntity.ok(statOpt.get());
        }

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body("No player statistic with this id");

    }

    @GetMapping("/player/{playerId}")
    @PreAuthorize("hasAnyRole('USER','EDITOR','ADMIN')")
    public ResponseEntity<?> getByPlayer(@PathVariable Long playerId){

        if(!playerRepository.existsById(playerId)){
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("No player with this id");
        }

        return ResponseEntity.ok(
                playerStatisticRepository.findByPlayerId(playerId)
        );
    }

    @GetMapping("/match/{matchId}")
    @PreAuthorize("hasAnyRole('USER','EDITOR','ADMIN')")
    public ResponseEntity<?> getByMatch(@PathVariable Long matchId){

        if(!matchRepository.existsById(matchId)){
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("No match with this id");
        }

        return ResponseEntity.ok(
                playerStatisticRepository.findByMatchId(matchId)
        );
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('EDITOR','ADMIN')")
    public ResponseEntity<?> createPlayerStatistic(
            @RequestBody PlayerStatisticInMatch stat){

        if(stat.getPlayer() == null || stat.getMatch() == null){
            return ResponseEntity
                    .badRequest()
                    .body("Player and Match must be provided");
        }

        playerRepository.findById(stat.getPlayer().getId())
                .ifPresent(stat::setPlayer);

        matchRepository.findById(stat.getMatch().getId())
                .ifPresent(stat::setMatch);

        boolean exists =
                playerStatisticRepository
                        .findByPlayerIdAndMatchId(
                                stat.getPlayer().getId(),
                                stat.getMatch().getId()
                        )
                        .isPresent();

        if(exists){
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Statistic already exists for this player in this match");
        }

        playerStatisticRepository.save(stat);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Player statistic created successfully");

    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('EDITOR','ADMIN')")
    public ResponseEntity<?> updateStatistic(
            @PathVariable Long id,
            @RequestBody PlayerStatisticInMatch newStat){

        Optional<PlayerStatisticInMatch> statOpt =
                playerStatisticRepository.findById(id);

        if(statOpt.isEmpty()){
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("No statistic with this id");
        }

        PlayerStatisticInMatch stat = statOpt.get();

        stat.setGoals(newStat.getGoals());
        stat.setAssists(newStat.getAssists());
        stat.setYellowCards(newStat.getYellowCards());
        stat.setRedCards(newStat.getRedCards());
        stat.setMinutesPlayed(newStat.getMinutesPlayed());
        stat.setRating(newStat.getRating());
        stat.setShotsOnTarget(newStat.getShotsOnTarget());
        stat.setPassesCompleted(newStat.getPassesCompleted());
        stat.setTackles(newStat.getTackles());
        stat.setSaves(newStat.getSaves());

        return ResponseEntity.ok(
                playerStatisticRepository.save(stat)
        );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('EDITOR','ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long id){

        Optional<PlayerStatisticInMatch> statOpt =
                playerStatisticRepository.findById(id);

        if(statOpt.isEmpty()){
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("No statistic with this id");
        }

        playerStatisticRepository.delete(statOpt.get());

        return ResponseEntity.ok("Deleted successfully");
    }

}
