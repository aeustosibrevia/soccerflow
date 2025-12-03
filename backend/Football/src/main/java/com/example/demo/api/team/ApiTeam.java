package com.example.demo.api.team;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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

import com.example.demo.model.Player;
import com.example.demo.model.Team;
import com.example.demo.repository.PlayerRepository;
import com.example.demo.repository.TeamRepository;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path="/api/teams")
@AllArgsConstructor
public class ApiTeam {
	private TeamRepository teamRepository;
	private PlayerRepository playerRepository;
	
	@GetMapping
	@PreAuthorize("hasAnyRole('USER','EDITOR','ADMIN')")
	public List<Team> getTeams() {
		return teamRepository.findAll();
		
	}
	
	@GetMapping(path="/{id}")
	@PreAuthorize("hasAnyRole('USER','EDITOR','ADMIN')")
	public Optional<Team> getTeamsById(@PathVariable Long id) {
		return teamRepository.findById(id);
		
	}
	
	@PostMapping
	@PreAuthorize("hasAnyRole('EDITOR','ADMIN')")
	public ResponseEntity<?> postTeam(@RequestBody Team team){
		Optional<Team> getTeam=teamRepository.findByName(team.getName());
		if(getTeam.isEmpty()) {
			teamRepository.save(team);
			return ResponseEntity.status(HttpStatus.CREATED).body("Team created succsessfuly");
		}else {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Invalid arguments");
		}
	}
		
		@PutMapping(path="/{id}")
		@PreAuthorize("hasAnyRole('EDITOR','ADMIN')")
		public ResponseEntity<?> updateTeam(@PathVariable Long id, @RequestBody Team newTeam){
			Optional<Team> teamId=teamRepository.findById(id);
			if(teamId.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No team with this id");
			}
			Team team=teamId.get();
			team.setCountry(newTeam.getCountry());
			team.setLogo(newTeam.getLogo());
			team.setName(newTeam.getName());
			
			List<Player> newPlayers = new ArrayList<>();

		    for (Player player : newTeam.getPlayers()) {
		        if (player.getId() != null) {
		            Player existingPlayer = playerRepository.findById(player.getId())
		                .orElseThrow(() -> new RuntimeException("Player not found: " + player.getId()));
		            existingPlayer.setTeamId(team);
		            newPlayers.add(existingPlayer);
		        } else {
		            player.setTeamId(team);
		            newPlayers.add(player);
		        }
		    }

	
		    team.getPlayers().clear();
		    team.getPlayers().addAll(newPlayers);

		    Team saved = teamRepository.save(team);
		    return ResponseEntity.ok(saved);
			
		}
		@DeleteMapping(path="/{id}")
		@PreAuthorize("hasAnyRole('EDITOR','ADMIN')")
		public ResponseEntity<?> deleteTeam(@PathVariable Long id){
			Optional<Team> teamId=teamRepository.findById(id);
			if(teamId.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No team with this id");
			}else {
				Team team= teamId.get();
				teamRepository.delete(team);
				return ResponseEntity.status(HttpStatus.OK).body("Deleted Successfully");
			}
			
		}
		@PatchMapping("/{id}")
		@PreAuthorize("hasAnyRole('EDITOR','ADMIN')")
		public ResponseEntity<?> patchTeam(@PathVariable Long id, 
				@RequestBody Map<String, Object> updates) {
		    Optional<Team> optionalTeam = teamRepository.findById(id);
		    if (optionalTeam.isEmpty()) {
		        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No team with this id");
		    }

		    Team team = optionalTeam.get();
		    if (updates.containsKey("name")) {
		        team.setName((String) updates.get("name"));
		    }
		    if (updates.containsKey("country")) {
		        team.setCountry((String) updates.get("country"));
		    }
		    if (updates.containsKey("logo")) {
		        team.setLogo((String) updates.get("logo"));
		    }

		    if (updates.containsKey("players")) {
		        List<Map<String, Object>> playersJson =  (List<Map<String, Object>>) updates.get("players");
		        List<Player> updatedPlayers = new ArrayList<>();

		        for (Map<String, Object> p : playersJson) {
		            if (p.containsKey("id")) {
		                Long playerId = ((Number) p.get("id")).longValue();
		                Optional<Player> optionalPlayer = playerRepository.findById(playerId);
		                if (optionalPlayer.isPresent()) {
		                    Player player = optionalPlayer.get();
		                    player.setTeamId(team);
		                    updatedPlayers.add(player);
		                }
		            }
		        }

		        List<Player> currentPlayers = team.getPlayers();
		        currentPlayers.removeIf(player -> !updatedPlayers.contains(player));

		        for (Player player : updatedPlayers) {
		            if (!currentPlayers.contains(player)) {
		                currentPlayers.add(player);
		            }
		        }

		        team.setPlayers(currentPlayers);
		    }

		    Team savedTeam = teamRepository.save(team);
		    return ResponseEntity.ok(savedTeam);
		}

}
