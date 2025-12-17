package com.example.demo.api.team;


import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.ReflectionUtils;
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
import com.example.demo.service.PlayerService;
import com.example.demo.service.TeamService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.fge.jsonpatch.JsonPatch;
import com.github.fge.jsonpatch.JsonPatchException;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path="/api/teams")
@AllArgsConstructor
public class ApiTeam {
	private TeamService teamService;
	private PlayerService playerService;

	
	@GetMapping
	@PreAuthorize("hasAnyRole('USER','EDITOR','ADMIN')")
	public List<Team> getTeams() {
		return teamService.getAllTeams();
		
	}
	
	@GetMapping(path="/{id}")
	@PreAuthorize("hasAnyRole('USER','EDITOR','ADMIN')")
	public ResponseEntity<?> getTeamsById(@PathVariable Long id) {
		Optional<Team> teamOptional=teamService.getTeamsById(id);
		if(teamOptional.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid arguments");
		}else {
			return ResponseEntity.ok(teamService.getTeamsById(id));
		}
		
	}
	
	@PostMapping
	@PreAuthorize("hasAnyRole('EDITOR','ADMIN')")
	public ResponseEntity<?> postTeam(@RequestBody Team team){
		Optional<Team> getTeam=teamService.getTeamsByName(team.getName());
		if(getTeam.isEmpty()) {
			teamService.saveTeam(team);
			return ResponseEntity.status(HttpStatus.CREATED).body("Team created succsessfuly");
		}else {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Invalid arguments");
		}
	}
		
		@PutMapping(path="/{id}")
		@PreAuthorize("hasAnyRole('EDITOR','ADMIN')")
		public ResponseEntity<?> updateTeam(@PathVariable Long id, @RequestBody Team newTeam){
			Optional<Team> teamId=teamService.getTeamsById(id);
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
		            Player existingPlayer = playerService.getPlayerById(player.getId())
		                .orElseThrow(() -> new RuntimeException("Player not found: " + player.getId()));
		            existingPlayer.setTeam(team);
		            newPlayers.add(existingPlayer);
		        } else {
		            player.setTeam(team);
		            newPlayers.add(player);
		        }
		    }

	
		    team.getPlayers().clear();
		    team.getPlayers().addAll(newPlayers);

		    Team saved = teamService.saveTeam(team);
		    return ResponseEntity.ok(saved);
			
		}
		@DeleteMapping(path="/{id}")
		@PreAuthorize("hasAnyRole('EDITOR','ADMIN')")
		public ResponseEntity<?> deleteTeam(@PathVariable Long id){
			Optional<Team> teamId=teamService.getTeamsById(id);
			if(teamId.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No team with this id");
			}else {
				Team team= teamId.get();
				teamService.deleteTeam(team);
				return ResponseEntity.status(HttpStatus.OK).body("Deleted Successfully");
			}
			
		}

		//RFC 7386
		@PatchMapping(value = "/{id}", consumes = "application/json") 
		@PreAuthorize("hasAnyRole('EDITOR','ADMIN')")
		public ResponseEntity<?> updateTeamPartially(@PathVariable Long id, @RequestBody Map<String, Object> fields) {
			Optional<Team> teamOptional = teamService.getTeamsById(id);
			if (teamOptional.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No team with this id");
			} else {

				fields.forEach((key, value) -> {

					Field field = ReflectionUtils.findField(Team.class, key);
					if (field != null) {
						field.setAccessible(true);

						ReflectionUtils.setField(field, teamOptional.get(), value);
					}
				});

				Team updatedTeam = teamService.saveTeam(teamOptional.get());
				return ResponseEntity.ok(updatedTeam);
			}
		}
		
		//RFC 6902
		@PatchMapping(value = "/{id}", consumes = "application/json-patch+json")
		@PreAuthorize("hasAnyRole('EDITOR','ADMIN')")
		public ResponseEntity<?> applyJsonPatch(@PathVariable Long id, @RequestBody JsonPatch patch) 
				throws JsonProcessingException, IllegalArgumentException, JsonPatchException {
		    	Optional<Team> teamOptional = teamService.getTeamsById(id);
				if (teamOptional.isEmpty()) {
					return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No team with this id");
				} else {
		        ObjectMapper objectMapper = new ObjectMapper();
		        JsonNode teamNode = objectMapper.convertValue(teamOptional.get(), JsonNode.class);

		        JsonNode patchedTeamNode = patch.apply(teamNode);
		        Team updatedTeam = objectMapper.treeToValue(patchedTeamNode, Team.class);

		        teamService.saveTeam(updatedTeam);
		        return ResponseEntity.ok(updatedTeam);
		    }
		}
}

