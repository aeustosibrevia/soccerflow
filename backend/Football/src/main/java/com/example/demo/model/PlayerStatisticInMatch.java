package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(
	name="player_stat",
	uniqueConstraints= {
			@UniqueConstraint(columnNames = {"player_id", "match_id"})
	}
		)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class PlayerStatisticInMatch {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "player_id", nullable = false)
    @JsonBackReference(value = "player-specific-stat")
	private Player player;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "match_id", nullable = false)
    @JsonBackReference(value = "player-stat")
    private Match match;
    
    @Column(nullable = false)
    private Integer goals;
    @Column(nullable = false)
    private Integer assists;
    @Column(nullable = false)
    private Integer yellowCards;
    @Column(nullable = false)
    private Integer redCards;
    @Column(nullable = false)
    private Integer minutesPlayed;
    @Column(nullable = false)
    private Double rating;           

    @Column(nullable = false)
    private Integer shotsOnTarget;
    @Column(nullable = false)
    private Integer passesCompleted;
    @Column(nullable = false)
    private Integer tackles;
    @Column(nullable = false)
    private Integer saves; 

}
