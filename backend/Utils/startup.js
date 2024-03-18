/**
 * File to handle util functions for starting up
 */
const {
  addPlayer,
  pool,
  getAllPlayers,
  getPlayer,
  clearDB,
} = require("../SQL/databaseUtils");
const dotenv = require("dotenv");
const axios = require("axios");
const { getPlayersFromSleeper } = require("../SleeperAPI/PlayerUtils");

// config the dotenv path
dotenv.config({
  path: "../.env",
});

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

  console.log("create DB");
}

// call API to get all players and return them in a list
async function getSleeperPlayers() {
  // initial list hold
  players = await getPlayersFromSleeper();

  return players;
}

module.exports = { createDB };
