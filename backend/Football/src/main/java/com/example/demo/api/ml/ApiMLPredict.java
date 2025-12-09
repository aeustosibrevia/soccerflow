package com.example.demo.api.ml;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Team;
import com.example.demo.repository.TeamRepository;
import com.example.demo.service.MLPredictionService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/ml")
@AllArgsConstructor
public class ApiML {

    private TeamRepository teamRepository;
    private MLPredictionService mlPredictionService;

    @GetMapping("/predict")
    @PreAuthorize("hasAnyRole('USER','EDITOR','ADMIN')")
    public ResponseEntity<?> predictMatch(
            @RequestParam Long homeTeamId,
            @RequestParam Long awayTeamId
    ) {

        Optional<Team> homeTeamOpt =
                teamRepository.findById(homeTeamId);

        Optional<Team> awayTeamOpt =
                teamRepository.findById(awayTeamId);

        if (homeTeamOpt.isEmpty() || awayTeamOpt.isEmpty()) {
            return ResponseEntity
                .badRequest()
                .body("Invalid team IDs");
        }

        Team homeTeam = homeTeamOpt.get();
        Team awayTeam = awayTeamOpt.get();

        Map<String, Object> prediction =
                mlPredictionService.predictByTeams(
                        homeTeam.getName(),
                        awayTeam.getName()
                );

        Map<String, Object> result = new HashMap<>();
        result.put("homeTeam", homeTeam.getName());
        result.put("awayTeam", awayTeam.getName());
        result.put("prediction", prediction);

        return ResponseEntity.ok(result);
    }

}
