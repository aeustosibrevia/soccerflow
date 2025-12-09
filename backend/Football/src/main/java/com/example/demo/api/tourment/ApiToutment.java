package com.example.demo.api.tournament;

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

import com.example.demo.model.Tournament;
import com.example.demo.repository.TournamentRepository;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/tournaments")
@AllArgsConstructor
public class ApiTournament {

    private TournamentRepository tournamentRepository;

    @GetMapping
    @PreAuthorize("hasAnyRole('USER','EDITOR','ADMIN')")
    public List<Tournament> getTournaments() {
        return tournamentRepository.findAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER','EDITOR','ADMIN')")
    public ResponseEntity<?> getTournamentById(@PathVariable Long id) {

        Optional<Tournament> tournamentOpt =
                tournamentRepository.findById(id);

        if (tournamentOpt.isPresent()) {
            return ResponseEntity.ok(tournamentOpt.get());
        }

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body("No tournament with this id");
    }

    @GetMapping("/country/{country}")
    @PreAuthorize("hasAnyRole('USER','EDITOR','ADMIN')")
    public List<Tournament> getByCountry(@PathVariable String country){
        return tournamentRepository.findByCountryIgnoreCase(country);
    }

    @GetMapping("/type/{type}")
    @PreAuthorize("hasAnyRole('USER','EDITOR','ADMIN')")
    public List<Tournament> getByType(@PathVariable String type){
        return tournamentRepository.findByTypeIgnoreCase(type);
    }

    @GetMapping("/dates")
    @PreAuthorize("hasAnyRole('USER','EDITOR','ADMIN')")
    public ResponseEntity<?> getByDates(
            @RequestParam String from,
            @RequestParam String to
    ){

        try {

            LocalDate fromDate = LocalDate.parse(from);
            LocalDate toDate   = LocalDate.parse(to);

            return ResponseEntity.ok(
                    tournamentRepository
                            .findByStartDateGreaterThanEqualAndEndDateLessThanEqual(
                                    fromDate,
                                    toDate
                            )
            );

        } catch (Exception e) {

            return ResponseEntity
                    .badRequest()
                    .body("Invalid date format: use yyyy-MM-dd");

        }
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('EDITOR','ADMIN')")
    public ResponseEntity<?> createTournament(
            @RequestBody Tournament tournament) {

        tournamentRepository.save(tournament);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Tournament created successfully");
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('EDITOR','ADMIN')")
    public ResponseEntity<?> updateTournament(
            @PathVariable Long id,
            @RequestBody Tournament newTournament) {

        Optional<Tournament> tournamentOpt =
                tournamentRepository.findById(id);

        if(tournamentOpt.isEmpty()){
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("No tournament with this id");
        }

        Tournament tournament = tournamentOpt.get();

        tournament.setName(newTournament.getName());
        tournament.setCountry(newTournament.getCountry());
        tournament.setType(newTournament.getType());
        tournament.setStartDate(newTournament.getStartDate());
        tournament.setEndDate(newTournament.getEndDate());

        return ResponseEntity.ok(
                tournamentRepository.save(tournament)
        );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<?> deleteTournament(@PathVariable Long id){

        Optional<Tournament> tournamentOpt =
                tournamentRepository.findById(id);

        if(tournamentOpt.isEmpty()){
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("No tournament with this id");
        }

        tournamentRepository.delete(tournamentOpt.get());

        return ResponseEntity.ok("Deleted successfully");
    }
}