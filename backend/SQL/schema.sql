CREATE DATABASE player_data;
USE player_data;

CREATE TABLE players (
    player_id INTEGER PRIMARY KEY,
    player_name VARCHAR(255) NOT NULL
);

USE player_data
INSERT INTO players (player_name, player_id)
VALUES
('Player A', 1234),
('Player B', 4321);