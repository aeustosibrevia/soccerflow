package com.example.demo.model;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="tournaments")
@NamedQuery(
        name = "Tournament.findByTypeIgnoreCase",
        query = "SELECT t FROM Tournament t WHERE LOWER(t.type) = LOWER(:type)"
    )
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Tournament {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false)
	private String name;
	@Column(nullable = false)
	private String country;
	@Column(nullable = false)
	private String type;
	@Column(nullable = false)
	private LocalDate startDate;
	@Column(nullable = false)
	private LocalDate endDate;
	
	@ManyToMany(cascade=CascadeType.ALL)
	@JoinTable(
		name="tournament_teams",
		joinColumns=@JoinColumn(name="tournament_id"),
		inverseJoinColumns=@JoinColumn(name="team_id")
			)
	private List<Team> teams;

}
