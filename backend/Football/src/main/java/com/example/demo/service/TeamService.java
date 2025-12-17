package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.model.Team;
import com.example.demo.repository.TeamRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TeamService {
	private TeamRepository teamRepository;
	
	
	public List<Team> getAllTeams(){
		return teamRepository.findAll();
	}
	
	public Optional<Team> getTeamsById(Long id){
		return teamRepository.findById(id); 
	}
	
	public Optional<Team> getTeamsByName(String name){
		return teamRepository.findByName(name); 
	}
	@Transactional
	public Team saveTeam(Team team){
		return teamRepository.save(team); 
	}
	@Transactional
	public void deleteTeam(Team team){
		try {
			teamRepository.delete(team);
		} catch (DataIntegrityViolationException e) {
			throw new ResponseStatusException(HttpStatus.CONFLICT,"Unable to delete team: It is referenced in matches.");
		}
	} 
	
}
