package com.example.demo.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.model.Player;
import com.example.demo.repository.PlayerRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PlayerService {
	
	private PlayerRepository playerRepository;
	
	public Optional<Player> getPlayerById(Long id){
		return playerRepository.findById(id); 
	}
	public List<Player> getAllPlayers(){
		return playerRepository.findAll();
	}
	public Optional<Player> getPlayerByFirstNameAndSecondNameAndDateOfBirth(String firstName, 
			String secondName, LocalDate birth){
		return playerRepository.findByFirstNameAndSecondNameAndDateOfBirth(firstName, secondName, birth); 
	}
	@Transactional
	public Player savePlayer(Player player){
		return playerRepository.save(player); 
	}
	@Transactional
	public void deletePlayer(Player player){
		try {
			playerRepository.delete(player);
		} catch (DataIntegrityViolationException e) {
			throw new ResponseStatusException(HttpStatus.CONFLICT,"Somthing wrong");
		}
	} 

}
