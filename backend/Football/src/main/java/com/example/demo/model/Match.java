package com.example.demo.model;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
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
	
	@ManyToOne(fetch = FetchType.LAZY)
	private Team teamOne;
	@ManyToOne(fetch = FetchType.LAZY)
	private Team teamTwo;
	
	
	private Integer scoreTeamOne;
	private Integer scoreTeamTwo;
	
	@OneToMany(mappedBy = "match", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PlayerStatisticInMatch> playerStatistics;

}
