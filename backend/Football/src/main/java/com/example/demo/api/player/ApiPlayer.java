package com.example.demo.api.player;

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

import com.example.demo.model.Player;
import com.example.demo.service.PlayerService;
import com.example.demo.service.TeamService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path="/api/players")
@AllArgsConstructor
public class ApiPlayer {
	private TeamService teamService;
	private PlayerService playerService;
	
	@GetMapping
	@PreAuthorize("hasAnyRole('USER','EDITOR','ADMIN')")
	public List<Player> getPlayers() {
		return playerService.getAllPlayers();
		
	}
	
	@GetMapping(path="/{id}")
	@PreAuthorize("hasAnyRole('USER','EDITOR','ADMIN')")
	public ResponseEntity<?> getPlayerById(@PathVariable Long id) {
		Optional<Player> playerOptional=playerService.getPlayerById(id);
		if(playerOptional.isPresent()) {
		return ResponseEntity.ok(playerOptional.get());
		}else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid arguments");
		}
		
	}
	@PostMapping
	@PreAuthorize("hasAnyRole('EDITOR','ADMIN')")
	public ResponseEntity<?> postPlayer(@RequestBody Player player){
		Optional<Player> playerOptional=playerService
				.getPlayerByFirstNameAndSecondNameAndDateOfBirth(player.getFirstName(), 
						player.getSecondName(), player.getDateOfBirth());
		if(playerOptional.isEmpty()) {
			if(player.getTeam()!=null) {
				Long teamId = player.getTeam().getId();
		        teamService.getTeamsById(teamId).ifPresent(player::setTeam);
				
			}
			playerService.savePlayer(player);
			return ResponseEntity.status(HttpStatus.CREATED).body("Team created succsessfuly");
		}else {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Invalid arguments");
		}
	}
	@DeleteMapping(path="/{id}")
	@PreAuthorize("hasAnyRole('EDITOR','ADMIN')")
	public ResponseEntity<?> deletePlayer(@PathVariable Long id){
		Optional<Player> playerOptional=playerService.getPlayerById(id);
		if(playerOptional.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No team with this id");
		}else {
			Player player= playerOptional.get();
			playerService.deletePlayer(player);
			return ResponseEntity.status(HttpStatus.OK).body("Deleted Successfully");
		}
		
	}
	@PutMapping(path="/{id}")
	@PreAuthorize("hasAnyRole('EDITOR','ADMIN')")
	public ResponseEntity<?> updatePlayer(@PathVariable Long id, @RequestBody Player newPlayer){
		Optional<Player> playerOptional=playerService.getPlayerById(id);
		if(playerOptional.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No team with this id");
		}
		Player player=playerOptional.get();
		player.setFirstName(newPlayer.getFirstName());
		player.setSecondName(newPlayer.getSecondName());
		player.setLastName(newPlayer.getLastName());
		player.setDateOfBirth(newPlayer.getDateOfBirth());
		player.setPosition(newPlayer.getPosition());
		if (newPlayer.getTeam() != null) {
			Long teamId = player.getTeam().getId();
	        teamService.getTeamsById(teamId).ifPresent(player::setTeam);
        }

        return ResponseEntity.ok(playerService.savePlayer(player));
	}
}

