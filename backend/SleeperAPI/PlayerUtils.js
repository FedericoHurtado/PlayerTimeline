const axios = require("axios");

// helper function to get the list of all players from the sleeper API and returns a list
// of player objects
async function getPlayersFromSleeper() {
  // initial list hold
  players = [];

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

      // every player must have a player id
      let p_id = player.player_id;
      if (p_id === null) {
        return null;
      }

      const new_player = {
        name: name,
        player_id: p_id,
        position: position,
        team: team,
      };

      players.push(new_player);
    }
  } catch (error) {
    // teams will be skipped and logged
    console.log(error);
  }

  return players;
}

module.exports = { getPlayersFromSleeper };
