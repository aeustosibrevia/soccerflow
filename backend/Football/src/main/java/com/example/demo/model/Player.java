package com.example.demo.model;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="players")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Player {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false)
	private String firstName;
	@Column(nullable = false)
	private String secondName;
	@Column(nullable = false)
	private String lastName;
	@Column(nullable = false)
	private LocalDate dateOfBirth;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Position position;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JsonBackReference(value = "team-player")
	private Team team;
	
	@OneToMany(mappedBy = "player", cascade = CascadeType.ALL, orphanRemoval = true) 
	@JsonManagedReference(value = "player-specific-stat")
    private List<PlayerStatisticInMatch> statistics;
	
	public enum  Position{
		goalkeeper,defender,midfielder,forward;
	}

}
