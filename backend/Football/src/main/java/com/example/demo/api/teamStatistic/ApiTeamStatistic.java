package com.example.demo.api.teamstat;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.TeamStatisticInMatch;
import com.example.demo.repository.TeamRepository;
import com.example.demo.repository.MatchRepository;
import com.example.demo.repository.TeamStatisticRepository;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/team-stats")
@AllArgsConstructor
public class ApiTeamStatistic {

    private TeamStatisticRepository teamStatisticRepository;
    private TeamRepository teamRepository;
    private MatchRepository matchRepository;

    @GetMapping
    @PreAuthorize("hasAnyRole('USER','EDITOR','ADMIN')")
    public List<TeamStatisticInMatch> getAll(){
        return teamStatisticRepository.findAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER','EDITOR','ADMIN')")
    public ResponseEntity<?> getById(@PathVariable Long id){

        Optional<TeamStatisticInMatch> statOpt =
                teamStatisticRepository.findById(id);

        if(statOpt.isPresent()){
            return ResponseEntity.ok(statOpt.get());
        }

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body("No team statistic with this id");
    }

    @GetMapping("/team/{teamId}")
    @PreAuthorize("hasAnyRole('USER','EDITOR','ADMIN')")
    public ResponseEntity<?> getByTeam(@PathVariable Long teamId){

        if(!teamRepository.existsById(teamId)){
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("No team with this id");
        }

        return ResponseEntity.ok(
            teamStatisticRepository.findByTeamId(teamId)
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
            teamStatisticRepository.findByMatchId(matchId)
        );
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('EDITOR','ADMIN')")
    public ResponseEntity<?> create(
            @RequestBody TeamStatisticInMatch stat){

        if(stat.getTeam()==null || stat.getMatch()==null){
            return ResponseEntity
                    .badRequest()
                    .body("Team and match must be set");
        }

        teamRepository.findById(stat.getTeam().getId())
            .ifPresent(stat::setTeam);

        matchRepository.findById(stat.getMatch().getId())
            .ifPresent(stat::setMatch);

        boolean exists = teamStatisticRepository
            .findByTeamIdAndMatchId(
                stat.getTeam().getId(),
                stat.getMatch().getId()
            )
            .isPresent();

        if(exists){
            return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body("Statistics already exists for this team and match");
        }

        teamStatisticRepository.save(stat);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body("Team statistic created");
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('EDITOR','ADMIN')")
    public ResponseEntity<?> update(
            @PathVariable Long id,
            @RequestBody TeamStatisticInMatch newStat){

        Optional<TeamStatisticInMatch> statOpt =
                teamStatisticRepository.findById(id);

        if(statOpt.isEmpty()){
            return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body("No statistic with this id");
        }

        TeamStatisticInMatch stat = statOpt.get();

        stat.setTotalGoals(newStat.getTotalGoals());
        stat.setTotalAssists(newStat.getTotalAssists());
        stat.setYellowCards(newStat.getYellowCards());
        stat.setRedCards(newStat.getRedCards());
        stat.setShotsOnTarget(newStat.getShotsOnTarget());
        stat.setPossessionPercent(newStat.getPossessionPercent());
        stat.setPassesCompleted(newStat.getPassesCompleted());
        stat.setTackles(newStat.getTackles());
        stat.setSaves(newStat.getSaves());
        stat.setRating(newStat.getRating());

        return ResponseEntity.ok(
            teamStatisticRepository.save(stat)
        );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('EDITOR','ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long id){

        Optional<TeamStatisticInMatch> statOpt =
            teamStatisticRepository.findById(id);

        if(statOpt.isEmpty()){
            return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body("No statistic with this id");
        }

        teamStatisticRepository.delete(statOpt.get());

        return ResponseEntity.ok("Deleted successfully");
    }
}
