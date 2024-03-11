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
        addPlayer(player.player_id, player.name);
    }

    console.log("create DB")
}

async function getSleeperPlayers() {

    players = []

    try {
        const response = await axios.get("https://api.sleeper.app/v1/players/nfl");

        for (const player_id in response.data) {
            const player = response.data[player_id];

            const name = player.full_name;
            
            const new_player = {
                name,
                player_id
            };

            players.push(new_player);
        }
    } catch (error) {
        console.log(error);
    }

    return players;
}

module.exports = { createDB };