CREATE DATABASE player_data;
USE player_data;

CREATE TABLE players (
    player_id INTEGER PRIMARY KEY,
    player_name VARCHAR(255) NOT NULL,
    team VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL
    
);
