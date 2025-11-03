package com.example.demo.model;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="players")
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
	@Column(nullable = false)
	private Position position;
	
	@ManyToOne(cascade = CascadeType.ALL)
	private Team teamId;
	
	@OneToMany(mappedBy = "player") 
    private List<PlayerStatisticInMatch> statistics;
	
	public enum  Position{
		goalkeeper, centerback,leftback,rightback, leftmidfielder,
		rightmidfielder, centralmidfielder, centralforward
	}

}
