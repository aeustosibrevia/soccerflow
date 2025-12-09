package com.example.demo.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;

@Service
public class MLPredictionService {

    private final RestTemplate restTemplate = new RestTemplate();

    private static final String ML_URL =
            "http://127.0.0.1:8000/predict_by_teams";

    public Map<String, Object>
    predictByTeams(String homeTeam, String awayTeam) {

        String url = UriComponentsBuilder
                .fromHttpUrl(ML_URL)
                .queryParam("home_team", homeTeam)
                .queryParam("away_team", awayTeam)
                .toUriString();

        return restTemplate.getForObject(url, Map.class);
    }
}