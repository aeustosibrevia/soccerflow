CREATE TABLE IF NOT EXISTS teams (
                      id INTEGER PRIMARY KEY AUTOINCREMENT,
                      name TEXT NOT NULL,
                      country TEXT NOT NULL,
                      logo TEXT
);

CREATE TABLE IF NOT EXISTS players (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        first_name TEXT NOT NULL,
                        second_name TEXT NOT NULL,
                        last_name TEXT,
                        date_of_birth TEXT NOT NULL,
                        position TEXT NOT NULL,
                        team_id INTEGER,
                        FOREIGN KEY (team_id) REFERENCES team(id)
);

CREATE TABLE IF NOT EXISTS tournaments (
                             id INTEGER PRIMARY KEY AUTOINCREMENT,
                             name TEXT NOT NULL,
                             country TEXT NOT NULL,
                             type TEXT NOT NULL,
                             start_date TEXT NOT NULL,
                             end_date TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS tournament_teams (
                                  tournament_id INTEGER NOT NULL,
                                  team_id INTEGER NOT NULL,
                                  PRIMARY KEY (tournament_id, team_id),
                                  FOREIGN KEY (tournament_id) REFERENCES tournaments(id),
                                  FOREIGN KEY (team_id) REFERENCES team(id)
);

CREATE TABLE IF NOT EXISTS matches (
                         id INTEGER PRIMARY KEY AUTOINCREMENT,
                         match_date TEXT NOT NULL,
                         match_time TEXT NOT NULL,
                         team_one_id INTEGER NOT NULL,
                         team_two_id INTEGER NOT NULL,
                         score_team_one INTEGER,
                         score_team_two INTEGER,
                         tournament_id INTEGER,
                         FOREIGN KEY (team_one_id) REFERENCES team(id),
                         FOREIGN KEY (team_two_id) REFERENCES team(id),
                         FOREIGN KEY (tournament_id) REFERENCES tournaments(id)
);

CREATE TABLE IF NOT EXISTS player_stat (
                             id INTEGER PRIMARY KEY AUTOINCREMENT,
                             player_id INTEGER NOT NULL,
                             match_id INTEGER NOT NULL,
                             goals INTEGER NOT NULL,
                             assists INTEGER NOT NULL,
                             yellow_cards INTEGER NOT NULL,
                             red_cards INTEGER NOT NULL,
                             minutes_played INTEGER NOT NULL,
                             rating REAL NOT NULL,
                             shots_on_target INTEGER NOT NULL,
                             passes_completed INTEGER NOT NULL,
                             tackles INTEGER NOT NULL,
                             saves INTEGER NOT NULL,
                             UNIQUE(player_id, match_id),
                             FOREIGN KEY (player_id) REFERENCES player(id),
                             FOREIGN KEY (match_id) REFERENCES matches(id)
);

CREATE TABLE IF NOT EXISTS team_stat (
                           id INTEGER PRIMARY KEY AUTOINCREMENT,
                           team_id INTEGER NOT NULL,
                           match_id INTEGER NOT NULL,
                           total_goals INTEGER NOT NULL,
                           total_assists INTEGER NOT NULL,
                           yellow_cards INTEGER NOT NULL,
                           red_cards INTEGER NOT NULL,
                           shots_on_target INTEGER NOT NULL,
                           possession_percent INTEGER NOT NULL,
                           passes_completed INTEGER NOT NULL,
                           tackles INTEGER NOT NULL,
                           saves INTEGER NOT NULL,
                           rating REAL NOT NULL,
                           UNIQUE(team_id, match_id),
                           FOREIGN KEY (team_id) REFERENCES team(id),
                           FOREIGN KEY (match_id) REFERENCES matches(id)
);

CREATE TABLE IF NOT EXISTS users (
                       id INTEGER PRIMARY KEY AUTOINCREMENT,
                       username TEXT NOT NULL UNIQUE,
                       password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS roles (
                       id INTEGER PRIMARY KEY AUTOINCREMENT,
                       role TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS user_roles (
                            user_id INTEGER NOT NULL,
                            role_id INTEGER NOT NULL,
                            PRIMARY KEY (user_id, role_id),
                            FOREIGN KEY (user_id) REFERENCES users(id),
                            FOREIGN KEY (role_id) REFERENCES roles(id)
);
