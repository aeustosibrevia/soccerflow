package com.example.demo.model;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="matches")
public class Match {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false)
	private LocalDate matchDate;
	@Column(nullable = false)
	private LocalTime matchTime;
	
	@ManyToOne
	private Team teamOne;
	@ManyToOne
	private Team teamTwo;
	
	
	private Integer scoreTeamOne;
	private Integer scoreTeamTwo;
	
	@OneToMany(mappedBy = "match")
    private List<PlayerStatisticInMatch> playerStatistics;

}
