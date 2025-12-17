package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(
        name = "team_stat",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"team_id","match_id"})
        }
)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class TeamStatisticInMatch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id", nullable = false)
    private Team team;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "match_id", nullable = false)
    private Match match;

    @Column(nullable = false)
    private Integer totalGoals;

    @Column(nullable = false)
    private Integer totalAssists;

    @Column(nullable = false)
    private Integer yellowCards;

    @Column(nullable = false)
    private Integer redCards;

    @Column(nullable = false)
    private Integer shotsOnTarget;

    @Column(nullable = false)
    private Integer possessionPercent;

    @Column(nullable = false)
    private Integer passesCompleted;

    @Column(nullable = false)
    private Integer tackles;

    @Column(nullable = false)
    private Integer saves;

    @Column(nullable = false)
    private Double rating;
}
