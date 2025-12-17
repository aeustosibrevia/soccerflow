
CREATE TABLE IF NOT EXISTS teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    logo TEXT
);


CREATE TABLE IF NOT EXISTS players (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    second_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255),
    date_of_birth DATE NOT NULL, 
    position VARCHAR(50) NOT NULL,
    team_id INTEGER,
    FOREIGN KEY (team_id) REFERENCES teams(id)
);


CREATE TABLE IF NOT EXISTS tournaments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,     
    end_date DATE NOT NULL        
);


CREATE TABLE IF NOT EXISTS tournament_teams (
    tournament_id INTEGER NOT NULL,
    team_id INTEGER NOT NULL,
    PRIMARY KEY (tournament_id, team_id),
    FOREIGN KEY (tournament_id) REFERENCES tournaments(id),
    FOREIGN KEY (team_id) REFERENCES teams(id)
);


CREATE TABLE IF NOT EXISTS matches (
    id SERIAL PRIMARY KEY,
    match_date DATE NOT NULL,    
    match_time TIME NOT NULL,     
    team_one_id INTEGER NOT NULL,
    team_two_id INTEGER NOT NULL,
    score_team_one INTEGER,
    score_team_two INTEGER,
    tournament_id INTEGER,
    FOREIGN KEY (team_one_id) REFERENCES teams(id),
    FOREIGN KEY (team_two_id) REFERENCES teams(id),
    FOREIGN KEY (tournament_id) REFERENCES tournaments(id)
);


CREATE TABLE IF NOT EXISTS player_stat (
    id SERIAL PRIMARY KEY,
    player_id INTEGER NOT NULL,
    match_id INTEGER NOT NULL,
    goals INTEGER NOT NULL ,
    assists INTEGER NOT NULL ,
    yellow_cards INTEGER NOT NULL ,
    red_cards INTEGER NOT NULL ,
    minutes_played INTEGER NOT NULL ,
    rating REAL NOT NULL ,
    shots_on_target INTEGER NOT  NULL,
    passes_completed INTEGER NOT  NULL,
    tackles INTEGER NOT NULL ,
    saves INTEGER NOT NULL ,
    UNIQUE(player_id, match_id),
    FOREIGN KEY (player_id) REFERENCES players(id),
    FOREIGN KEY (match_id) REFERENCES matches(id)
);


CREATE TABLE IF NOT EXISTS team_stat (
    id SERIAL PRIMARY KEY,
    team_id INTEGER NOT NULL,
    match_id INTEGER NOT NULL,
    total_goals INTEGER NOT NULL ,
    total_assists INTEGER NOT NULL ,
    yellow_cards INTEGER NOT NULL ,
    red_cards INTEGER NOT NULL ,
    shots_on_target INTEGER NOT  NULL,
    possession_percent INTEGER NOT   NULL,
    passes_completed INTEGER NOT  NULL,
    tackles INTEGER NOT NULL ,
    saves INTEGER NOT NULL ,
    rating REAL NOT NULL ,
    UNIQUE(team_id, match_id),
    FOREIGN KEY (team_id) REFERENCES teams(id), 
    FOREIGN KEY (match_id) REFERENCES matches(id)
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    role VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS user_roles (
    user_id INTEGER NOT NULL,
    role_id INTEGER NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);
