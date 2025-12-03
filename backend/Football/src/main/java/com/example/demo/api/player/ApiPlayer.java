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
import com.example.demo.repository.PlayerRepository;
import com.example.demo.repository.TeamRepository;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path="/api/players")
@AllArgsConstructor
public class ApiPlayer {
	private PlayerRepository playerRepository;
	private TeamRepository teamRepository;
	
	@GetMapping
	@PreAuthorize("hasAnyRole('USER','EDITOR','ADMIN')")
	public List<Player> getPlayers() {
		return playerRepository.findAll();
		
	}
	
	@GetMapping(path="/{id}")
	@PreAuthorize("hasAnyRole('USER','EDITOR','ADMIN')")
	public ResponseEntity<?> getPlayerById(@PathVariable Long id) {
		Optional<Player> playerOptional=playerRepository.findById(id);
		if(playerOptional.isPresent()) {
		return ResponseEntity.ok(playerOptional.get());
		}else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid arguments");
		}
		
	}
	@PostMapping
	@PreAuthorize("hasAnyRole('EDITOR','ADMIN')")
	public ResponseEntity<?> postPlayer(@RequestBody Player player){
		Optional<Player> playerOptional=playerRepository
				.findByFirstNameAndSecondNameAndDateOfBirth(player.getFirstName(), 
						player.getSecondName(), player.getDateOfBirth());
		if(playerOptional.isEmpty()) {
			if(player.getTeamId()!=null) {
				Long teamId = player.getTeamId().getId();
		        teamRepository.findById(teamId).ifPresent(player::setTeamId);
				
			}
			playerRepository.save(player);
			return ResponseEntity.status(HttpStatus.CREATED).body("Team created succsessfuly");
		}else {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Invalid arguments");
		}
	}
	@DeleteMapping(path="/{id}")
	@PreAuthorize("hasAnyRole('EDITOR','ADMIN')")
	public ResponseEntity<?> deletePlayer(@PathVariable Long id){
		Optional<Player> playerOptional=playerRepository.findById(id);
		if(playerOptional.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No team with this id");
		}else {
			Player player= playerOptional.get();
			playerRepository.delete(player);
			return ResponseEntity.status(HttpStatus.OK).body("Deleted Successfully");
		}
		
	}
	@PutMapping(path="/{id}")
	@PreAuthorize("hasAnyRole('EDITOR','ADMIN')")
	public ResponseEntity<?> updatePlayer(@PathVariable Long id, @RequestBody Player newPlayer){
		Optional<Player> playerOptional=playerRepository.findById(id);
		if(playerOptional.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No team with this id");
		}
		Player player=playerOptional.get();
		player.setFirstName(newPlayer.getFirstName());
		player.setSecondName(newPlayer.getSecondName());
		player.setLastName(newPlayer.getLastName());
		player.setDateOfBirth(newPlayer.getDateOfBirth());
		player.setPosition(newPlayer.getPosition());
		if (newPlayer.getTeamId() != null) {
			Long teamId = player.getTeamId().getId();
	        teamRepository.findById(teamId).ifPresent(player::setTeamId);
        }

        return ResponseEntity.ok(playerRepository.save(player));
	}
}

