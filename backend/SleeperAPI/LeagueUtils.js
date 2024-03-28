const axios = require("axios");
const {
  getSleeperLeague,
} = require("../API_Adaptors/SleeperAPI/LeagueAdaptor");

/**
 * Helper function that takes a team object and ensures that
 * all the necessary metadata is present.
 * @param {*} curr_team
 *    team object returned by the sleeper API
 * @returns
 *    true if the object contains all necessary info, false otherwise
 */
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

/**
 * Function to get a list of all the teams and their metadata
 * from a given league_id
 * @param {*} league_id
 *    id of the league that user wants teams from
 * @returns
 *    list of teams and their metadata, null if data is not found for 1 or more teams.
 */
async function getTeamsFromLeague(league_id) {
  // list of teams
  let teams = [];

  try {
    const response = await axios.get(
      `https://api.sleeper.app/v1/league/${league_id}/rosters`
    );

    // ensure response was given
    if (!response.data) {
      console.log("No data found for any teams in league.");
      return null;
    }

    for (const team_data in response.data) {
      // if any team is missing data, return null
      if (!validateTeam(response.data[team_data])) {
        console.log("Missing data for one or more teams.");
        return null;
      }

      // store the metadata for the current team in an object
      const curr_team = {
        players: response.data[team_data].players,
        roster_id: response.data[team_data].roster_id,
        points_for: response.data[team_data].settings.fpts,
        wins: response.data[team_data].settings.wins,
        losses: response.data[team_data].settings.losses,
        ties: response.data[team_data].settings.ties,
        owner_id: response.data[team_data].owner_id,
      };

      // add object into teams
      teams.push(curr_team);
    }
  } catch (error) {
    // handle error
    console.log(error);
    return null;
  }

  // return list of team objects
  return teams;
}

// /**
//  * Function to check that a league_id is valid.
//  *
//  * @param {*} league_id
//  *    league_id being checked
//  * @returns
//  *    true if the sleeperAPI returns values for that league_id
//  */
async function validateLeague(league_id) {
  try {
    // sleeper API returns a null body if a league id does not give a real league
    const response = await axios.get(
      `https://api.sleeper.app/v1/league/${league_id}`
    );

    return response.data !== null;
  } catch (error) {
    // in case of error, return false and log it
    console.log(error);
    return false;
  }
}

/**
 * Function that will return a list of users in the league and their associated metadata
 */
async function getOwnerInfo(league_id) {
  try {
    const response = await axios.get(
      `https://api.sleeper.app/v1/league/${league_id}/users`
    );

    // sleeper responds with empty list if no owners are found
    if (response.data.length === 0) {
      throw new Error("No data found for the league id given.");
    }

    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * TODO: write comment
 */
async function getLeagueInfo(league_id) {
  try {
    // call the API adaptor to return a sleeper league
    const league = await getSleeperLeague(league_id);

    // ensure the league has all needed values
    if (
      !league.hasOwnProperty("total_rosters") ||
      !league.hasOwnProperty("season") ||
      !league.hasOwnProperty("status") ||
      !league.hasOwnProperty("bracket_id") ||
      !league.hasOwnProperty("name")
    ) {
      throw new Error("League missing some values. Check for API update.");
    }

    // create and return league object from obtained info
    const league_info = {
      num_teams: league.total_rosters,
      season: league.season,
      league_name: league.name,
      status: league.status,
      playoff_bracket: league.bracket_id,
    };

    return league_info;
  } catch (error) {
    // adaptor will throw error if there is a bad request
    throw error;
  }
}

/**
 * Returns all league_ids including the one for the current year.
 * Used to calculate all time stats in the future
 * @param { string } league_id
 */
async function allLeagues(league_id) {
  // step 1: create empty list and a variable for the current league id
  let leagues = [];
  let curr_id = league_id;

  while (curr_id !== null) {
    try {
      // step 2: add current league to list of leagues
      leagues.push(curr_id);

      // step 3: call the api adaptor to get the info for the current league
      const league = await getSleeperLeague(curr_id);

      // step 4: ensure the league contains information about the previous league
      if (!league.hasOwnProperty("previous_league_id")) {
        throw new Error(
          "Unable to find any information about previous leagues."
        );
      }

      // step 5: update curr_id to be the oldest league found
      curr_id = league.previous_league_id;
    } catch (error) {
      // adaptor will throw error if there is a bad request
      throw new Error(error.message);
    }
  }

  return leagues;
}

module.exports = {
  getTeamsFromLeague,
  validateLeague,
  validateTeam,
  getOwnerInfo,
  getLeagueInfo, // done
  allLeagues, // done
};
