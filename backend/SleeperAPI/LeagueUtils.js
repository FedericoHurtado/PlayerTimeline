const axios = require("axios");
const { team } = require("../Utils/DataTypes.js");

// helper function to ensure the data given for each team is valid
function validateTeam(curr_team) {
  // these fields cannot be null, 0, or undefined
  if (
    !curr_team.roster_id ||
    !curr_team.players ||
    !curr_team.owner_id ||
    !curr_team.settings
  ) {
    return false;
  }

  // ensure settings have needed info
  if (
    curr_team.settings.wins === undefined ||
    curr_team.settings.losses === undefined ||
    curr_team.settings.ties === undefined ||
    curr_team.settings.fpts === undefined
  ) {
    return false;
  }

  // all required info is present, return that the team is valid
  return true;
}

// function to retieve all the teams from a league id
// it will return a list of team objects defined in DataTypes.js
async function getTeamsFromLeague(league_id) {
  // list of teams
  let teams = [];

  try {
    const response = await axios.get(
      `https://api.sleeper.app/v1/league/${league_id}/rosters`
    );

    // ensure response was given
    if (!response.data) {
      return []; // possibly throw error?
    }

    for (const team_data in response.data) {
      // if any team is missing data, return invalid
      if (!validateTeam(response.data[team_data])) {
        console.log("No team data");
        return []; // throw error?
      }

      const curr_team = {
        players: response.data[team_data].players,
        roster_id: response.data[team_data].roster_id,
        points_for: response.data[team_data].settings.fpts,
        wins: response.data[team_data].settings.wins,
        losses: response.data[team_data].settings.losses,
        ties: response.data[team_data].settings.ties,
        owner_id: response.data[team_data].owner_id,
      };
      teams.push(curr_team);
    }
  } catch (error) {
    // handle error
    console.log(error);
  }

  return teams;
}

module.exports = { getTeamsFromLeague };
