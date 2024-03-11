/**
 * File to handle util functions for starting up
 */
const { addPlayer, pool, getAllPlayers, getPlayer, clearDB } = require('../SQL/databaseUtils');
const dotenv = require('dotenv');
const axios = require('axios')

// config the dotenv path
dotenv.config({
    path: ('../.env')
})


// create the database or when refreshed
async function createDB() {

    // delete previous database
    await clearDB();

    // call sleeper API to get all players
    const players = await getSleeperPlayers();


    // loop through players and add them to local DB
    for (const player of players) {
        addPlayer(player.player_id, player.name, player.team, player.position);
    }

    console.log("create DB")
}

// call API to get all players and return them in a list
async function getSleeperPlayers() {

    // initial list hold
    players = []

    try {

        // call sleeper for all players
        const response = await axios.get("https://api.sleeper.app/v1/players/nfl");

        // iterate through every player
        for (const player_id in response.data) {
            const player = response.data[player_id];

            // every player has full name
            const name = player.full_name;
            
            // check if player is on a team
            let team = player.team;
            if (team === null) {
                team = "N/A";
            }
            
            // check if player has position (coaches and incomplete players in DB don't)
            let position = player.position;
            if (player.position === null) {
                position = "N/A";
            }
            
            const new_player = {
                name,
                player_id,
                position,
                team
            };

            players.push(new_player);
        }
    } catch (error) {
        // teams will be skipped and logged
        console.log(error);
    }

    return players;
}

module.exports = { createDB };