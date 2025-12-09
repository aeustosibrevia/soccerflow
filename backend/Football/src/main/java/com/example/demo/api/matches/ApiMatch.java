package com.example.demo.api.matches;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Match;
import com.example.demo.repository.MatchRepository;
import com.example.demo.repository.TournamentRepository;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path="/api/matches")
@AllArgsConstructor
public class ApiMatch {

    private MatchRepository matchRepository;
    private TeamRepository teamRepository;
    private TournamentRepository tournamentRepository;

    @GetMapping
    @PreAuthorize("hasAnyRole('USER','EDITOR','ADMIN')")
    public List<Match> getMatches() {
        return matchRepository.findAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER','EDITOR','ADMIN')")
    public ResponseEntity<?> getMatch(@PathVariable Long id) {

        Optional<Match> matchOpt = matchRepository.findById(id);

        if (matchOpt.isPresent()) {
            return ResponseEntity.ok(matchOpt.get());
        }

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body("No match with this id");

    }

    @GetMapping("/team/{teamId}")
    @PreAuthorize("hasAnyRole('USER','EDITOR','ADMIN')")
    public ResponseEntity<?> getMatchesByTeam(@PathVariable Long teamId) {

        if(!teamRepository.existsById(teamId)){
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("No team with this id");
        }

        List<Match> matches =
                matchRepository.findByTeamOneIdOrTeamTwoId(teamId, teamId);

        return ResponseEntity.ok(matches);
    }

    @GetMapping("/date/{date}")
    @PreAuthorize("hasAnyRole('USER','EDITOR','ADMIN')")
    public ResponseEntity<?> getMatchesByDate(@PathVariable String date) {

        try {
            LocalDate parsedDate = LocalDate.parse(date);

            List<Match> matches =
                    matchRepository.findByMatchDate(parsedDate);

            return ResponseEntity.ok(matches);

        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body("Date must be in format yyyy-MM-dd");
        }
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('EDITOR','ADMIN')")
    public ResponseEntity<?> createMatch(@RequestBody Match match) {

        if (match.getHomeTeam() == null || match.getAwayTeam() == null) {
            return ResponseEntity.badRequest()
                    .body("Home or Away team is missing");
        }

        if (match.getHomeTeam().getId()
                .equals(match.getAwayTeam().getId())) {
            return ResponseEntity.badRequest()
                    .body("Home and Away team can't be equal");
        }

        teamRepository.findById(match.getHomeTeam().getId())
                .ifPresent(match::setHomeTeam);

        teamRepository.findById(match.getAwayTeam().getId())
                .ifPresent(match::setAwayTeam);

        if (match.getTournament() != null) {
            tournamentRepository
                    .findById(match.getTournament().getId())
                    .ifPresent(match::setTournament);
        }

        matchRepository.save(match);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Match created successfully");
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('EDITOR','ADMIN')")
    public ResponseEntity<?> deleteMatch(@PathVariable Long id) {

        Optional<Match> matchOpt = matchRepository.findById(id);

        if (matchOpt.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("No match with this id");
        }

        matchRepository.delete(matchOpt.get());

        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Deleted successfully");

    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('EDITOR','ADMIN')")
    public ResponseEntity<?> updateMatch(
            @PathVariable Long id,
            @RequestBody Match newMatch) {

        Optional<Match> matchOpt = matchRepository.findById(id);

        if (matchOpt.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("No match with this id");
        }

        Match match = matchOpt.get();

        match.setDateTime(newMatch.getDateTime());
        match.setScoreJson(newMatch.getScoreJson());

        if (newMatch.getTournament() != null) {
            tournamentRepository
                    .findById(newMatch.getTournament().getId())
                    .ifPresent(match::setTournament);
        }

        if (newMatch.getHomeTeam() != null) {
            teamRepository
                    .findById(newMatch.getHomeTeam().getId())
                    .ifPresent(match::setHomeTeam);
        }

        if (newMatch.getAwayTeam() != null) {
            teamRepository
                    .findById(newMatch.getAwayTeam().getId())
                    .ifPresent(match::setAwayTeam);
        }

        matchRepository.save(match);

        return ResponseEntity.ok(match);
    }

}